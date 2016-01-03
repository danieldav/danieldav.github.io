/*//https://www.codecademy.com/en/courses/learn-angularjs/lessons/your-first-app/exercises/your-first-app-ng-repeat-i

A module contains the different components of an AngularJS app
A controller manages the app's data
An expression displays values on the page
A filter formats the value of an expression

====================
https://www.codecademy.com/en/courses/learn-angularjs/lessons/directives/exercises/directives-generalizations?action=lesson_resume

Directives are a powerful way to create self-contained, interactive components.
Unlike jQuery which adds interactivity as a layer on top of HTML,
AngularJS treats interactivity as a native component of HTML.

==================
https://www.codecademy.com/en/courses/learn-angularjs/lessons/services/exercises/services-generalizations?action=lesson_resume

Why are services useful?
-------------------------
Instead of filling the controller with code to fetch weather data from a server,
it's better to move this independent logic into a service so that it can be
reused by other parts of the app.

What can we generalize so far?
------------------------------

Directives
----------
are a way to make standalone UI components, like <app-info>

Services
--------
are a way to make standalone communication logic, like forecast which fetches weather data from a server

==============================
https://www.codecademy.com/en/courses/learn-angularjs/lessons/routing/exercises/routing-routing-ii?action=lesson_resume

Great! A gallery of images shows up. How does it work?

1) In app.js inside the app.config() method, we use Angular's $routeProvider to define the application routes.

2) We used .when() to map the URL / to to the controller HomeController and the template home.html.
The HomeController uses the service js/services/photos.js to fetch the array of all photos from
https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json and stores it into $scope.photos.
The home.html uses ng-repeat to loop through each item in the photos array and display each photo.

3) Otherwise if a user accidentally visits a URL other than /, we just redirect to / using .otherwise().

4) Now when a user visits /, a view will be constructed by injecting home.html into
the <div ng-view></div> in index.html.

=====================================
*/

//https://www.codecademy.com/en/courses/learn-angularjs/lessons/routing/exercises/routing-generalizations?action=lesson_resume

// The following is the project tree:

// index.html
// css/main.css
// img/logo.svg
// js/app.js
// js
// |
// controllers
//   |
//   HomeController.js
//   PhotoCOntroller.js
// services
//   |
//   photos.js
// shared
//   |
//   angular.min.js
// views
//   |
//   home.html
//   photo.html

//////////////////////////
//Index.html   //////////
/////////////////////////
/*
<!doctype html>
<html>
  <head>
    <link href="https://s3.amazonaws.com/codecademy-content/projects/bootstrap.min.css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,500,300' rel='stylesheet' type='text/css'>
    <link href="css/main.css" rel="stylesheet" />

    <!-- Include the core AngularJS library -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js"></script>

    <!-- Include the AngularJS routing library -->
    <script src="https://code.angularjs.org/1.2.28/angular-route.min.js"></script>
  </head>
  <body ng-app="GalleryApp">

    <div class="header">
      <div ng-view></div>
      <div class="container">
        <a href="/#/">
          <img src="img/logo.svg" width="80" height="80"> &#12501; &#65387; &#12488; &#12501; &#65387; &#12488;
        </a>
      </div>
    </div>



    <!-- Modules -->
    <script src="js/app.js"></script>

    <!-- Controllers -->
    <script src="js/controllers/HomeController.js"></script>
    <script src="js/controllers/PhotoController.js"></script>

    <!-- Services -->
    <script src="js/services/photos.js"></script>

  </body>
</html>
*/
///////////////////////////////
// CSS/main.css
//////////////////////////////////
/*
html, body {
  background: #fff;
  font-family: Arial, sans-serif;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-transform: lowercase;
}
.container {
  padding: 0;
  width: 100%;
}
.header {
  margin: 0;
  padding: 0;
}
.header img {
  margin: 0 20px 0 0;
  height: 80px;
  width: 80px;
}
.header a {
  color: #000;
  font-size: 20px;
  text-decoration: none;
}
.header a:hover {
  color: #c91717;
  text-decoration: none;
}
.main h2 {
  background: #000;
  color: #fff;
  font-size: 16px;
  height: 80px;
  margin: 0;
  padding: 10px;
  position: absolute;
  width: 80px;
  z-index: 1;
}
.item {
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.item:hover {
  background: #000;
  text-decoration: none;
  transition: background 500ms;
}
p.author {
  color: #000;
  padding: 24px;
  text-align: left;
}
.item:hover p.author, .item:hover a {
  color: #fff;
  text-decoration: none;
}
.photo {
  margin: 0 0 80px;
}
.photo img {
  width: 100%;
}
.photo h2 {
  color: #000;
  padding: 20px 108px;
}
.photo p {
  color: #6f6f6f;
  margin: 0;
  padding: 0 108px 0;
}

*/

//js/App.js

var app = angular.module('GalleryApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
  	.when('/', {
     	controller: 'HomeController',
      templateUrl: 'views/home.html'
  	})
     .when('/photos/:id', {
     	controller: 'PhotoController',
      templateUrl: 'views/photo.html'
  	})
  	.otherwise({
  		redirectTo: '/'
  	});
});

//js/controllers/HomeController.js

app.controller('HomeController', ['$scope', 'photos', function($scope, photos) {
  photos.success(function(data) {
    $scope.photos = data;
  });
}]);

//js/controllers/PhotoController.js

app.controller('PhotoController', ['$scope', 'photos', '$routeParams', function($scope, photos, $routeParams) {
  photos.success(function(data) {
    $scope.detail = data[$routeParams.id];
  });
}]);

// services/photos.js

return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json')
       .success(function(data) {
         return data;
       })
       .error(function(data) {
         return data;
       });
}]);

// views/home.html

/*
<div class="main">
  <div class="container">

    <h2>Recent Photos</h2>
    <div class="row">
      <div class="item col-md-4" ng-repeat="photo in photos">
        <a href="#/photos/{{$index}}">
          <img class="img-responsive" ng-src="{{ photo.url }}">
          <p class="author">by {{ photo.author }}</p>
        </a>
      </div>
    </div>

  </div>
</div>
*/

// views/photo.html

/*
<div class="photo">
  <div class="container">
    <img ng-src="{{ detail.url }}">
    <h2 class="photo-title"> {{detail.title}}</h2>
    <p class="photo-author">{{detail.author}} </p>
    <p class="photo-views">{{detail.views | number}} </p>
    <p class="photo-upvotes"> {{detail.upvotes | number}}</p>
    <p class="photo-pubdate">{{detail.pubdate | date}} </p>
  </div>
</div>
*/
