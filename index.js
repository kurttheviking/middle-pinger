'use strict';

module.exports = function middleware (options) {
  options = options || {};

  var launch = Date.now();
  var path = options.path || '/ping';
  var responder = options.responder || function () {
    var now = Date.now();

    return {
      pong: now,
      uptime: now - launch
    };
  };

  function pong (req, res, next) {
    if (req.url !== path) {
      return next();
    }

    res.setHeader('content-type','application/json');
    res.write(JSON.stringify(responder()));
    res.end();
  }

  return pong;
};
