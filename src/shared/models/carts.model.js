const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
        size: { type: String, enum: ['S', 'M', 'L'], required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Carts = mongoose.model('Carts', cartSchema);
module.exports = Carts;
