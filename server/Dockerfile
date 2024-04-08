FROM node:latest
WORKDIR /server
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g nodemon
EXPOSE 3000
CMD ["nodemon", "index.ts"]