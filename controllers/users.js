const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt')
const { User } = require('../models/user');
const router = express.Router();
const app = express();


router.get('/', async (req, res) => {

  res.render('users', { title: 'users' });

});

router.get('/login', async (req, res) => {
  res.render('login', { title: 'login' });
});
router.get('/register', async (req, res) => {
  res.render('register', { title: 'register' });
});

router.post('/register', async (req, res, err) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User allready Registered');
  }


  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin

  });
  user = await user.save();
  res.redirect('/users/login');
});

router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email, password: password }, (err, user) => {
    if (err) {
      console.log(err);

    }
    if (!user) {
      res.send('invalid email and password');

    } else {
      sess = req.session;
      sess.email = req.body.email;

      res.redirect('/admin');
    }
  })
});

router.get('/logout', async (req, res) => {
  let sess = req.session;
  req.flash('success_msg', 'You are logged out');
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {

      res.redirect('/users/login');
    }
  });
});


// router.post('/', async (req, res) => {
//   let user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   user = await user.save();
//   res.redirect('admin')
// });

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!err) {
      res.render('userInfo', { user: user })
    } else {
      res.redirect('/')

    }
  })
})

router.post('/reset', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.render('reset', { user: user })
  }
})

router.post('/update', (req, res) => {
  updateUser(req, res);
})

function updateUser(req, res) {
  User.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, user) => {
    if (!err) {
      res.redirect('/admin')
    } else {
      console.log('err in update' + err)
    }

  })
}


router.get('/delete/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (!err) {
      res.redirect('/admin');
    } else {
      console.log('err in delete' + err)
    }
  })
})



// router.put('/:id', async (req, res) => {

//   const user = await User.findByIdAndUpdate(req.params.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password

//     }, { new: true });

//   if (!user) return res.status(404).send('ID was not found.');

//   res.send(user);
// });








module.exports = router;