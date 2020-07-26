var express = require('express');
var router = express.Router();
const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');

/* GET home page. */
router.get('/', function(req, res, next) {

	// An access token (from your Slack app or custom integration - xoxp, xoxb)
	//const token = 'xoxp-1282905512672-1259065033858-1259079880194-2c142c0b9af14fcedbb6173fcb26e56d';
	const token = 'xoxp-1282905512672-1259065033858-1259079880194-2c142c0b9af14fcedbb6173fcb26e56d';

	/*const web = new WebClient(token);

	// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
	const conversationId = 'C017KLCUR4M';

	(async () => {
		//const channel = await web.conversations.list();
		//console.log(channel);
	  	// See: https://api.slack.com/methods/chat.postMessage
	  	const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there', as_user: true });

	  	// `res` contains information about the posted message
	  	console.log('Message sent: ', res.ts);
	})();*/

	const rtm = new RTMClient(token);
	rtm.start()
	  .catch(console.error);

	// Calling `rtm.on(eventName, eventHandler)` allows you to handle events (see: https://api.slack.com/events)
	// When the connection is active, the 'ready' event will be triggered
	rtm.on('ready', async () => {

	  // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
	  // The following value is used as an example
	  const conversationId = 'C017KLCUR4M';

	  // The RTM client can send simple string messages
	  const res = await rtm.sendMessage('Hello there', conversationId);

	  // `res` contains information about the sent message
	  console.log('Message sent: ', res.ts);
	});

	// After the connection is open, your app will start receiving other events.
	rtm.on('user_typing', (event) => {
	  // The argument is the event as shown in the reference docs.
	  // For example, https://api.slack.com/events/user_typing
	  console.log(event);
	})

	rtm.on('message', (event) => {
	  // The argument is the event as shown in the reference docs.
	  // For example, https://api.slack.com/events/user_typing
	  console.log(event);
	})

	res.render('index', { title: 'Express' });
});

module.exports = router;
