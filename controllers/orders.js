const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Order } = require('../models/order');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    let order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        total: req.body.total,
        product: req.body._id

    })
    console.log('product' + req.body._id)
    order = await order.save();
    console.log(order);
    //res.send(order);

    res.redirect('/cart');



})



router.get('/:id', async (req, res) => {
    let order = await Order.findById(req.params.id);
    console.log(order.id);
    res.render('orderInfo', { title: 'orders', order: order });
});

// update order
router.post('/update', async (req, res) => {
    const order = await Order.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true });
    res.redirect('/admin');
})

// delete
router.get('/delete/:id', (req, res) => {

    Order.findByIdAndRemove(req.params.id, (err, order) => {
        if (!err) {
            res.redirect('/cart');
        } else {
            console.log('err in delete' + err)
        }
    })
})









module.exports = router;