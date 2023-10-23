import { User } from 'src/schema/user.scheman';
import { UserDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword, comparePassword } from 'src/helper/password';
import { TYPES } from 'src/enum/type.enum';

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

    // Hash password
    const hashedPassword = await hashPassword(body.password);

    // Create user
    const newUser = new this.User({
      email: body.email,
      password: hashedPassword,
      type: TYPES.TYPEONE,
    });
    await newUser.save();

    // Get jwt token
    const token = this.generateAuthToken(newUser);

    const user = newUser.toObject();
    delete user.password;

    return { user, token };
  }

  async getUserByEmail(email: string) {
    return await this.User.findOne({ email });
  }

  /**
   * Generates an authentication token for the given user
   *
   * @param user The user for whom the token is generated
   * @returns The authentication token
   */
  private generateAuthToken(user: User): string {
    const payload = {
      id: user['_id'],
      email: user.email,
      type: user.type,
    };

    const token = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return token;
  }
}
