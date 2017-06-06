'use strict';

var Express = require('express');
var Log4js = require('log4js');

var fs = require('fs');
var configObject = JSON.parse(fs.readFileSync(__dirname + '/config/config.json', 'utf8'));
var config = configObject[process.env.NODE_ENV || 'dev'];

Log4js.loadAppender('file');
Log4js.addAppender(Log4js.appenders.file('application.log'), 'App');

var Logger = Log4js.getLogger('App');
Logger.setLevel('DEBUG');

var FarmService = require('./lib/farm.service');

var App = new Express();

App.get('/', function (req, res) {
    res.send('Treevia Core Service is up!');
});

App.get('/farms', function (req, res) {
    FarmService.getAll(function (farms) {
    	res.send(farms);
    });
});

App.listen(config.port, function () {
    Logger.info('Treevia Core Service listening on port ' + config.port);
});
