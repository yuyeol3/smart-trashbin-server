const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req, res, next)=> {
    res.render('main');
})

router.post('/', (req, res, next)=>{
    console.log(req.body);
    res.send('ok');
})

module.exports = router;