import mongoose from 'mongoose';
import { IRoom } from '../types/room';

const Room = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    uuid: {
      type: String,
      required: true,
    },

    userCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRoom & mongoose.Document>('Room', Room);
