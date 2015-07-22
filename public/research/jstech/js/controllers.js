

// Controller for main abstract template
function mainCtrl($scope, $http, $state, $stateParams, $rootScope) {

    $scope.session = false;
    $scope.username = '';
    $scope.user = '';

    if (!$scope.session) {
        console.log('no session info detected')

        $http.get('/research/jstech/session')
            .success(function (data) {
                if (data.session){
                    console.log('user is logged in')
                    $scope.session = data.session;
                    $scope.username = data.username;
                    $scope.user = data.user;
                    console.log('Parent value 1 = '+ $scope.username);
                }

            }).error(function(data, status, headers, config) {
                $scope.$broadcast('showBanner', 'Oops ... no server connection!');
            });

    }

    $scope.logout = function ($event) {

        $event.preventDefault();

        $http.get('/research/jstech/logout')
            .success(function (data, status, headers, config) {

            if (data.session == false) {
                console.log('Logout success');
                $scope.session = data.session;
                $scope.username = '';
                $scope.user = '';


            } else {
                console.log('Logout fail');
                $scope.$broadcast('showBanner', 'Oops ... server error!');
            }
        }).error(function (data, status, headers, config) {
            $scope.$broadcast('showBanner', 'Oops ... no server connection!');
        });

    }


    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {

        $rootScope.previousState = "home";
        $rootScope.previousParams = '';

        if ((from.name != 'login') && (from.name != 'register') && (from.name != 'vote') && (from.name != 'addpoll')){
            $rootScope.previousState = from.name;
            $rootScope.previousParams = fromParams;
        }

    });
}

// Controller for the registration page

function RegCtrl($scope, $http, $state) {

    if ($scope.session) {

        $state.go('home');

    }else{
        $scope.pageTitle = 'Register';
        $scope.regForm = {};

        $scope.processForm = function () {

            $http({
                method: 'POST',
                url: '/research/jstech/register',
                data: $.param($scope.regForm),  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            }).success(function (data, status, headers, config) {

                if (data.name == 'MongoError') {
                    console.log('DB fail');
                    $scope.$broadcast('showBanner', 'Oops ... email already registered!');

                } else if (data.errors) {
                    console.log('Schema fail');
                    var errors = data.errors;
                    var errorMsg = [];
                    for (var key in errors) {
                        errorMsg.push(errors[key].message);
                    }
                    var msgString = "Oops ... " + errorMsg.join(" ... ").toLowerCase();
                    $scope.$broadcast('showBanner', msgString);
                    console.log(data.errors);
                } else {
                    $scope.$parent.session = data.session;
                    $scope.$parent.username = data.username;
                    $scope.$parent.user = data.user;
                    console.log('user name is ' + data.username);
                    console.log('user name should now be ' + $scope.username);
                    $state.go('register.success');
                }
            }).error(function (data, status, headers, config) {
                $scope.$broadcast('showBanner', 'Oops ... no server connection!');
            });
        };
    }
}

// Controller for the Registration Success page

function RegSuccessCtrl($scope, $state, $timeout, $rootScope) {

    if (!$scope.session) {

        $state.go('home');

    } else {

        $scope.pageTitle = 'Registration Complete';
        $scope.pageClass = 'login';
        $scope.buttonLink = $rootScope.previousState + '(' + $rootScope.previousParams + ')';
        $scope.buttonLabel = 'Back';

        var msg = "You are now logged in as " + $scope.username;
        $timeout(function() {
            $scope.$broadcast('showBanner', msg );
        },0);

    }
}

// Controller for the Login page
function LoginCtrl($scope, $http, $state, $stateParams) {

    if ($scope.session) {

        $state.go('home');

    }else {

        $scope.pageTitle = 'Login';
        $scope.loginForm = {};

        $scope.processForm = function () {

            $http({
                method: 'POST',
                url: '/research/jstech/login',
                data: $.param($scope.loginForm),  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            }).success(function (data, status, headers, config) {

                if (data.session) {
                    console.log('Login success');
                    $scope.$parent.session = data.session;
                    $scope.$parent.username = data.username;
                    $scope.$parent.user = data.user;
                    $state.go('login.success');

                } else {
                    console.log('Login fail');
                    $scope.$broadcast('showBanner', data.message);
                }
            }).error(function (data, status, headers, config) {
                $scope.$broadcast('showBanner', 'Oops ... no server connection!');
            });


        };
    }
}

// Controller for the Login Success page

function LoginSuccessCtrl($scope, $state, $timeout,$rootScope) {

    if (!$scope.session) {

        $state.go('home');

    } else {

        $scope.pageTitle = 'Login Success';
        $scope.pageClass = 'login';
        $scope.buttonLink = $rootScope.previousState + '(' + $rootScope.previousParams + ')';
        $scope.buttonLabel = 'Back';

        var msg = "You are now logged in as " + $scope.username;
        $timeout(function() {
            $scope.$broadcast('showBanner', msg );
        },0);

    }
}


// Controller for the Add Poll page
function AddPollCtrl($scope, $http, $state, $stateParams) {

    if (!$scope.session) {
        console.log('add poll page thinks there is no session')
        $state.go('home');

    } else {
        $scope.pageTitle = 'Add Poll';
        $scope.addPollForm = {};
        $scope.addPollForm.total = 0;
        $scope.shuffleOptions = function () {

            var shuffle = [];

            if ($scope.addPollForm.option1) {
                shuffle.push($scope.addPollForm.option1);
            }
            if ($scope.addPollForm.option2) {
                shuffle.push($scope.addPollForm.option2);
            }
            if ($scope.addPollForm.option3) {
                shuffle.push($scope.addPollForm.option3);
            }
            if ($scope.addPollForm.option4) {
                shuffle.push($scope.addPollForm.option4);
            }
            if ($scope.addPollForm.option5) {
                shuffle.push($scope.addPollForm.option5);
            }

            $scope.addPollForm.option1 = (shuffle.length > 0) ? shuffle[0] : "";
            $scope.addPollForm.option2 = (shuffle.length > 1) ? shuffle[1] : "";
            $scope.addPollForm.option3 = (shuffle.length > 2) ? shuffle[2] : "";
            $scope.addPollForm.option4 = (shuffle.length > 3) ? shuffle[3] : "";
            $scope.addPollForm.option5 = (shuffle.length > 4) ? shuffle[4] : "";

            $scope.addPollForm.total = shuffle.length;
        }

        $scope.processForm = function () {

            $http({
                method: 'POST',
                url: '/research/jstech/addpoll',
                data: $.param($scope.addPollForm),  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            }).success(function (data, status, headers, config) {

                if (data.errors) {
                    console.log('Schema fail');
                    var errors = data.errors;
                    var errorMsg = [];
                    for (var key in errors) {
                        errorMsg.push(errors[key].message);
                    }
                    var msgString = "Oops ... " + errorMsg.join(" ... ").toLowerCase();
                    $scope.$broadcast('showBanner', msgString);
                    console.log(data.errors);
                } else {
                    console.log('New poll added');
                    console.log('New poll added = ' + data.pollid);

                    $state.go('addpoll.success', { pollid: data.pollid });
                }
            }).error(function (data, status, headers, config) {
                $scope.$broadcast('showBanner', 'Oops ... no server connection!');
            });
        };
    }
}

// Controller for the Vote page
function AddPollSuccessCtrl($scope, $http, $state, $stateParams, $timeout) {

    if (!$scope.session) {

        $state.go('home');

    } else {
        $scope.pageTitle = 'New poll Created';
        $scope.pageClass = 'add-poll';
        $scope.buttonLink = 'poll({ pollid:' + $stateParams.pollid + '})';
        $scope.buttonLabel = 'View poll';

        var msg = "Your new poll is now live!";

        $timeout(function() {
            $scope.$broadcast('showBanner', msg );
        },0);
    }
}

// Controller for the Vote page
function VoteCtrl($scope, $http, $state, $stateParams,$timeout) {

        $scope.pageTitle = 'Vote';
        $scope.question = $stateParams.question;
        $scope.voteForm = {};

        $scope.setOption = function (option) {

            $scope.voteForm.optionNumber = option;
            console.log('Option = '+ option)
            console.log('Scope option = '+ $scope.voteForm.optionNumber)
        }

        $scope.voteForm.pollid = $stateParams.pollid;

        var voteOptions = [
            {option:'option1', value: $stateParams.option1 },
            {option:'option2', value: $stateParams.option2 }
        ];

        if ($stateParams.option3 !== "") {
            voteOptions.push({option:'option3', value: $stateParams.option3 });
        }

        if ($stateParams.option4 !== "") {
            voteOptions.push({option:'option4', value: $stateParams.option4 });
        }

        if ($stateParams.option5 !== "") {
            voteOptions.push({option:'option5', value: $stateParams.option5 });
        }

        $scope.options = voteOptions;

        $timeout(function() {
            radioGroup()
        },0);

    $scope.processForm = function () {

        console.log('Poll id = ' + $scope.voteForm)

        $http({
            method: 'POST',
            url: '/research/jstech/vote',
            data: $.param($scope.voteForm),  // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
        }).success(function (data, status, headers, config) {

            if (data.errors) {
                console.log('Schema fail');
                var errors = data.errors;
                var errorMsg = [];
                for (var key in errors) {
                    errorMsg.push(errors[key].message);
                }
                var msgString = "Oops ... " + errorMsg.join(" ... ").toLowerCase();
                $scope.$broadcast('showBanner', msgString);
                console.log(data.errors);
            } else {
                console.log('New poll added');
                $state.go('vote.success', { pollid: data.pollid });
            }
        }).error(function (data, status, headers, config) {
            $scope.$broadcast('showBanner', 'Oops ... no server connection!');
        });
    };



}

// Controller for the Vote success page
function VoteSuccessCtrl($scope, $http, $state, $stateParams, $timeout) {

    if (!$scope.session) {

        $state.go('home');

    } else {
        $scope.pageTitle = 'Vote cast';
        $scope.pageClass = 'add-poll';
        $scope.buttonLink = 'poll({ pollid:' + $stateParams.pollid + '})';
        $scope.buttonLabel = 'View poll';

        var msg = "Your vote has been submitted!";

        $timeout(function() {
            $scope.$broadcast('showBanner', msg );
        },0);
    }

}

// Controller for the Poll page
function PollCtrl($scope, $http, $state, $stateParams) {

    $scope.pageTitle = 'Poll';

}




// Controller for the poll list
function PollListCtrl($scope) {
  //  $scope.polls = Poll.query();
}
