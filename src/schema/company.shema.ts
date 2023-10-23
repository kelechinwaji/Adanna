import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.scheman';

@Schema()
export class Company {
  @Prop()
  companyName: string;

  @Prop()
  numberOfUser: string;

  @Prop()
  numberOfProduct: string;

  @Prop()
  percentage: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  brand: User;
}

export type ComoanyDocument = HydratedDocument<Company>;

export const CompanySchema = SchemaFactory.createForClass(Company);
