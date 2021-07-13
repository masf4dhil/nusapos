var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');
const flash = require('connect-flash');
// route ke admin
const adminRouter = require('./routes/admin');

//import mongoose
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/nusa', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log("DB NUSA is connected"))
.catch((err) => console.log(err));

// ini route ke index.ejs (login)
var indexRouter = require("./routes/index");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // ini nanti di uncomment buat max time session nya
  cookie: { maxAge: 600000 }
}))
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Users', usersRouter);

//admin
app.use('/admin', adminRouter);

//ini init static untuk arahin path css dari sb admin
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.moment = require('moment');
module.exports = app;
