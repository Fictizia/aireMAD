(function(){

	angular.module("app")
		.factory("stations", homeService);

	function homeService($timeout, api) {

		var home = {
			data: [],
			gotten: false,
			get: get,
			find: find
		};

		return home;

		function get(cb) {

			// Uncomment the following lines to perform a server call
			api.get(api.URL + '/station', function(data) {
				
				home.data = data;
				home.gotten = true;

				if(typeof cb === 'function')
					cb(home.data);

			});
		}


		function find(id, cb) {

			if(home.gotten === true) {

				for (var i = home.data.length - 1; i >= 0; i--) {

					if(home.data[i].id == id) {

						if(typeof cb === 'function')
							cb(home.data[i]);

						return home.data[i];
					}
				}

			} else {
				get(function() { find(id, cb); });
			}

			return null;
		}

	}
	
})();