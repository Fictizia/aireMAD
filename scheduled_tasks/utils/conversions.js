function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

exports.date = function(year, month, day) {
    return new Date(year, month, day).toISOString();
}
exports.station = function(value) {
    
    var name = "desconocida";

    if (value === 99) {
        name = "Media de la red";
    } else if (value === 1) {
        name = "Paseo de Recoletos";
    } else if (value === 2) {
        name = "Carlos V";
    } else if (value === 4) {
        name = "Pza. de España";
    } else if (value === 6) {
        name = "Gregorio Marañón";
    } else if (value === 8) {
        name = "Escuelas Aguirre";
    } else if (value === 11) {
        name = "Av. Ramón y Cajal";
    } else if (value === 12) {
        name = "Manuel Becerra";
    } else if (value === 16) {
        name = "Arturo Soria";
    } else if (value === 17) {
        name = "Villaverde Alto";
    } else if (value === 18) {
        name = "Farolillo";
    } else if (value === 19) {
        name = "Alto Extremadura";
    } else if (value === 24) {
        name = "Casa de Campo";
    } else if (value === 25) {
        name = "Santa Eugenia";
    } else if (value === 27) {
        name = "Barajas";
    } else if (value === 28) {
        name = "Cuatro Vientos";
    } else if (value === 30) {
        name = "Campo de las Naciones";
    } else if (value === 35 || value === 3) {
        name = "Pza. del Carmen";
        value = 35;
    } else if (value === 36 || value === 20) {
        name = "Moratalaz";
        value = 36;
    } else if (value === 38 || value === 10) {
        name = "Cuatro Caminos";
        value = 38;
    } else if (value === 39 || value === 5) {
        name = "Barrio del Pilar";
        value = 39;
    } else if (value === 40 || value === 13) {
        name = "Vallecas";
        value = 40;
    } else if (value === 47) {
        name = "Méndez Álvaro";
    } else if (value === 48) {
        name = "Castellana";
    } else if (value === 49) {
        name = "Retiro";
    } else if (value === 50) {
        name = "Pza. Castilla";
    } else if (value === 54) {
        name = "Ensanche Vallecas";
    } else if (value === 55 || value === 26) {
        name = "Urb. Embajada";
        value = 55;
    } else if (value === 56 || value === 14) {
        name = "Pza. Fdez. Ladreda";
        value = 56;
    } else if (value === 57 || value === 31) {
        name = "Sanchinarro";
        value = 57;
    } else if (value === 58 || value === 29) {
        name = "El Pardo";
        value = 58;
    } else if (value === 59) {
        name = "Parque Juan Carlos I";
    } else if (value === 60 || value === 86) {
        name = "Tres Olivos";
        value = 60;
    }

    return {
        id: idGenerator(value),
        name: name
    };
};
exports.parameter = function(value) {
    if (value === 1) {
        return {
            "parameter": "Dióxido de Azufre",
            "abrebiation": "S02"
        }
    } else if (value === 6) {
        return {
            "parameter": "Monóxido de Cabono",
            "abrebiation": "CO"
        }
    } else if (value === 7) {
        return {
            "parameter": "Monóxido de Nitrógeno",
            "abrebiation": "NO"
        }
    } else if (value === 8) {
        return {
            "parameter": "Dióxido de Nitrógeno",
            "abrebiation": "NO2"
        }
    } else if (value === 9) {
        return {
            "parameter": "Partículas en suspensión",
            "abrebiation": "PS25"
        }
    } else if (value === 10) {
        return {
            "parameter": "Partículas en suspensión",
            "abrebiation": "PS10"
        }
    } else if (value === 12) {
        return {
            "parameter": "Óxidos de Nitrógeno totales",
            "abrebiation": "NOX"
        }
    } else if (value === 14) {
        return {
            "parameter": "Ozono",
            "abrebiation": "O3"
        }
    } else if (value === 20) {
        return {
            "parameter": "Tolueno",
            "abrebiation": "TOL"
        }
    } else if (value === 30) {
        return {
            "parameter": "Benceno",
            "abrebiation": "BEN"
        }
    } else if (value === 35) {
        return {
            "parameter": "Etilbenceno",
            "abrebiation": "EBE"
        }
    } else if (value === 42) {
        return {
            "parameter": "Hidrocarburos Totales",
            "abrebiation": "HC"
        }
    } else if (value === 43) {
        return {
            "parameter": "Metano",
            "abrebiation": "CH4"
        }
    } else if (value === 44) {
        return {
            "parameter": "Hidrocarburos No Metánicos",
            "abrebiation": "NMH"
        }
    } else if (value === 80) {
        return {
            "parameter": "Radiación Ultravioleta",
            "abrebiation": "UV"
        }
    } else if (value === 81) {
        return {
            "parameter": "Velocidad del Viento",
            "abrebiation": "VV"
        }
    } else if (value === 82) {
        return {
            "parameter": "Dirección del Viento",
            "abrebiation": "DD"
        }
    } else if (value === 83) {
        return {
            "parameter": "Temperatura Media",
            "abrebiation": "TMP"
        }
    } else if (value === 84) {
        return {
            "parameter": "Temperatura Máxima",
            "abrebiation": "TMX"
        }
    } else if (value === 85) {
        return {
            "parameter": "Temperatura Mínima",
            "abrebiation": "TMI"
        }
    } else if (value === 86) {
        return {
            "parameter": "Humedad Relativa",
            "abrebiation": "HR"
        }
    } else if (value === 87) {
        return {
            "parameter": "Presión Barométrica",
            "abrebiation": "PRB"
        }
    } else if (value === 88) {
        return {
            "parameter": "Radiación Solar",
            "abrebiation": "RS"
        }
    } else if (value === 89) {
        return {
            "parameter": "Precipitación",
            "abrebiation": "LL"
        }
    }
};

exports.acusticParameters = function(value) {
    if (value === "T") {
        return "total";
    } else if (value === "D") {
        return "diurno";
    } else if (value === "E") {
        return "vespertino";
    } else if (value === "N") {
        return "nocturno";
    }
} 

exports.technique = function(value) {
    if (value === 2) {
        return "Ionización de llama";
    } else if (value === 6) {
        return "Absorción Ultravioleta";
    } else if (value === 8) {
        return "Quimioluminiscencia";
    } else if (value === 38) {
        return "Fluorescencia Ultravioleta";
    } else if (value === 47) {
        return "Microbalanza";
    } else if (value === 48) {
        return "Absorción Infrarroja";
    } else if (value === 59) {
        return "Cromatografía de Gases";
    } else if (value === 98) {
        return "Sensor Meteorológico";
    }
}

exports.period = function(value) {
    if (value === 2) {
        return "datos por hora";
    } else if (value === 4) {
        return "datos diarios";
    }
}

exports.values = function(values, year, month, day) {
    var arrayPairs = listToMatrix(values, 2);
    var finalArray = [];
    var hour = 0
    arrayPairs.forEach(function(element) {
        finalArray.push({
            valor: parseFloat(element[0]),
            estado: element[1] === "V" ? "Pasado" : "Pendiente",
            date: new Date(year, month, day, hour++).toISOString()
        })
        
    });
    return finalArray;
}


function idGenerator (rawNumber) {
    var pad = "000";
    return "S" + (pad+rawNumber).slice(-pad.length);
}