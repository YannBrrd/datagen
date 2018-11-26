FROM node:latest

# Create a working directory 
RUN mkdir -p /datagen
 
# Switch to working directory
WORKDIR /datagen

COPY package*.json ./

RUN npm install

COPY . .

CMD node datagen.js