FROM node:latest

# 디렉토리 설정
WORKDIR /home/runner/work/client/client/app
ADD . /home/runner/work/client/client/app

COPY package.json ./
COPY yarn.lock ./
COPY . .

RUN yarn

RUN yarn build
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["yarn", "start"]