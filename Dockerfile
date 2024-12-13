FROM node:22-alpine AS nodejs

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json  ./
COPY app.js  ./


RUN npm install

EXPOSE 3000

CMD ["npm", "start"]