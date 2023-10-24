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

  /**
   * Service for creating a new company associated with a user.
   *
   * @param body - The company data to create, including company name, number of users, and number of products.
   * @param userId - The ID of the user who owns the company.
   * @returns The newly created company.
   * @throws BadRequestException if the user does not exist or if the data is invalid.
   */
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

  /**
   * Service for retrieving a list of companies associated with a user, with optional pagination.
   *
   * @param userId - The ID of the user.
   * @param page - The page number for pagination (default: 1).
   * @param limit - The maximum number of companies per page (default: 20).
   * @returns An object containing the list of companies, page information, count, and total count.
   * @throws BadRequestException if the user does not exist.
   */
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

  /**
   * Service for uploading an image for a company associated with a user.
   *
   * @param userId - The ID of the user who owns the company.
   * @param image - The URL or path to the uploaded image.
   * @returns The company with the updated image URL.
   * @throws BadRequestException if the user or company does not exist.
   */
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
