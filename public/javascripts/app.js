'use strict';
angular.module('app', ['ngRoute', 'restangular'])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(function ($routeProvider) { //Створюєм адреси
        $routeProvider
            .when('/', {
                templateUrl: './template/message.tpl.html',
                controller: HomePageController,
                controllerAs: 'homePageCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .service('messageDataService', function (Restangular) {
        return {
            getMessages: getMessages
        };

        function getMessages() {
            return Restangular.all('api/message').getList()
        }
    })
    .controller('MainCtrl', function ($scope) {
        // $http.get('http://localhost:8000/login').then(function successCallback(response) {
        //     $scope.arr = response.data;
        // }, function errorCallback(response) {
        //     console.log("Error!!!" + response.err);
        // });
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
    .directive('message', function () {
        return {
            replace: true,
            templateUrl: 'template/message.tpl.html',
            controllerAs: 'messagesCtrl',
            controller: function ($scope, messageDataService) {
                const vm = this;
                vm.messages = [];

                messageDataService.getMessages().then(function (messages) {
                    vm.messages = messages ;
                })
            }
        }
    })
    .directive('popularSubCategories', function () {
        return {
            replace: true,
            templateUrl: 'template/popularSubCategories.tpl.html',
            controller: function ($scope) {
            }
        }
    })
    .directive('popularGoods', function () {
        return {
            replace: true,
            templateUrl: 'template/popularGoods.tpl.html',
            link: function (scope, element, attrs) {
            }
        }
    })
    .directive('asideInfo', function () {
        return {
            replace: true,
            templateUrl: 'template/asideInfo.tpl.html',
            link: function (scope, element, attrs) {
            }
        }
    });

function HomePageController($scope) {
    $scope.a = 'bbbbbb';
}


// .directive('slider', function () {
//     return {
//         replace: true,
//         templateUrl: 'template/slider.html',
//         link: function (scope, element, attrs) {
//         }
//     }
// });

