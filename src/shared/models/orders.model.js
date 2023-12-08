const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    deliveryType: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['chưa thanh toán', 'đã thanh toán', 'huỷ đơn hàng', 'đang xử lý'],
      default: 'đang xử lý',
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        productName: { type: String, required: true },
        size: { type: String, required: true, enum: ['s', 'm', 'l', 'S', 'M', 'L'] },
        amount: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
      },
    ],
    totalBill: { type: Number, required: true },
    notes: { type: String },
    fullName: { type: String },
    phone: { type: String },
    deliveryAddress: { type: String },
  },
  {
    timestamps: true,
  },
);

const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders;
