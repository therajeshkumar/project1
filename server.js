const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const session = require('express-session');
const hbs = require('hbs');
const app = express();
const indexRouter = require('./controllers/index');
const productsRouter = require('./controllers/products');
const ordersRouter = require('./controllers/orders');
const usersRouter = require('./controllers/users');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'node', saveUninitialized: true, resave: true }));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// mongodb and mongoose connection
mongoose.connect(db.db, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' mongoose Connected to Server...'))
  .catch(err => console.error('Could not connect...'));


const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running on port : ${port}`);
  } else {

    console.log(`Could not read index.html file: ${err}`);
    process.exit(0);
  }
})