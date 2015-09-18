# not-impressed-docker
a docker container webservice that runs [not-impressed](https://github.com/scottleedavis/not-impressed) against git repositories


###Requirements
* [Docker Toolbox](https://www.docker.com/toolbox)

Starting
-------------
First determine the ip address of your docker vm

> docker-machine ls

Replace the host variable in `docker-compose.yaml` with that IP

```
    host: <YOUR IP ADDRESS HERE>
```

Start the conatiners

> docker-compose up

Stopping
-------------
> docker-compose stop


Usage
-------------

After your docker image is running, your can run requests against the server with the following.
```
curl http://<YOUR IP ADDRESS HERE>:9999/db?url=<YOUR GIT REPO HERE>
```

So for example, to run against the not-impressed github repo.
```
http://192.168.99.100:9999/db?url=git@github.com:scottleedavis/not-impressed.git
```
*The repo queried against MUST have a .ni.json configuration file in it's root in order to run the build/scans.*

Notes
-------------
> This container is designed to be for evaluation only, and not to be put on the public internet.
