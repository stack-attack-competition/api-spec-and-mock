<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This is an api specification, example implementation and mock data source for the Stack Attack #1 event.

This spec also can be found on 
* https://app.swaggerhub.com/apis/stack-attack-no1/stack-attack_rest_api/1.0.0 - just spec
* https://stack-attack-bed.herokuapp.com/api/ - spec and test

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

rename .env.sample to .env and you are good to go and can define your own port and other environment variables in that file

the api swagger spec will be on the http://localhost:3000/api

in json format the spec can be found on: http://localhost:3000/api-json

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
