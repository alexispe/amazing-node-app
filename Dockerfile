FROM node:22-alpine AS nodejs

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json  ./
COPY app.js  ./


RUN npm install

EXPOSE 3001

CMD ["npm", "start"]