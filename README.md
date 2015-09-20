# not-impressed-docker
a docker container webservice that runs [not-impressed](https://github.com/scottleedavis/not-impressed) against git repositories


###Requirements
* [Docker Toolbox](https://www.docker.com/toolbox)

Docker Image contains
--------------------
* [Ubuntu 14.04 env](http://releases.ubuntu.com/14.04/)
* [nodejs v0.12](https://nodejs.org/en/)
* [apache maven 3](https://maven.apache.org/download.cgi)
* [bundler](http://bundler.io/)
* [rubygems](https://rubygems.org/)
* [license_finder](https://github.com/pivotal/LicenseFinder)


Starting
-------------
First determine the ip address of your docker vm

> docker-machine ls

Replace the host variable in `docker-compose.yaml` with that IP

```
    host: <YOUR IP ADDRESS HERE>
```

Start the container

> docker-compose up

Stopping
-------------
> docker-compose stop


Usage
-------------

After your docker image is running, your can issue GET requests against the following:
```
http://<YOUR IP ADDRESS HERE>:9999/?url=<YOUR GIT REPO HERE>
```

An example of running against the not-impressed github repo.
```
http://192.168.99.100:9999/?url=git@github.com:scottleedavis/not-impressed.git
```
*The repo queried against MUST have a .ni.json configuration file in it's root in order to run the build/scans.*

Here are the [results](results.json) generated when not-impressed runs against this repo (here is the  [.ni.json](.ni.json) file.)

Notes
-------------
> This container is designed to be for evaluation only, and not to be put on the public internet.
