var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: true,
  credentials: true
}
app.options('*', cors(corsOptions))
app.post('*', cors(corsOptions))
app.get('*', cors(corsOptions))
app.delete('*', cors(corsOptions))
app.use(cors(corsOptions));
app.listen(8000, function(){
  console.log('CORS-enabled web server listening on port 80')
})

const pool = new Pool({
  user: 'postgres',
  host: 'localhost', 
  database: 'postgres', 
  password: '080906', 
  port: 5432, 
});

app.use('/', indexRouter);

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
  } else {
    console.log('Результат запроса:', result.rows[0]);
  }
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

module.exports = app;