var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var multer = require('multer');
var storage = multer.diskStorage({
  // 어디에 저장할것인가!
  destination: function (req, file, cb) {
    //if(type 이 img 면)
    cb(null, 'uploads/')
    // else if(...)
  },
  //파일명 뭐라 할것인가
  filename: function (req, file, cb) {
    // 파일 이름 중복 방지 위해 date()값을 넣음
    cb(null, file.originalname) // + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sellersRouter = require('./routes/sellers');
var trucksRouter = require('./routes/trucks');
var menusRouter = require('./routes/menus');
var reviewsRouter = require('./routes/reviews');
var repliesRouter = require('./routes/replies');
var followsRouter = require('./routes/follows');
var likesRouter = require('./routes/likes');
var reportsRouter = require('./routes/reports');
var cors = require('cors');
const session = require('express-session');

var app = express();
require('dotenv').config();

const origins = process.env.CORS_ORIGIN.split(',');

const corsOptions = {
  origin: function(origin, callback) {
    if (origin === undefined || origins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const models = require("./models/index.js");

// localhost:8001/api/user/file_name.jpg
// 위 경로로 사용자가 이미지를 불러올수 있다.
app.use('/api/user', express.static('uploads'));

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});

app.use(methodOverride('_method'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/sellers', sellersRouter);
app.use('/api/trucks', trucksRouter);
app.use('/api/menus', menusRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/replies', repliesRouter);
app.use('/api/follows', followsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/reports', reportsRouter);
app.get('/api/upload', function(req, res, next){
  console.log("upload router");
  res.render('upload');
});

// single(' ? ') -> user input name과 같아야 함
// upload.single('userfile'),
app.post('/api/upload', upload.single('userfile'), function(req, res, next){
  console.log(req.file);
  res.send("img post"+ req.file.filename);
});

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

module.exports = app;
