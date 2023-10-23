import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userData: any) {
    try {
      const userRecord = await this.authService.registerUser(userData);

      return userRecord;
    } catch (error) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  //   @Post('login')
  //   async loginUser(@Body() userData: any) {
  //     try {
  //       // Log in the user using Firebase Admin SDK
  //       const uid = await this.authService.loginUser(userData);

  //       // Return the user's UID upon successful login
  //       return uid;
  //     } catch (error) {
  //       throw new Error(`User login failed: ${error.message}`);
  //     }
  //   }
}
