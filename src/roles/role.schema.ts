import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../common';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends BaseSchema {
  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop([String])
  permissions: [];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
