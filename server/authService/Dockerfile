FROM node:18-alpine
WORKDIR /authService
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g nodemon
EXPOSE 3000
CMD ["nodemon", "index.ts"]