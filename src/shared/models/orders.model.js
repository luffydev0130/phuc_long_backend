const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    paymentType: {
      type: String,
      required: true,
      enum: ['chuyển khoản', 'thanh toán khi nhận hàng', 'thanh toán tại cửa hàng'],
    },
    deliveryType: {
      type: String,
      required: true,
      enum: ['nhận tại cửa hàng', 'giao hàng'],
    },
    status: {
      type: String,
      required: true,
      enum: ['chưa thanh toán', 'đã thanh toán', 'huỷ đơn hàng', 'đang xử lý'],
      default: 'đang xử lý',
    },
    details: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        productName: { type: String, required: true },
        size: { type: String, required: true, enum: ['s', 'm', 'l', 'S', 'M', 'L'] },
        amount: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalBill: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Carts = mongoose.model('Carts', paymentSchema);
module.exports = Carts;
