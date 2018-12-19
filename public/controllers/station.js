(function(){

	angular.module("app")
		.controller("stationCtrl", stationController);
	
	function stationController($stateParams, stations, station) {
		var self = this;

		// Params
		self.stations = stations;
		self.station = station;

		self.preStation = {};



		console.log($stateParams);

		self.stations.find($stateParams.id, function(station) {
			self.preStation = station;
		console.log(station)
		});


		// self.station.get($stateParams.id || -1);
		self.station.getAll($stateParams.id || -1);

		update(); 

	}

	function update() {
		setTimeout(function() {
			// Update also the component handler to fix the js menus
			window.componentHandler.upgradeAllRegistered();
		}, 0); 
	}
})();