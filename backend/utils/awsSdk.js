require('dotenv').config({ path: 'config.env' });
var aws = require('aws-sdk');

aws.config.update({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});
var s3 = new aws.S3();

module.exports = s3;
