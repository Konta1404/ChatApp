/**
 * Created by veselin on 5/21/17.
 */
//Here i didn't need to worry about look of this app, because client on Upwork wanted app that is working
    var app = angular.module('myApp', ['ui.router']);

    app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

        //angular-ui-router
        $urlRouterProvider.otherwise('/');

        $locationProvider.hashPrefix('');

        $stateProvider

            .state('home',{
                url:'/',
                views:{
                    '':{
                        templateUrl:'../ChatApp/views/chatapp.html'
                    }
                }
            })
            .state('login',{
                url:'/login',
                templateUrl:'../ChatApp/views/login.html',
                controller: 'LoginController'
            });
    });

    app.controller('MessageController', function($scope,$filter, $http,$state,$window) {
        $scope.data = [];  //data
        $scope.name = localStorage.getItem('Name'); // login name
        $scope.sendedMessage = "";  //message

        //geting data from json but never use them :/ this is just possible way of developing this little app
        // $scope.getData = function () {
        //     $http.get('../ChatApp/data/data.json')
        //         .then(function(response) {
        //             $scope.data.push(response.data.messages);
        //         });
        // };

        //logout button
        $scope.logout = function () {
            localStorage.clear();  //clear localStorage
        };


        //function for ROCKET button
        $scope.sendMessage = function (message) {
                $scope.date = new Date();
                $scope.date = $filter('date')(new Date(), 'HH:mm:ss');
                $scope.message = null;
                $scope.sendedMessage = message;
        };



        (function() {
            setInterval(function () {
                //simple autentification
                if(localStorage.getItem('Name') == null){
                    $state.go('login');
                }
            },1000);
        })();

    });


    app.controller('LoginController', function($scope, $state) {
        //simple login
        $scope.login = function (name) {
            //I didnt make token. I am saving name in localStorage and when there is not Name you are redirected to login
            if(name == ""){
                alert('Write your name! ');
            }
            else
            {
                localStorage.setItem('Name', $scope.name);

                $state.go('home');
            }
        }
    });

    app.$inject = ['$scope'];

    //When you click button rocket, you are adding this to html
    app.directive("boxCreator", function($compile){
        return{
            restrict: 'A',
            link: function(scope , element){
                if(scope.sendedMessage != undefined && scope.sendedMessage!=null){
                    element.bind("click", function(e){ //On click you compile node to #chat

                        var childNode = $compile('<li class="self"><div class="msg"><div class="user">{{:: name}}</div><p>{{:: sendedMessage}}</p><time>{{:: date}}</time></div></li>')(scope);
                        angular.element( document.querySelector('#chat')).append(childNode);

                    });
                }
            }
        }
    });
    //simple directive for chat simulation(really, really simple) :))
    app.directive('myDirective', function() {
        return  {
            compile: function(element,scope, attr,$compile, $state) {
                    setInterval(function () {
                        var newElement = angular.element('<li class="other"><div class="msg"><div class="user">Vesko</div><p>The Wheel of Time is the best series of fantasy novels!!!!</p><time>23:00:44</time></div></li>');
                        element.append(newElement);
                    },4000);


            }
        }
    });
