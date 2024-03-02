FROM node:20.11.1-slim

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .
