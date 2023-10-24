import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors,
  Patch,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'src/decorators/type.decorators';
import { TYPES } from 'src/enum/type.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { TypeGuard } from 'src/guards/type.guard';
import { CompanyService } from './company.service';
import { CompanyDTO } from './dto/company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/service/cloudinary';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  @Types(TYPES.TYPEONE)
  @UseGuards(JwtGuard, TypeGuard)
  @Post('')
  async createCompany(@Body() body: CompanyDTO, @Req() request: Request) {
    const userId = request['user']['id'];
    console.log(userId, 'idd');

    const data = await this.companyService.createCompany(body, userId);
    return { message: 'Company created successfully', data: data };
  }

  @Types(TYPES.TYPETWO)
  @UseGuards(JwtGuard, TypeGuard)
  @Get('')
  async getCompany(
    @Req() request: Request,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined,
  ) {
    const userId = request['user']['id'];

    const data = await this.companyService.getCompany(userId, page, limit);
    return { message: 'Companies fetched successfully', data: data };
  }

  @Types(TYPES.TYPETWO)
  @UseGuards(JwtGuard, TypeGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('/image/:userId')
  async uploadImage(
    @UploadedFile() image,
    @Param('userId') id: string,
    @Req() request: Request,
  ) {
    const uploadedImage = await this.imageUploadService.uploadImage(image);

    const userId = request['user']['id'];

    if (uploadedImage && uploadedImage.secure_url) {
      const data = await this.companyService.uploadImage(
        id,
        uploadedImage.secure_url,
      );
      console.log(uploadedImage.secure_url, 'kalasdasd');
      return {
        message: 'Image uploaded successfully',
        data: data,
      };
    }
  }
}
