// Angular module, defining routes for the app

var app = angular.module('hnw', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('main', {
            abstract: true,
            templateUrl: "views/main.html",
            controller: mainCtrl
        })
        .state('home', {
            url: "/",
            parent: 'main',
            templateUrl: "views/home.html",
            controller: PollListCtrl
        })
        .state('login', {
            url: "/login",
            parent: 'main',
            templateUrl: "views/login.html",
            controller: LoginCtrl
        })
        .state('login.success', {
            url: "/login/success",
            parent: 'main',
            templateUrl: "views/success.html",
            controller: LoginSuccessCtrl
        })
        .state('register', {
            url: "/register",
            parent: 'main',
            templateUrl: "views/register.html",
            controller: RegCtrl
        })
        .state('register.success', {
            url: "/register/success",
            parent: 'main',
            templateUrl: "views/success.html",
            controller: RegSuccessCtrl
        })


    })



/*
angular.module('hnw', ['ui.router']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', { templateUrl: 'views/home.html', controller: PollListCtrl }).
            when('/login', { templateUrl: 'views/login.html', controller: LoginCtrl }).
            when('/register', { templateUrl: 'views/register.html', controller: RegCtrl }).
            */
         /*   when('/polls', { templateUrl: 'partials/list.html', controller: PollListCtrl }).
            when('/poll/:pollId', { templateUrl: 'partials/item.html', controller: PollItemCtrl }).
            when('/new', { templateUrl: 'partials/new.html', controller: PollNewCtrl }). */
            // If invalid route, just redirect to the main list view
   /*         otherwise({ redirectTo: '/research/jstech/' });
    }]);*/

/*
 angular.module('myApp', []).
 controller('myController', ['$scope', '$http',
 function($scope, $http) {
 $http.get('/research/jstech/user/profile')
 .success(function(data, status, headers, config) {
 $scope.user = data;
 $scope.error = "";
 }).
 error(function(data, status, headers, config) {
 $scope.user = {};
 $scope.error = data;
 });
 }]);
 */