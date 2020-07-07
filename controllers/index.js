const { Product } = require('../models/product');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const express = require('express');
const fs = require('fs');
const { response } = require('express');
const router = express.Router();




// var imgpath = 'public/uploads/img04.jpeg'
// fs.unlink(imgpath, (err) => {
//   if (!err) {
//     res.render('images')
//   } else {
//     res.redirect('/admin')
//   }
// });




router.get('/', (req, res) => {
  res.render('products')

});
router.get('/admin', async (req, res) => {
  const products = await Product.find();
  const orders = await Order.find();
  const users = await User.find();
  let sess = req.session;
  res.render('admin', {
    email: sess.email,
    title: 'Admin', product: products, order: orders, user: users
  });

});

module.exports = router;