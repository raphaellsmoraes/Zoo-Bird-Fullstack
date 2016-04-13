/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/things              ->  create
 */

'use strict';

var aws = {
  "accessKeyId": "",
  "secretAccessKey": "",
  "region": "us-east-1",
  "bucket": "rm-zoobird"
};
var crypto = require('crypto');

var s3Url = 'https://' + aws.bucket + '.s3.amazonaws.com';

export function signing(req, res) {
  var request = req.body;
  var fileName = request.filename;
  var path = 'zoo-bird/' + fileName;
  var readType = 'public-read';
  var s3Policy = {
    'conditions': [{
      'bucket': aws.bucket
    },
      ['starts-with', '$key', path],
      {
        'acl': readType
      },
      {
        'success_action_status': '201'
      },
      ['starts-with', '$Content-Type', request.type],
      ['content-length-range', 2048, 10485760]
    ]
  };
  var stringPolicy = JSON.stringify(s3Policy);
  var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');
// sign policy
  var signature = crypto.createHmac('sha1', aws.secretAccessKey)
    .update(new Buffer(base64Policy, 'utf-8')).digest('base64');
  var credentials = {
    url: s3Url,
    fields: {
      key: path,
      AWSAccessKeyId: aws.accessKeyId,
      acl: readType,
      policy: base64Policy,
      signature: signature,
      'Content-Type': request.type,
      success_action_status: 201
    }
  };
  res.jsonp(credentials);
}
