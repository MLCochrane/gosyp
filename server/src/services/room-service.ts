import { v4 as uuidv4 } from 'uuid';
import { Service, Container } from 'typedi';
import type { Document } from 'mongoose';
import RoomModel from '../models/room';

export interface RoomFieldsInterface {
  uuid: string;
  userCount: number;
  name?: string;
  nickname?: string;
}

export interface RoomRecordObjectInterface extends RoomFieldsInterface {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}
/**
 * Handles interaction with the Room model
 * for managing room CRUD.
 */
@Service()
export default class RoomService {
  constructor(
    private roomModel: typeof RoomModel,
  ) {
    this.roomModel = Container.get('roomModel');
  }

  /**
   * Creates room with optional name.
   * @param name Optional name for the room.
   */
  public async CreateRoom(
    name?: string,
  ): Promise<Error | RoomRecordObjectInterface> {
    // Quick name check
    if (name) {
      const roomExists = await this.roomModel.findOne({ name });
      if (roomExists) throw new Error('Room with that name already exists');
    }

    const roomFields: RoomFieldsInterface = {
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
  ): Promise<boolean | IRoom & Document> {
    const roomRecord = await this.roomModel.findOne({ uuid: id });
    if (!roomRecord) return false;

    return roomRecord;
  }

  /**
   * Updates room user count and calls remove method if no more users.
   * @param uuid String representing the room uuid.
   * @param increase Boolean to either increase or decrease user count.
   */
  public async UpdateRoomUsers(
    uuid: string,
    increase: boolean,
  ): Promise<ClientRoomInterface | boolean> {
    const incrementVal = increase ? 1 : -1;
    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { uuid },
      { $inc: { userCount: incrementVal } },
      {
        useFindAndModify: false,
        new: true,
      },
    );

    if (!updatedRoom) return false;
    if (updatedRoom && updatedRoom.userCount <= 0) {
      const removal = await this.RemoveRoom(uuid);
      return removal;
    }

    return [
      {
        name: 'ID',
        value: updatedRoom?.uuid,
      },
      {
        name: 'Room Name',
        value: updatedRoom?.name || 'N/A',
      },
      {
        name: 'Created at',
        value: updatedRoom.createdAt,
      },
      {
        name: 'Active Users',
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
  ): Promise<boolean> {
    try {
      await this.roomModel.deleteOne({ uuid: id });
    } catch (e) {
      /**
       * Not yet sure what is best to do here. The removal
       * is only ever called server side and the issue we'd
       * catch here is if a user leaves a room that doesn't
       * exist. Only in dev with the client open
       * and server restarting would the client disconnect
       * before connection.
       *
       * Handling the forced disconnect of the client when
       * the server doesn't respond should be dealt with
       * elsewhere.
       */
    }
    return true;
  }
}
