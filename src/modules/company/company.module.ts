import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/schema/company.shema';
import { User, UserSchema } from 'src/schema/user.scheman';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, ConfigService],
})
export class CompanyModule {}
