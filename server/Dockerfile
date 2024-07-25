




FROM node:lts-alpine as build-stage

# Use production node environment by default.


# Load environment variables from .env file
ARG ENV_FILE
ENV ENV_FILE=${ENV_FILE}
COPY $ENV_FILE /.env


WORKDIR /usr/app

COPY package*.json ./
RUN addgroup app && adduser -S -G app app
# Copy the rest of the source files into the image.
COPY . .

# Run the application as a root user.


RUN npm install



# Expose the port that the application listens on.
EXPOSE 8888

# Starting our application
# Run the application.
CMD npm start 






