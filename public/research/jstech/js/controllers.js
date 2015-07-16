

// Controller for main abstract template
function mainCtrl($scope, $http) {

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
}

// Controller for the registration page

function RegCtrl($scope, $http, $state, $stateParams) {

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

function RegSuccessCtrl($scope, $state, $timeout) {

    if (!$scope.session) {

        $state.go('home');

    } else {

        $scope.pageTitle = 'Registration Complete';
        $scope.pageClass = 'login';

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

function LoginSuccessCtrl($scope, $state, $timeout) {

    if (!$scope.session) {

        $state.go('home');

    } else {

        $scope.pageTitle = 'Login Success';
        $scope.pageClass = 'login';

        var msg = "You are now logged in as " + $scope.username;
        $timeout(function() {
            $scope.$broadcast('showBanner', msg );
        },0);

    }
}





// Controller for the poll list
function PollListCtrl($scope) {
  //  $scope.polls = Poll.query();
}
/*
// Controller for an individual poll
function PollItemCtrl($scope, $routeParams, socket, Poll) {
    $scope.poll = Poll.get({pollId: $routeParams.pollId});

    socket.on('myvote', function(data) {
        console.dir(data);
        if(data._id === $routeParams.pollId) {
            $scope.poll = data;
        }
    });

    socket.on('vote', function(data) {
        console.dir(data);
        if(data._id === $routeParams.pollId) {
            $scope.poll.choices = data.choices;
            $scope.poll.totalVotes = data.totalVotes;
        }
    });

    $scope.vote = function() {
        var pollId = $scope.poll._id,
            choiceId = $scope.poll.userVote;

        if(choiceId) {
            var voteObj = { poll_id: pollId, choice: choiceId };
            socket.emit('send:vote', voteObj);
        } else {
            alert('You must select an option to vote for');
        }
    };
}

// Controller for creating a new poll
function PollNewCtrl($scope, $location, Poll) {
    // Define an empty poll model object
    $scope.poll = {
        question: '',
        choices: [ { text: '' }, { text: '' }, { text: '' }]
    };

    // Method to add an additional choice option
    $scope.addChoice = function() {
        $scope.poll.choices.push({ text: '' });
    };

    // Validate and save the new poll to the database
    $scope.createPoll = function() {
        var poll = $scope.poll;

        // Check that a question was provided
        if(poll.question.length > 0) {
            var choiceCount = 0;

            // Loop through the choices, make sure at least two provided
            for(var i = 0, ln = poll.choices.length; i < ln; i++) {
                var choice = poll.choices[i];

                if(choice.text.length > 0) {
                    choiceCount++
                }
            }

            if(choiceCount > 1) {
                // Create a new poll from the model
                var newPoll = new Poll(poll);

                // Call API to save poll to the database
                newPoll.$save(function(p, resp) {
                    if(!p.error) {
                        // If there is no error, redirect to the main view
                        $location.path('polls');
                    } else {
                        alert('Could not create poll');
                    }
                });
            } else {
                alert('You must enter at least two choices');
            }
        } else {
            alert('You must enter a question');
        }
    };
}

*/