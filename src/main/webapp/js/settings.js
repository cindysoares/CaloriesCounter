(function() {
	
	var settingsApp = angular.module('settings', ['ngMessages']);
	
	settingsApp.factory('settingsService', function($http) {
		var myService = {
				async: function (userId, caloriesLimit) {
					var promise = $http.post("/settings/" + userId + "/" + caloriesLimit, null)
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	settingsApp.controller('SettingsController', function(settingsService, $scope) {
		this.caloriesLimit = null;
		this.$messages = {};
		this.save = function() {
			this.calories = $scope.$parent.$parent.calories;
			settingsService.async(this.calories.loggedUser.id, $scope.settings.caloriesLimit).then(function(d) {
				this.result = d;
				if(result) {
					$scope.settings.$messages.success = true;
				} else {
					$scope.settings.$messages.error = true;
				}
			});
		};
		
	});
	
})();