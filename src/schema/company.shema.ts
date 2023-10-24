import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.scheman';

@Schema()
export class Company {
  @Prop()
  companyName: string;

  @Prop()
  numberOfUser: number;

  @Prop()
  numberOfProduct: number;

  @Prop()
  percentage: number;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export type ComoanyDocument = HydratedDocument<Company>;

export const CompanySchema = SchemaFactory.createForClass(Company);
