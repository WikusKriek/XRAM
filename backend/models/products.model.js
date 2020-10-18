const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  number: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
}, {
  timestamps: true,
});

const Products = mongoose.model('products', productSchema);

module.exports = Products;