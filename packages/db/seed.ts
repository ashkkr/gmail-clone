import { PrismaClient } from '@prisma/client';
import prisma from '.';

async function main() {
  const prisma = new PrismaClient();

  await prisma.user.upsert({
    where: {
      email: 'ramkumar@gmail.com',
    },
    update: {},
    create: {
      email: 'ramkumar@gmail.com',
      username: 'ramkumar',
      password: '12345',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
