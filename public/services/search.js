(function(){

	angular.module("app")
		.factory("search", searchService);

	function searchService(api) {

		var search = {
			results: [],
			search: search
		};

		return search;

		function search(query) {

			api.get(api.URL + "/search?q=" + query, function(data, status) {
				// console.log(status);
				console.log(data);

				search.results = data;
			});

		}

	}

	
})();