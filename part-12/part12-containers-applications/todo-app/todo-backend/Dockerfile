FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=todo-backend:*

USER node

CMD npm start

# to build an image from this Dockerfile use:
# docker build -t todo-backend-server .

# to run the image use (The -p flag in the run command will inform Docker that a port from the host machine should be opened and directed to a port in the container. The format is -p host-port:application-port.):
# docker run -p 3000:3000 todo-backend-server

# You can use "docker compose up" to build and run the application instead of "docker build -t todo-backend-server . && docker run -p 3000:3000 todo-backend-server".