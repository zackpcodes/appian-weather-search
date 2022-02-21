FROM node:lts
WORKDIR /appianWeather
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]