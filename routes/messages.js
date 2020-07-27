var express = require('express');
var router = express.Router();
const { createReadStream } = require('fs');
var bodyParser = require('body-parser');
const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');

router.post('/get-list', async function(req, res, next) {

	// An access token (from your Slack app or custom integration - xoxp, xoxb)
	//const token = 'xoxp-1282905512672-1259065033858-1259079880194-2c142c0b9af14fcedbb6173fcb26e56d';
	const token = req.body.token;

	const web = new WebClient(token);
	const conversationId = req.body.conversationId;
	const messages = await web.conversations.history({channel: conversationId});

	/*const rtm = new RTMClient(token);
	rtm.disconnect();
	rtm.start().catch(console.error);

	rtm.on('message', (event) => {
	  // The argument is the event as shown in the reference docs.
	  // For example, https://api.slack.com/events/user_typing
	  console.log("envio un msg");
	  req.app.io.emit('message', event);
	})*/
	res.json({ messages: messages.messages });
});

router.post('/post-message', async function(req, res, next) {

	// An access token (from your Slack app or custom integration - xoxp, xoxb)
	//const token = 'xoxp-1282905512672-1259065033858-1259079880194-2c142c0b9af14fcedbb6173fcb26e56d';
	const token = req.body.token;
	console.log(req.body);

	const web = new WebClient(token);
	const conversationId = req.body.conversationId;
	const message = req.body.text;

	const result = await web.chat.postMessage({channel: conversationId, text: message, as_user: true, link_names: true});

	res.json({ result: 1 });
});

router.post('/post-file', async function(req, res, next) {

	// An access token (from your Slack app or custom integration - xoxp, xoxb)
	//const token = 'xoxp-1282905512672-1259065033858-1259079880194-2c142c0b9af14fcedbb6173fcb26e56d';
	const token = req.body.token;
	console.log(req.body);

	const web = new WebClient(token);
	const conversationId = req.body.conversationId;
	const filename = 'test.png';

	const result = await web.files.upload({channels: conversationId, filename, file: createReadStream('test.png')});

	res.json(result);
});

module.exports = router;
