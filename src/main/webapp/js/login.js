(function() {
	
	var loginApp = angular.module('login', []);	
	
	loginApp.factory('loginFactory', function($http) {
		var myService = {
				async: function (emailValue, passwordValue) {
					var promise = $http.get('/login', { params: {email: emailValue, password: passwordValue} })
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	loginApp.controller('LoginCtrl', function(loginFactory, $scope) {
		this.email = null;
		this.password = null;
		this.submit = function() {
			loginFactory.async(this.email, this.password).then(function(d) { 
				$scope.calories.loggedUser = d;
				$scope.calories.loggingShowing = false;
			});
		};
	});  
	
})();