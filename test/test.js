/* global describe, it */
'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('ping', function () {
  var ping = require('../index');

  it('exists', function () {
    expect(ping).to.be.a('function');
  });
});
