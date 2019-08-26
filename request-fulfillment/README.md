# request-fulfillment

> Tool that enables answering all CMS communication requests through a user-friendly interface.

## Features

- Tasks list pages for viewing and controlling pending, personal, and completed tasks (aka requests)
- Task page to easily answer and complete a specific task (aka request)
- Users list pages for viewing and controlling approved and pending users and admins
- Login and Registration pages for authenticating members of technical team
- User-friendly and convenient admin panel
- Dockerized and easy to develop and deploy

## Installation

### Prerequisites:

- Ready to use [CMS](https://github.com/cms-dev/cms) database
- [Knex CLI](https://github.com/tgriesser/knex)  (for [controlling](http://knexjs.org/#Migrations-CLI) database migrations)

### Steps:

1. Install [Node](https://nodejs.org/en) 10 (recommended way via [NVM](https://github.com/nvm-sh/nvm))

2. Install or update to latest [NPM](https://www.npmjs.com) version

3. Install [Knex CLI](http://knexjs.org/#Migrations-CLI)

4. Install [Docker](https://docs.docker.com/engine/installation/) and [Docker Compose](https://docs.docker.com/compose/install/)

5. Clone the repo:

    ```sh
    git clone git@github.com:ioi-2019/tools.git
    ```

6. Set up web app:

    ```sh
    cd tools/request-fulfillment/app
    npm install
    ```
7. Set up API:

    ```sh
    cd tools/request-fulfillment/api
    npm install
    ```

8. Create `.env` file in API directory. The file should contain the following variables:

    ```
    NODE_ENV=development
    DB_DEV_HOST=localhost
    DB_DEV_PORT=5432
    DB_DEV_NAME=cmsdb
    DB_DEV_USER=cmsuser
    DB_DEV_PASS=cmsuser123
    DB_PROD_HOST=172.30.20.101
    DB_PROD_PORT=5432
    DB_PROD_NAME=cmsdb
    DB_PROD_USER=cmsuser
    DB_PROD_PASS=pass
    ADMIN_ID=1
    CONTEST_ID=1
    ```

    These variable values are subject to change due to your own environment. Set them accordingly:
    
    - NODE_ENV - Node environment (`development`/`production`)
    - DB_DEV_* - development database credentials (see `knexfile.js` in API)
    - DB_PROD_* - production database credentials (see `knexfile.js` in API)
    - ADMIN_ID - the ID of the main admin account in CMS database (which is active and has all privileges)
    - CONTEST_ID - the ID of the contest in CMS database which you want to run this tool for

## Usage

### Both modes:

1. Run database migrations to create required tables in CMS database:

    ```sh
    knex migrate:latest
    ```

    This command will read `NODE_ENV` variable value (`development`/`production`) from your `.env` file.


### Development mode:

2. Review `ADMIN_ID` and `CONTEST_ID` variables in `.env` file.

3. Start web app on `localhost:4200`:

    ```sh
    cd tools/request-fulfillment/app
    npm start
    ```
4. Start API on port `localhost:3000`:

    ```sh
    cd tools/request-fulfillment/api
    npm start
    ```

### Production mode:

2. Review `ADMIN_ID` and `CONTEST_ID` variables in `.env` file.

3. Review production API host URL in web app.

4. Create production build of web app:

    ```sh
    cd tools/request-fulfillment/app
    ng build --prod
    ```

5. Run via Docker:

    ```sh
    cd tools/request-fulfillment
    docker-compose up -d --force-recreate --build
    ```

## Screenshots

![Editing panel](https://raw.githubusercontent.com/ioi-2019/tools/tree/master/request-fulfillment/docs/screenshots/preview.png)
See more screenshots [here](https://github.com/ioi-2019/tools/tree/master/request-fulfillment/docs/screenshots).

## Roadmap

- Upgrade app to Angular 8
- Subject to change...