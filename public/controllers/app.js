(function(){

	angular.module("app")
		.controller("appCtrl", appController);
	
	function appController() {
		var self = this;

		// Params
		self.hello = "world";

		// Properties
		// self.session = session;
		
		// Methods
		self.update = update;
		self.closeSidebar = closeSidebar;
		self.logout = logout;
		self.back = back;

		// Hands on!

		// If login enabled, comment the following line
		// session.set({name: 'Jhon Doe', uid: '123', pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg', notifications: 2});

		update();
	}


	function update() {
		setTimeout(function() {
			// Update also the component handler to fix the js menus
			window.componentHandler.upgradeAllRegistered();
		}, 0); 
	}

	function closeSidebar() {
		var drawer = angular.element(document.querySelector('.mdl-layout__drawer'));
		var obfuscator = angular.element(document.querySelector('.mdl-layout__obfuscator'));

		if(drawer) {
			drawer.toggleClass('is-visible');
			obfuscator.toggleClass('is-visible');
		}
	}

	function logout() {
		console.log('Shall close the session but... not yet T_T')
	}

	function back() {
		console.log('back');
		window.history.back();
	}
	
})();