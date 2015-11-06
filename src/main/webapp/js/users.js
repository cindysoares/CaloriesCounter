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
	
	usersApp.factory('usersRemoveService', function($http) {
		var myService = {
				async: function (userId) {
					var promise = $http.delete("/users/remove/"+userId)
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	usersApp.factory('usersUpdateService', function($http) {
		var myService = {
				async: function (user) {
					var promise = $http.post("/users/update/"+user.id, null, {params:{
						name: user.name,
						email: user.email,
						password: user.password,
						profile: user.profile
					}})
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});	
	
	usersApp.controller('UsersCtrl', function($scope, usersFindAllService, usersAddService, usersRemoveService, usersUpdateService) {
		this.list = {};
		this.editMode = false;
		this.newUser = {}
		this.$messages = {};
		this.setEditMode = function(value) {
			this.editMode = value;
		};
		this.isEditMode = function(user) {
			if(!this.editMode) return false;
			if(!user) return false;
			
			if( !this.editMode.id && !user.id ) {
				return true;
			}
			
			if(this.editMode.id === user.id) {
				return true;
			}
			return false;
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
		this.removeUser = function(userToRemove) {
			this.selectedIndex = -1
			var usersArray = eval( this.list );
			for( var i = 0; i < usersArray.length; i++ ) {
				if( usersArray[i].id === userToRemove.id ) {
					this.selectedIndex = i;
					break;
				}
			}
			if( this.selectedIndex === -1 ) {
				this.$messages.warning = true;
			}
			usersRemoveService.async(userToRemove.id).then(function(removed) {
				if (removed) {
					$scope.users.list.splice( $scope.users.selectedIndex, 1 );
					$scope.users.$messages.deleteSuccess = true;
				} else {
					$scope.users.$messages.warning = true;
				}
			});			
		};
		this.updateUser = function(userToUpdate) {
			this.selectedIndex = this.list.indexOf(userToUpdate);
			usersUpdateService.async(userToUpdate).then(function(d){				
				if (d != null) {
					$scope.users.list.splice( $scope.users.selectedIndex, 1 );
					$scope.users.list.push(d);
					$scope.users.editMode = false;
					$scope.users.$messages.updateSuccess = true;
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