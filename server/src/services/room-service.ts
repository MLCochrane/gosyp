import { v4 as uuidv4 } from 'uuid';
import { Service, Container } from 'typedi';
import type { Logger } from 'winston';
import RoomModel from '../models/room';

/**
 * Handles interaction with the Room model
 * for managing room CRUD.
 */
@Service()
export default class RoomService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private roomModel: typeof RoomModel,
    private logger: Logger,
  ) {
    this.roomModel = Container.get('roomModel');
    this.logger = Container.get('logger');
  }

  /**
   * Creates room with optional name.
   * @param name Optional name for the room.
   */
  public async CreateRoom(
    name?: string,
  ) {
    // Quick name check
    if (name) {
      const roomExists = await this.roomModel.findOne({ name });
      if (roomExists) throw new Error('Room with that name already exists');
    }
    this.logger.info('passing our first db query...');

    const roomFields: any = {
      uuid: uuidv4(),
      userCount: 0,
    };

    // Only add name field if it's been supplied
    if (name) roomFields.name = name;

    // Creating new record
    const roomRecord = await this.roomModel.create(roomFields);

    // Throw error if issue else return the room.
    if (!roomRecord) throw new Error('Room cannot be created');
    return roomRecord.toObject();
  }

  /**
   * Checks for existance of room based on uuid.
   * @param id String representing the room uuid.
   */
  public async CheckForRoom(
    id: string,
  ) {
    const roomRecord = await this.roomModel.findOne({ uuid: id });
    if (!roomRecord) return false;

    return true;
  }

  /**
   * Updates room user count and calls remove method if no more users.
   * @param uuid String representing the room uuid.
   * @param increase Boolean to either increase or decrease user count.
   */
  public async UpdateRoomUsers(
    uuid: string,
    increase: boolean,
  ) {
    const incrementVal = increase ? 1 : -1;
    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { uuid },
      { $inc: { userCount: incrementVal } },
      {
        useFindAndModify: false,
        new: true,
      },
    );

    if (updatedRoom && updatedRoom.userCount <= 0) {
      const removal = await this.RemoveRoom(uuid);
      return removal;
    }
    return [
      {
        name: 'Room ID',
        value: updatedRoom?.uuid,
      },
      {
        name: 'Room Name',
        value: updatedRoom?.name || 'N/A',
      },
      {
        name: 'Created At',
        value: (updatedRoom as any).createdAt,
      },
      {
        name: 'Active users',
        value: updatedRoom?.userCount,
      },
    ];
  }

  /**
   * Removes room from DB with supplied uuid.
   * @param id String representing the room uuid.
   */
  public async RemoveRoom(
    id: string,
  ) {
    await this.roomModel.deleteOne({ uuid: id });
    return true;
  }
}
