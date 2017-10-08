/**
 * Created by kapana27 on 27-07-2017.
 */
'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:ShopOrdersCtrl
 * @description
 * # ShopOrdersCtrl
 * Controller of the minovateApp
 */
app
    .controller('balancesCtrl', function ($scope, $mdDialog,DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource,$http,$state) {
        $scope.page = {
            title: 'balances',
            subtitle: 'Place subtitle here...'
        };

        var vm = this;
        $scope.orders = [];
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withBootstrap()
            .withOption('order', [[1, 'asc']])
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
            DTColumnDefBuilder.newColumnDef(0).notSortable()
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
        $scope.balances=[];
        $scope.GetBalances=function(){
            $http.post("/manager/GetPublisherBalances").then(function(response){
                if(response.data.res=='yes'){
                    $scope.balances=response.data.balances;
                }else{
                    $scope.balances=[];
                }
            });
        }

        $scope.go=function(id){
            $state.go("app.payments.details",{ "id": id});
        }
        $scope.accept_balance=function(id,ev){

            console.log(id);
            if(id !=undefined && id!=''){
                var confirm = $mdDialog.confirm()
                    .title('დარწმუნებული ხართ რომ გსურთ დამუშავება?')
                    .textContent('')
                    .ariaLabel('')
                    .targetEvent(ev)
                    .ok('დადასტურება!')
                    .cancel('გაუქმება');

                $mdDialog.show(confirm).then(function() {
                    if(id=='all'){
                        $http.post("/manager/acceptAllbalance").then(function(response){
                            if(response.data.res=='yes'){
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .title('დადასტურდა წარმატებით')
                                        .textContent('')
                                        .ariaLabel('')
                                        .ok('დახურვა!')
                                        .targetEvent(ev)
                                );
                                $scope.GetBalances();
                            }else{
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .title(response.data.error)
                                        .textContent('')
                                        .ariaLabel('')
                                        .ok('დახურვა!')
                                        .targetEvent(ev)
                                );
                            }
                        });

                    }else{
                        $http.post("/manager/acceptUserBalance",{id:id}).then(function(response){
                            if(response.data.res=='yes'){
                                $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('დადასტურდა წარმატებით')
                                    .textContent('')
                                    .ariaLabel('')
                                    .ok('დახურვა!')
                                    .targetEvent(ev)
                                );
                                $scope.GetBalances();
                            }else{
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .title(response.data.error)
                                        .textContent('')
                                        .ariaLabel('')
                                        .ok('დახურვა!')
                                        .targetEvent(ev)
                                );
                             }
                        });
                    }

                });


            }
        }
    }).controller('balanceDetailsCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource)   {
        $scope.id=$stateParams.id;
        $scope.page = {
            title: 'details',
            subtitle: 'Place subtitle here...'
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
    $scope.details=[];
    $scope.GetDetails=function(){
        $http.post("/manager/GetAccountDetails",{acc_id:$scope.id}).then(function(response){
            if(response.data.res=='yes'){
                $scope.details=response.data.details;
            }else{
                $scope.details=[];
            }
        });
    }

}).controller('unpaidCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource)   {

    $scope.page = {
        title: 'unpaid data',
        subtitle: 'Place subtitle here...'
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
    $scope.details=[];
    $scope.load=false;
    $scope.companies=[];
    $scope.publishers=[];
    $scope.advertisers=[];
    $scope.filter={
        company:'',
        publisher:'',
        advertiser:"",
        groupby:''
    }
    $scope.GetUnpaidData=function(){
        $http.post("/manager/GetUnpaidData",$scope.filter).then(function(response){
            if(response.data.res=='yes'){
                $scope.details=response.data.data;
                if(!$scope.load){
                    $scope.load=true;
                    $scope.companies=response.data.companies;
                    $scope.publishers=response.data.publishers;
                    $scope.advertisers=response.data.advertisers;
                }
            }else{
                $scope.details=[];
            }
        });
    }

    $scope.add_tmp_balance=function(userid,ev){
        $http.post("/manager/AddAmountBalance",{uid:userid}).then(function(response){


            if(response.data.res=='yes'){

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('დამუშავდა წარმატებით')
                        .textContent('')
                        .ariaLabel('')
                        .ok('დახურვა!')
                        .targetEvent(ev)
                );
                $scope.GetUnpaidData();
            }else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title(response.data.error)
                        .textContent('')
                        .ariaLabel('')
                        .ok('დახურვა!')
                        .targetEvent(ev)
                );
            }
        });

    };

    $scope.UpdateAllBalance=function(ev){
        $http.post("/manager/AllUsersBalanceUpdate").then(function(response) {
            if(response.data.res=='yes'){
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('დამუშავდა წარმატებით')
                        .textContent('')
                        .ariaLabel('')
                        .ok('დახურვა!')
                        .targetEvent(ev)
                );
                $scope.GetUnpaidData();

            }else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title(response.data.error)
                        .textContent('')
                        .ariaLabel('')
                        .ok('დახურვა!')
                        .targetEvent(ev)
                );
            }

        });
    }


}).controller('undefinedCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {

    $scope.page = {
        title: 'UNDEFINED data',
        subtitle: 'Place subtitle here...'
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
    console.log("sssss");
        if ($scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        angular.forEach($scope.balances, function(order) {
            order.selected = $scope.selectedAll;
        });
    };
    $scope.details=[];
    $scope.load=false;
    $scope.companies=[];
    $scope.publishers=[];
    $scope.advertisers=[];
    $scope.filter={
        company:'',
        publisher:'',
        advertiser:"",
        groupby:''
    }
    $scope.GetUnpaidData=function(){
        $http.post("/manager/GetUndefinedData",$scope.filter).then(function(response){
            if(response.data.res=='yes'){
                $scope.details=response.data.data;
                if(!$scope.load){
                    $scope.load=true;
                    $scope.companies=response.data.companies;
                    $scope.publishers=response.data.publishers;
                    $scope.advertisers=response.data.advertisers;
                }
            }else{
                $scope.details=[];
            }
        });
    }

    $scope.showDetails=function(ev,data){

        $http.post("/manager/GetUndefinedRequests",{id:data.hash,cash:data.cash,type:data.type}).then(function(response){
             if(response.data.res=='yes'){
                 $mdDialog.show({
                     templateUrl: 'UndefinedDetail.tmpl.html',
                     parent: angular.element(document.body),
                     targetEvent: ev,
                     clickOutsideToClose:true,
                     fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                     controller: function($scope,$mdDialog){
                         $scope.categories=[];
                         $scope.categories=response.data.categories;
                         $scope.data=data;
                         $scope.usercommission=[];
                            $scope.category='';
                            $scope.changecomission=function(){
                               $http.post("/manager/GetUndefinedCommission",{requestid:$scope.data.id,id:$scope.data.hash,cid: $scope.category, cash:$scope.data.cash,type:$scope.data.type}).then(function(response){
                                    if(response.data.res=='yes'){
                                        $scope.usercommission=response.data.commission;
                                    }
                                });
                            }

                            $scope.save=function(){
                                $http.post("/manager/GetUndefinedCommission",{requestid:$scope.data.id, id:$scope.data.hash,cid: $scope.category, cash:$scope.data.cash,type:$scope.data.type,save:"yes"}).then(function(response){
                                    if(response.data.res=='yes'){
                                        $mdDialog.hide();
                                    }
                                });
                            }

                     }
                 }).finally(function(answer) {
                     $scope.GetUnpaidData();
                 });;
             }else{
                 $mdDialog.show(
                     $mdDialog.alert()
                         .parent(angular.element(document.querySelector('#popupContainer')))
                         .clickOutsideToClose(true)
                         .title(response.data.error)
                         .textContent('')
                         .ariaLabel('')
                         .ok('დახურვა!')
                         .targetEvent(ev)
                 );
             }
        });


    }

}).controller('transferCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {
    $scope.page = {
        title: 'TRANSFER data',
        subtitle: 'Place subtitle here...'
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

        angular.forEach($scope.balances, function(order) {
            order.selected = $scope.selectedAll;
        });
    };
    $scope.CreateOrder=function(){
        $http.post("/manager/CreatePayments",$scope.balances).then(function(response){
            if(response.data.res=='yes'){
            $state.go("app.payments.orders");
            }
        });
    }

    $scope.balances=[];
    $scope.GetBalances=function(){
        $http.post("/manager/GetUnpaidPublisherBalances").then(function(response){
            if(response.data.res=='yes'){
                $scope.balances=response.data.balances;
            }else{
                $scope.balances=[];
            }
        });
    }
}).controller('ordersCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {
    $scope.page = {
        title: 'TRANSFER data',
        subtitle: 'Place subtitle here...'
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


    $scope.balances=[];
    $scope.orders=[];
    $scope.GetBalances=function(){
        $http.post("/manager/GetAllOrders").then(function(response){
            if(response.data.res=='yes'){
                $scope.orders=response.data.orders;
            }else{
                $scope.orders=[];
            }
        });
    }
}).controller('processingOrderCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {
    $scope.page = {
        title: 'TRANSFER data',
        subtitle: 'Place subtitle here...'
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


    $scope.balances=[];
    $scope.orders=[];
    $scope.GetBalances=function(){
        $http.post("/manager/GetAllProcessingOrders").then(function(response){
            if(response.data.res=='yes'){
                $scope.orders=response.data.orders;
            }else{
                $scope.orders=[];
            }
        });
    }


    $scope.processOrder=function () {

        $http.post("/manager/processingOrder",$scope.orders).then(function(response){
            if(response.data.res=="yes"){
                alert(response.data.items);
                $scope.GetBalances();
            }else{
                alert(response.data.error);
            }
        });
    }
}).controller('allOrderCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {
    $scope.page = {
        title: 'TRANSFER data',
        subtitle: 'Place subtitle here...'
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


    $scope.balances=[];
    $scope.orders=[];



    $scope.processOrder=function () {

        $http.post("/manager/GetfullOrders",$scope.orders).then(function(response){
            if(response.data.res=='yes'){
                $scope.orders=response.data.orders;
            }else{
                $scope.orders=[];
            }
        });
    }
})

;