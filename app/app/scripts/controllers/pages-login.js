'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the minovateApp
 */
app
.controller('LoginCtrl', ['$scope', '$state', 'AuthenticationService', function ($scope, $state, AuthenticationService) {
	$scope.loginForm = {
		username: "",
		password: ""
	};
	$scope.login = function() {
		AuthenticationService.Login($scope.loginForm.username, $scope.loginForm.password, function (rs) {
			if (rs) {
				$state.go('app.dashboard');
			} else {
				alert("მომხმარებლის სახელი ან პაროლი არასწორია");
			}
		});
		//$state.go('app.dashboard');
	};
}]);
