(function(){
	var app = angular.module('calories',[]);
	
	app.controller('SettingsController', ['$http', function($http) {
		var caloriesLimit = 0;
		$http.get('/settings/1/2000').then(function(data){
			this.caloriesLimit = data;
		}).catch(function(reason) {
			alert('erro: ' + reason);
		});
	}]);
	
	var user = { 
			name: 'Cindy', 
			meals: [{date: new Date(2015, 9, 25, 14), text:'lunch', calories: 600, id: 1},
			        {date: new Date(2015, 9, 25, 14), text:'breakfast', calories: 200, id:2},
			        {date: new Date(2015, 9, 25, 14), text:'dinner', calories: 400, id: 3}
			        ] 
	};
	
	app.factory('loginFactory', function($http) {
		var myService = {
				async: function () {
					var promise = $http.get('/login', { params: {email: 'cindy@email.com', password: 'senha'} })
					.then(function(response){
						return response.data;
					});
					return promise;
				}
		};
		return myService;
	});
  
	app.controller('CaloriesController', function(loginFactory, $scope){
		this.loggedUser = null;
		this.loggingShowing = false;
		this.registeringShowing = false;
		this.logout = function() {
			this.loggedUser = null;
		};
		this.login = function() {
			loginFactory.async().then(function(d) { 
				$scope.calories.loggedUser = d;
				$scope.calories.loggingShowing = false;
			});
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
  
	app.controller('SectionController', function() {
		this.selectedTab = 1;
		this.setTab = function(newTab) {
			this.selectedTab = newTab;
		};
		this.isSelected = function(tab) {
			return this.selectedTab === tab;
		};
	});
	
	app.directive('meals', function(){
		return { restrict: 'E', templateUrl: 'meals.html',
			controller: function() {
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

			}, controllerAs: 'editMeal'
		};
	});
		
})();