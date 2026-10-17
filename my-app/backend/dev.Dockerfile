FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm install -g nodemon

COPY . .

EXPOSE 3003

CMD ["nodemon", "--legacy-watch", "index.js"]
