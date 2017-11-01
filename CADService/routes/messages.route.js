var express = require('express');
var router = express.Router();

var messageCtrl = require('../controllers/message.controller');

router.post('/', messageCtrl.CreateMessage);

module.exports = router;