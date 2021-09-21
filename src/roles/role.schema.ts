import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop([String])
  permissions: [];

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
