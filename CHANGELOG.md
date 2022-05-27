# Change Log

[Compare with current `mozilla/source-map`](https://github.com/mozilla/source-map/compare/master...jacobq:%40jacobq/source-map)

## [v1.1.0](https://github.com/jacobq/source-map/releases/tag/v1.1.0)

- Set `engines` (in `package.json`) to `10.* || 12.* || 14.* || 16.* || >= 18`
  and test against those versions in CI since this should still work fine
  in those environments even though we don't really want to commit
  to supporting already end-of-life Node.js versions...
  ([`5e5d795`](https://github.com/jacobq/source-map/commit/5e5d7954732ea660bc02cec20299d46c87f08981)) 

## [v1.0.0](https://github.com/jacobq/source-map/releases/tag/v1.0.0)

### Breaking changes :boom:

- Name is now [`@jacobq/source-map`](https://www.npmjs.com/package/@jacobq/source-map)
  Fork from [mozilla/source-map](https://github.com/mozilla/source-map)
  ([`58819f0`](https://github.com/mozilla/source-map/commit/58819f09018d56ef84dc41ba9c93f554e0645169),
  just a few commits ahead of v0.8.0-beta.0)
- Revert ["Remove VLQ decoding code that is now handled in wasm"](https://github.com/mozilla/source-map/commit/e222ef64fbc2143a7cca5d3edb44a543acf86872)
  ([`ab7351a`](https://github.com/jacobq/source-map/commit/ab7351a182873a00b938060a0d3359c839df88ea))
- Revert ["Remove unused fromVLQSigned function (#402)"](https://github.com/mozilla/source-map/commit/0f3e95586cc2e52f36b83469ce1fd2c436f010c2)
  ([`8021e70`](https://github.com/jacobq/source-map/commit/8021e709fdba308c985d4e51e448f77e2c4cda5c))
- Mass upgrade dependencies ([`7ac3542`](https://github.com/jacobq/source-map/commit/7ac3542c2bdafc93d3b365861af7f091029fa021))
  * This package relies on [`whatwg-url`](https://github.com/jsdom/whatwg-url) to parse non-standard URLs.
    (See also: https://bugs.chromium.org/p/chromium/issues/detail?id=869291)
    In this release the version of `whatwg-url` was upgraded from `^7.0.0` to `^11.0.0`.
    This does not appear to cause breaking changes for `source-maps`.
    Nevertheless, the breaking changes from that package are:
    - [10.0.0](https://github.com/jsdom/whatwg-url/releases/tag/v10.0.0): API from `whatwg-url/webidl2js-wrapper` changed
    - [9.0.0](https://github.com/jsdom/whatwg-url/releases/tag/v9.0.0): Minimum Node.js version is 12.0.0
    - [8.0.0](https://github.com/jsdom/whatwg-url/releases/tag/v8.0.0): Minimum Node.js version is 10.0.0
  * A number of `devDependencies` have been upgraded
    (e.g. [`nyc` ^11.9.0  →  ^15.1.0](https://github.com/istanbuljs/nyc/blob/master/CHANGELOG.md)),
    but our tests all still appear to be passing. :crossed_fingers:

### Internal Improvements :sparkles:

- Fix broken/meaningless base64 encode/decode tests
  (use Node.jswith [`Buffer::toString('base64')`](https://nodejs.org/docs/latest-v18.x/api/buffer.html#buftostringencoding-start-end) for reference)
  ([`ab7351a`](https://github.com/jacobq/source-map/commit/ab7351a182873a00b938060a0d3359c839df88ea))
- Use GitHub Actions instead of TravisCI for testing ([`682a134`](https://github.com/jacobq/source-map/commit/682a1343b5061bf1020d5d9a747abe93bdbb948e))
- Drop `--fix` flag from `npm run lint` script; use `npm run lint:fix` instead ([`b845978`](https://github.com/jacobq/source-map/commit/b8459786871799e398f4ce3a7916fb216c826012))
- Commit lockfile (`package-lock.json`)
  ([`91e0e93`](https://github.com/jacobq/source-map/commit/91e0e93993a7afd87873f2ecd0226c6281f1715b))

***

## `mozilla/source-map` changelog follows

<details>
<summary>Upstream changelog</summary>


### Breaking changes

- [#350](https://github.com/mozilla/source-map/pull/350) -
  Change browser detection logic for WASM loading.
- [#363](https://github.com/mozilla/source-map/pull/363) -
  Change WASM loading detection to rely on `package.json#browser` field.
- [#362](https://github.com/mozilla/source-map/pull/362) -
  Remove the `dist/` bundle.
- [#371](https://github.com/mozilla/source-map/pull/371) -
  Reimplement sourcemap URL processing using the WHATWG URL API.

### Nonbreaking changes:

- [#339](https://github.com/mozilla/source-map/pull/339) -
  Allow initializing the consumer `mappings.wasm` file as an `ArrayBuffer`.

### Internal Improvements:

- [#347](https://github.com/mozilla/source-map/pull/347) -
  Improve tests.
- [#352](https://github.com/mozilla/source-map/pull/352) -
  Improve documentation.
- [#361](https://github.com/mozilla/source-map/pull/361) -
  Use newer Webpack CLI when bundling.
- [#364](https://github.com/mozilla/source-map/pull/364) -
  Convert `IndexedSourceMapConsumer` implementation to pass more through
  to `BasicSourceMapConsumer`.
- [#366](https://github.com/mozilla/source-map/pull/366) -
  Normalize internal URL representation to be easier to follow.
- [#341](https://github.com/mozilla/source-map/pull/341) -
  Use async functions to simplify `SourceMapConsumer.with` implementation.

## 0.7.3

- Fix a bug where nested uses of `SourceMapConsumer` could result in a
  `TypeError`. [#338](https://github.com/mozilla/source-map/issues/338)
  [#330](https://github.com/mozilla/source-map/issues/330)
  [#319](https://github.com/mozilla/source-map/issues/319)

## 0.7.2

- Another 3x speed up in `SourceMapConsumer`. Read about it here:
  http://fitzgeraldnick.com/2018/02/26/speed-without-wizardry.html

## 0.7.1

- Updated TypeScript typings. [#321][]

[#321]: https://github.com/mozilla/source-map/pull/321

## 0.7.0

- `SourceMapConsumer` now uses WebAssembly, and is **much** faster! Read about
  it here:
  https://hacks.mozilla.org/2018/01/oxidizing-source-maps-with-rust-and-webassembly/

- **Breaking change:** `new SourceMapConsumer` now returns a `Promise` object
  that resolves to the newly constructed `SourceMapConsumer` instance, rather
  than returning the new instance immediately.

- **Breaking change:** when you're done using a `SourceMapConsumer` instance,
  you must call `SourceMapConsumer.prototype.destroy` on it. After calling
  `destroy`, you must not use the instance again.

- **Breaking change:** `SourceMapConsumer` used to be able to handle lines,
  columns numbers and source and name indices up to `2^53 - 1` (aka
  `Number.MAX_SAFE_INTEGER`). It can now only handle them up to `2^32 - 1`.

- **Breaking change:** The `source-map` library now uses modern ECMAScript-isms:
  `let`, arrow functions, `async`, etc. Use Babel to compile it down to
  ECMAScript 5 if you need to support older JavaScript environments.

- **Breaking change:** Drop support for Node < 8. If you want to support older
  versions of node, please use v0.6 or below.

## 0.5.6

- Fix for regression when people were using numbers as names in source maps. See
  #236.

## 0.5.5

- Fix "regression" of unsupported, implementation behavior that half the world
  happens to have come to depend on. See #235.

- Fix regression involving function hoisting in SpiderMonkey. See #233.

## 0.5.4

- Large performance improvements to source-map serialization. See #228 and #229.

## 0.5.3

- Do not include unnecessary distribution files. See
  commit ef7006f8d1647e0a83fdc60f04f5a7ca54886f86.

## 0.5.2

- Include browser distributions of the library in package.json's `files`. See
  issue #212.

## 0.5.1

- Fix latent bugs in IndexedSourceMapConsumer.prototype.\_parseMappings. See
  ff05274becc9e6e1295ed60f3ea090d31d843379.

## 0.5.0

- Node 0.8 is no longer supported.

- Use webpack instead of dryice for bundling.

- Big speedups serializing source maps. See pull request #203.

- Fix a bug with `SourceMapConsumer.prototype.sourceContentFor` and sources that
  explicitly start with the source root. See issue #199.

## 0.4.4

- Fix an issue where using a `SourceMapGenerator` after having created a
  `SourceMapConsumer` from it via `SourceMapConsumer.fromSourceMap` failed. See
  issue #191.

- Fix an issue with where `SourceMapGenerator` would mistakenly consider
  different mappings as duplicates of each other and avoid generating them. See
  issue #192.

## 0.4.3

- A very large number of performance improvements, particularly when parsing
  source maps. Collectively about 75% of time shaved off of the source map
  parsing benchmark!

- Fix a bug in `SourceMapConsumer.prototype.allGeneratedPositionsFor` and fuzzy
  searching in the presence of a column option. See issue #177.

- Fix a bug with joining a source and its source root when the source is above
  the root. See issue #182.

- Add the `SourceMapConsumer.prototype.hasContentsOfAllSources` method to
  determine when all sources' contents are inlined into the source map. See
  issue #190.

## 0.4.2

- Add an `.npmignore` file so that the benchmarks aren't pulled down by
  dependent projects. Issue #169.

- Add an optional `column` argument to
  `SourceMapConsumer.prototype.allGeneratedPositionsFor` and better handle lines
  with no mappings. Issues #172 and #173.

## 0.4.1

- Fix accidentally defining a global variable. #170.

## 0.4.0

- The default direction for fuzzy searching was changed back to its original
  direction. See #164.

- There is now a `bias` option you can supply to `SourceMapConsumer` to control
  the fuzzy searching direction. See #167.

- About an 8% speed up in parsing source maps. See #159.

- Added a benchmark for parsing and generating source maps.

## 0.3.0

- Change the default direction that searching for positions fuzzes when there is
  not an exact match. See #154.

- Support for environments using json2.js for JSON serialization. See #156.

## 0.2.0

- Support for consuming "indexed" source maps which do not have any remote
  sections. See pull request #127. This introduces a minor backwards
  incompatibility if you are monkey patching `SourceMapConsumer.prototype`
  methods.

## 0.1.43

- Performance improvements for `SourceMapGenerator` and `SourceNode`. See issue
  #148 for some discussion and issues #150, #151, and #152 for implementations.

## 0.1.42

- Fix an issue where `SourceNode`s from different versions of the source-map
  library couldn't be used in conjunction with each other. See issue #142.

## 0.1.41

- Fix a bug with getting the source content of relative sources with a "./"
  prefix. See issue #145 and [Bug 1090768](bugzil.la/1090768).

- Add the `SourceMapConsumer.prototype.computeColumnSpans` method to compute the
  column span of each mapping.

- Add the `SourceMapConsumer.prototype.allGeneratedPositionsFor` method to find
  all generated positions associated with a given original source and line.

## 0.1.40

- Performance improvements for parsing source maps in SourceMapConsumer.

## 0.1.39

- Fix a bug where setting a source's contents to null before any source content
  had been set before threw a TypeError. See issue #131.

## 0.1.38

- Fix a bug where finding relative paths from an empty path were creating
  absolute paths. See issue #129.

## 0.1.37

- Fix a bug where if the source root was an empty string, relative source paths
  would turn into absolute source paths. Issue #124.

## 0.1.36

- Allow the `names` mapping property to be an empty string. Issue #121.

## 0.1.35

- A third optional parameter was added to `SourceNode.fromStringWithSourceMap`
  to specify a path that relative sources in the second parameter should be
  relative to. Issue #105.

- If no file property is given to a `SourceMapGenerator`, then the resulting
  source map will no longer have a `null` file property. The property will
  simply not exist. Issue #104.

- Fixed a bug where consecutive newlines were ignored in `SourceNode`s.
  Issue #116.

## 0.1.34

- Make `SourceNode` work with windows style ("\r\n") newlines. Issue #103.

- Fix bug involving source contents and the
  `SourceMapGenerator.prototype.applySourceMap`. Issue #100.

## 0.1.33

- Fix some edge cases surrounding path joining and URL resolution.

- Add a third parameter for relative path to
  `SourceMapGenerator.prototype.applySourceMap`.

- Fix issues with mappings and EOLs.

## 0.1.32

- Fixed a bug where SourceMapConsumer couldn't handle negative relative columns
  (issue 92).

- Fixed test runner to actually report number of failed tests as its process
  exit code.

- Fixed a typo when reporting bad mappings (issue 87).

## 0.1.31

- Delay parsing the mappings in SourceMapConsumer until queried for a source
  location.

- Support Sass source maps (which at the time of writing deviate from the spec
  in small ways) in SourceMapConsumer.

## 0.1.30

- Do not join source root with a source, when the source is a data URI.

- Extend the test runner to allow running single specific test files at a time.

- Performance improvements in `SourceNode.prototype.walk` and
  `SourceMapConsumer.prototype.eachMapping`.

- Source map browser builds will now work inside Workers.

- Better error messages when attempting to add an invalid mapping to a
  `SourceMapGenerator`.

## 0.1.29

- Allow duplicate entries in the `names` and `sources` arrays of source maps
  (usually from TypeScript) we are parsing. Fixes github issue 72.

## 0.1.28

- Skip duplicate mappings when creating source maps from SourceNode; github
  issue 75.

## 0.1.27

- Don't throw an error when the `file` property is missing in SourceMapConsumer,
  we don't use it anyway.

## 0.1.26

- Fix SourceNode.fromStringWithSourceMap for empty maps. Fixes github issue 70.

## 0.1.25

- Make compatible with browserify

## 0.1.24

- Fix issue with absolute paths and `file://` URIs. See
  https://bugzilla.mozilla.org/show_bug.cgi?id=885597

## 0.1.23

- Fix issue with absolute paths and sourcesContent, github issue 64.

## 0.1.22

- Ignore duplicate mappings in SourceMapGenerator. Fixes github issue 21.

## 0.1.21

- Fixed handling of sources that start with a slash so that they are relative to
  the source root's host.

## 0.1.20

- Fixed github issue #43: absolute URLs aren't joined with the source root
  anymore.

## 0.1.19

- Using Travis CI to run tests.

## 0.1.18

- Fixed a bug in the handling of sourceRoot.

## 0.1.17

- Added SourceNode.fromStringWithSourceMap.

## 0.1.16

- Added missing documentation.

- Fixed the generating of empty mappings in SourceNode.

## 0.1.15

- Added SourceMapGenerator.applySourceMap.

## 0.1.14

- The sourceRoot is now handled consistently.

## 0.1.13

- Added SourceMapGenerator.fromSourceMap.

## 0.1.12

- SourceNode now generates empty mappings too.

## 0.1.11

- Added name support to SourceNode.

## 0.1.10

- Added sourcesContent support to the customer and generator.

</details>
