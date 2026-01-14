var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moon')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('⚠️  MongoDB connection error:', err.message));

// Routes
app.use('/', indexRouter);

// error handler
app.use(function(req, res, next) {
  res.status(404).render('error', {
    title: '404 - Page Not Found',
    message: 'The page you are looking for does not exist',
    error: { status: 404, stack: '' }
  });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
