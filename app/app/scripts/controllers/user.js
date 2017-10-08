'use strict';

app.controller('profileCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {
   $scope.id=$stateParams.id;
	$scope.userDetails={};
  
   $http.post("/manager/UserDetails",{id:$scope.id}).then(function(response){
		if(response.data.res=='yes'){
            $scope.userDetails=response.data.users;
			$scope.data=response.data.programs.company;
            $scope.bigTotalItems=response.data.programs.total;
		}else{
			$state.go("app.dashboard");
		}
	   
   });
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.go=function(id){
        $state.go("app.programs.view",{ "id": id});
    };

}]);
   