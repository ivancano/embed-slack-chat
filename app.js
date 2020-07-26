var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter('e13df5d44e7c94341c6703dc9a416198');
const port = 3006;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

var app = express();
//const whitelist = ['http://localhost:3006','http://localhost', 'http://165.227.29.132:3006','http://165.227.29.132'];
const whitelist = ['*'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
//app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.io = io;
server.listen(3007);
app.io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect' , function(){
	    console.log('disconnect');
      app.io.emit('disconnect', null);
	});
});

slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});

module.exports = app;
