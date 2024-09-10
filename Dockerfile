FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn

CMD [ "yarn", "start" ]

EXPOSE 3000