var user = require('./user-model')
var router = require('express').Router()

router.get('/user',user.getAllUserInfos);
router.get('/user/:id',user.getUserDataFromId);
router.post('/user/reg',user.regUser);
router.post('/user/:id/address',user.createNewAddress);

module.exports = router