# FETEC News

## Setup

Install Node and React if not already installed.

### Config

In root (`./FETEC-News`)
```bash
npm run config
``` 

This creates a new `.env` file, which has to be modified. For security, variable `MONGODB_URI` is missing the user password.

### Install dependencies

In root (`./FETEC-News`), run 

```bash
npm install
```

This installs all dependencies for both server and client, then builds the client react app.


### Start up app

```bash
npm start
```

Starts up server, which also directly serves the client.

## Development

### Client

In `./FETEC-News/client` run 

```bash
npm start
```

### Server

Install `nodemon` to have changes applied on each save

``` bash
npm start  # uses nodemon
```

## Contribute
If a developer wishes to contribute to this initiative, he/she may do so by creating a Pull Request in which the following format should be included in the description.
```
[FETEC News- <# of the task>]()

## Description
Brief description of what the task does
```
