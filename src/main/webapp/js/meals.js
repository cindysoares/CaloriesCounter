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
					var promise = $http.post("/meals/remove/" + userId + "/" + mealId, null)
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
		
		this.setEditMode = function(value) {
			this.editMode = value;
		};
		this.removeMeal = function(mealToRemove) {
			var index = -1;		
			var mealsArray = eval( this.calories.loggedUser.meals );
			for( var i = 0; i < mealsArray.length; i++ ) {
				if( mealsArray[i].id === mealToRemove.id ) {
					index = i;
					break;
				}
			}
			if( index === -1 ) {
				alert( "Something gone wrong" );
			}
			this.calories.loggedUser.meals.splice( index, 1 );
			this.editedMeal = {};
			this.editMode = false;
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
		this.save = function() {
			alert('saving');
		}
		this.init = function() {
			// TODO
		};

		$scope.$on("tabSelected", this.init);

	});
	
})();