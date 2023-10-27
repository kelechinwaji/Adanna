import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: UserDTO) {
    try {
      const userRecord = await this.authService.signUp(body);

      return userRecord;
    } catch (error) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  @Post('login')
  async loginUser(@Body() body: UserDTO) {
    try {
      const data = await this.authService.login(body);

      return { message: 'Login successfull', data: data };
    } catch (error) {
      throw new Error(`User login failed: ${error.message}`);
    }
  }
}
