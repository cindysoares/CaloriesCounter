(function(){
	var mealsApp = angular.module('meals', []);
	
	mealsApp.controller('MealsCtrl', function($scope) {
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

	});
	
})();