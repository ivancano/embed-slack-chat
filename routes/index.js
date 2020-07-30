var express = require('express');
var router = express.Router();
const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');

/* GET home page. */
router.get('/', function(req, res, next) {

	res.json({
	    "holaa": "chau"
	})
});

module.exports = router;
