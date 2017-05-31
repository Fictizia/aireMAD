var fs = require('fs');

module.exports = function(goblinDB) {
    console.log("--- MANUAL RECOVERY HAS BEEN ACTIVATED ---");
    fs.readdir('./data', function (err, files) {
        if(err){
            console.log("ERROR reading ./data", err);
        } else {
            files.forEach(function(file){
                if (/.json/.test(file)) {
                    var currentProperty = file.substring(0, file.length - 5);
                    console.log("Let's recover", currentProperty);
                    goblinDB.set(require(`./data/${file}`), currentProperty);
                }
            });
        }
    });
    
};