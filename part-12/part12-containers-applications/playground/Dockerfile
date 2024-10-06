# Dockerfile is a simple text file that contains all of the instructions for creating an image.
FROM node:20
# If the directory /usr/src/app doesn't exist in the base image, it will be automatically created.
# If you do not specify a WORKDIR, you risk overwriting important files by accident.
WORKDIR /usr/src/app
# Copy express application directories and files from your local machine to the image.
# The official node Docker image, as well as its variants like alpine, include a least-privileged user of the same name: node.
# If you don't use "--chown=node:node", the process of copying files will be owned by the user root.
COPY --chown=node:node . .

# The npm install can be risky. Instead of using npm install, npm offers a much better tool for installing dependencies, the ci command.
# Differences between ci and install:
# - install may update the package-lock.json.
# - install may install a different version of a dependency if you have ^ or ~ in the version of the dependency.
# - ci will delete the node_modules folder before installing anything.
# - ci will follow the package-lock.json and does not alter any files.
# So in short: ci creates reliable builds, while install is the one to use when you want to install new dependencies.
# Even better, you can use npm ci --omit=dev to not waste time installing development dependencies.
RUN npm ci

ENV DEBUG=playground:*

# Ensure that the process is owned by the user node (a user with lower privileges than root).
USER node

CMD npm start

# to build an image from this Dockerfile use:
# docker build -t express-server .

# to run the image use (The -p flag in the run command will inform Docker that a port from the host machine should be opened and directed to a port in the container. The format is -p host-port:application-port.):
# docker run -p 3123:3000 express-server

# You can use "docker compose up" to build and run the application instead of "docker build -t express-server . && docker run -p 3123:3000 express-server".


