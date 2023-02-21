FROM --platform=linux/amd64 node:16.14

WORKDIR /app

COPY . .

RUN yarn

CMD yarn migrate && yarn start