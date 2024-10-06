# Dockerfile is a simple text file that contains all of the instructions for creating an image.
FROM node:20
# If the directory /usr/src/app doesn't exist in the base image, it will be automatically created.
# If you do not specify a WORKDIR, you risk overwriting important files by accident.
WORKDIR /usr/src/app
# Copy the index.js file from your local machine to the image.
COPY ./index.js ./index.js

CMD node index.js
