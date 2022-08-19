FROM node:latest

# 디렉토리 설정
WORKDIR /home/runner/work/client/client/app
RUN echo "first is : $PWD"

ADD . /home/runner/work/client/client/app
RUN echo $(ls -1 /home/runner/work/client/client/app)

COPY package.json ./
COPY yarn.lock ./
COPY . .
# ADD .env .


RUN echo "second is : $PWD"
RUN echo $(ls -1 /home/runner/work/client/client/app)

RUN yarn

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]