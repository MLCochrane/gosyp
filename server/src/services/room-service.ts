import { v4 as uuidv4 } from 'uuid';
import { Service, Inject } from 'typedi';
import RoomModel from '../models/room';

@Service()
export default class RoomService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('roomModel') private roomModel: typeof RoomModel,
    // @Inject('logger') private logger,
  ) {}

  public async CreateRoom(
    name: string,
  ) {
    // Quick name check
    if (name) {
      const roomExists = await this.roomModel.findOne({ name });
      if (roomExists) throw new Error('Room with that name already exists');
    }

    // Creating new record
    const roomRecord = await this.roomModel.create({
      name,
      uuid: uuidv4(),
      userCount: 0,
    });

    // Throw error if issue else return the room.
    if (!roomRecord) throw new Error('Room cannot be created');
    return roomRecord.toObject();
  }

  public async CheckForRoom(
    id: string,
  ) {
    const roomRecord = await this.roomModel.findOne({ uuid: id });
    if (!roomRecord) throw new Error('Room does not exist');

    return true;
  }
}
