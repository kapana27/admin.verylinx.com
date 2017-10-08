app.controller('bannerAdd', function($scope,$rootScope,$http, $location,$mdDialog,$timeout) {
    $scope.error={};

    $scope.companies=[];
    $http.post('/advertiser/GetCompany').then(function(response){
        if(response.data.res=="yes"){
            $scope.companies=response.data.company;
            console.log($scope.companies);
        }else{
            $scope.companies=[];
        }
    },function(err){

    });



    $scope.com_id=function(){
       $http.post('/advertiser/GetMyCategories',{catid: $scope.company} ).then(function(response){
            if(response.data.res=="yes"){
                $scope.categories=response.data.categories;
            }else{
                $scope.categories=[];

            }
        },function(err){});
    }


    $scope.upload=function(){
        var formData= new FormData();

        angular.forEach($scope.file,function(obj) {
            if(!obj.isRemote){
                formData.append('files[]', obj.lfFile);
            }
        });
        if($scope.name !="" && $scope.name !=undefined){
            formData.append('name', $scope.name);
        }
        if($scope.redirecUri !="" && $scope.redirecUri !=undefined){
            formData.append('redirecUri', $scope.redirecUri);
        }
        if($scope.company !="" && $scope.company !=undefined){
            formData.append('company', $scope.company);
        }
        if($scope.category !="" && $scope.category !=undefined){
            formData.append('category', $scope.category);
        }
        $http.post('/advertiser/upload', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(response){
            if(response.data.res=="yes"){
                $scope.error={};
                $scope.file=[];
                $scope.name='';
                $scope.success="აიტვირთა წარმატებით";
                $timeout(function () {
                    $scope.success='';
                }, 2000);
            }else{
                $scope.error=response.data.error;
            }
        },function(err){
            // do sometingh
        });

    }

});