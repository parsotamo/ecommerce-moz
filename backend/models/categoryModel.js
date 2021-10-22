const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Preencha campo categoria'],
      unique: [true, 'este nome já foi usado'],
      trim: true,
    },
    icon: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Escolher categoria Principal'],
    },
    name: {
      type: String,
      required: [true, 'Preencha campo categoria'],
      unique: [true, 'este nome já foi usado'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subCategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name icon',
  });
  next();
});

const Category = mongoose.model('Category', categorySchema);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

exports.SubCategory = SubCategory;
exports.Category = Category;
