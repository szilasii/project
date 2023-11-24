var user_model = require('./user-model')
var router = require('express').Router()

router.get('/user',user_model.getAllUserInfos);
router.get('/user/:id',user_model.getUserDataFromId);
router.post('/user',user_model.regUser);
router.post('/user/:id/address',user_model.createNewAddress);

module.exports = router