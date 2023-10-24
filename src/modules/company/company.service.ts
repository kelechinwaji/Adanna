import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/schema/company.shema';
import { CompanyDTO } from './dto/company.dto';
import { User } from 'src/schema/user.scheman';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private Company: Model<Company>,
    @InjectModel(User.name) private User: Model<User>,
  ) {}

  async createCompany(body: CompanyDTO, userId: string) {
    const user = await this.User.findOne({ _id: userId });
    if (!user) throw new BadRequestException('User not found');

    const percentage = (body.numberOfUser / body.numberOfProduct) * 100;

    const company = new this.Company({
      companyName: body.companyName,
      numberOfUser: body.numberOfUser,
      numberOfProduct: body.numberOfProduct,
      percentage: percentage,
      user: user,
    });

    await company.save();

    return company;
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  async getCompany(userId: string, page: number = 1, limit: number = 20) {
    const user = await this.User.findOne({ _id: userId });
    if (!user) throw new BadRequestException('User not found');

    const query = {};

    const reports = await this.Company.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('user');

    const total = await this.Company.countDocuments(query);

    return {
      reports,
      page,
      count: reports.length,
      total,
    };
  }

  async uploadImage(userId: string, image: string) {
    const user = await this.User.findOne({ _id: userId });
    if (!user) throw new BadRequestException('User not found');
    console.log(user, image, 'ise');
    const company = await this.Company.findOneAndUpdate(
      { user: userId },
      { image: image },
      { new: true },
    );

    if (!company) {
      throw new BadRequestException('Company not found for the user');
    }

    return company;
  }
}
