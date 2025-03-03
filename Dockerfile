# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR . usr/app

# Copy the package.json and package-lock.json files to the container
COPY ./package.json ./
COPY ./package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the source code to the container
COPY . .

RUN npm run lint
RUN npm run test
RUN npm run build

# Start the server when the container starts
CMD ["npm", "run", "start"]
