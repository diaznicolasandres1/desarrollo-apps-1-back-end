import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: 'active' })
  status: string;

  @Prop({ required: true, default: 'user' })
  rol: string;

  @Prop({ required: false })
  lastRecoveryCode?: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 