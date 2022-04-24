FROM node:17-alpine3.14
WORKDIR /usr/src/app/rails-react-app

COPY ./rails-react-app/package*.json /usr/src/app/rails-react-app/
RUN npm i --legacy-peer-deps
RUN npm i -g npm-check-updates

EXPOSE 3000
