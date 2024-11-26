# audune.com

**This is the repository for the website for Audune Games.**

The site will be built using Gulp, which will bundle the source code using Browserify. After building, the static site can be served using a web server. The provided [Dockerfile](https://github.com/audunegames/audune.com/blob/master/Dockerfile) builds an image that bundles the site and serves it using nginx. 

An image from this Dockerfile will be built and published to the GitHub Container Registry on every push or pull request using a [GitHub action](https://github.com/audunegames/audune.com/blob/master/.github/workflows/docker-publish.yml).

## Installation

You can pull the current version of the image with the following command:

```bash
docker pull ghcr.io/audunegames/audune.com:master
```

Other versions of the package can be found [here](https://github.com/audunegames/audune.com/pkgs/container/audune.com).

## Local development

Install Node.js and npm, then run the following command to open a development web server with live reload at port 8000:

```bash
gulp dev
```