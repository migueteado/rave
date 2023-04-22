import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalUserAuthGuard } from './guards/local-user-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalUserAuthGuard)
  @Post('/user/signin')
  async signIn(@Request() req) {
    return this.authService.userSignIn(req.user);
  }
}
