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
		this.calories = $scope.$parent.$parent.calories;
		this.save = function() {			
			settingsService.async(this.calories.loggedUser.id, this.caloriesLimit).then(function(d) {
				this.result = d;
				if(result) {
					$scope.settings.calories.loggedUser.caloriesLimit = $scope.settings.caloriesLimit;
					$scope.settings.$messages.saveSuccess = true;
				} else {
					$scope.settings.$messages.warning = true;
				}
			});
		};
		this.init = function() {
			this.caloriesLimit = this.calories.loggedUser.caloriesLimit;
			$scope.settings.$messages = {};
		};
		
		$scope.$on("tabSelected", function(event, args){
			if (args.selectedTab === 'settings') {
				$scope.settings.init();	
			}
		});
		
	});
	
})();