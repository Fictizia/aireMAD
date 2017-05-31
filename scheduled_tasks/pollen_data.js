var http = require('http'),
    fs = require('fs');

module.exports = function(goblinDB){
    var stationStructure = {}
    function getStationData(stationData, callback) {
        console.log("-- Downloading ("+stationData.id+")" + stationData.name + " --");

        http.get(stationData.url, function(res) {
            var data = "";
            var dataObject;
            res.on("data", function(chunk) {
                data += chunk;
            });
            res.on("end", function() {
                dataObject = JSON.parse(data);
            
                var finalData = {
                    name: stationData.name,
                    id: stationData.id,
                    parametros: {},
                    mediciones: {}
                };
            
                function validateValue (value, medium, high, veryHigh) {
                    if(value < medium){
                        return "bajo";
                    } else if (value === medium || value < high) {
                        return "medio";
                    } else if(value === high || value < veryHigh) {
                        return "alto";
                    } else if (value === veryHigh || value > veryHigh) {
                        return "muy alto";
                    } else {
                        return "desconocido";
                    }
                
                }
            
                dataObject.features.forEach(function (rawElement){
                    var element = rawElement.properties;
                    finalData["UTM_longitud"] = element.NM_LONGITUD;
                    finalData["UTM_latitud"] = element.NM_LATITUD;
                    finalData["altura"] = element.NM_ALTURA;
                    finalData.mediciones[element.DS_MATERIAS] = {
                        "fecha": element.FC_FECHA_MEDICION,
                        "valor": element.NM_VALOR,
                        "resumen": validateValue (element.NM_VALOR, element.NM_MEDIO, element.NM_ALTO, element.NM_MUYALTO)
                    };
                    finalData.parametros[element.DS_MATERIAS] = {
                        "medio": element.NM_MEDIO,
                        "alto": element.NM_ALTO,
                        "muy_alto": element.NM_MUYALTO
                    };
                });

                stationStructure[stationData.id] = finalData
                console.log("-- Finisehd " + stationData.name + "--");
                callback()
            });
        }).on('error', function(e) {
            console.log("Error fetching data:", e.message);
        });
    }


    var pollenRequests = [
        {
            "id": "P001",
            "name": "Barrio Salamanca",
            "url": "http://gestiona.madrid.org/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=SPOL_V_CAPTADORES_GIS&QUERY_LAYERS=SPOL_V_CAPTADORES_GIS&STYLES=&BBOX=365560.97254%2C4415910.465472%2C495339.02746%2C4558089.534528&FEATURE_COUNT=50&HEIGHT=493&WIDTH=450&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A23030&X=266&Y=282"
        }, {
            "id": "P003",
            "name": "Ciudad Universitaria",
            "url": "http://gestiona.madrid.org/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=SPOL_V_CAPTADORES_GIS&QUERY_LAYERS=SPOL_V_CAPTADORES_GIS&STYLES=&BBOX=365560.97254%2C4415910.465472%2C495339.02746%2C4558089.534528&FEATURE_COUNT=50&HEIGHT=493&WIDTH=450&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A23030&X=248&Y=284"
        }, {
            "id": "P002",
            "name": "Arganzuela",
            "url": "http://gestiona.madrid.org/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=SPOL_V_CAPTADORES_GIS&QUERY_LAYERS=SPOL_V_CAPTADORES_GIS&STYLES=&BBOX=365560.97254%2C4415910.465472%2C495339.02746%2C4558089.534528&FEATURE_COUNT=50&HEIGHT=493&WIDTH=450&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A23030&X=262&Y=296 "
        }].map(function (item) {
            return new Promise(function (resolve) {
                getStationData(item, resolve);
            });
        });

    Promise.all(pollenRequests).then(function () {
        goblinDB.set(stationStructure, "pollen");
        fs.writeFile('./data/pollen.json', JSON.stringify(stationStructure), 'utf-8', function(err) {
            if (err) console.log("Error saving Data in ../data/pollen.json:", err);
        });
    });


}