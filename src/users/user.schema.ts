import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role, RoleDocument } from '../roles';
import { BaseSchema } from '../common';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseSchema {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop(String)
  email: string;

  @Prop(String)
  password: string;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: RoleDocument;
}

export const UserSchema = SchemaFactory.createForClass(User);
