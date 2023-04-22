import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

const userWithPermissions = Prisma.validator<Prisma.UserArgs>()({
  include: {
    permissions: true,
  },
});

export type UserWithPermissions = Prisma.UserGetPayload<
  typeof userWithPermissions
>;

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email },
      include: {
        permissions: true,
      },
    });

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async userSignIn(user: UserWithPermissions) {
    const payload = {
      email: user.email,
      sub: user.id,
      permissions: user.permissions.map((p) => p.permission),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
