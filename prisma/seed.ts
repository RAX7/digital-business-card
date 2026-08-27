import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Fill database with initial data...');

  // await prisma.profile.deleteMany();

  for (let i = 1; i <= 10; i++) {
    await prisma.profile.create({
      data: {
        email: `profile-${i}@example.com`,
        firstName: `firstName-${i}`,
        lastName: `lastName-${i}`,
      },
    });
  }

  console.log(`The database has been successfully filled!`);
}

main()
  .catch((err) => {
    console.error('Error filling the database:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
