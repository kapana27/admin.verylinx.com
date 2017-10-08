'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:TablesDatatablesCtrl
 * @description
 * # TablesDatatablesCtrl
 * Controller of the minovateApp
 */
app.controller('mycategoriesCtrl',[ '$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$resource','$mdDialog' ,'$http',function ($scope, DTOptionsBuilder, DTColumnBuilder, $resource,$mdDialog,$http) {
        $scope.page = {
            title: 'კატეგორიები',
            subtitle: '...'
        };
        var vm = this;
        vm.message = '';
        $scope.records=[];
        $scope.record=false;
        $scope.getMycategories=function(){
            $http.post('/advertiser/GetMyCategories' ).then(function(response){
                if(response.data.res=="yes"){
                    $scope.records=response.data.categories;
                    console.log($scope.records);
                    $scope.record=true;
                }else{
                    $scope.records=[];
                    $scope.record=false;
                }
            },function(err){});
        };


        $scope.AddCategory = function(ev) {

            $mdDialog.show({
                templateUrl: 'AddCategory.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                controller: function($scope, $mdDialog){
                    $scope.successTxt='accept';
                    $scope.companies=[];
                    $scope.categories=[];
                    $scope.price={
                        cpa:0,
                        cpatype:false,
                        cpltype:false,
                        cpl:0
                    }

                    $http.post('/advertiser/GetCompany').then(function(response){
                        if(response.data.res=="yes"){
                            $scope.companies=response.data.company;
                        }else{
                            $scope.companies=[];
                        }
                    },function(err){});
                    $http.post('/advertiser/GetCategories').then(function(response){
                        if(response.data.res=="yes"){
                            $scope.categories=response.data.categories;
                        }else{
                            $scope.categories=[];
                        }
                    },function(err){});

                    $scope.selectedItem={};
                    $scope.selectedCompany={};
                    $scope.getSelectedText = function() {
                          console.log($scope.selectedItem);
                        if ($scope.selectedItem.id !== undefined) {
                            return  $scope.selectedItem.name;
                        } else {
                            return "აირჩიეთ კატეგორია";
                        }
                    };
                    $scope.getSelectedCompany = function() {

                        if ($scope.selectedCompany.id !== undefined) {
                            return  $scope.selectedCompany.companyName;
                        } else {
                            return "აირჩიეთ კომპანია";
                        }
                    };


                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.accept = function(answer) {
                        $scope.params={
                            cid:$scope.selectedCompany.id,
                            catid:$scope.selectedItem.id,
                            cpa:$scope.price.cpa,
                            cpatype:$scope.price.cpatype,
                            cpltype:$scope.price.cpltype,
                            cpl:$scope.price.cpl,
                            pay:$scope.selectedItem.pay,
                            mycatid:$scope.mycatid
                        };
                         console.log($scope.params);
                        $scope.error=[];
                        $http.post('/advertiser/addcategory', $scope.params ).then(function(response){
                            if(response.data.res=="yes"){
                                   $mdDialog.hide();
                            }else{
                                $scope.error=response.data.error;
                                 console.log($scope.error);
                            }
                       },function(err){});
                    };
                }
            }).then(function(answer) {
                $scope.getMycategories();
            });

        };

         $scope.EditCategories=function(ev,c){
             $mdDialog.show({
                 templateUrl: 'AddCategory.html',
                 parent: angular.element(document.body),
                 targetEvent: ev,
                 clickOutsideToClose: true,

                 fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                 controller: function ($scope, $mdDialog) {

                     $http.post('/advertiser/GetCompany').then(function(response){
                         if(response.data.res=="yes"){
                             $scope.companies=response.data.company;
                         }else{
                             $scope.companies=[];
                         }
                     },function(err){});
                     $http.post('/advertiser/GetCategories').then(function(response){
                         if(response.data.res=="yes"){
                             $scope.categories=response.data.categories;
                         }else{
                             $scope.categories=[];
                         }
                     },function(err){});
                     $scope.cancel = function() {
                         $mdDialog.cancel();
                     };
                     $scope.selectedCompany={
                         id:c.cid,
                         companyName:c.companyName
                     };
                     $scope.selectedItem={
                         id:c.catid,
                         name:c.catname,
                         pay:c.pay
                     };
                     $scope.price={
                         cpa:c.cpa,
                         cpatype:(c.cpatype=='fixed')?true:false,
                         cpltype:(c.cpltype=='fixed')?true:false,
                         cpl:c.cpl
                     }
                     $scope.getSelectedText = function() {
                         console.log($scope.selectedItem);
                         if ($scope.selectedItem.id !== undefined) {
                             return  $scope.selectedItem.name;
                         } else {
                             return "აირჩიეთ კატეგორია";
                         }
                     };
                     $scope.getSelectedCompany = function() {

                         if ($scope.selectedCompany.id !== undefined) {
                             return  $scope.selectedCompany.companyName;
                         } else {
                             return "აირჩიეთ კომპანია";
                         }
                     };
                     $scope.accept = function(answer) {
                         $scope.params={
                             id:c.id,
                             cid:$scope.selectedCompany.id,
                             catid:$scope.selectedItem.id,
                             cpa:$scope.price.cpa,
                             cpatype:$scope.price.cpatype,
                             cpltype:$scope.price.cpltype,
                             cpl:$scope.price.cpl,
                             pay:$scope.selectedItem.pay,
                             mycatid:$scope.mycatid
                         };
                         $http.post('/advertiser/editmycategory', $scope.params ).then(function(response){
                             if(response.data.res=="yes"){
                                 $mdDialog.hide();
                                 $rootScope.$broadcast($scope.getMycategories());
                             }else{
                                 $scope.error=response.data.error;

                             }
                         },function(err){});
                     };

                 }
             }).then(function(answer) {
                $scope.getMycategories();
             });
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
            angular.element('td', nRow).unbind('click');
            angular.element('td', nRow).bind('click', function() {
                $scope.$apply(function() {
                    vm.someClickHandler(aData);
                });
                angular.element('.row_selected').removeClass('row_selected');
                angular.element(nRow).addClass('row_selected');
            });
            return nRow;
        }



        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
            return $resource('http://www.filltext.com/?rows=300&id={index}&firstName={firstName}&lastName={lastName}&pretty=true').query().$promise;
        })

            .withPaginationType('full_numbers')
            .withBootstrap()
            // Activate col reorder plugin
            .withColReorder()
            .withColReorderCallback(function() {
                console.log('Columns order has been changed with: ' + this.fnOrder());
            })
            .withOption('rowCallback', rowCallback);

        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            DTColumnBuilder.newColumn('lastName').withTitle('Last name')
        ];

        function someClickHandler(info) {
            vm.message = info.id + ' - ' + info.firstName;
        }

        vm.someClickHandler = someClickHandler;

    }]);


