import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { CreateSkillInput } from '@/modules/skill/dto/create-skill.input';
import {
  CreateExperienceNestedInput,
  CreateProjectNestedInput,
} from '@/modules/profile/dto/create-profile.input';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

function randomDateRanges(startDate: Date, endDate: Date, count: number) {
  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  const oneDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.floor((endMs - startMs) / oneDay);

  const uniqueDays = new Set<number>();

  while (uniqueDays.size < count * 2) {
    const randomDayOffset = Math.floor(Math.random() * (totalDays + 1));
    uniqueDays.add(randomDayOffset);
  }

  const sortedDays = Array.from(uniqueDays).sort((a, b) => a - b);

  const ranges: Array<{ start: Date; end: Date }> = [];

  for (let i = 0; i < sortedDays.length; i += 2) {
    const startRangeMs = startMs + sortedDays[i] * oneDay;
    const endRangeMs = startMs + sortedDays[i + 1] * oneDay;
    const range = { start: new Date(startRangeMs), end: new Date(endRangeMs) };

    ranges.push(range);
  }

  return ranges;
}

async function main() {
  console.log('Fill database with initial data...');

  const skillDtos: CreateSkillInput[] = [
    {
      name: 'JS',
      description:
        'JavaScript (JS) is a programming language and core technology of the Web, alongside HTML and CSS. ',
    },
    {
      name: 'TS',
      description:
        'TypeScript (TS) is a high-level programming language that adds static typing with optional type annotations to JavaScript.',
    },
    {
      name: 'CSS',
      description:
        'Cascading Style Sheets (CSS) is a style sheet language used for specifying the presentation and styling of a document written in a markup language, such as HTML or XML (including XML dialects such as SVG, MathML, or XHTML)',
    },
    {
      name: 'Git',
      description:
        'Git is a distributed version control software system that is capable of managing versions of source code or data.',
    },
    {
      name: 'Linux',
      description:
        'Linux is a family of free and open-source software Unix-like operating systems based on the Linux kernel, which was first released on 17 September 1991 by Linus Torvalds.',
    },
    {
      name: 'SQL',
      description:
        'Structured Query Language (SQL) is a domain-specific language used to manage data, especially in a relational database management system (RDBMS).',
    },
    {
      name: 'Angular',
      description:
        'Angular (also referred to as Angular 2+) is a TypeScript-based free and open-source single-page web application framework. It is developed by Google and by a community of individuals and corporations.',
    },
    {
      name: 'Vue',
      description:
        'Vue.js (commonly referred to as Vue; pronounced "view") is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
    },
    {
      name: 'React',
      description:
        'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library that aims to make building user interfaces based on components more "seamless".',
    },
  ];

  const skillEntities: Array<CreateSkillInput & { id: number }> = [];

  for (const data of skillDtos) {
    const result = await prisma.skill.create({ data });
    skillEntities.push(result);
  }

  for (let i = 1; i <= 10; i++) {
    const experienceDays = randomDateRanges(
      new Date(2005, 0, 1),
      new Date(),
      5,
    );

    const experiences = Array.from({ length: 5 }, (_, index) => {
      const experience: CreateExperienceNestedInput = {
        company: `SomeCompanyName-${index}`,
        position: `Postion-${index}`,
        firstWorkDay: experienceDays[index].start,
        lastWorkDay: experienceDays[index].end,
      };

      return experience;
    });

    const projects = Array.from({ length: 5 }, (_, index) => {
      const project: CreateProjectNestedInput = {
        name: `SomeProjectName-${index}`,
        description: `SomeProjectDescription-${index}`,
      };

      return project;
    });

    const skills = [...skillEntities]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    await prisma.profile.create({
      data: {
        email: `profile-${i}@example.com`,
        firstName: `FirstName-${i}`,
        lastName: `LastName-${i}`,
        experience: {
          createMany: {
            data: experiences,
          },
        },
        projects: {
          createMany: {
            data: projects,
          },
        },
        skills: {
          connect: skills.map((s) => ({ id: s.id })),
        },
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
