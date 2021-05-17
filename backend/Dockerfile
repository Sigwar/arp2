FROM node:14.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get install -y bash
RUN wget -O wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY . .

CMD [ "sh", "-c", "/app/wait-for-it.sh -h $MYSQL_HOST -p $MYSQL_PORT -- node app.js" ]
