FROM node:20.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon ts-node prisma

COPY . .

RUN npx prisma generate

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["nodemon", "--config", "nodemon.json"]
