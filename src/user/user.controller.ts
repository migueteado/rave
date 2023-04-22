import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User, UserPermission } from '@prisma/client';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @Permissions(UserPermission.USER_READ)
  async findMany(
    @Query() query,
  ): Promise<{ count: number; results: Omit<User, 'password'>[] }> {
    const { cursor, where, orderBy } = query;
    const skip = query.skip ? Number(query.skip) : undefined;
    const take = query.take ? Number(query.take) : undefined;
    const count = await this.userService.count({
      where,
    });
    const results = await this.userService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return {
      count: count,
      results: results.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      }),
    };
  }

  @Get('/self')
  @Permissions(UserPermission.USER_SELF_READ)
  async findSelf(@Request() req) {
    const user = await this.userService.findOne({
      id: req.user.id,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  @Get('/:id')
  @Permissions(UserPermission.USER_READ)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({
      id: id,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  @Post()
  @Permissions(UserPermission.USER_CREATE)
  async createOne(@Body() data: CreateUserDto) {
    const { password, passwordConfirmation, ...rest } = data;

    if (password !== passwordConfirmation) {
      throw new HttpException("Passwords don't match", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const user = {
      ...rest,
      password: hashedPassword,
    };
    const createdUser = await this.userService.create(user);

    return createdUser;
  }

  @Put('/:id')
  @Permissions(UserPermission.USER_UPDATE)
  async updateOne(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const { password, passwordConfirmation, ...rest } = data;

    const user = { ...rest };

    if (password) {
      if (password !== passwordConfirmation) {
        throw new HttpException(
          "Passwords don't match",
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await this.authService.hashPassword(password);

      user['password'] = hashedPassword;
    }

    const updatedUser = await this.userService.update({
      where: {
        id: id,
      },
      data: user,
    });

    return updatedUser;
  }
}
