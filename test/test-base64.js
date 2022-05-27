/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

const base64 = require("../lib/base64");
const { Buffer } = require('buffer');

exports["test out of range encoding"] = function(assert) {
  assert.throws(function() {
    base64.encode(-1);
  }, /Must be between 0 and 63/);
  assert.throws(function() {
    base64.encode(64);
  }, /Must be between 0 and 63/);
};

exports["test single-value encoding"] = function(assert) {
  for (let i = 0; i < 64; i++) {
    let actual = base64.encode(i);
    // i << 2 to align least significant bit in octet with LSb used for first digit
    let expected = Buffer.from([i << 2]).toString('base64');
    assert.strictEqual(actual.charCodeAt(0), expected.charCodeAt(0), `First character of base64.encode(${i}) ${actual} should match the output of the base64 encoding in NodeJS's Buffer ${expected}`);
  }
};

exports['test out of range decoding'] = function (assert) {
  assert.strictEqual(base64.decode('='.charCodeAt(0)), -1);
};

exports['test single-value decoding'] = function (assert) {
  for (var i = 0; i < 64; i++) {
    let encoded = Buffer.from([i << 2]).toString('base64');
    let actual = base64.decode(encoded.charCodeAt(0));
    let expected = i;
    assert.strictEqual(actual, expected, `First character of base64.decode(${i}) ${actual} should match the output of the base64 encoding in NodeJS's Buffer ${expected}`);
  }
};
