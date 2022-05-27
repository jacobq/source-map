/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

const base64 = require("../lib/base64");
const { Buffer } = require("buffer");

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
    const actual = base64.encode(i);
    assert.ok(
      typeof actual === "string" && actual.length === 1,
      "encode should return a string of length 1"
    );
    // i << 2 to align the least significant bit in octet with LSb used for first digit
    const base64Encoded = Buffer.from([i << 2]).toString("base64");
    const expected = base64Encoded.charCodeAt(0);
    assert.strictEqual(
      actual.charCodeAt(0),
      expected,
      `encode(${i}) (${actual}) should agree with NodeJS' Buffer implementation ` +
        `(${expected} [base64Encoded=${base64Encoded}])`
    );
  }
};

exports["test out of range decoding"] = function(assert) {
  assert.strictEqual(base64.decode("=".charCodeAt(0)), -1);
};

exports["test single-value decoding"] = function(assert) {
  for (let i = 0; i < 64; i++) {
    const base64Encoded = Buffer.from([i << 2]).toString("base64");
    const actual = base64.decode(base64Encoded.charCodeAt(0));
    const expected = i;
    assert.strictEqual(
      actual,
      expected,
      `decode(${i}) (${actual}) should agree with NodeJS' Buffer implementation ` +
        `(${expected} [base64Encoded=${base64Encoded}])`
    );
  }
};
