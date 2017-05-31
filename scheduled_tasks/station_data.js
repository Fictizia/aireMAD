var fs = require('fs');
var contents = require('../data/station.json');

module.exports = function(goblinDB){
    goblinDB.set(contents, "station");
}