'use strict';

var Log4js = require('log4js');

Log4js.loadAppender('file');
Log4js.addAppender(Log4js.appenders.file('application.log'), 'App');

var Logger = Log4js.getLogger('log.env');
Logger.setLevel('DEBUG');

// Development
if (process.env.NODE_ENV === 'dev') {
	Logger.warn('////////////////////////////////////////////////////////////////');
	Logger.warn('/                                                              /');
	Logger.warn('/                             DEV                              /');
	Logger.warn('/                           ENJOY ;)                           /');
	Logger.warn('/                                                              /');
	Logger.warn('////////////////////////////////////////////////////////////////');
	Logger.warn('Starting server with env=development');
}
// Staging (QA)
else if (process.env.NODE_ENV === 'staging') {
	Logger.warn('////////////////////////////////////////////////////////////////');
  Logger.warn('/                                                              /');
  Logger.warn('/                              QA                              /');
  Logger.warn('/             ARE YOU SURE DO YOU WANT TO BE HERE?             /');
  Logger.warn('/                                                              /');
  Logger.warn('////////////////////////////////////////////////////////////////');
  Logger.warn('Starting server with env=staging');
}
// Production
else if (process.env.NODE_ENV === 'production') {
	Logger.warn('////////////////////////////////////////////////////////////////');
  Logger.warn('/                                                              /');
  Logger.warn('/                          PRODUCTION                          /');
  Logger.warn('/                   FOR GOD SAKE BE CAREFUL!                   /');
  Logger.warn('/                                                              /');
  Logger.warn('////////////////////////////////////////////////////////////////');
  Logger.warn('Starting server with env=production');
}