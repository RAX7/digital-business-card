import fs from 'fs/promises';
import { join } from 'path';
import YAML from 'yaml';
import { isObject } from 'lodash';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';

import { CreateSkillInput } from '@/modules/skill/dto/create-skill.input';
import { CreateProfileInput } from '@/modules/profile/dto/create-profile.input';

type SeedData = {
  skills: Array<CreateSkillInput>;
  profiles: Array<
    Omit<CreateProfileInput, 'skills'> & { skills?: CreateSkillInput[] }
  >;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Fill database with initial data...');

  const seedData = await loadSeedData();

  const skillEntities: Array<{
    source: CreateSkillInput;
    entity: CreateSkillInput & { id: number };
  }> = [];

  for (const source of seedData.skills) {
    const entity = await prisma.skill.create({ data: source });
    skillEntities.push({ source, entity });
  }

  for (const data of seedData.profiles) {
    await prisma.profile.create({
      data: {
        ...data,
        experience: {
          createMany: {
            data: data.experience ?? [],
          },
        },
        projects: {
          createMany: {
            data: data.projects ?? [],
          },
        },
        skills: {
          connect: (data.skills ?? [])
            .map(
              (skill) =>
                skillEntities.find((e) => e.source === skill)?.entity?.id,
            )
            .filter((id): id is number => Boolean(id))
            .map((id) => ({ id })),
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

class ValidationError extends Error {
  errors: ErrorObject[];

  constructor(errors: ErrorObject[]) {
    super();
    this.errors = errors;
  }
}

async function loadSeedData(): Promise<SeedData> {
  const ajv = new Ajv();
  addFormats(ajv);

  const schemaJson = await fs.readFile(
    join(__dirname, 'json-schema/json-schema.json'),
    { encoding: 'utf8' },
  );

  const schema = JSON.parse(schemaJson) as SomeJSONSchema;
  const skipRequiredFields = new Set(['updatedAt']);

  if (schema.definitions) {
    for (const def of Object.values(schema.definitions)) {
      if (Array.isArray(def.required)) {
        def.required = def.required.filter(
          (f: string) => !skipRequiredFields.has(f),
        );
      }

      if (Array.isArray(def.required) && isObject(def.properties)) {
        const props = new Set(Object.keys(def.properties));
        def.required = def.required.filter((f: string) => props.has(f));
      }
    }
  }

  ajv.addSchema(schema);

  const dataYaml = await fs.readFile(join(__dirname, 'seed.yaml'), {
    encoding: 'utf8',
  });

  const data = YAML.parse(dataYaml) as SeedData;
  const validator = ajv.getSchema(`#/definitions/Profile`)!;

  for (const profile of data.profiles) {
    const isValid = validator(profile);

    if (
      !isValid &&
      Array.isArray(validator.errors) &&
      validator.errors.length > 0
    ) {
      throw new ValidationError(validator.errors);
    }
  }

  return data;
}
