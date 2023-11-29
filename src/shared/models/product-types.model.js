const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const ProductTypes = mongoose.model('ProductTypes', productTypeSchema);
module.exports = ProductTypes;
