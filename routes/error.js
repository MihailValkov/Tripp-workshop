const router = require('express').Router();
const controller = require('../controllers/error');
const { request } = require('express');
const isAuth = require('../utils/auth.js')

router.all('',isAuth(false) ,controller.get.error);

module.exports = router;