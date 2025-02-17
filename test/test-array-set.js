/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

const ArraySet = require("../lib/array-set").ArraySet;

function makeTestSet() {
  const set = new ArraySet();
  for (let i = 0; i < 100; i++) {
    set.add(String(i));
  }
  return set;
}

exports["test .has() membership"] = function(assert) {
  const set = makeTestSet();
  for (let i = 0; i < 100; i++) {
    assert.ok(set.has(String(i)));
  }
};

exports["test .indexOf() elements"] = function(assert) {
  const set = makeTestSet();
  for (let i = 0; i < 100; i++) {
    assert.strictEqual(set.indexOf(String(i)), i);
  }
};

exports["test .at() indexing"] = function(assert) {
  const set = makeTestSet();
  for (let i = 0; i < 100; i++) {
    assert.strictEqual(set.at(i), String(i));
  }
};

exports["test creating from an array"] = function(assert) {
  const set = ArraySet.fromArray([
    "foo",
    "bar",
    "baz",
    "quux",
    "hasOwnProperty",
  ]);

  assert.ok(set.has("foo"));
  assert.ok(set.has("bar"));
  assert.ok(set.has("baz"));
  assert.ok(set.has("quux"));
  assert.ok(set.has("hasOwnProperty"));

  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.indexOf("bar"), 1);
  assert.strictEqual(set.indexOf("baz"), 2);
  assert.strictEqual(set.indexOf("quux"), 3);

  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.at(1), "bar");
  assert.strictEqual(set.at(2), "baz");
  assert.strictEqual(set.at(3), "quux");
};

exports["test that you can add __proto__; see github issue #30"] = function(
  assert
) {
  const set = new ArraySet();
  set.add("__proto__");
  assert.ok(set.has("__proto__"));
  assert.strictEqual(set.at(0), "__proto__");
  assert.strictEqual(set.indexOf("__proto__"), 0);
};

exports["test .fromArray() with duplicates"] = function(assert) {
  let set = ArraySet.fromArray(["foo", "foo"]);
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 1);

  set = ArraySet.fromArray(["foo", "foo"], true);
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.at(1), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 2);
};

exports["test .add() with duplicates"] = function(assert) {
  const set = new ArraySet();
  set.add("foo");

  set.add("foo");
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 1);

  set.add("foo", true);
  assert.ok(set.has("foo"));
  assert.strictEqual(set.at(0), "foo");
  assert.strictEqual(set.at(1), "foo");
  assert.strictEqual(set.indexOf("foo"), 0);
  assert.strictEqual(set.toArray().length, 2);
};

exports["test .size()"] = function(assert) {
  const set = new ArraySet();
  set.add("foo");
  set.add("bar");
  set.add("baz");
  assert.strictEqual(set.size(), 3);
};

exports["test .size() with disallowed duplicates"] = function(assert) {
  const set = new ArraySet();

  set.add("foo");
  set.add("foo");

  set.add("bar");
  set.add("bar");

  set.add("baz");
  set.add("baz");

  assert.strictEqual(set.size(), 3);
};

exports["test .size() with allowed duplicates"] = function(assert) {
  const set = new ArraySet();

  set.add("foo");
  set.add("foo", true);

  set.add("bar");
  set.add("bar", true);

  set.add("baz");
  set.add("baz", true);

  assert.strictEqual(set.size(), 3);
};
