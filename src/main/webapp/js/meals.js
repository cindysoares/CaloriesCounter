(function(){
	var mealsApp = angular.module('meals', []);
	
	mealsApp.factory('addMealService',  function($http) {
		var myService = {
				async: function (userId, meal) {
					var promise = $http.post("/meals/add/" + userId, null, 
							{params: {date: meal.date.getTime(), description: meal.description, calories: meal.calories}})
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	mealsApp.factory('removeMealService',  function($http) {
		var myService = {
				async: function (userId, mealId) {
					var promise = $http.delete("/meals/remove/" + userId + "/" + mealId)
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
	
	mealsApp.controller('MealsCtrl', function($scope, addMealService, removeMealService) {
		this.editedMeal = {};
		this.editMode = false;
		this.calories = $scope.$parent.$parent.calories;
		this.selectedIndex = -1;
		
		this.setEditMode = function(value) {
			this.editMode = value;
		};
		this.removeMeal = function(mealToRemove) {
			this.selectedIndex = -1
			var mealsArray = eval( this.calories.loggedUser.meals );
			for( var i = 0; i < mealsArray.length; i++ ) {
				if( mealsArray[i].id === mealToRemove.id ) {
					this.selectedIndex = i;
					break;
				}
			}
			if( this.selectedIndex === -1 ) {
				alert( "Something gone wrong" );
			}
			removeMealService.async(this.calories.loggedUser.id, mealToRemove.id).then(function(removed) {
				if (removed) {
					$scope.editMeal.calories.loggedUser.meals.splice( $scope.editMeal.selectedIndex, 1 );
				}
			});			
		};
		this.addMeal = function() {
			addMealService.async(this.calories.loggedUser.id, this.editedMeal).then(function(d){
				if (d != null) {
					$scope.editMeal.calories.loggedUser.meals.push(d);
					$scope.editMeal.editedMeal = {};
					$scope.editMeal.editMode = false;
				}
			});			
		};
		this.updateMeal = function() {
			this.loggedUser.meals.push(editedMeal);
		};
		this.init = function() {
			// TODO
		};

		$scope.$on("tabSelected", this.init);

	});
	
})();