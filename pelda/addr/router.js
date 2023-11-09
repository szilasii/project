var address = require('./addr-model')
var router = require('express').Router()

router.post('/address', address.newAddress(req,res));

module.exports = router