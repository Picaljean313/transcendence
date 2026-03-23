const express = require('express');
const router = express.Router();
const bffCtrl = require ('./controller');


router.get('/register/42', bffCtrl.registerRedirectTo42);
router.get('/register/callback', bffCtrl.registerHandleCallback);

router.get('/auth/42', bffCtrl.authRedirectTo42);
router.get('/auth/callback', bffCtrl.authHandleCallback);

router.get('/auth/login', bffCtrl.authClassic);

router.get('/search42Users/:username', bffCtrl.search42Users);


module.exports = router;







