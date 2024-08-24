FROM node:21.7.3

WORKDIR /app

COPY package.json ./

RUN npm i 
COPY . .
RUN npm run build 

CMD [ "npm", "run start:dev" ]