FROM node:alpine3.24

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY ./scripts ./scripts

EXPOSE 3000

ENTRYPOINT ["sh", "./scripts/startup.sh"]
CMD ["dev"]