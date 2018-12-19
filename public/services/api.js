(function(){

	angular.module("app")
		.factory("api", apiService);

	function apiService($http) {

		var api = {
			URL: '/api/v1',
			token: null,
			get: get,
			post: post,
			setAuthorizationToken: setAuthorizationToken
		};

		return api;

		function post(url, data, callback) {

			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			if(api.token !== null) {
				headers.Authorization = 'Bearer ' + api.token;
			}

			$http({
				method: 'POST',
				url: url,
				headers: headers,
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: data
			}).success(function(data, status) {
				if(typeof(callback) != 'undefined') {
					callback(data, status);
				}
			});
		}

		function get(url, callback) {

			var headers = {};

			if(api.token !== null) {
				headers.Authorization = 'Bearer ' + api.token;
			}

			$http({
				method: 'GET',
				url: url,
				headers: headers,
			}).success(function(data, status) {
				if(typeof(callback) != 'undefined') {
					callback(data, status);
				}
			});
		}

		function setAuthorizationToken(token) {
			api.token = token;
		}

	}

	
})();
