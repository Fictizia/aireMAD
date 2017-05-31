var http = require('http'),
    fs = require('fs'),
    conversion = require('./utils/conversions'),
    _ = require("lodash");
    
var acustic = {}

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
    var rawStationData = conversion.station(parseInt(lineDetails[0]));
    var rawStationParameter = conversion.acusticParameters(lineDetails[4].trim());
    var lineDetailsData = {};
    lineDetailsData.id = rawStationData.id;
    lineDetailsData.name = rawStationData.name;
    
    //http://www.madrid.es/UnidadWeb/UGBBDD/ObjetosExternos/Ficheros/PDF%202007/PDF%202008/UbicacionEstacionesRedContaminacion.pdf
    if(rawStationParameter){
        lineDetailsData[rawStationParameter] = {};
        lineDetailsData[rawStationParameter]["date"] = conversion.date( parseInt(lineDetails[1]), parseInt(lineDetails[2]), parseInt(lineDetails[3]))
        lineDetailsData[rawStationParameter]["LAEQ"] = parseFloat(lineDetails[5]);
        lineDetailsData[rawStationParameter]["LA501"] = parseFloat(lineDetails[6]);
        lineDetailsData[rawStationParameter]["LA510"] = parseFloat(lineDetails[7]);
        lineDetailsData[rawStationParameter]["LA550"] = parseFloat(lineDetails[8]);
        lineDetailsData[rawStationParameter]["L590"] = parseFloat(lineDetails[9]);
        lineDetailsData[rawStationParameter]["LA599"] = parseFloat(lineDetails[10]);
    }

    return { 
        id: rawStationData.id,
        data: lineDetailsData
    }
}

function storeProcessedLine (processedLine) {
    acustic[processedLine.id] = acustic[processedLine.id] ? _.merge(acustic[processedLine.id], processedLine.data) : processedLine.data;
}


module.exports = function(goblinDB){

    console.log("Pollution_data.js");
    console.log('Iniciada la descarga de acustic.txt de Internet'); 
    
    var file = fs.createWriteStream("data/acustic.txt");
    var request = http.get("http://www.mambiente.munimadrid.es/opendata/ruido.txt", function(response) {
    	  var rawData = "";
    	  response.pipe(file);
    	  response.on('data', function(chunk) {
          rawData += chunk;
      });
        response.on('end', function() {
            manageLine(rawData.split(/\n/g));
            goblinDB.set(acustic, "acustic");
            fs.writeFile('./data/acustic.json', JSON.stringify(acustic), 'utf-8', function(err) {
                if (err) console.log("Error saving Data in ../data/acustic.json:", err);
            });
        });
    	  
    });
    
}
