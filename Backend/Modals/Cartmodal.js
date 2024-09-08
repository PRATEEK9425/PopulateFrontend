const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user-details', required: true },
  productId: { type: String,  ref: 'Product-Data', required: true},
  quantity: { type: Number, required: true, default: 1 }
});

module.exports =  mongoose.model('CartItem', CartItemSchema);

