const sharp = require('sharp');
const { Readable } = require('stream');
const arrayBufferToBuffer = require('arraybuffer-to-buffer');

const Product = require('../models/productModel');
const catchAsyncError = require('../utils/catchAsyncError');
var s3 = require('../utils/awsSdk');

exports.uploadProducImageAWS = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();
  const readableStream = new Readable();
  readableStream._read = () => {};
  readableStream.push(new arrayBufferToBuffer(req.body.imgResized));
  readableStream.on('data', async (chunck) => {
    await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: chunck,
        ContentType: 'image/jpeg',
        Key: `products/${req.body.filename}`,
        ACL: 'public-read',
      })
      .promise();
  });
  next();
});

exports.uploadProducImagesAWS = catchAsyncError(async (req, res, next) => {
  let imgsResized = [];
  let x;
  if (req.files) {
    Promise.all(
      req.files.map(async (file, i) => {
        x = await sharp(file.buffer)
          .resize(500, 500)
          .toFormat('jpeg')
          .jpeg({ quality: 70 })
          .toBuffer();
        imgsResized.push(x);
      })
    ).then(async (_) => {
      imgsResized.map((imgResized, i) => {
        let readableStream = new Readable();
        readableStream._read = () => {};
        readableStream.push(new arrayBufferToBuffer(imgResized));

        readableStream.on('data', (chunck) => {
          s3.upload(
            {
              Bucket: process.env.AWS_BUCKET_NAME,
              Body: chunck,
              Key: `products/${req.body.filenames[i]}`,
              ContentType: 'image/jpeg',
              ACL: 'public-read',
            },
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
              }
            }
          ).promise();
        });
      });
    });
  }

  next();
});

exports.createProducImagesAWS = catchAsyncError(async (req, res, next) => {
  if (!req.files.image || !req.files.images) return next();
  let x;
  const imagesResized = [];

  if (req.files.image) {
    const readableStream = new Readable();
    readableStream._read = () => {};
    readableStream.push(new arrayBufferToBuffer(req.body.imageResized));
    readableStream.on('data', async (chunck) => {
      await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: chunck,
          ContentType: 'image/jpeg',
          Key: `products/${req.body._id}-main.jpeg`,
          ACL: 'public-read',
        })
        .promise();
    });
  }

  if (req.files.images) {
    Promise.all(
      req.files.images.map(async (file, i) => {
        x = await sharp(file.buffer)
          .resize(500, 500)
          .toFormat('jpeg')
          .jpeg({ quality: 70 })
          .toBuffer();
        imagesResized.push(x);
      })
    ).then(async (_) => {
      imagesResized.map((imgResized, ind) => {
        let filename = `${req.body._id}-(${ind + 1}).jpeg`;
        let readableStream = new Readable();
        readableStream._read = () => {};
        readableStream.push(new arrayBufferToBuffer(imgResized));

        readableStream.on('data', (chunck) => {
          s3.upload(
            {
              Bucket: process.env.AWS_BUCKET_NAME,
              Body: chunck,
              Key: `products/${filename}`,
              ContentType: 'image/jpeg',
              ACL: 'public-read',
            },
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
              }
            }
          ).promise();
        });
      });
    });
  }
  next();
});

exports.deleteProductImagesAWSAsync = async (product, id) => {
  const obj = [];
  let filename;

  obj.push({ Key: `products/${id}-main.jpeg` });

  if (product.images && product.images.filter(Boolean).length > 0) {
    product.images.filter(Boolean).map((image) => {
      filename = image.split('/');

      obj.push({ Key: `products/${filename[filename.length - 1]}` });
    });
  }

  await s3.deleteObjects(
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: obj,
      },
    },
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
};

exports.deleteProductImageAWS = catchAsyncError(async (req, res, next) => {
  await s3
    .deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `products/${req.body.filename}`,
    })
    .promise();

  next();
});

exports.deleteProductImagesAWS = catchAsyncError(async (req, res, next) => {
  const obj = [];
  let filename;
  const product = await Product.findById(req.params.id);
  const filteredImgs = product.images.filter(Boolean);
  obj.push({ Key: `products/${req.params.id}-main.jpeg` });

  if (filteredImgs && filteredImgs.length > 0) {
    product.images.filter(Boolean).map((image) => {
      filename = image.split('/');
      obj.push({ Key: `products/${filename[filename.length - 1]}` });
    });
  }

  await s3
    .deleteObjects(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
          Objects: obj,
        },
      },
      async (err, data) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    )
    .promise();
  next();
});
