import { v4 as uuidv4 } from 'uuid';
import { Service, Container } from 'typedi';
import type { Logger } from 'winston';
import RoomModel from '../models/room';

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

  public async CheckForRoom(
    id: string,
  ) {
    const roomRecord = await this.roomModel.findOne({ uuid: id });
    if (!roomRecord) return false;

    return true;
  }
}
