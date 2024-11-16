import { PrismaClient } from "@prisma/client";
import prisma from ".";

async function main() {
  const prisma = new PrismaClient();

  // seeding 10 users
  for (let count = 1; count <= 10; count++) {
    const email = `user${count}@example.com`;
    await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        username: `user${count}`,
        password: `pass${count}`,
      },
    });
  }

  // seeding emails for each user
  const users = await prisma.user.findMany();

  for (const user of users) {
    const emailCount = Math.floor(Math.random() * 7) + 7;
    for (let i = 1; i <= emailCount; i++) {
      let fromUserId = Math.floor(Math.random() * users.length) + 1;
      fromUserId =
        fromUserId == user.id
          ? ((fromUserId + 1) % users.length) + 1
          : fromUserId;

      await prisma.email.create({
        data: {
          subject: `Test Email ${i}`,
          body: `This is a test email content for email number ${i}`,
          fromUserId: fromUserId,
          toUserId: user.id,
        },
      });
    }
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
