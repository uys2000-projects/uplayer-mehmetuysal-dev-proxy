FROM node

WORKDIR /express-docker

COPY . .

RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 3000