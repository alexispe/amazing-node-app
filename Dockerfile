FROM node:22-alpine AS nodejs

WORKDIR /app

COPY app.js .

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "app.js"]