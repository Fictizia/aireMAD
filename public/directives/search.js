(function () {

	angular
		.module('app')
		.directive('search', searchDirective);


	function searchDirective(stations) {

		return {
			restrict: 'E',
			link: function(scope, element, attrs) {
				scope.stations = stations;

				scope.goto = function() {
					console.log('yeeeeah');
					console.log(stations.data);
				};
			},
			templateUrl: 'views/search.html'
		};

	}

})();