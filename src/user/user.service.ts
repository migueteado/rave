import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async count(args: Prisma.UserCountArgs) {
    return this.prismaService.user.count(args);
  }

  async findMany(args: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prismaService.user.findMany(args);
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | undefined> {
    return this.prismaService.user.findFirst({
      where: userWhereUniqueInput,
      include: {
        permissions: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
      include: {
        permissions: true,
      },
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
      include: {
        permissions: true,
      },
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.findOne(where);
    if (user.name === 'Root Admin') {
      throw new HttpException(
        'Root Admin cannot be deleted',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.prismaService.user.delete({
      where,
    });
  }
}
