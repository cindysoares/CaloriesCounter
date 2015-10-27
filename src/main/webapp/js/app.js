(function(){
	var app = angular.module('calories', []);
	
	var user = { 
			name: 'Cindy', 
			meals: [{date: new Date(2015, 9, 25, 14), text:'lunch', calories: 600},
			        {date: new Date(2015, 9, 25, 14), text:'breakfast', calories: 200},
			        {date: new Date(2015, 9, 25, 14), text:'dinner', calories: 400}
			        ] 
	};
  
	app.controller('CaloriesController', function(){
		this.loggedUser = user;
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
		this.editMode = false;
		this.setEditMode = function(value) {
			this.editMode = value;
		};
		this.removeMeal = function(mealToRemove) {
			this.user.meals.pop(mealToRemove);
		};
	});
	
})();