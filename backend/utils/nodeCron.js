const cron = require('node-cron');
const awsController = require('../controllers/awsController');
const Product = require('../models/productModel');
let date = new Date();
let monthOlder = new Date(date.setDate(date.getDate() - 30));
let twoMonthsOlder = new Date(date.setDate(date.getDate() - 60));

exports.autoDeleteAWSObjects = () =>
  cron.schedule('0 0 * * *', async () => {
    await Product.updateMany(
      {
        createdAt: {
          $lte: monthOlder,
        },
      },
      {
        $set: {
          active: false,
        },
      }
    );

    const products = await Product.find({
      $and: [
        {
          active: {
            $eq: false,
          },
        },
        {
          createdAt: {
            $lte: twoMonthsOlder,
          },
        },
      ],
    });
    await Product.deleteMany({
      $and: [
        {
          active: {
            $eq: false,
          },
        },
        {
          createdAt: {
            $lte: twoMonthsOlder,
          },
        },
      ],
    });

    if (products.length > 0) {
      Promise.all(
        products.map((product) => {
          awsController.deleteProductImagesAWSAsync(product, product._id);
        })
      );
    }
    console.log('Cron jobs', products);
  });
