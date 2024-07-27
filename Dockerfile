FROM node:20.11.1-slim

WORKDIR /app

COPY package.json ./

RUN apt-get update && \
    apt-get -y install openssl xdg-utils

RUN yarn install --frozen-lockfile

COPY . .
