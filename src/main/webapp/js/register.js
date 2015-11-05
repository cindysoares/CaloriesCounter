(function() {
	var registerApp = angular.module('register', ['ngMessages']);
	
	registerApp.controller('RegisterCtrl', function($scope) {
		this.newUser = {};
		this.save = function() {
			$scope.calories.register(this.newUser);
		}
	});
	
})();