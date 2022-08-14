FROM node:16.15.0-alpine

RUN apk update
RUN apk add vim nano

WORKDIR /home/app/api

COPY package*.json ./

RUN npm install

COPY . ./
