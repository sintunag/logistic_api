# LOGISTIC RESTful API
## Featuring Docker, Node, Express, MongoDB, Mongoose & NGINX

## About

- [Docker](https://www.docker.com/) as the container service to isolate the environment.
- [Node.js](https://nodejs.org/en/) (Long-Term-Support Version) as the run-time environment to run JavaScript.
- [Express.js](https://expressjs.com/) as the server framework / controller layer
- [MongoDB](https://www.mongodb.com/) as the database layer
- [Mongoose](https://mongoosejs.com/) as the "ODM" / model layer
- [NGINX](https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/) as a proxy / content-caching layer

## How to Install & Run

You will need to first download and install Docker - [Linux equivalent](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

1.  Clone the repo
2.  Run `docker-compose up` to start three containers:
    - the MongoDB database container
    - the Node.js app container
    - the NGINX proxy container
3.  Server is accessible at `http://localhost:8080`

## How to Run Tests

 You should be able to run `npm install` followed by `npm test app/test` to run everything (assuming you have the LTS version of Node installed on your machine).

## App Structure

**./test**

- this folder contains test case run using `npm test app/test` which in turn uses [Mocha]

**./app**

- `handlers` are Express.js route handlers that have `request`, `response`, and `next` parameters.
- `helpers` are raw JS "classes" and utility functions for use across the app
- `models` are [Mongoose schema] definitions and associated models
- `routers` are RESTful route declarations using [express.Router module] that utilize the functions in `handlers`
- `schemas` are [JSONSchema] validation schemas for creating or updating a Order.
- `app.js` is what builds and configures the express app
- `config.js` is the app-specific config that you will want to customize for your app
- `index.js` is the entrypoint that actually starts the Express server

**./config**

- config contains NGINX proxy configuration, the production pm2 configuration (the process-runner of choice).

## Google API configuration ##

- add google apk key in configuration file located in app/config.js
