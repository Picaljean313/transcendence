const express = require('express');
const router = express.Router();
const authCtrl = require ('./controller');

router.post('/', authCtrl.createOneAuth);
router.get('/', authCtrl.getAllAuths);
router.delete('/', authCtrl.deleteAllAuths);
router.get('/id/:authId', authCtrl.getOneAuth);
router.put('/id/:authId', authCtrl.modifyOneAuth);
router.delete('/id/:authId', authCtrl.deleteOneAuth);
router.get('/login/:login42', authCtrl.getOneAuthByLogin42);
router.get('/email/:userEmail', authCtrl.getOneAuthByEmail);

module.exports = router;