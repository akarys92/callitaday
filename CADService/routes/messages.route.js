var express = require('express');
var router = express.Router();

var messageCtrl = require('../controllers/message.controller');

router.get('/all', messageCtrl.HelloWorld);

module.exports = router;