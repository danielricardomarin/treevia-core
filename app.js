'use strict';

var Express = require('express');
var Log4js = require('log4js');
var BodyParser = require('body-parser');

var fs = require('fs');
var configObject = JSON.parse(fs.readFileSync(__dirname + '/config/config.json', 'utf8'));
var config = configObject[process.env.NODE_ENV || 'dev'];

Log4js.loadAppender('file');
Log4js.addAppender(Log4js.appenders.file('application.log'), 'App');

var Logger = Log4js.getLogger('App');
Logger.setLevel('DEBUG');

var FarmService = require('./lib/farm.service');
var UserService = require('./lib/user.service');

var App = new Express();

App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());

App.post('/login', function (req, res) {
    if(!req.body.username){
        res.status(400).send('Username required');
    }

    if(!req.body.password){
        res.status(400).send('Password required');
    }

    UserService.checkUserExistence(req.body.username, function (userExists, userId) {
      if(userExists){
          UserService.verifyPassword(userId, req.body.password, function (isMatch) {
            if(isMatch){
              //LOGGED IN
              res.status(201).send('Hello buddy');
            }else{
              res.status(400).send('Wrong password');    
            }
          });
      }else{
          res.status(400).send('User does not exist');       
      }
    });
});

App.get('/', function (req, res) {
    res.send('Treevia Core Service is up!');
});

App.get('/farms', function (req, res) {
    FarmService.getAll(function (farms) {
    	res.send(farms);
    });
});

App.get('/farms/:id', function (req, res) {
    FarmService.get(req.params.id, function (farm) {
    	res.send(farm);
    });
});

App.post('/farms', function (req, res) {
    FarmService.add(req.body, function (id) {
    	res.send(id);
    });
});

App.delete('/farms/:id', function (req, res) {
    FarmService.remove(req.params.id, function (deletedFarm) {
    	res.send(deletedFarm);
    });
});

App.listen(config.port, function () {
    Logger.info('Treevia Core Service listening on port ' + config.port);
});
