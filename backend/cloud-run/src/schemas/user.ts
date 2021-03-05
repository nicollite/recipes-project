import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IUser } from "shared";

export type UserDocument = User & IUser & Document;

@Schema()
export class User implements Partial<IUser> {
  @Prop()
  uid: string;

  @Prop()
  email: string;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
