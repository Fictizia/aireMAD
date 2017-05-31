var cheerio = require('cheerio'),
    http = require('http'),
    fs = require('fs');

/*
@see: http://codelinks.pachanka.org/post/65324039279/replace-special-characters-in-javascript
*/

function dateRegex ($){
            /*-- REGEX EXPERIMENT https://regex101.com/r/swfF48/1 --*/
    var regex = /Nº (.\d*?)\. (.\d*?) de (.\D*?) de (.\d*?)\./gm
    var input = $("input[name='comentarios']").attr("value");
    var spanishMonths = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    var m = void 0;
    
    while ((m = regex.exec(input)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
    
            // The result can be accessed through the `m`-variable.
        return {
            number: parseInt(m[1]),
            day: parseInt(m[2]),
            month: spanishMonths.indexOf(monthCleanUp(m[3])),
            year: parseInt(m[4])
        }
    }   
}

function reportDate (rawData) {
    var year = validateDateNumber({number: parseInt(rawData.year)})
    var month = validateDateNumber({number: parseInt(rawData.month), maximum: 11, minimum: 0})
    var day = validateDateNumber({number: parseInt(rawData.day), maximum: 31, minimum: 1})
    
    function validateDateNumber(details) {
        var generalValidation = details.number && typeof(details.number) === "number" && !isNaN(details.number) && isFinite(details.number)
        return  details.minimum && details.maximum ? details.number >= details.minimum && details.number <= details.maximum : generalValidation
    }
    
    return  year && month && day ? new Date(parseInt(rawData.year), parseInt(rawData.month), parseInt(rawData.day)).toISOString().slice(0, -14) : null;
}

function monthCleanUp(str) {
    var rep = '_';
	
    str = str.toLowerCase()
	.replace(/\s+/g, rep) // replace whitespace

	// remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüû";
    var to   = "aaaaeeeeiiiioooouuuu";
    for (var i=0, l=from.length ; i<l ; i++) {
	    str = str.replace(
                new RegExp(from.charAt(i), 'g'),
                to.charAt(i)
            );
    }
        // remove invalid chars
    str = str.replace(new RegExp('[^a-z0-9'+rep+']',"g"), '')
        .replace(/-+/g, rep); // collapse dashes;

    return str;
}

function getUrlData (url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on("data", function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on('error', function(e) {
        console.log("Error fetching data:", e.message);
    });
}

function getReportDetails (resumeDataSite, callback){
    console.log("-- REPORT:", resumeDataSite);
    var resumeUrl = "http://vgripe.isciii.es/gripe/PresentarHomeBoletin.do?boletin=1&bol="+resumeDataSite.url
    getUrlData(resumeUrl, function(dataReport){
        
        var $ = cheerio.load(dataReport);
        var r2c1Offset = $("#r2c1").length - 28;
        
        var matchReportHeader = dateRegex($);

        function cleanRawContent (slector, position, conversion) {
            var response = ($(slector).text()).split("\n")[position].trim();
            return conversion === "number" ? parseFloat(response) : response;
        }

        callback({
            informe_url: resumeUrl,
            informe_id: parseInt(resumeDataSite.url),
            informe_fecha: reportDate(matchReportHeader),
            informe_numero: matchReportHeader.number,
            semana: cleanRawContent(".contorno #r2c2", $(".contorno #r2c2").length - 2, "number"),
            madrid: {
                nivel_difusion: cleanRawContent("#r1c2", 13),
                nivel_intensidad: cleanRawContent("#r1c3", 13),
                muestras_centinelas_examinadas: cleanRawContent("#r1c4", 13, "number"),
                porcentaje_muestras_positivas: cleanRawContent("#r1c5", 13, "number"),
                tipo_dominante: cleanRawContent("#r1c6", 13),
                tasa_100k: parseFloat($("#r1c7").text().match(/(.\d{1,3}.\d{0,2})/gm)[12].trim().replace(",", ".")) || null
            },
            detecciones_totales: {
                detecciones_centinela: {
                    ANS: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AH3: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AH3N2: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    B: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    C: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AnH1N1: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AnH1: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                },
                detecciones_no_centinela: {
                    ANS: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AH3: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AH3N2: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    B: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    C: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AnH1N1: cleanRawContent("#r2c1", r2c1Offset++, "number"),
                    AnH1: cleanRawContent("#r2c1", r2c1Offset++, "number")
                }
                
            }
        })
    })
}


module.exports = function(goblinDB){
    console.log("Flu_data.js - Process started...");

    getUrlData("http://vgripe.isciii.es/gripe/PresentarHomeInformes.do", function(dataSite){
        
        
        var keyData = {
            url: cheerio.load(dataSite)("option:last-child").attr('value')
        }
        
        if(keyData.url !== "-1"){
            getReportDetails (keyData, function(data){
                // Flu save...
                goblinDB.set(data, "flu");
                fs.writeFile('./data/flu.json', JSON.stringify(data), 'utf-8', function(err) {
                    if (err) console.log("Error saving Data in ../data/flu.json:", err);
                });
            })
        } else {
            // - To be documented better in release!
            console.log("[FLU] - No data available in this period of the year!!");
        }
    })

}
