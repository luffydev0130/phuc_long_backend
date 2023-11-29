const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const Markers = mongoose.model('Markers', markerSchema);
module.exports = Markers;
