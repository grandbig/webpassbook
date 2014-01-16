
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var pass = require('./routes/pass');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// pass create
app.post('/sendParam/v1/devices/:deviceLibraryID/registrations/:passTypeID/:serialNumber', pass.createData);

// pass update
app.get('/sendParam/v1/passes/:passTypeID/:serialNumber', pass.updateData);

// pass log
app.post('/sendParam/v1/log', pass.logData);

// pass delete
app.delete('/sendParam/v1/devices/:deviceLibraryID/registrations/:passTypeID/:serialNumber', pass.deleteData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
