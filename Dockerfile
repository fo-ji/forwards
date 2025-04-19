FROM node:20.17.0-slim

WORKDIR /app

COPY package.json ./

RUN apt-get update && \
    apt-get -y install --no-install-recommends openssl=3.0.14-1~deb12u2 xdg-utils=1.1.3-4.1 && \
    rm -rf /var/lib/apt/lists/*

RUN yarn install --frozen-lockfile && \
    yarn cache clean

COPY . .