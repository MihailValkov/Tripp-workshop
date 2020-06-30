const router = require('express').Router();
const controller = require('../controllers/home');
const isAuth= require('../utils/auth');

router.get('/home/',isAuth(false),controller.get.home)




module.exports = router;