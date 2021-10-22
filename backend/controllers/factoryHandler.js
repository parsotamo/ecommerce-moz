const catchAsyncError = require('../utils/catchAsyncError');
const APIFeatures = require('../utils/APIFeatures');

exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    if (req.params.userId) filter = { user: req.params.userId };

    const keyword = req.query.keyword;
    let avgRatingQuery = { ...req.query.avgRating };
    let priceQuery = { ...req.query.price };
    if (!Object.values(avgRatingQuery)[0]) req.query.avgRating = '';
    if (!Object.values(priceQuery)[0]) req.query.price = '';

    if (keyword) {
      filter = {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { brand: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    let pages, page;
    if (!req.body.skip) {
      const count = new APIFeatures(Model.find(filter), req.query).filter();
      const nrDocuments = await count.query;
      pages = Math.ceil(Number(nrDocuments.length) / 2);
      page = Number(req.query.page) || 1;
    }

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs,
      page: page,
      pages,
    });
  });

exports.getOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    req.params.id;
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });
exports.updateArraySingle = (Model) =>
  catchAsyncError(async (req, res, next) => {
    res.status(200).json({
      status: 'success',
    });
  });
exports.updateArray = (Model) =>
  catchAsyncError(async (req, res, next) => {
    let data;
    await Model.findByIdAndUpdate(req.params.id, {
      upsert: true,
      new: true,
    }).exec((err, product) => {
      if (err) {
        console.log(err);
      } else {
        product.images = req.body.splittedImages;

        product.save();
        data = product.images;
      }
      res.status(200).json({
        status: 'success',
        data,
      });
    });
  });

exports.deleteFromArray = (Model) =>
  catchAsyncError(async (req, res, next) => {
    let doc;
    await Model.findByIdAndUpdate(req.params.id, {
      upsert: true,
      new: true,
    }).exec((err, product) => {
      if (err) {
        console.log(err);
      } else {
        product.images.splice(Number(req.body.index), 1, '');
        product.save();
        doc = product.images;
      }
      res.status(200).json({
        status: 'success',
        data: doc,
      });
    });
  });

exports.updateOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'Documento apagado com sucesso',
    });
  });
