var express = require('express');
var router = express.Router();

var accountCtrl = require('../controllers/account.controller');

router.post('/', accountCtrl.CreateAccount);
router.get('/', accountCtrl.GetByCaller);

module.exports = router;