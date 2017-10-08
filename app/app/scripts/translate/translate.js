app.controller('translateCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {
    $scope.page = {
        title: 'TRANSLATE data',
        subtitle: 'Place subtitle here...'
    };
    $scope.filter={
        language:"ka",
        site:"manager"
    };
    var vm = this;
    $scope.orders = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withBootstrap()
        .withOption('order', [[0, 'asc']])
        .withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
        .withLanguage({
            "sLengthMenu": 'View _MENU_ records',
            "sInfo":  'Found _TOTAL_ records',
            "oPaginate": {
                "sPage":    "Page",
                "sPageOf":  "of"
            }
        })
        .withPaginationType('input')
        //.withScroller()
        //.withOption("sScrollY", false)
        //.withOption("sScrollX")
        .withColumnFilter();


    $scope.dtColumnDefs = [
        //DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.selectedAll = false;

    $scope.selectAll = function () {

        if ($scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        angular.forEach($scope.orders, function(order) {
            order.selected = $scope.selectedAll;
        });
    };
    $scope.language=[];
    $scope.balances=[];
    $scope.GetFiles=function(){
        $scope.select=[];
        $scope.data=[];
        $http.post("/translate/GetFile",$scope.filter).then(function(response){
            $scope.language=response.data;
            $scope.GetValues();
        });
    }
    $scope.data=[];
    $scope.select=[];
    $scope.GetValues=function () {
        angular.forEach($scope.language,function (v,k) {
            $scope.select.push(k);
            $scope.data.push(v);
        });
       console.log($scope.select);
    }
    $scope.menuTab='';
    $scope.refreshData=function(){
        $scope.GetFiles();
     }

     $scope.edit=function(ev,k,v,data){
         $mdDialog.show({
             templateUrl: 'translate.dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
             controller: function($mdDialog,$scope){
                $scope.key=k;
                $scope.value=v;
                $scope.save=function(){
                    data[$scope.key]=$scope.value;
                    $mdDialog.hide();
                }
                $scope.cancel=function(){
                    $mdDialog.hide();
                }

             }
         })


     }

     $scope.AddNewWord=function(ev,data,menuTab,fulldata){
         $mdDialog.show({
             templateUrl: 'translate.dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
             controller: function($mdDialog,$scope){
                 $scope.key='';
                 $scope.value='';
                 $scope.save=function(){


                        try{


                            if(data[$scope.key]== undefined){
                                data[$scope.key]=$scope.value;
                            }else{
                                data[$scope.key]=$scope.value;
                            }
                        }catch(ex){}
                     console.log(fulldata);
                     $mdDialog.hide();
                 }
                 $scope.cancel=function(){
                     $mdDialog.hide();
                 }

             }
         })

     }

     $scope.SaveAllChangedData=function(ev){
         var confirm = $mdDialog.confirm()
             .title('დარწმუნებული ხართ რომ გსურთ ატვირთვა?')
             .textContent('')
             .ariaLabel('')
             .targetEvent(ev)
             .ok('დიახ!')
             .cancel('გაუქმება');


         $mdDialog.show(confirm).then(function() {
             $http.post("/translate/saveChangedData",{filter:$scope.filter,"menu":$scope.select,"data":$scope.data}).then(function(response){
                    if(response.data.res=="yes"){
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('აიტვირთა წარმატებით')
                                .textContent('')
                                .ariaLabel('')
                                .ok('დახურვა!')
                                .targetEvent(ev)
                        );
                    }else{
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('დაფიქსირდა შეცდომა')
                                .textContent('')
                                .ariaLabel('')
                                .ok('დახურვა!')
                                .targetEvent(ev)
                        );
                    }

             });
         });

     }

     $scope.AddMenu=function(ev,select,data){
         $mdDialog.show({
             templateUrl: 'menu.dialog.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
             controller: function($mdDialog,$scope){
                $scope.menu='';
                 $scope.error="";
                 $scope.select=select;
                $scope.save=function(){
                   if($scope.select.indexOf($scope.menu) ==-1){
                       $scope.error='';
                        $scope.select.push($scope.menu);

                        data[$scope.select.length-1]={"demo":"demo"};
                        $mdDialog.hide();
                    }else{
                        $scope.error='ასეთი ჩანაწერი უკვე არსებობს';

                    }
                }

                 $scope.cancel=function(){
                     $mdDialog.hide();
                 }

             }
         })

     }
     $scope.UploadTranslateFile=function(){
         $('#translateFileUpload').click();
     }
});