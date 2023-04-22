import { Prisma, PrismaClient, UserPermission } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UserCreateManyInput[] = [
  {
    email: 'seed@rave.is',
    name: 'Rave Seed Account',
    password: 'seedpassword',
  },
];

export const seedUsers = async (prisma: PrismaClient) => {
  const salt = bcrypt.genSaltSync(10);
  const usersToSeed = await Promise.all(
    users.map(async (acc) => {
      const { password, ...rest } = acc;
      const hash = await bcrypt.hash(password, salt);

      return {
        ...rest,
        password: hash,
      };
    }),
  );

  const seededUsers = await prisma.user.createMany({
    data: usersToSeed,
    skipDuplicates: true,
  });

  console.log(`Users Added: ${seededUsers.count}`);

  return;
};

const permissions = [...Object.values(UserPermission)];

export const getPermissions = (
  userIds: string[],
): Prisma.UserPermissionOnUserCreateManyInput[] => {
  const userPermissions: Prisma.UserPermissionOnUserCreateManyInput[] = [];

  for (const userId of userIds) {
    for (const permission of permissions) {
      userPermissions.push({
        userId,
        permission,
      });
    }
  }

  return userPermissions;
};

export const seedUserPermissions = async (prisma: PrismaClient) => {
  const userIds = (
    await prisma.user.findMany({
      select: {
        id: true,
      },
      where: {
        email: {
          in: users.map((user) => user.email),
        },
      },
    })
  ).map((user) => user.id);
  const userPermissions = getPermissions(userIds);
  const seededUserPermissions = await prisma.userPermissionOnUser.createMany({
    data: userPermissions,
    skipDuplicates: true,
  });

  console.log(`User Permissions Added: ${seededUserPermissions.count}`);

  return;
};
