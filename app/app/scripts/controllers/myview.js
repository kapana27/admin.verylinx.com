'use strict';

app.controller('myviewCtrl',['$scope','$stateParams','$mdDialog','$http',  function ($scope,$stateParams,$mdDialog,$http) {
    $scope.id=$stateParams.id;
    $scope.company=[];

    $scope.areaData = [
        { year: '2009', a: 10  },
        { year: '2010', a: 14  },
        { year: '2011', a: 8   },
        { year: '2012', a: 20 }
    ];
    $scope.GetCompamyInfo=function(){
        $http.post("/allprograms/GetViewCompany",{id:$scope.id}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.company=response.data.info;
            }else{
                $state.go('app.dashboard');
            }
        });
    }
    $scope.showCode = function(ev) {
        $mdDialog.show({
            controller: function($scope,$mdDialog){
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
    $scope.emptybanner=false;
    var tabs = [],
        selected = null,
        previous = null;
    $scope.$watch('currentLanguage',function(){
        $scope.tabset();
    });
    $scope.tabset=function(){
        $http.post("/advertiser/GetMyPrograms",{id:$scope.id,lang:$scope.currentLanguage}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.emptybanner=false;
                $scope.tabs=response.data.data;
            }else{
                $scope.emptybanner=true;
            }
        });
    }


    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = tabs[current];
        //if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
        //if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    });
    $scope.addTab = function (title, view) {
        view = view || title + " Content View";
        tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);
    };
}]);