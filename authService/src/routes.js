const express = require('express');
const router = express.Router();
const authCtrl = require ('./controller');

router.post('/', authCtrl.createOneAuth);
router.get('/', authCtrl.getAllAuths);
router.delete('/', authCtrl.deleteAllAuths);
router.get('/:authId', authCtrl.getOneAuth);
router.put('/:authId', authCtrl.modifyOneAuth);
router.delete('/:authId', authCtrl.deleteOneAuth);

module.exports = router;