import { HttpError } from "@http-error";
import { logger } from "@logger";
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { IUser } from "shared";
import { AuthGuard } from "src/guards/auth.guard";
import { User, UserDocument } from "src/schemas/user";

export interface GetUserParam {
  id: string;
}
export interface GetUserQuery {
  uid: string;
  email: string;
}

@Controller("user")
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get(["", "/:id"])
  async getUser(@Param() params: GetUserParam, @Query() query: GetUserQuery) {
    const { id } = params;
    const { uid, email } = query;

    logger.info("", { id, uid, email });

    const [user] = await this.userModel
      .find({
        $or: [{ _id: new Types.ObjectId(id) }, { uid }, { email }],
      })
      .exec();

    if (!user) throw new HttpError(404, "User not found");

    logger.info("user", { user });

    return user;
  }

  @Post()
  async createUser(@Body() body: IUser) {
    return new this.userModel(body).save().then(doc => doc.toJSON());
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@Body() body: IUser) {
    return this.userModel.updateOne(
      { $or: [{ _id: new Types.ObjectId(body._id) }, { uid: body.uid }, { email: body.email }] },
      { $set: { ...body } },
    );
  }
}
