var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');

router.post('/set-channel', async function(req, res, next) {

	const channel = req.body.channel;
	fs.writeFile('slack-config.txt', channel, function (err) {
	  if (err) return console.log(err);
	});
	
	res.json({ res: 1 });
});

module.exports = router;
