'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MailComposeCtrl
 * @description
 * # MailComposeCtrl
 * Controller of the minovateApp
 */
app
  .controller('MailComposeCtrl', function ($scope,$http,$state) {
    $scope.availableRecipients = ['RLake@nec.gov','RBastian@lacus.io','VMonroe@orci.ly','YMckenzie@mattis.gov','VMcmyne@molestie.org','BKliban@aliquam.gov','HHellems@tincidunt.org','KAngell@sollicitudin.ly'];
    $scope.mail={};
    $scope.NewEmail=function(){
        $http.post("/message/newMail",$scope.mail).then(function(response){
           if(response.data.res=='yes'){
               $state.go("app.mail.sent");
           }
        });

    }


  });
