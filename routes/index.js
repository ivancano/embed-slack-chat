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

router.post('/events', function(req, res, next){
	res.json({
	    "token": "H2oxu3adMAJ4nJPRanniHAEP",
	    "challenge": "EsovXIbWEtvrS2Q0V1xEvnnWIQ4Ew87eO515taaptYXP1aq8HrEt",
	    "type": "url_verification"
	})
})

module.exports = router;
