angular.module('app', ['ngRoute']).config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'index.html',
                controller  : 'MainController'
            })

            // route for the submission page *secret to only sharon* 
            .when('/sharonsubmit', {
                templateUrl : 'sharonsubmit.html',
                controller  : 'SubmitController'
            })
    })
.controller('MainController', function($scope, $location){

  var myDataRef = new Firebase('https://shpicks111.firebaseio.com/');
  $scope.testText = "I am global";
  $scope.restaurant = {};
  $scope.introVisible = true;
  $scope.cities = [
    {name:"Select a city to get started"},
    {name:'San Francisco', img: './assets/SanFran.jpg'},
    {name:'Vancouver'}, 
    {name:'SoCal', img: './assets/socal.jpg'}, 
    {name:'NY'}, 
    {name:'Chicago', img:'./assets/chicago.jpg'}, 
    {name:'Austin', img:'./assets/austin.jpg'}, 
    {name:'Portland'}, 
    {name:'Seattle'},
    {name:'Phoenix'},
    {name:'SLC'},
    {name:'Paris'},
    {name:'Berlin'}, 
    {name:'Copenhagen'},
    {name:'Budapest'},
    {name:'Prague'},
    {name:'Tokyo'},
    {name:'Barcelona'}, 
    {name:'Seville'}, 
    {name:'Vegas'}];

  $scope.add = function(restaurant){
    myDataRef.push(restaurant);
    $scope.fetchAll();
  }

  $scope.fetchAll = function(){
    myDataRef.on("value", function(snapshot) {
      $scope.restaurant = snapshot.val();
      $scope.$apply(); //need to refresh digest cycle because of weird async issues with angular
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  $scope.fetchAll();

  $scope.filterCity = function(input){
    var parameter = input.split(' ').join('').toLowerCase(); //parse the input to match JSON 
    $scope.introVisible = false;
    $scope.filteredItems = $scope.restaurant.filter(function(elem){
      return elem.li === parameter;
    })
  }
}).controller('SubmitController', function($scope){
  $scope.test = function(){
    console.log("Clicked")
    alert("Ive been clicked");
  }
})

