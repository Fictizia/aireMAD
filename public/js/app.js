(function() {

	var app = angular.module('app', ['ui.router', 'ngMap'])

		.config(['$stateProvider', '$urlRouterProvider', 
			function($stateProvider, $urlRouterProvider) {

				$urlRouterProvider.otherwise('/');
			
				$stateProvider
					.state('home', {
						url: "/",
						views: {
							"content": { templateUrl: "views/home.html" }
						},
						// abstract: true,
						viewCache: true
					})

					// .state('station', {
					// 	url: "/station/:id", 
					.state('station', {
						parent: 'home',
						url: "station/:id", 
						views: {
							// "content": { templateUrl: "views/home.html" },
							"panel@": { 
								templateUrl: "views/station.html",
								controller: function() {
									console.log('sdf');
								}
							}
						}
					})

			}
		]);

	
})();