const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});



const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), async (req, res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        photo: req.file.filename
    })
    product = await product.save();

    res.redirect('/admin')
});

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {

        if (!err) {
            res.render('productInfo', { product: product })
        } else {
            console.log('error in get product id')
        }
    })

});

// function deleteImage(imagePath) {
//     var imagePath = 'public/uploads / img04.jpeg'
//    fs.unlink(imagePath, (err) => {
//      if (!err) {
//        res.render('images')
//      } else {
//        res.redirect('/admin')
//      }
//    });
// }



router.post('/update', async (req, res) => {
    const product = await Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    console.log(req.body.id, req.file, req.body);
    res.redirect('/admin');
})











router.get('/delete/:id', async (req, res) => {

    const product = await Product.findByIdAndRemove(req.params.id);



    res.redirect('/admin')


})



module.exports = router; 