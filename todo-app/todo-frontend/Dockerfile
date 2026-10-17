FROM node:24 AS test-stage

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm test

FROM test-stage AS build-stage

ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
