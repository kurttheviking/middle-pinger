middle-pinger
=============

Yet another tiny healthcheck middleware designed for express 4.x


## Quick start

### Install

```sh
npm install --save middle-pinger
```
### Use

```js
const express = require('express');
const ping = require('middle-pinger');

const app = express();

app.use(ping());

app.listen(8080);
```

### Example

```sh
curl http://localhost:8080/ping
```

```
HTTP/1.1 200 OK
content-type: application/json
```

```json
{
  "ip": "127.0.0.1",
  "pong": 1430717283603,
  "uptime": 11275273748
}
```


## `options`

The ping middleware accepts an `options` object which can control the ping path as well as the value of the JSON response.

### `options.path`

`String`. Defaults to `/ping`.

```js
const express = require('express');
const ping = require('middle-pinger');

const app = express();

const options = {
  path: '/healthcheck'
};

app.use(ping(options));
```

### `options.responder(req)`

`Function`. This function must return a `JSON.stringify`-able value. Defaults to an `Object` that contains three keys: `ip` set to the value of `req.ip`, `pong` set to the value of `Date.now()`, and `uptime` set to the difference between when the middleware was instantited and now (in milliseconds).

```js
const express = require('express');
const ping = require('middle-pinger');

const app = express();

const options = {
  responder: (req) => ({
    headers: req.headers,
    status: 'ok'
  })
};

app.use(ping(options));
```


## Hat tips

- `@jden` for first version used within `@agilemd` products
- `@izs` and [pingme](https://github.com/npm/pingme)
