
module.exports = function (gw, goblinDB) {
    
    if(apiRoutValidation(gw.pathParams.path)){
        var data = goblinDB.get(gw.pathParams.path);
        if(data){
            if (gw.pathParams.id) {
                if (idRouteValidation(gw.pathParams.path)){
                    if( data[gw.pathParams.id] ) {
                        // Right details sended
                        gw.json(data[gw.pathParams.id], {deep: 10});
                    } else {
                        // Data not available in Goblin yet...
                        gw.json(500);
                    }
                } else {
                    // Invalid details asked like api/v1/stations/wrong-details
                    gw.json(404);
                }
            } else {
                
                if(idRouteValidation(gw.pathParams.path)){
                    // General information asked for a detailed API Route
                    var cleanResponse = [];
                    for (var element in data) {
                        if (data.hasOwnProperty(element)) {
                            cleanResponse.push(data[element]);
                        }
                    }
                    gw.json(cleanResponse, {deep: 10}); 
                } else {
                    // General information asked for a NON-detailed API Route
                    gw.json(data, {deep: 10}); 
                }

            }
        } else {
            // Data not available in Goblin yet...
            gw.json(500);
        }
    } else {
        // Invalid Route like: api/v1/foo
        gw.json(404);
    }   
};

function idRouteValidation (pathDetail) {
    return ['weather', 'station', 'acustic', 'pollution', 'pollen'].indexOf(pathDetail) !== -1 
}

function apiRoutValidation(pathDetail){
    return ['weather', 'station', 'acustic', 'pollution', 'flu', 'pollen'].indexOf(pathDetail) !== -1 

}

