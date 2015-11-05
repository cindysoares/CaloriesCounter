(function() {
	var usersApp = angular.module('users', []);
	
	usersApp.factory('usersFindAllService', function($http) {
		var myService = {
				async: function () {
					var promise = $http.get("/users/all")
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	usersApp.controller('UsersCtrl', function($scope, usersFindAllService) {
		this.list = {};
		this.init = function() {
			usersFindAllService.async().then(function(d) {
				$scope.users.list = d;
			});
		};
		
		$scope.$on("tabSelected", function(event, args){
			if (args.selectedTab === 'users') {
				$scope.users.init();	
			}
		});
	});
	
})();