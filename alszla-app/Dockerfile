# FROM node:14-alpine3.16
FROM node:12-alpine3.14
ENV APP_HOSTNAME 0.0.0.0
ENV APP_PORT 9090
ENV DB_HOST 0.0.0.0
ENV DB_PORT 3306
ENV DB_SCHEMA ""
ENV DB_USER ""
ENV DB_PASSWORD ""
WORKDIR /usr/src/alszla-app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 9090
CMD [ "node", "server.js" ]
