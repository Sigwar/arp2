FROM node:14.16.0

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN apt-get install python && apt-get install make && npm install

COPY . .

RUN npm run build

CMD [ "http-server", "dist" ]
