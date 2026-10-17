FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["./node_modules/.bin/nodemon", "--legacy-watch", "./bin/www"]
