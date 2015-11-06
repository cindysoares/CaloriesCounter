(function(){
	var mealsApp = angular.module('meals', ['ngMessages']);
	
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
	
	mealsApp.controller('MealsCtrl', function($scope, $filter, addMealService, removeMealService) {
		this.$messages = {}
		this.editedMeal = {};
		this.editMode = false;
		this.calories = $scope.$parent.$parent.calories;
		this.selectedIndex = -1;
		this.dailyCaloriesCount = {};
		
		this.setEditMode = function(value) {
			this.editMode = value;
			this.init();
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
				this.$messages.warning = true;
			}
			removeMealService.async(this.calories.loggedUser.id, mealToRemove.id).then(function(removed) {
				if (removed) {
					$scope.editMeal.calories.loggedUser.meals.splice( $scope.editMeal.selectedIndex, 1 );
					$scope.editMeal.$messages.deleteSuccess = true;
				} else {
					$scope.editMeal.$messages.warning = true;
				}
			});			
		};
		this.addMeal = function() {
			addMealService.async(this.calories.loggedUser.id, this.editedMeal).then(function(d){
				if (d != null) {
					$scope.editMeal.calories.loggedUser.meals.push(d);
					$scope.editMeal.editedMeal = {};
					$scope.editMeal.editMode = false;
					$scope.editMeal.$messages.saveSuccess = true;
				} else {
					$scope.editMeal.$messages.warning = true;
				}
			});			
		};
		this.updateMeal = function() {
			this.loggedUser.meals.push(editedMeal);
		};
		this.init = function() {
			this.$messages = {}
			this.dailyCaloriesCount = {};
			for ( var mealIndex in this.calories.loggedUser.meals) {
				var meal = this.calories.loggedUser.meals[mealIndex];
				var date = $filter('date')(meal.date, 'shortDate');
				var count = this.dailyCaloriesCount[date];
				if (!count) {
					count = 0;
				}
				this.dailyCaloriesCount[date] = count + meal.calories;
			}
		};
		this.isAboveTheLimit = function(date) {
			var shortDate = $filter('date')(date, 'shortDate');
			var count = this.dailyCaloriesCount[shortDate];
			if(!count) return false;
			if(count <= this.calories.loggedUser.caloriesLimit) return false;
			return true;
		}

		$scope.$on("tabSelected", function(event, args){
			if (args.selectedTab === 'meals') {
				$scope.editMeal.init();	
			}
		});

	});
	
})();