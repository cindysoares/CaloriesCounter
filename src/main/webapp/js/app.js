(function(){
  var user = { name: 'Cindy', meals: [] };
  var app = angular.module('calories', []);
  app.controller('CaloriesController', function(){
	  this.loggedUser = user;
  });
})();