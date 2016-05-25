/**
 * Expose s3Upload
 */

module.exports = s3Upload

/**
 * s3Upload
 */

function s3Upload (config, progressCb, doneCb) {
  if (arguments.length === 2) {
    doneCb = progressCb
    progressCb = null
  }

  validateS3(config.S3)
  normalize(config)

  var xhr = new XMLHttpRequest

  if (progressCb) {
    xhr.upload.addEventListener('progress', function (e) {
      progressCb((e.loaded / e.total) * 100)
    })
  }

  xhr.onreadystatechange = function () {
    if (4 != xhr.readyState) return
    var t = (xhr.status / 100) | 0
    if (2 == t) return doneCb()
    var err = new Error(xhr.responseText)
    err.status = xhr.status
    doneCb(err)
  }

  var S3 = config.S3
  var form = new FormData

  form.append('key', config.name)
  form.append('AWSAccessKeyId', S3.key)
  form.append('acl', S3.acl)
  form.append('policy', S3.policy)
  form.append('signature', S3.signature)
  form.append('Content-Type', config.type)
  form.append('Content-Length', config.file.length)
  form.append('Content-Disposition', config.attachment ? 'attachment; filename="' + config.file.name + '"' : '')
  form.append('file', config.file)

  if (config.meta) {
    Object.keys(config.meta)
      .forEach(function (meta) {
        form.append(meta, config.meta[meta])
      })
  }

  xhr.open('POST', config.bucketUrl, true)
  xhr.send(form)
}

/**
 * Helpers
 */

function normalize (config) {
  if (!config.type) config.type = config.file.type || 'application/octet-stream'
  if (!config.name) config.name = file.name
  if (!config.protocol) config.protocol = window.location.protocol

  config.bucketUrl = config.protocol + '//' + config.S3.bucket + '.s3.amazonaws.com'
  config.url = config.bucketUrl + '/' + config.name
}

function validateS3 (S3) {
  if (!S3.signature) throw new Error('S3.signature required')
  if (!S3.bucket) throw new Error('S3.bucket required')
  if (!S3.policy) throw new Error('S3.policy required')
  if (!S3.key) throw new Error('S3.key required')
  if (!S3.acl) throw new Error('S3.acl required')
}

