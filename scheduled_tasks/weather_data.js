var http = require('http'),
    fs = require('fs'),
    config = require('../config');

module.exports = function(goblinDB){
    var weatherStructure = {};
    
    function getWeatherData(stationData, callback, error_callback) {
        console.log("----- Downloading WEATHER: " + stationData.id + " -----");    

        var options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/forecast?lat='+stationData.lat+'&lon='+stationData.lng+'&mode=json&lang=sp&units=metric&APPID=' + config.owm
        };
    
        http.get(options, function(res) {
            var data = "";
            var dataObject;
            res.on("data", function(chunk) {
                data += chunk;
            });
            res.on("end", function() {
                dataObject = JSON.parse(data);
                dataObject.id = stationData.id;
                dataObject.latitud = stationData.lat;
                dataObject.longitud = stationData.lng;
                weatherStructure[stationData.id] = dataObject;
                callback();
            });
        }).on('error', function(e) {
            error_callback(e)
        });
    }

    var stationsRaw = goblinDB.get("station")
    var stationsList = [{
        id: "global",
        lat: 40.41694,
        lng: -3.70361
    }];
     
    for (var station in stationsRaw) {
        stationsList.push({
            id: stationsRaw[station].id,
            lat: stationsRaw[station].latitud_decimal,
            lng: stationsRaw[station].longitud_decimal
        })
    };
     
    console.log("Total de estaciones que requieren de mapeo:", stationsList.length);
    stationsList.map(function (item) {
        return new Promise(function (resolve, reject) {
            getWeatherData(item, resolve, reject);
        });
    });
     
    Promise.all(stationsList).then(function () {
        goblinDB.set(weatherStructure, "weather");
        fs.writeFile('./data/weather.json', JSON.stringify(weatherStructure), 'utf-8', function(err) {
            if (err) console.log("Error saving Data in ../data/weather.json:", err);
        });
    }).catch(function(e){
        console.log("Error fetching data:", e.message);
    });     
}
