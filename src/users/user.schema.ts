import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop(String)
  email: string;

  @Prop(String)
  password: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
