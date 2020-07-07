const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    //product: {type: _id, ref: 'Product' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: String, default: 1 },
    total: { type: Number, default: 0 },

});



const Order = mongoose.model('Order', orderSchema);



exports.Order = Order;