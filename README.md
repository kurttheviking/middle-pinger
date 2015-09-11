middle-pinger
=============

yet another tiny healthcheck middleware designed for express 4.x


## use

```js
var express = require('express');
var ping = require('middle-pinger');

var app = express();

app.use(ping());

app.listen(8080);
```

## example

```sh
curl http://localhost:8080/ping
```

```
HTTP/1.1 200 OK
content-type: application/json
```

```json
{
  "pong": 1430717283603,
  "uptime": 11275273748
}
```


## options

The ping middleware accepts an `options` object which can control the ping path as well as the value of the JSON response.

#### options.path

`String`. Defaults to `/ping`.

```js
var express = require('express');
var ping = require('middle-pinger');

var app = express();

var options = {
  path: '/healthcheck'
};

app.use(ping(options));
```

#### options.responder

`Function`. This function must return a `JSON.stringify`-able value. Defaults to an object that contains two keys: `pong` set to the value of `Date.now()` and `uptime` set to the difference between when the middleware was invoked and now (in milliseconds).

```js
var express = require('express');
var ping = require('middle-pinger');

var app = express();

var options = {
  responder: function () {
    return {
      'status': 'ok'
    };
  }
};

app.use(ping(options));
```


## install

```sh
npm install middle-pinger
```


## hat tips

- @jden for first agilemd version
- izs and [pingme](https://github.com/npm/pingme)
