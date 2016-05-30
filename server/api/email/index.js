'use strict';

var express = require('express');
var controller = require('./email.controller');

var router = express.Router();

router.get('/:name/:email/:tel/:city/:subject/:msg', controller.sendEmail);

module.exports = router;
