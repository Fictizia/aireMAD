var http = require('http'),
    fs = require('fs'),
    conversion = require('./utils/conversions'),
    _ = require("lodash");
    
var pollution = {}

function manageLine (dataArray){
    dataArray.forEach(function(element){
        if(element) {
            var rawElement = element.split(",");
            var richElement = converToRealData(rawElement)
            storeProcessedLine(richElement);
        }
    })
}

function converToRealData (lineDetails) {
    var rawStationData = conversion.station(parseInt(lineDetails[2]));
    var rawStationParameter = conversion.parameter(parseInt(lineDetails[3]));
    var lineDetailsData = {};
    lineDetailsData.id = rawStationData.id;
    lineDetailsData.name = rawStationData.name;
    
    if(rawStationParameter){
        lineDetailsData[rawStationParameter.abrebiation] = {};
        lineDetailsData[rawStationParameter.abrebiation]["parameter"] = rawStationParameter.parameter;
        lineDetailsData[rawStationParameter.abrebiation]["abrebiation"] = rawStationParameter.abrebiation
        lineDetailsData[rawStationParameter.abrebiation]["date"] = conversion.date( parseInt(lineDetails[6]), parseInt(lineDetails[7]), parseInt(lineDetails[8]))
        lineDetailsData[rawStationParameter.abrebiation]["technique"] = conversion.technique(parseInt(lineDetails[4]));
        lineDetailsData[rawStationParameter.abrebiation]["period"] = conversion.period(parseInt(lineDetails[5]));
        lineDetailsData[rawStationParameter.abrebiation]["values"] = conversion.values(lineDetails.slice(9, 56), parseInt(lineDetails[6]), parseInt(lineDetails[7]), parseInt(lineDetails[8]));
    }

    return { 
        id: rawStationData.id,
        data: lineDetailsData
    }
}

function storeProcessedLine (processedLine) {
    pollution[processedLine.id] = pollution[processedLine.id] ? _.merge(pollution[processedLine.id], processedLine.data) : processedLine.data;
}


module.exports = function(goblinDB){

    console.log("Pollution_data.js");
    console.log('Iniciada la descarga de pollution.txt de Internet'); 
    
    var file = fs.createWriteStream("data/pollution.txt");
    var request = http.get("http://www.mambiente.munimadrid.es/opendata/horario.txt", function(response) {
    	  var rawData = "";
    	  response.pipe(file);
    	  response.on('data', function(chunk) {
          rawData += chunk;
      });
        response.on('end', function() {
            manageLine(rawData.split(/\n/g));
            goblinDB.set(pollution, "pollution");
            fs.writeFile('./data/pollution.json', JSON.stringify(pollution), 'utf-8', function(err) {
                if (err) console.log("Error saving Data in ../data/weather.json:", err);
            });
        });
    	  
    });
    
}
