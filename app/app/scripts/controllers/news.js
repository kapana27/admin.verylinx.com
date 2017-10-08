'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesTimelineCtrl
 * @description
 * # PagesTimelineCtrl
 * Controller of the minovateApp
 */
app
    .controller('newsCtrl', function ($scope,$mdDialog,$http ) {
        $scope.page = {
            title: 'Timeline',
            subtitle: 'Place subtitle here...'
        };
        $scope.news= {
            '2017-06-16': [
                {
                    title: "Lorem ipsum dolor sit amet",
                    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.",
                    hour: "1 minutes ago"
                },
                {
                    title: "news 1",
                    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.",
                    hour: "5 minutes ago"
                },
                {
                    title: "news 3",
                    body: "asdasdtation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.",
                    hour: "15 minutes ago"
                }],
            '2016-06-01': [
                {
                    title: "Lorem ipsum dolor sit amet",
                    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.",
                    hour: "1 minutes ago"
                },
                {
                    title: "news 1",
                    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.",
                    hour: "5 minutes ago"
                },
                {
                    title: "news 3",
                    body: "asdasdtation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu.",
                    hour: "15 minutes ago"
                }

            ]
        };
        $scope.GetNews=function(){

            $http.post('/site/GetNews').then(function(response){
                if(response.data.res=="yes"){
                    $scope.news=response.data.news;

                }else
                {
                    $scope.news=[];
                }
            },function(err){
                // do sometingh
            });

        }




        $scope.showAdvanced = function(ev,item) {

            $mdDialog.show({
                controller:function($scope){
                    $scope.item=item;
                    $scope.ok=function(){
                        $mdDialog.hide();
                    }
                },
                templateUrl: 'readnews.tmpl.html',
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
    });
