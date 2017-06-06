'use strict';

var Log4js = require('log4js');

Log4js.loadAppender('file');
Log4js.addAppender(Log4js.appenders.file('application.log'), 'SearchTagService');

var Logger = Log4js.getLogger('SearchTagService');
Logger.setLevel('DEBUG');

var farms = {
    farm1: {
        name: "f1",
        parcels: {
            parcelA: {

            },
            parcelB: {
                
            },
            parcelC: {
                
            }
        }
    },
    farm2: {
        name: "f2",
        parcels: {
            parcelD: {
                
            },
            parcelE: {
                
            },
            parcelF: {
                
            }
        }
    },
    farm3: {
        name: "f3",
        parcels: {
            parcelG: {
                
            },
            parcelH: {
                
            },
            parcelI: {
                
            },
            parcelJ: {
                
            }
        }
    }
}

function getAll(onFinish) {
  onFinish(farms);
}

function get(id, onFinish) {
  onFinish(farms[id]);
}

module.exports = (function () {

  return {
    getAll: getAll,
    get: get
  };

}) ();