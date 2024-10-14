FROM node:20

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm run dev is the command to start the application in development mode
# "-- --host" parameters in the CMD are needed to expose the development server to be visible outside the Docker network.
CMD ["npm", "run", "dev", "--", "--host"]


# to build use (the flag -f will be used to tell which file to use, it would otherwise default to Dockerfile):
# docker build -f ./dev.Dockerfile -t hello-front-dev .

# to run use:
# docker run -p 5173:5173 hello-front-dev npm run dev -- --host
# OR (you need to install the library rollup that has its own version for all operating systems. npm install will handle that):
# docker run -it -v "$(pwd):/usr/src/app/" front-dev bash
# root@ebd20bcdc290:/usr/src/app# npm install
# root@ebd20bcdc290:/usr/src/app# exit
# docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" hello-front-dev


# To install new dependencies e.g. axios inside the contaier use (the container sould be already running)
# docker exec hello-front-dev npm install axios
# Or add axios to the package.json and run docker build again.