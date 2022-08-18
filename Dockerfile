FROM node:latest

# 디렉토리 설정
WORKDIR /usr/src/app
ADD . /usr/src/app/

COPY package.json ./
COPY yarn.lock ./
COPY .env .

RUN yarn

COPY . .

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]