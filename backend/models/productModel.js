const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Preencha campo nome'],
      trim: true,
      minlength: [4, '4 caracteres no mínimo'],
      maxlength: [200, '200 caracteres no máximo'],
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      default:
        'https://compraja.s3.us-east-2.amazonaws.com/default/imagem-nao-disponivel.png',
    },
    images: {
      type: [String],
    },
    colors: [],
    price: {
      type: Number,
      required: [true, 'Preencha campo preço'],
      min: [1, 'Preço deve ser maior que 0'],
      max: [9999999999, 'Não pode exceder 10 dígitos'],
      required: ['Preço é campo obrigatório'],
    },
    brand: {
      type: String,
      required: [true, 'Preencha campo marca'],
      minlength: [3, '4 caracteres no mínimo'],
      maxlength: [100, '200 caracteres no máximo'],
    },
    description: {
      type: String,
      maxlength: [2000, '2000 caracteres no máximo'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Preencha campo categoria'],
      minlength: [3, '4 caracteres no mínimo'],
      maxlength: [100, '200 caracteres no máximo'],
      ref: 'SubCategory',
      required: [true, 'Categoria é campo obrigatório'],
    },
    city: {
      type: String,
      enum: [
        'Lichinga',
        'Pemba',
        'Nampula',
        'Quelimane',
        'Mocuba',
        'Tete',
        'Beira',
        'Manica',
        'Xai-Xai',
        'Maputo',
        'Matola',
      ],
      required: [true, 'Cidade é campo obrigatório'],
    },
    address: {
      type: String,
      required: [true, 'Endreço é campo obrigatório'],
    },
    state: {
      type: String,
      enum: ['novo', 'usado'],
      required: [true, 'Estado é campo obrigatório'],
    },
    avgRating: {
      type: Number,
      min: [0, 'Não deve ser maior que 0'],
      max: [5, '5 é classificação máxima'],
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    hot: {
      type: Boolean,
      default: false,
    },
    negotiable: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ hot: 1 }, { partialFilterExpression: { hot: true } });
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ views: -1 });

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre('save', function (next) {
  if (this.images > 5) {
    next(new AppError('Número máximo de imagens é 5', 400));
  }
  next();
});

productSchema.pre(/^find/, function (next) {
  this.find({ active: { $eq: true } });
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo phoneNumber whatsAppNumber',
  });
  next();
});

productSchema.pre(/^find/, function (next) {
  next();
});

productSchema.pre(/^find/, function (next) {
  this.initial = Date.now();
  next();
});

productSchema.post(/^find/, function () {
  console.log(`${Date.now() - this.initial} milisegundos`);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
