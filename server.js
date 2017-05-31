var project = require('pillars'),
    Scheduled = require("scheduled"),
    GDB = require("goblindb"),
    acusticData = require('./scheduled_tasks/acustic_data'),
    fluData = require('./scheduled_tasks/flu_data'),
    pollenData = require('./scheduled_tasks/pollen_data'),
    pollutionData = require('./scheduled_tasks/pollution_data'),
    stationsData = require('./scheduled_tasks/station_data'),
    weatherData = require('./scheduled_tasks/weather_data'),
    apiManagement = require('./routes/api');


/* --- Goblin Setup --- */
var goblinDB = GDB();


/* --- Manual Recovery --- */
if(process.argv[2] && process.argv[2] === "-clean"){
    require('./wakeup')(goblinDB);
}

/* --- HTTP SERVER --- */

// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();


// Routes definition
var apiDetails = new Route({
    id: 'apidetails',
    path: 'api/*:version',
    cors: true
}, function(gw) {
    // to -> Documentation 
    gw.redirect("http://docs.airemad.apiary.io/");
});

var apiRoutes = new Route({
    id: 'apiRoutes',
    path: 'api/v1/:path/*:id',
    cors: true,
    method: "GET"
}, function(gw) {
    apiManagement(gw, goblinDB);
});

var rootRoutes = new Route({
    id: 'rootRoutes',
    path: '/*',
    cors: true,
    method: "GET",
    directory: {
        path: './public/index.html',
        listing: true
    }
});

var staticFiles = new Route({
    id: 'estatics',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});

// Adding Routes to Pillars
project.routes.add(apiRoutes);
project.routes.add(apiDetails);
project.routes.add(rootRoutes);
project.routes.add(staticFiles);


/* --- CRON Tasks --- */

// Every hour
var everyHourTasks = new Scheduled({
    id: "everyHourTasks",
    pattern: "0 * * * * *", // At xx:00
    task: function() {
        pollutionData(goblinDB);
    }
}).start();



// Every 2 hours...
var everyTwoHoursTasks = new Scheduled({
    id: "everyTwoHoursTasks",
    pattern: "0 */2 * * * *", // Every two hours
    task: function() {
        weatherData(goblinDB);
    }
}).start();


// Every Day
var everyDayTasks = new Scheduled({
    id: "everyWorkingDayTasks",
    pattern: "0 8 * * * *", // Every Day 08:00
    task: function() {
        pollenData(goblinDB); // Not sure about weekends support
        acusticData(goblinDB);
    }
}).start();


// Every Week
var everyWeekTasks = new Scheduled({
    id: "everyWeekTasks",
    pattern: "0 8 * * 1 *", // Monday 08:00
    task: function() {
        fluData(goblinDB);
    }
}).start();


/* --- INITIAL Tasks --- */
stationsData(goblinDB);
everyHourTasks.launch();
everyTwoHoursTasks.launch();
everyDayTasks.launch();
everyWeekTasks.launch();
