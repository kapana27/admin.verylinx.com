app.controller('company', function($scope,$rootScope,$http, $location,$mdDialog,$timeout) {

    $scope.customFullscreen = true;


    $scope.addCompany = function(ev,company,logo) {
        $mdDialog.show({
            templateUrl: 'addcompany.tmpl.html',
            parent: angular.element(document.body ),
            //targetEvent: evt,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen ,
            controller: function($scope, $mdDialog,$timeout,$rootScope) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.company={};
                if(company !=undefined){
                    $scope.company.companyName=company.companyName;
                    $scope.company.Identification=company.Identification;
                    $scope.company.companyUrl=company.companyUrl;
                    $scope.company.id=company.id;
                    $timeout(
                        function(){
                            $scope.api.addRemoteFile('b/getImage?logo='+logo,logo,'image');
                        }
                    )
                }

                $scope.AddCompany=function(){
                    $scope.errors={};
                    var formData= new FormData();


                    angular.forEach($scope.company.logo,function(obj) {
                        if(!obj.isRemote){
                            formData.append('files[]', obj.lfFile);
                        }
                    });

                    console.log($scope.company.logo);
                    if($scope.company.id !="" && $scope.company.id !=undefined){
                        formData.append('id', $scope.company.id);
                    }
                    if($scope.company.companyName !="" && $scope.company.companyName !=undefined){
                        formData.append('companyName', $scope.company.companyName);
                    }
                    if($scope.company.Identification !="" && $scope.company.Identification !=undefined){
                        formData.append('Identification', $scope.company.Identification);
                    }
                    if($scope.company.companyUrl !="" && $scope.company.companyUrl !=undefined){
                        formData.append('companyUrl', $scope.company.companyUrl);
                    }

                    $http.post('/advertiser/add/', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(response){
                        if(response.data.res=="yes"){
                            $scope.error={};
                            $scope.company={};
                            $scope.success="აიტვირთა წარმატებით";
                            $timeout(function () {
                                $scope.success='';
                                $rootScope.companies();
                                $mdDialog.cancel();

                            }, 1000);
                        }else{
                            $scope.errors=response.data.error;
                        }
                    },function(err){
                        // do sometingh
                    });

                }

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };





    $scope.companies=[];
    $rootScope.companies=function(){
        $http.post('/advertiser/GetCompany').then(function(response){
            if(response.data.res=="yes"){
                $scope.companies=response.data.company;
                console.log($scope.companies);
            }
        },function(err){
            // do sometingh
        });

    }

    $rootScope.companies();
});
