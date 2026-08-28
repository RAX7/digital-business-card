#!/bin/sh

echo "Generate Prisma client"
npm run prisma:generate

echo "Apply DB migrations"
npm run prisma:deploy

DATABASE_SEEDED_FILE="./.database_seeded"

if [ ! -f "$DATABASE_SEEDED_FILE" ]; then
  echo "Seeding DB"
  npm run prisma:seed
  touch "$DATABASE_SEEDED_FILE"
fi

if [ "$1" = "prod" ]; then
  echo "Start Nest app (prod)"
  npm run start:prod
else
  echo "Start Nest app (dev)"
  npm run start:dev
fi
