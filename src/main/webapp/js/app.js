(function(){
	var app = angular.module('calories', []);
	
	var user = { 
			name: 'Cindy', 
			meals: [{date: new Date(2015, 9, 25, 14), text:'lunch', calories: 600, id: 1},
			        {date: new Date(2015, 9, 25, 14), text:'breakfast', calories: 200, id:2},
			        {date: new Date(2015, 9, 25, 14), text:'dinner', calories: 400, id: 3}
			        ] 
	};
  
	app.controller('CaloriesController', function(){
		this.loggedUser = user;
		this.logout = function() {
			this.loggedUser = {};
		};
		this.login = function() {
			this.loggedUser = user;
		};
	});
  
	app.controller('SectionController', function() {
		this.selectedTab = 1;
		this.setTab = function(newTab) {
			this.selectedTab = newTab;
		};
		this.isSelected = function(tab) {
			return this.selectedTab === tab;
		};
	});
	
	app.controller('EditMealController', function() {
		this.editedMeal = {};
		this.editMode = false;
		this.setEditMode = function(value) {
			this.editMode = value;
		};
		this.removeMeal = function(mealToRemove) {
			var index = -1;		
			var mealsArray = eval( this.loggedUser.meals );
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

	});
	
})();