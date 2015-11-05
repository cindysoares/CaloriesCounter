(function(){
	var app = angular.module('calories', ['login', 'settings', 'meals', 'register', 'users']);

	app.controller('CaloriesController', function(){
		this.loggedUser = null;
		this.loggingShowing = false;
		this.registeringShowing = false;
		this.logout = function() {
			this.loggedUser = null;
		};
		this.showLogin = function() {
			this.loggingShowing = true;
			this.registeringShowing = false;
		};
		this.showRegister = function() {
			this.registeringShowing = true;
			this.loggingShowing = false;
		};
		this.register = function(user) {
			this.loggedUser = user;
			this.registeringShowing = false;
		};
	});
  
	app.controller('SectionController', function($scope) {
		this.selectedTab = 'meals';
		this.setTab = function(newTab) {
			this.selectedTab = newTab;
			$scope.tabSelected();	
		};
		this.isSelected = function(tab) {
			return this.selectedTab === tab;
		};
		$scope.tabSelected = function(){
		   $scope.$broadcast("tabSelected", {selectedTab: $scope.section.selectedTab});
		};
	});
	
	app.directive('login', function() {
		return { restrict: 'E', templateUrl: 'login.html' };
	});
	
	app.directive('register', function() {
		return { restrict: 'E', templateUrl: 'register.html' };
	});
	
	app.directive('settings', function() {
		return { restrict: 'E', templateUrl: 'settings.html' };
	});
	
	app.directive('meals', function(){
		return { restrict: 'E', templateUrl: 'meals.html' };
	});
	
	app.directive('users', function(){
		return { restrict: 'E', templateUrl: 'users.html' };
	});
		
		
})();