import { PrismaClient } from '@prisma/client';
import {
  seedCountries,
  seedCurrencies,
  seedMeasurementUnits,
  seedUserPermissions,
  seedUsers,
} from './data';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();

  await seedCountries(prisma);
  await seedCurrencies(prisma);
  await seedMeasurementUnits(prisma);
  await seedUsers(prisma);
  await seedUserPermissions(prisma);

  await prisma.$disconnect();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err: unknown) => {
    console.error(err);
    await prisma.$disconnect;
    process.exit(1);
  });
