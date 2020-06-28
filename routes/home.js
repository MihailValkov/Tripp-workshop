const router = require('express').Router();
const controller = require('../controllers/home');

router.get('/home/',controller.get.home)




module.exports = router;