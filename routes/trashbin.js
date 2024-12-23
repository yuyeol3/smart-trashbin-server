const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/auth');
const {isValidTrashBin} = require('../middlewares/trashbin');
const trashbin = require('../controllers/trashbin');

const router = express.Router();

router.get('/lists', trashbin.lists);
router.post('/add', isLoggedIn, trashbin.add);
router.post('/delete', isLoggedIn, trashbin.delete);
router.post('/update', isLoggedIn, trashbin.update);


router.post('/data', isValidTrashBin, trashbin.addData);

module.exports = router;