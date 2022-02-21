FROM node:lts
RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
EXPOSE 3001
WORKDIR /usr/src/app
RUN npm install
CMD ["node", "Server.js"]