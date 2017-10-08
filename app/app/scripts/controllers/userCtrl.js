'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the minovateApp
 */
app
    .controller('userCtrl', ['$scope', '$state', 'AuthenticationService', function ($scope, $state, AuthenticationService) {

        $scope.logout = function() {
            AuthenticationService.Logout( function (rs) {
                  console.log("logout");
                $state.go('core.login');
            });
            //$state.go('app.dashboard');
        };
    }]);
