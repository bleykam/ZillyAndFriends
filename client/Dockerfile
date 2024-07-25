# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8.0


FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN addgroup app && adduser -S -G app app

USER root

RUN npm i

COPY  . .

# # Expose the port that the application listens on.
EXPOSE 5173
CMD npm start
