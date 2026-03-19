const express = require('express');
const router = express.Router();
const userCtrl = require ('./controller');

router.post('/', userCtrl.createOneUser);
router.get('/', userCtrl.getAllUsers);
router.delete('/', userCtrl.deleteAllUsers);
router.get('/:authId', userCtrl.getOneUser);
router.put('/:authId', userCtrl.modifyOneUser);
router.delete('/:authId', userCtrl.deleteOneUser);

module.exports = router;