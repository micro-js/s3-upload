
# s3-upload

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Upload a file to s3

## Installation

    $ npm install @f/s3-upload

## Usage

```js
var s3Upload = require('@f/s3-upload')

```

## API

### s3Upload(config, progress, done)

- `config` - Configure the upload (the file is passed here)
- `progress` - Progress callback. Called with a floating point value indicating the percentage done.
- `done` - Called when the upload is finished. An error is passed as the first argument if one happens.

### Config

  * `file` - The file you want to upload
  * `type` - File mime type. If not specified, pulled from the file object
  * `name` - The name of the file to upload
  * `protocol` - Protocol (e.g. `http|https`)
  * `attachment` - Whether or not this file has a content-disposition of attachment (will cause a download dialog to open when the link is requested later)
  * `meta` - Object of AWS S3 meta headers / values to pass

  * `bucket`
  if (!S3.signature) throw new Error('S3.signature required')
  if (!S3.bucket) throw new Error('S3.bucket required')
  if (!S3.policy) throw new Error('S3.policy required')
  if (!S3.file) throw new Error('S3.file required')
  if (!S3.key) throw new Error('S3.key required')
  if (!S3.acl) throw new Error('S3.acl required')
**Returns:**

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/s3-upload.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/s3-upload
[git-image]: https://img.shields.io/github/tag/micro-js/s3-upload.svg?style=flat-square
[git-url]: https://github.com/micro-js/s3-upload
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/s3-upload.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/s3-upload
