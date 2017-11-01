var express = require('express');
var router = express.Router();

var callerCtrl = require('../controllers/caller.controller');

router.post('/register', callerCtrl.CreateCaller);

router.post('/login', callerCtrl.Login);

module.exports = router;