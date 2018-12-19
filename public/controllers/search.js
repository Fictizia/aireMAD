(function(){

	angular.module("app")
		.controller("searchCtrl", searchController);
	
	function searchController(search) {
		var self = this;

		// Params
		self.show = true;
		self.userInput = ""; 
		self.placeholder = "Type things";

		// Properties
		self.service = search;
		self.update = update;

		// Methods
		self.clear = function() {
			self.userInput = '';
			// document.querySelector("#search .mdl-layout__header-row input").focus();
		};


		// Hands on!!
		console.log('search');


		update(); 

	}

	function update() {
		setTimeout(function() {
			// Update also the component handler to fix the js menus
			window.componentHandler.upgradeAllRegistered();
		}, 0); 
	}
})();