# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /home/jarett/cats-node-mariadb-main/
COPY server/package*.json ./
# RUN npm ci --only=production
COPY . .
EXPOSE 8080
#ENV variables. These are placeholder values for this GitHub page.
ENV DB_HOST=127.0.0.1
ENV DB_PASSWORD=db_password
ENV DB_USER=db_user
ENV DB_NAME=db_name

# RUN npm install
CMD [ "node", "./server/server.js" ]

