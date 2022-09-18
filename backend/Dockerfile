FROM node:16-alpine3.13

WORKDIR /backend

COPY package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 4000

CMD ["npm", "run", "dev"]