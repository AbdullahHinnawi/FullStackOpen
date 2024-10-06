# Docker

[Docs](https://docs.docker.com/get-started/)

## Commands

Create a container from an image or run image within a container

```sh
docker container run <IMAGE_NAME>
```

Pull hello world image

```sh
docker image pull hello-world
```

Help

```sh
docker container run --help
```

List all the containers (the -a or --all will list the containers that have already been exited)

```sh
docker container ls -a
```

OR the shorter form ("docker container ls" is equal to "docker ps")

```sh
docker ps -a
```

List running containers

```sh
docker container ls
```

Start a container

```sh
docker start <CONTAINER_ID_OR_CONTAINER_NAME>
```

Start a container in interactive mode ("-i" is equal to "--interactive")

```sh
docker start -i <CONTAINER_ID_OR_CONTAINER_NAME>
```

Kill a container

```sh
docker kill <CONTAINER_ID_OR_CONTAINER_NAME>
```

Create a new image from a container

```sh
docker commit  <CONTAINER_ID_OR_CONTAINER_NAME> <NEW_IMAGE_NAME>
```

List images

```sh
docker image ls
```

As images are just files, they can be moved around, downloaded and deleted. To see the available image commands use

```sh
docker image --help
```

Run an image

```sh
docker run -it <IMAGE_NAME> bash
```

OR

```sh
docker run -it <IMAGE_NAME>
```

Remove a container

```sh
docker container rm <CONTAINER_ID_OR_CONTAINER_NAME>
```

Using the image https://hub.docker.com/_/node, which has Node already installed. The container run accepts --name flag that you can use to give a name for the container.

```sh
docker container run -it --name <CHOOSE_CONTAINER_NAME> node:20 bash
```

Copy a file to a container

```sh
docker container cp <FILE_PATH> <CONTAINER_NAME>:<DIRECTORY_PATH>/file_name.js
```

Build an image using a Dockerfile (-t used to name the image). the Period "." referes to the Dockerfile being in the current directory.

```sh
docker build -t <IMAGE_NAME> .
```

After the build is finished, you can run it using:

```sh
docker run <IMAGE_NAME>
```

List the directories & files of the node:20 image.

```sh
docker run node:20 ls
```

Dockerfile best practices:

- Try to create as secure of an image as possible
- Try to create as small of an image as possible.

Snyk has a great list of the 10 best practices for Node/Express containerization. Read those [here](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/).

To build and run an application. You can also run the application in the background with docker compose up -d (-d for detached).

```sh
docker compose up
```

If you have multiple compose files, you can use -f flag to specify a file to run the Docker Compose command with. To run the file docker-compose.dev.yml use:

```sh
docker compose -f docker-compose.dev.yml up
```

To close an application

```sh
docker compose down
```

If you want to rebuild an image use

```sh
docker compose up --build
```

List the volumes

```sh
docker volume ls
```

Inspect a volume

```sh
docker volume inspect <VOLUME_NAME>
```

To get inside a container use docker exec. More info [here](https://fullstackopen.com/en/part12/building_and_configuring_environments#debugging-issues-in-containers)

```sh
docker exec -it <CONTAINER_NAME> bash
```
