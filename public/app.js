(function(){
    'use strict';
    var app = angular.module('app', []);

    app.constant('API_URL', 'http://localhost:3000');

    app.controller('MainCtrl', function(RandomUserFactory, UserFactory){
        'use strict';
        var vm = this;
        vm.getRandomUser = getRandomUser;
        vm.login = login;
        function getRandomUser(){
            RandomUserFactory.getUser().then(function(response){
                vm.randomUser = response.data;
            }, handleError);
        }

        function login(username, password){
            UserFactory.login(username, password).then(function(response){
                vm.user = response.data;
                console.log(vm.user);
            }, handleError);
        }

        function handleError(response){
            console.log('Error' + response.data)
        }
    });

    app.factory('RandomUserFactory', function($http, API_URL){
        function getUser(){
            return $http.get(API_URL + '/random-user');
        }

        return {
            getUser: getUser
        }
    });
    app.factory('UserFactory', function($http, API_URL){
        function login(username, password){
            return $http.post(API_URL + '/login', {
                username: username,
                password: password
            });
        }

        return {
            login: login
        }
    });
})();