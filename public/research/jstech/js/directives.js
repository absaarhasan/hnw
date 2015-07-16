app.directive('backButton', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);


app.directive('compareTo', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

app.directive('alertBanner', function() {
    return {
        scope: true,  // use a child scope that inherits from parent
        restrict: 'A',
        replace: 'true',
        template: '<div class="alert-banner error" ng-show="showBanner()"><h2>{{bannerMsg}}</h2></div>',
        controller: ['$scope', function ($scope) {

            $scope.$on('showBanner',function(event, bannerMsg){
                $scope.showBanner = function(showBanner) { return bannerMsg ? true : false;};
                $scope.bannerMsg = bannerMsg ;
            });

        }]
    };
});

app.directive('pageHead', function() {
    return {
        scope: true,  // use a child scope that inherits from parent
        restrict: 'A',
        replace: 'true',
        template: '<header><h2>{{pageTitle}}</h2><div class="back-button"><button type="button" back-button>Back</button></div></header>'
    };
});
