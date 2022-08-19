FROM node:latest

# 디렉토리 설정
# WORKDIR .

COPY package.json .
COPY yarn.lock .
COPY . .

RUN yarn

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]