const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/pages');
const manageRouter = require('./routes/manage');
const authRouter = require('./routes/auth');
const trashBinRouter = require('./routes/trashbin');
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

app.use(morgan('dev'));
nunjucks.configure('views', {
    express : app,
    watch : true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production' // https only 옵션
        secure : false
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/manage', manageRouter);
app.use('/auth', authRouter);
app.use('/trashbin', trashBinRouter);

// 라우터 없는 경우
app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err.status = 404;
    next(err);
});

// 에러처리 미들웨어
app.use((err, req, res, next)=> {
    res.toLocaleString.message = err.message;
    res.toLocaleString.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.error(err);
    res.render('error', {
            message : err.message,
            error : process.env.NODE_ENV !== 'production' ? err : {}
        });
});


app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기 중`);
});