'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MailSingleCtrl
 * @description
 * # MailSingleCtrl
 * Controller of the minovateApp
 */
app
  .controller('MailSingleCtrl', function ($scope,$http,$stateParams,$timeout) {
      $scope.id=$stateParams.id;
      $scope.msgId='';
      $scope.message='';
      $scope.mails=[];
      $scope.GetMails=function(){
          $http.post("/message/readMessage",{id:$scope.id}).then(function(response){
              if(response.data.res=="yes"){
                  $scope.mails=response.data.mails;
                  $scope.title=response.data.title;
                  $scope.msgId=response.data.msgId;
                  $scope.details=response.data.details;
              }else{
                  $scope.mails=[];
              }
          });
      }


      $scope.SengMessage=function(){
        $http.post("/message/SendMessage",{msgId:$scope.msgId,msg:$scope.message,subject:$scope.title, details:$scope.details}).then(function (response) {
            if(response.data.res=='yes'){
                 $scope.reply=false;
                 $scope.message='';
                 $scope.GetMails();
                setTimeout(function(){
                    $('#msg-box').scrollTop($('#msg-box')[0].scrollHeight);
                }, 500);
            }
        });

      }
      $scope.GetMails();
  });
