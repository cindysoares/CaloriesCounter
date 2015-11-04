(function(){
	var app = angular.module('calories', ['login', 'settings']);
	
	var user = {
			name: 'Cindy', 
			meals: [{date: new Date(2015, 9, 25, 14), text:'lunch', calories: 600, id: 1},
			        {date: new Date(2015, 9, 25, 14), text:'breakfast', calories: 200, id:2},
			        {date: new Date(2015, 9, 25, 14), text:'dinner', calories: 400, id: 3}
			        ] 
	};

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
		this.register = function() {
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
	
	app.directive('settings', function() {
		return { restrict: 'E', templateUrl: 'settings.html' };
	});
	
	app.directive('meals', function(){
		return { restrict: 'E', templateUrl: 'meals.html',
			controller: function($scope) {
				this.editedMeal = {};
				this.editMode = false;
				this.setEditMode = function(value) {
					this.editMode = value;
				};
				this.removeMeal = function(mealToRemove) {
					var index = -1;		
					var mealsArray = eval( this.loggedUser.meals );
					alert(mealsArray);
					for( var i = 0; i < mealsArray.length; i++ ) {
						if( mealsArray[i].id === mealToRemove.id ) {
							index = i;
							break;
						}
					}
					if( index === -1 ) {
						alert( "Something gone wrong" );
					}
					this.users.meals.splice( index, 1 );
					this.editedMeal = {};
					this.editMode = false;
				};
				this.addMeal = function() {
					this.loggedUser.meals.push(editedMeal);
					this.editedMeal = {};
					this.editMode = false;
				};
				this.updateMeal = function() {
					this.loggedUser.meals.push(editedMeal);
				};
				this.init = function() {
					// TODO
				};
				
				$scope.$on("tabSelected", this.init);

			}, controllerAs: 'editMeal'
		};
	});
		
})();