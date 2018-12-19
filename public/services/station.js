(function(){

	angular.module("app")
		.factory("station", stationService);

	function stationService(api) {

		var station = {
			data: {},
			gotten: false,
			get: get,
			getAll: getAll
		};

		return station;

		function get(id, cb) {

			// Uncomment the following lines to perform a server call
			api.get(api.URL + '/station/' + id, function(data) {
				
				station.data = data;
				station.gotten = true;

				console.log(station.data);

				if(typeof cb === 'function')
					cb(station.data);

			});
		}



		function clear() {
			station.data = {};
		}


		function getAll(id) {

			clear();

			var res = 0,
				total = 4;

			getWeather(id, function() { if(++res === total) { station.gotten = true; console.log(station.data); } });
			getPolen(id, function() { if(++res === total) { station.gotten = true; console.log(station.data); } });
			getAcustic(id, function() { if(++res === total) { station.gotten = true; console.log(station.data); } });
			getPollution(id, function() { if(++res === total) { station.gotten = true; console.log(station.data); } });



		}


		function getWeather(id, cb) {
			api.get(api.URL + '/weather/' + id, function(data) {
				
				if(typeof(data.list) !== undefined)
					station.data.weather = data.list[0];

				if(typeof cb === 'function')
					cb(station.data);

			});
		}

		function getPolen(id, cb) {
			api.get(api.URL + '/pollen/' + id, function(data) {
				
				station.data.pollen = data.mediciones;

				if(typeof cb === 'function')
					cb(station.data);

			});
		}

		function getAcustic(id, cb) {
			api.get(api.URL + '/acustic/' + id, function(data) {
				
				station.data.acustic = data.total;

				if(typeof cb === 'function')
					cb(station.data);

			});
		}

		function getPollution(id, cb) {
			api.get(api.URL + '/pollution/' + id, function(data) {
				
				station.data.pollution = data;

				if(typeof cb === 'function')
					cb(station.data);

			});
		}

	}
	
})();