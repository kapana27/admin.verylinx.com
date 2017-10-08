'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MailCtrl
 * @description
 * # MailCtrl
 * Controller of the minovateApp
 */
app.controller('programsCtrl', function ($scope) {

}).controller('myprogramsCtrl', function ($scope,$http,$state) {
	$scope.page = {
        title: 'ჩემი პროგრამები',
        subtitle: 'Place subtitle here...'
    };
	$scope.data=[];
    $scope.GetCompanies=function(){
        $http.post("/myprograms/GetPrograms",$scope.form).then(function (response) {
            if(response.data.res=='yes'){
                $scope.data=response.data.company;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.data=[];
            }

        });
    }
    $scope.form={};
    $scope.categories=[];
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
    $scope.refreshData=function(){
        $scope.GetCompanies();
    }

    $scope.GetCategories();
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

   $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.go=function(id){
        $state.go("app.programs.view",{ "id": id});
    };
}).controller('allprogramsCtrl', function ($scope,$http,$state) {

    console.log($scope.currentLanguage);
    $scope.page = {
        title: 'ყველა პროგრამა',
        subtitle: 'Place subtitle here...'
    };
    $scope.form={};
    $scope.data=[];
    $scope.GetCompanies=function(){
        $http.post("/allprograms/GetPrograms",$scope.form).then(function (response) {
            if(response.data.res=='yes'){
                $scope.data=response.data.company;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.data=[];
            }

        });
    }
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.$watch('currentLanguage',function(){
        $scope.GetCategories();
    });

    $scope.categories=[];
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
        $scope.GetCompanies();
    }
   $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.go=function(id){
        $state.go("app.programs.view",{ "id": id});
    };
}).controller('newprogramsCtrl', function ($scope,$state,$http) {
   $scope.page = {
        title: 'ყველა პროგრამა',
        subtitle: 'Place subtitle here...'
    };
    $scope.form={};
    $scope.data=[];
    $scope.GetCompanies=function(){
        $http.post("/newprograms/GetPrograms",$scope.form).then(function (response) {
            if(response.data.res=='yes'){
                $scope.data=response.data.company;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.data=[];
            }

        });
    }
    $scope.$watch('currentLanguage',function(){
        $scope.GetCategories();
    });
    $scope.categories=[];
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
        $scope.GetCompanies();
    }
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

   $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.go=function(id){
        $state.go("app.programs.view",{ "id": id});
    };
})
