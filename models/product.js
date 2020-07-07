const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: false },
    price: { type: String, required: false },
    photo: { type: String, required: false }


})



const Product = mongoose.model('Product', productSchema)



exports.Product = Product; 
