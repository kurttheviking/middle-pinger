/* global describe, it */
/* eslint global-require: 0 */
const expect = require('chai').expect;
const sinon = require('sinon');
const uuid = require('uuid-with-v6');

describe('middle-pinger', () => {
  it('exports a function', () => {
    const healthcheck = require('../index');

    expect(healthcheck).to.be.a('function');
  });

  it('exported function returns a middleware function', () => {
    const healthcheck = require('../index');

    expect(healthcheck()).to.be.a('function');
  });

  it('middleware function returns Object with expected keys', () => {
    const healthcheck = require('../index');
    const middleware = healthcheck();

    const req = { url: '/ping', ip: uuid.v6() };
    const res = {
      setHeader: sinon.stub(),
      write: sinon.stub(),
      end: sinon.stub()
    };

    middleware(req, res);

    const out = JSON.parse(res.write.getCall(0).args[0]);

    expect(out.ip).to.equal(req.ip);
    expect(out.pong).to.be.a('number');
    expect(out.uptime).to.be.a('number');
  });
});
