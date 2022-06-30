# Incedo Services GmbH

## Project Setup
### Build Setup

```bash
# install dependencies
$ npm install -g typescript
$ npm install
```

### Setup Environment
You'll have to copy the content of the env.dist to env.dev to run the project locally or to env.prod in order to use the project for production.

> Do not forget to configure your api key in the environment file

### Compile and hot-reloads for development

```bash
$ npm start
```

### Compile and hot-reloads for production
To build the project use this following command :
```bash
$ npm build
```
And use this command in order to run the project on production mode
```bash
$ npm build:run
```

### Lints and fix files
```bash
$ npm lint
```

## How to use
Endpoint :
```bash
/artist/search?name=${searchText}
```
Example : 
```bash
localhost:3000/artist/search?name=Allison
```

## Special Directories

### `static`

This directory contains the static files.

Example: `/static/demo.json`