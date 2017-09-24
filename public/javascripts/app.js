'use strict';
angular.module('app', ['ngRoute', 'ngMaterial', 'restangular'])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    // .config(function($mdIconProvider) {
    //     $mdIconProvider
    //         .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
    // })
    .config(function ($routeProvider) { //Створюєм адреси
        $routeProvider
            .when('/', {
                templateUrl: './template/homePageDirective.tpl.html',
                controller: HomePageController,
                controllerAs: 'homePageCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .service('MessageDataService', function (Restangular) {
        return {
            getMessages: getMessages
        };

        function getMessages() {
            return Restangular.all('api/messages').getList()
        }
    })
    .service('UserDataService', function (Restangular) {
        return {
            getUsers: getUsers
        };

        function getUsers() {
            return Restangular.all('api/users').getList()
        }
    })
    .controller('MainCtrl', function ($scope) {

    })
    .directive('homePage', function () {
        return {
            restrict: 'E',
            templateUrl: './template/homePageDirective.tpl.html',
            replace: true,
            controller: HomePageController,
            controllerAs: 'homePageCtrl',
            bindToController: true,
            scope: {}
        }
    })
    .directive('messages', function () {
        return {
            replace: true,
            templateUrl: 'template/messages.tpl.html',
            controllerAs: 'messagesCtrl',
            controller: function ($scope, UserDataService, MessageDataService) {
                const self = this;
                self.messages = [];
                self.users = [];
                self.getUserById = getUserById;


                UserDataService.getUsers().then(function (users) {
                    self.users = users;
                });
                MessageDataService.getMessages().then(function (messages) {
                    self.messages = messages;
                });

                function getUserById(user_id) {
                        for(let i = 0; i < self.users.length; i++ ){
                            if (self.users[i].id === user_id){
                                return self.users[i]
                            }
                        }
                    }
                }
            }
    })
    .directive('registration', function () {
        return {
            replace: true,
            templateUrl: 'template/registration.tpl.html',
            controller: function ($scope) {
            }
        }
    });
function HomePageController($scope) {
}
