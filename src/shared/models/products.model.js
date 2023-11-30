const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    prices: [
      {
        size: { type: String, required: true, enum: ['S', 'M', 'L'] },
        price: { type: Number, required: true, default: 0 },
      },
    ],
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductTypes',
    },
    markers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Markers' }],
    desc: { type: String },
    images: [String],
  },
  {
    timestamps: true,
  },
);

const Products = mongoose.model('Products', productSchema);
module.exports = Products;
