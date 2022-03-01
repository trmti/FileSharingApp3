FROM node:17-alpine3.14
WORKDIR /usr/src/app

COPY rails-react-app/package.json /usr/src/app/package.json
COPY rails-react-app/package-lock.json /usr/src/app/package-lock.json
RUN npm install

COPY ./rails-react-app /usr/src/app/
