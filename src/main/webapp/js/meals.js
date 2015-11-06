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
	
	mealsApp.factory('updateMealService',  function($http) {
		var myService = {
				async: function (userId, meal) {
					var promise = $http.post("/meals/update/" + userId + "/" + meal.id, null, 
							{params: {date: meal.date.getTime(), description: meal.description, calories: meal.calories}})
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});	
	
	mealsApp.controller('MealsCtrl', function($scope, $filter, addMealService, removeMealService, updateMealService) {
		this.$messages = {}
		this.editedMeal = {};
		this.editMode = false;
		this.calories = $scope.$parent.$parent.calories;
		this.selectedIndex = -1;
		this.dailyCaloriesCount = {};
		this.filters = {};
		this.list = {};
		
		this.setEditMode = function(value) {
			this.init();
			this.editMode = value;
		};
		this.isEditMode = function(meal) {
			if(!this.editMode) return false;
			if(!meal) return false;
			
			if( !this.editMode.id && !meal.id ) {
				return true;
			}
			
			if(this.editMode.id === meal.id) {
				return true;
			}
			return false;
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
					$scope.editMeal.recountDailyCalories();
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
					$scope.editMeal.recountDailyCalories();
					$scope.editMeal.editedMeal = {};
					$scope.editMeal.editMode = false;
					$scope.editMeal.$messages.saveSuccess = true;
				} else {
					$scope.editMeal.$messages.warning = true;
				}
			});			
		};
		this.updateMeal = function(mealToUpdate) {
			this.selectedIndex = this.calories.loggedUser.meals.indexOf(mealToUpdate);
			updateMealService.async(this.calories.loggedUser.id, mealToUpdate).then(function(d){				
				if (d != null) {
					$scope.editMeal.calories.loggedUser.meals.splice( $scope.editMeal.selectedIndex, 1 );
					$scope.editMeal.calories.loggedUser.meals.push(d);
					$scope.editMeal.recountDailyCalories();
					$scope.editMeal.editMode = false;
					$scope.editMeal.$messages.updateSuccess = true;
				} else {
					$scope.editMeal.$messages.warning = true;
				}
			});		
		};
		this.init = function() {
			this.list = this.calories.loggedUser.meals;
			this.editMode = false;
			this.editedMeal = {};
			this.$messages = {};
			this.filters = {};
			this.recountDailyCalories();
		};
		this.recountDailyCalories = function() {
			this.dailyCaloriesCount = {};
			for ( var mealIndex in this.calories.loggedUser.meals) {
				var meal = this.calories.loggedUser.meals[mealIndex];
				var shortDate = $filter('date')(meal.date, 'shortDate');
				var count = this.dailyCaloriesCount[shortDate];
				if (!count) {
					count = 0;
				}
				this.dailyCaloriesCount[shortDate] = count + meal.calories;
				meal.date = new Date(meal.date);				
			}
			this.calories.loggedUser.meals.sort(function(a, b){return b.date.getTime()-a.date.getTime()});
		}
		this.isAboveTheLimit = function(date) {
			var shortDate = $filter('date')(date, 'shortDate');
			var count = this.dailyCaloriesCount[shortDate];
			if(!count) return false;
			if(count <= this.calories.loggedUser.caloriesLimit) return false;
			return true;
		}
		
		this.filter = function() {
			this.list = this.calories.loggedUser.meals.filter(function(meal){
				var shortDateFrom = $filter('date')($scope.editMeal.filters.dateFrom, 'yyyyMMdd');
				var shortDateTo = $filter('date')($scope.editMeal.filters.dateTo, 'yyyyMMdd');
				var shortTimeFrom = $filter('date')($scope.editMeal.filters.timeFrom, 'HHmm');
				var shortTimeTo = $filter('date')($scope.editMeal.filters.timeTo, 'HHmm');

				var mealShortDate = $filter('date')(meal.date, 'yyyyMMdd');
				var mealShortTime = $filter('date')(meal.date, 'HHmm');
				
				return (!shortDateFrom || mealShortDate >= shortDateFrom )
					&& (!shortDateTo || mealShortDate <= shortDateTo )
					&& (!shortTimeFrom || mealShortTime >= shortTimeFrom )
					&& (!shortTimeTo || mealShortTime <= shortTimeTo );
			});
		};

		$scope.$on("tabSelected", function(event, args){
			if (args.selectedTab === 'meals') {
				$scope.editMeal.init();	
			}
		});

	});
	
})();