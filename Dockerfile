FROM node:18-alpine

WORKDIR /app


COPY package*.json yarn.lock ./
COPY prisma ./prisma/



RUN npm install





COPY . /app


EXPOSE 8000

CMD [ "npm", "run", 'start' ]

