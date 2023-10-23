import { User } from 'src/schema/user.scheman';
import { UserDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(User.name) private User: Model<User>,
  ) {}

  async signUp(body: UserDTO) {
    const exUser = await this.getUserByEmail(body.email);
    if (exUser)
      throw new BadRequestException(
        `User with email ${body.email} already exists`,
      );
  }

  async getUserByEmail(email: string) {
    return await this.User.findOne({ email });
  }
}
