(function(){

	angular.module("app")
		.controller("homeCtrl", homeController);
	
	function homeController(NgMap, stations, map) {
		var self = this;

		// Params
		// self.map = null;

		self.mapParams = map;
		self.map = map;

		// self.mapCenter = [40.432866, -3.7079987];
		// self.mapZoom = 10;

		self.goTo = function(params, id) {
			self.map.map.setCenter(params);
			$state.go('station', {id: id});
		};

		self.stations = stations;

		// // Hands on!
		NgMap.getMap().then(function(map) {
			self.map.map = map;
			// self.map = map;
		});


		stations.get();

		update(); 


		function setPoints() {
			console.log('asdf');
		}

	}

	function update() {
		setTimeout(function() {
			// Update also the component handler to fix the js menus
			window.componentHandler.upgradeAllRegistered();
		}, 0); 
	}
})();