(function(){

	angular.module("app")
		.factory("map", apiService);

	function apiService($http) {

		var map = {
			map: null,
			center: [40.432866, -3.7079987],
			zoom: 5
		};

		return map;
	}

	
})();
