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
	    "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
	    "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
	    "type": "url_verification"
	})
})

module.exports = router;
