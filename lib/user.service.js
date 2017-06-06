'use strict';

var Log4js = require('log4js');

Log4js.loadAppender('file');
Log4js.addAppender(Log4js.appenders.file('application.log'), 'SearchTagService');

var Logger = Log4js.getLogger('SearchTagService');
Logger.setLevel('DEBUG');

var Underscore = require("underscore");

var users = {
    user1: {
        userName: "username1",
        password: "pass1"
    },
    user2: {
        userName: "username2",
        password: "pass2"
    },
    user3: {
        userName: "username3",
        password: "pass3"
    }
}

function checkUserExistence(userName, onFinish) {
  var userExistence = false;
  var userId = null;

  var finished = Underscore.after(Object.keys(users).length, function () {
    onFinish(userExistence, userId);
  });

  Underscore.each(users, function (user, key) {
    if(user.userName === userName){
      userExistence = true;
      userId = key;
    }
    finished();
  });
}

function verifyPassword(userId, password, onFinish) {
  if(users[userId].password === password){
    onFinish(true);
  }else{
    onFinish(false);
  }
}

module.exports = (function () {

  return {
    checkUserExistence: checkUserExistence,
    verifyPassword: verifyPassword
  };

}) ();