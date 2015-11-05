(function() {
	var usersApp = angular.module('users', ['ngMessages']);
	
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
	
	usersApp.factory('usersAddService', function($http) {
		var myService = {
				async: function (newUser) {
					var promise = $http.post("/users/add", null, {params:{
						name: newUser.name,
						email: newUser.email,
						password: newUser.password,
						profile: newUser.profile
					}})
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	usersApp.controller('UsersCtrl', function($scope, usersFindAllService, usersAddService) {
		this.list = {};
		this.editMode = false;
		this.newUser = {}
		this.$messages = {};
		this.setEditMode = function(value) {
			this.editMode = value;
		};
		this.init = function() {
			usersFindAllService.async().then(function(d) {
				$scope.users.list = d;
			});
			this.$messages = {};
		};
		this.addUser = function() {
			if(this.newUser.password != this.newUser.repeatedPassword) {
				this.$messages.warning = true;
				return;
			}
			usersAddService.async(this.newUser).then(function(data) {
				if(data != null) {
					$scope.users.list.push(data);
					$scope.users.$messages.saveSuccess = true;
					$scope.users.newUser = {};
					$scope.users.setEditMode(false);
				} else {
					$scope.users.$messages.warning = true;
				}
			});
		};
		
		$scope.$on("tabSelected", function(event, args){
			if (args.selectedTab === 'users') {
				$scope.users.init();	
			}
		});
	});
	
})();