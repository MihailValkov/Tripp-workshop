const router = require('express').Router();
const controller = require('../controllers/user')



router.get('/login',controller.get.login)
router.get('/register',controller.get.register)
router.get('/logout',controller.get.logout)

router.post('/login', controller.post.login)
router.post('/register' , controller.post.register)

module.exports = router;