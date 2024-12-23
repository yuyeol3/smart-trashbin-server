const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/auth');

const router = express.Router();

router.post('/register', isLoggedIn, register);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);



module.exports = router;
