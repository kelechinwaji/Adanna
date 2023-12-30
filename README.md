# Adanne: Authorization-Centric Application

Adanne is a TypeScript-based application developed using NestJS, MongoDB for data storage, and JSON Web Tokens (JWT) for authentication. The app focuses on managing user authorization by distinguishing between two user types: "typeOne" and "typeTwo." Users of typeOne are authorized to create a company by providing the necessary input data, while typeTwo users possess admin access, enabling them to upload an image to the company.

## API Functionality

Adanne features a RESTful API design based on Express, facilitating interactions with the MongoDB Database for data storage and retrieval. Authentication is implemented using JSON Web Tokens to ensure data privacy during the retrieval and storage processes.

## Technology/Tools Used

- **NestJS:** A progressive Node.js framework for building efficient, scalable server-side applications.
- **Mongo Database:** A NoSQL database for storing and managing data in a flexible, scalable manner.
- **JSON Web Token (JWT):** A compact, URL-safe means of representing claims to be transferred between two parties.

## Endpoints/Usage

### 1. Create Account/Sign-up

![Create Account](https://i.postimg.cc/kgQKdppM/Untitled.png)

Description: Allows users to create an account by providing necessary details.

Endpoint: `/api/auth/signup`

Method: `POST`

### 2. Login

![Login](https://i.postimg.cc/5NcD7Hdc/Untitled-1.png)

Description: Enables users to log in and obtain authentication tokens.

Endpoint: `/api/auth/login`

Method: `POST`

Request Body:
```json
{
  "username": "johndoe@gmail.com",
  "password": "123456"
}


### 2. Login

![Login](https://i.postimg.cc/5NcD7Hdc/Untitled-1.png)

Description: Enables users to log in and obtain authentication tokens.

Endpoint: /api/auth/login

Method: POST

Request Body:
```json
{
  "username": "johndoe@gmail.com",
  "password": "123456",
}

### 3. Create a company

![company](https://i.postimg.cc/zGNtsK5h/Untitled-2.png)

Description: Allows typeOne users to create a company by providing necessary input data.

Endpoint: /api/company/create

Method: POST

Request Body:
```json
{
  "name": "Example Company",
  "numberOfUser": "10",
  "description": "A brief description of the company"
}

### What I learnt on this project

- Understanding and implementing user authorization, especially with distinct user types, was a crucial aspect of the project. Learning how to control and restrict access based on user roles (typeOne and typeTwo) has enhanced my understanding of security in web applications.

- Implementing pagination for retrieving a list of companies improved the efficiency of data retrieval. Understanding how to paginate data contributes to optimizing the performance of applications dealing with large datasets.

- Structuring this project using a modular approach with NestJS and creating this README file improved my skills in project organization and documentation



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
