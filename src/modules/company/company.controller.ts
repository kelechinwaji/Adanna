import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'src/decorators/type.decorators';
import { TYPES } from 'src/enum/type.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { TypeGuard } from 'src/guards/type.guard';
import { CompanyService } from './company.service';
import { CompanyDTO } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Types(TYPES.TYPEONE)
  @UseGuards(JwtGuard, TypeGuard)
  @Post('')
  async createCompany(@Body() body: CompanyDTO, @Req() request: Request) {
    const userId = request['user']['id'];
    console.log(userId, 'idd');

    const data = await this.companyService.createCompany(body, userId);
    return { message: 'Company created successfully', data: data };
  }
}
