interface IRoom {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  uuid: string;
  userCount: number;
}

interface IModelArray {
  name: string;
  model: IRoom & mongoose.Document;
}

type ClientRoomInterface = [
  {
    name: 'ID',
    value: string,
  },
  {
    name: 'Room Name',
    value: string | 'N/A',
  },
  {
    name: 'Created at',
    value: string,
  },
  {
    name: 'Active Users';
    value: number
  }
]
