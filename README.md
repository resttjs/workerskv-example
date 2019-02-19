<p align="center">
  <a href="https://restt.io" target="_blank">
    <img src="https://i.imgur.com/gDgZZ4s.png">
  </a>
</p>

***

An example project using [Restt](https://restt.io) and [WorkersKV](https://developers.cloudflare.com/workers/kv/).<br>

## Overview

- [Usage](#usage)
  - [Getting started](#getting-started)
  - [Configuration](#configuration)
  - [Serving for development](#serving-for-development)
  - [Deploying to the edge](#deploying-to-the-edge)
  - [Testing your services](#testing-your-services)
- [Services](#services)
  - [Customers](#customers)
  - [Customers (cached)](#customers-cached)

## Usage

### Getting started

Start by installing the required modules for the project:<br>

```bash
$ npm install
```

### Configuration

Once you've installed the required packages for this project you'll need to add your Cloudflare credentials to `restt.config.json` as described in the [Restt-CLI documentation](https://restt.io/#CLI-Documentation).<br>

You'll also want to configure the `cloudflare.routes` to match the domains you are using.<br>

### Serving for development

You can serve the edge worker locally for development by running the following command:<br>

```bash
$ npm run serve
```

Restt-CLI will output the origins where your services are being served.<br>

### Deploying to the edge

You can deploy your edge worker to the edge with [Cloudflare Workers](https://developers.cloudflare.com/workers/) by running the following command:

```bash
$ npm run deploy
```

### Testing your services

There are two different services: `Customers` (which includes a fetch, create and update) and `Cached Customers` (which includes fetch).<br>

You can check out the full [services specification below](#services).<br>

Testing each of the resources on the services is easiest using either [Postman](https://www.getpostman.com/) or [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).<br>

An example script using Fetch:

##### test-create.js

```js
// Define the development domain
const developmentDomain = 'http://localhost:3000/workers.yourdomain.io';

// Define the production domain
const productionDomain = 'https:///workers.yourdomain.io';

// Perfom a test for customer creation
const createCustomer = (domain) => {

  // Attempt to create a customer
  try {

    // Create a customer
    const response = await fetch(`${domain}/customers`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'charlie@yourdomain.io',
        name: 'Charlie Brown'
      })
    });

    // Log out the response as JSON
    console.log(await response.json());

  } catch(error) {

    // Log out the error
    console.error(error);
  }
}

// Test for development
createCustomer(developmentDomain);

// Test for production
createCustomer(productionDomain);
```

## Services

### Customers

  * GET: `https://workers.yourdomain.io/customers/:id`
    * Fetches a customer by the specified `id`

  * POST: `https://workers.yourdomain.io/customers` 
    * Creates a customer from the specifed `request body`
  
  * PATCH: `https://workers.yourdomain.io/customers/:id`
    * Updates a customer by the specified `id` from the specifed `request body`

### Customers (Cached)

  * GET: `https://workers-cache.yourdomain.io/customers/:id`
    * Fetches a customer by the specified `id` (cached for 60 seconds)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Daniel Larkin

