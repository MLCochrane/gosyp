import { v4 as uuidv4 } from 'uuid';
import { Container } from 'typedi';
import roomModel from '../models/room';
import RoomService from './room-service';

jest.mock('uuid', () => ({
  v4: () => '12345',
}));
const mockedUUID = uuidv4();

describe('Room service', () => {
  beforeAll(() => {
    Container.set('roomModel', roomModel);
  });

  describe('CreateRoom method', () => {
    it('throws error in createRoom if room already exists', async () => {
      roomModel.findOne = jest.fn().mockResolvedValueOnce(true);
      const service = new RoomService(roomModel);
      try {
        await service.CreateRoom('Best room!');
      } catch (e) {
        expect(e).toEqual(Error('Room with that name already exists'));
      }
      expect(roomModel.findOne).toHaveBeenCalledWith({
        name: 'Best room!',
      });
    });

    it('throws error in createRoom if room cannot be created', async () => {
      roomModel.create = jest.fn().mockResolvedValueOnce(false);
      const service = new RoomService(roomModel);
      try {
        await service.CreateRoom('New Fancy Room!');
      } catch (e) {
        expect(e).toEqual(Error('Room cannot be created'));
      }
      expect(roomModel.create).toHaveBeenCalledWith({
        uuid: mockedUUID,
        userCount: 0,
        name: 'New Fancy Room!',
      });
    });

    it('returns room object if successful', async () => {
      roomModel.create = jest.fn().mockResolvedValueOnce({
        toObject: () => (
          {
            _id: '1234',
            uuid: mockedUUID,
            userCount: 0,
            name: 'Black Peral',
          }
        ),
      });
      const service = new RoomService(roomModel);
      const createdRoom = await service.CreateRoom('Black Peral');
      expect(createdRoom).toEqual({
        _id: '1234',
        uuid: mockedUUID,
        userCount: 0,
        name: 'Black Peral',
      });
      expect(roomModel.create).toHaveBeenCalledWith({
        uuid: mockedUUID,
        userCount: 0,
        name: 'Black Peral',
      });
    });
  });

  describe('CheckForRoom method', () => {
    it('returns false if room found', async () => {
      roomModel.findOne = jest.fn().mockResolvedValueOnce(false);
      const service = new RoomService(roomModel);
      const roomCheck = await service.CheckForRoom('99534');
      expect(roomCheck).toEqual(false);
      expect(roomModel.findOne).toHaveBeenCalledWith({
        uuid: '99534',
      });
    });

    it('returns true if no room found', async () => {
      roomModel.findOne = jest.fn().mockResolvedValueOnce(true);
      const service = new RoomService(roomModel);
      const roomCheck = await service.CheckForRoom('3e35');
      expect(roomCheck).toEqual(true);
      expect(roomModel.findOne).toHaveBeenCalledWith({
        uuid: '3e35',
      });
    });
  });

  describe('UpdateRoomUsers method', () => {
    it('increments count when true passed', async () => {
      roomModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);
      const service = new RoomService(roomModel);
      await service.UpdateRoomUsers(
        '12-53434',
        true,
      );
      expect(roomModel.findOneAndUpdate).toHaveBeenCalledWith(
        { uuid: '12-53434' },
        { $inc: { userCount: 1 } },
        {
          useFindAndModify: false,
          new: true,
        },
      );
    });

    it('decreases count when false passed', async () => {
      roomModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);
      const service = new RoomService(roomModel);
      await service.UpdateRoomUsers(
        '12-53434',
        false,
      );
      expect(roomModel.findOneAndUpdate).toHaveBeenCalledWith(
        { uuid: '12-53434' },
        { $inc: { userCount: -1 } },
        {
          useFindAndModify: false,
          new: true,
        },
      );
    });

    it('calls the remove method if the count is updated to zero', async () => {
      roomModel.deleteOne = jest.fn().mockResolvedValueOnce(true);
      roomModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
        _id: '2',
        uuid: mockedUUID,
        userCount: 0,
        createdAt: 'Thu Jul 09 2020 20:26:30',
        name: 'Black Peral',
      });
      const service = new RoomService(roomModel);
      service.RemoveRoom = jest.fn();
      await service.UpdateRoomUsers(
        '12-53434',
        false,
      );
      expect(service.RemoveRoom).toHaveBeenCalledTimes(1);
    });

    it('returns the new room details object', async () => {
      roomModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
        _id: '2',
        uuid: mockedUUID,
        userCount: 5,
        createdAt: 'Thu Jul 09 2020 20:26:30',
        name: 'Big S3crets',
      });
      const service = new RoomService(roomModel);
      const updatedRoom = await service.UpdateRoomUsers(
        '12-53434',
        true,
      );
      expect(updatedRoom).toEqual(
        [
          {
            name: 'ID',
            value: mockedUUID,
          },
          {
            name: 'Room Name',
            value: 'Big S3crets',
          },
          {
            name: 'Created at',
            value: 'Thu Jul 09 2020 20:26:30',
          },
          {
            name: 'Active Users',
            value: 5,
          },
        ],
      );
      expect(roomModel.findOneAndUpdate).toHaveBeenCalledWith(
        { uuid: '12-53434' },
        { $inc: { userCount: 1 } },
        {
          useFindAndModify: false,
          new: true,
        },
      );
    });
  });

  describe('RemoveRoom method', () => {
    it('returns true after removal', async () => {
      roomModel.deleteOne = jest.fn().mockResolvedValueOnce(true);
      const service = new RoomService(roomModel);
      const roomCheck = await service.RemoveRoom('99534');
      expect(roomCheck).toEqual(true);
      expect(roomModel.deleteOne).toHaveBeenCalledWith({
        uuid: '99534',
      });
    });
  });
});
