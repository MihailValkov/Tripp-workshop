const router = require('express').Router();
const controller = require('../controllers/trip');
const isAuth = require('../utils/auth');


router.get('/shared-trips',isAuth(true),controller.get.sharedtrips );
router.get('/offer-trip',isAuth(true),controller.get.offertrip );
router.get('/details/:id',isAuth(true),controller.get.details);
router.get('/details/close-trip/:_id',isAuth(true),controller.get.closetrip);
router.get('/details/join-trip/:_id',isAuth(true),controller.get.jointrip);
router.get('/details/edit-trip/:_id',isAuth(true),controller.get.edittrip);

router.post('/offer-trip',isAuth(true),controller.post.offertrip );
router.post('/details/edit-trip/:_id',isAuth(true),controller.post.edittrip);

module.exports = router;