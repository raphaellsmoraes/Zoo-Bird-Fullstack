'use strict';

var express = require('express');
var controller = require('./signing.controller');

var router = express.Router();

router.post('/', controller.signing);

module.exports = router;
