'use strict';

app.controller('mycompanyCtrl',['$scope','$stateParams','$mdDialog','$http','$state',  function ($scope,$stateParams,$mdDialog,$http,$state) {
    $scope.mycompanies=[];
    $scope.form={};
    $scope.mycompany=function(){
        $http.post('/advertiser/GetCompany',$scope.form).then(function(response){
            if(response.data.res=="yes"){
                $scope.mycompanies=response.data.company;
                console.log($scope.companies);
            }else{
                $scope.mycompanies=[];
            }
        },function(err){
            // do sometingh
        });
    }
    $scope.$watch('currentLanguage',function(){
        $scope.GetCategories();
    });
    $scope.GetCategories=function(){
        $http.post("/global/GetCategories",{lang:$scope.currentLanguage}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.categories=response.data.categories;
                console.log($scope.categories);
            }  else{
                $scope.categories=[];
            }
        });
    }
    $scope.GetCategories();
    $scope.refreshData=function(){
        $scope.mycompany();
    }
    $scope.go=function(id){
        $state.go("app.mycampaign.view",{ "id": id});
    }

}]);