var express = require('express');
var router = express.Router();

var receiverCtrl = require('../controllers/receiver.controller');

router.post('/', receiverCtrl.CreateReceiver);

router.post('/query', receiverCtrl.QueryReceiver);

module.exports = router;