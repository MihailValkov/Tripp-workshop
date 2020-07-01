const router = require('express').Router();
const controller = require('../controllers/user');
const isAuth = require('../utils/auth');



router.get('/login',controller.get.login)
router.get('/register',controller.get.register)
router.get('/logout',isAuth(true),controller.get.logout)
router.get('/profile',isAuth(true),controller.get.profile)

router.post('/login', controller.post.login)
router.post('/register', controller.post.register)

module.exports = router;