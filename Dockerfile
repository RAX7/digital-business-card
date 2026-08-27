FROM node:24-slim

RUN apt-get update && \
  apt-get install -y procps && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
RUN npx prisma generate
# RUN npx prisma migrate deploy
RUN npx prisma migrate dev
EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]