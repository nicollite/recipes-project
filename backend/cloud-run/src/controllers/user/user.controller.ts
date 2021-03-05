import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { IUser } from "shared";
import { User, UserDocument } from "src/schemas/user";

export interface GetUserParam {
  id: string;
}

@Controller("user")
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get("/:id")
  async getUser(@Param() params: GetUserParam) {
    // Destructure the query string, set the lastId to a initial object
    const { id } = params;

    return this.userModel
      .find({ _id: id })
      .exec()
      .then(docs => docs.shift());
  }

  @Post()
  async createUser(@Body() body: IUser) {
    return new this.userModel(body).save().then(doc => doc.toJSON());
  }

  @Put()
  async updateUser(@Body() body: IUser) {
    return this.userModel.updateOne(
      { $or: [{ _id: new Types.ObjectId(body._id) }, { uid: body.uid }, { email: body.email }] },
      { $set: { ...body } }
    );
  }
}
