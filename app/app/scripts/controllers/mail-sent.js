'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MailInboxCtrl
 * @description
 * # MailInboxCtrl
 * Controller of the minovateApp
 */
app
    .controller('MailSentCtrl', function ($scope, $resource,$http,$state) {
        $scope.mails=[];
        $http.get("/message/GetSendEmail").then(function(response){
            if(response.data.res=='yes'){
                $scope.mails=response.data.mails;
                $scope.bigTotalItems=$scope.mails.length;

            }else{
                $scope.mails=[];
            }

        });

        $scope.go=function(mail){
            $state.go("app.mail.single",{ "id": mail.id});
        }

        $scope.selectedAll = false;

        $scope.selectAll = function () {

            if ($scope.selectedAll) {
                $scope.selectedAll = false;
            } else {
                $scope.selectedAll = true;
            }

            angular.forEach($scope.mails, function(mail) {
                mail.selected = $scope.selectedAll;
            });
        };

        $scope.viewby = 10;
        $scope.bigCurrentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; //Number of pager buttons to show

    });
