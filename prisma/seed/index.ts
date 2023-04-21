import { PrismaClient } from '@prisma/client';
import { seedCountries } from './data';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();

  await seedCountries(prisma);

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
