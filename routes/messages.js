var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');

router.post('/set-config', async function(req, res, next) {

	const channel = req.body.channel;
	const signingSecret = req.body.signingSecret;
	fs.writeFile('slack-config.json', {channel: channel, signingSecret: signingSecret}, function (err) {
	  if (err) return console.log(err);
	});
	
	res.json({ res: 1 });
});

module.exports = router;
