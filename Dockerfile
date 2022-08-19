FROM node:latest

# 디렉토리 설정
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY .env /app
COPY . .

RUN yarn

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]