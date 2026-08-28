FROM node:24-slim

RUN apt-get update && \
  apt-get install -y procps && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY ./scripts ./scripts

EXPOSE 3000

ENTRYPOINT ["sh", "./scripts/startup.sh"]
CMD ["dev"]