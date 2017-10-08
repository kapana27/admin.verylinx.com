'use strict';

app.controller('viewCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {
   $scope.id=$stateParams.id;

    $scope.GetCompamyInfo=function(){
        $http.post("/allprograms/GetViewCompany",{id:$scope.id}).then(function (response) {
           if(response.data.res=='yes'){
                $scope.company=response.data.info;
           }else{
                $state.go('app.dashboard');
           }
        });
    }
    $scope.areaData = [
        { year: '2009', a: 10  },
        { year: '2010', a: 14  },
        { year: '2011', a: 8   },
        { year: '2012', a: 20 }
    ];
    $scope.showCode = function(baner,ev) {
        $mdDialog.show({
            controller: function($scope,$mdDialog){

                $scope.banner=baner;
                $scope.banner.redirectUri=$scope.banner.redirect;
                console.log($scope.banner);
                $scope.$watch('subid', function() {
                   if($scope.subid!='' && $scope.subid !=undefined && $scope.subid != null){
                        $scope.banner.redirectUri=$scope.banner.redirect+"&subid="+$scope.subid;
                   }
                });

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.copy=function(){
                    $("textarea.baner-code").select();
                    document.execCommand('copy');
                }
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            },
            templateUrl: 'showCode.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    $scope.showTerms = function(ev,company) {
        $mdDialog.show({
            templateUrl: 'TermsAndConditions.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function($scope, $mdDialog){
                $scope.terms=company.terms;

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.errors={};
                $scope.accept = function(answer) {
                    $http.post("/company/joined", $scope.terms).then(function (response) {
                        if(response.data.res=='yes'){
                            $scope.successTxt='თქვენი მოთხოვნა გაგზავნილია გთხოვთ დაელოდოთ დადასტურებას';
                            $scope.terms={};
                            $mdDialog.hide();
                        }else{
                            $scope.errors=response.data.error;
                        }
                    });
                };
            }
        })
        .then(function() {
            $scope.GetCompamyInfo();
        });
    };

    $scope.dataset = [
        { label: 'Chrome', data: 30 },
        { label: 'Firefox', data: 15 },
        { label: 'Safari', data: 15 },
        { label: 'IE', data: 10 },
        { label: 'Opera', data: 5 },
        { label: 'Other', data: 10}
    ];

    $scope.options = {
        series: {
            pie: {
                show: true,
                innerRadius: 0.5,
                stroke: {
                    width: 0
                },
                label: {
                    show: true,
                    threshold: 0.05
                }
            }
        },
        colors: ['#428bca','#5cb85c','#f0ad4e','#d9534f','#5bc0de','#616f77'],
        grid: {
            hoverable: true,
            clickable: true,
            borderWidth: 0,
            color: '#ccc'
        },
        tooltip: true,
        tooltipOpts: { content: '%s: %p.0%' }
    };

    var tabs = [],
        selected = null,
        previous = null;
     $scope.emptybanner=true;
    $scope.$watch('currentLanguage',function(){
        $scope.tabset();
    });
     $scope.tabset=function(){
        $http.post("/allprograms/GetCategories",{id:$scope.id,lang:$scope.currentLanguage}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.emptybanner=false;
                $scope.tabs=response.data.data;
            }else{
                $scope.emptybanner=true;
            }
        });
      }

        $scope.tabs = tabs;
        $scope.selectedIndex = 1;
        $scope.$watch('selectedIndex', function(current, old){
            previous = selected;
            selected = tabs[current];

        });

}]);