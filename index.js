function middleware(opts) {
  const options = opts || {};

  const launch = Date.now();
  const path = options.path || '/ping';

  function defaultResponder(req) {
    const now = Date.now();

    return {
      ip: req.ip,
      pong: now,
      uptime: now - launch
    };
  }

  const responder = options.responder || defaultResponder;

  return (req, res, next) => {
    if (req.url !== path) {
      return next();
    }

    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(responder(req)));

    return res.end();
  };
}

module.exports = middleware;
