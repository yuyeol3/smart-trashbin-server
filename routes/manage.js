const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/auth');

const router = express.Router();

router.get('/', isLoggedIn, (req, res, next)=> {
    res.render('manage/manage');
})

router.get('/login', isNotLoggedIn, (req, res, next)=> {
    res.render('manage/login');
})

router.get('/register', isLoggedIn, (req, res, next)=> {
    res.render('manage/register')
})



module.exports = router;