FROM node:latest

# 디렉토리 설정
RUN echo "first is : $PWD"

RUN echo $(ls -al)

COPY package.json ./
COPY yarn.lock ./
COPY . .

RUN echo "second is : $PWD"
RUN echo $(ls -1)

RUN yarn

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]