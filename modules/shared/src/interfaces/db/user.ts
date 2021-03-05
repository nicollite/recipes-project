import { ObjectId } from "bson";

export interface IUser {
  _id?: string | ObjectId;
  uid: string;
  email: string;
  username: string;
}

export interface UserRef {
  username: string;
  uid: string;
}
