export default class RoomServiceStub {
  CheckForRoom: jest.Mock;

  CreateRoom: jest.Mock;

  UpdateRoomUsers: jest.Mock;

  RemoveRoom: jest.Mock;

  constructor() {
    this.CheckForRoom = jest.fn();
    this.CreateRoom = jest.fn();
    this.UpdateRoomUsers = jest.fn();
    this.RemoveRoom = jest.fn();
  }
}
