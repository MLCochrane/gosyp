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
    const roomExists = await this.roomModel.findOne({ name });
    if (roomExists) throw new Error('Room already exists');

    const roomRecord = await this.roomModel.create({
      name,
      uuid: uuidv4(),
    });

    if (!roomRecord) throw new Error('Room cannot be created');
  }

  public async CheckForRoom(
    id: string,
  ) {
    const roomRecord = await this.roomModel.findOne({ uuid: id });
  }
}
