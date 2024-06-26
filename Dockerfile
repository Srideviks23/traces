# Use an official Node.js runtime as the base image
FROM node:20

RUN npm install -g nodemon

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 5555

# Command to run your application
CMD ["npm", "start"]
