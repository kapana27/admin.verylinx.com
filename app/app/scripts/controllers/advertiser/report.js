/**
 * Created by kapana27 on 15-08-2017.
 */
'use strict';

app.controller('AdvRepCommisionsCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder,$http) {
    $scope.open_from = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened_from = true;
    };
    $scope.open_to = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened_to = true;
    };

    $scope.refreshData=function(){
        $scope.GetData();
    }
    $scope.count=0;
    $scope.companies=[];
    $scope.stat=[];
    $scope.labels=[];
    $scope.keys=[];
    $scope.color=['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
    $scope.GetData=function(){
        $scope.statistic=[];
        $scope.cash=0;
        $scope.labels=[];
        $scope.keys=[];

        $scope.projects = [];
        $http.post("/advertiser/GetComission/",$scope.filter).then(function (response) {
            if(response.data.res=='yes'){
                $scope.companies=response.data.companies;
                $scope.labels=response.data.labels;
                $scope.keys=response.data.keys;
                $scope.stat=response.data.stat
                $scope.projects=response.data.fulldata
                angular.forEach($scope.stat, function(value,key) {
                    console.log(value);
                    $scope.statistic.push(value);
                });
                $scope.basicData=$scope.statistic;
            }else{
                $scope.projects = [];
                $scope.basicData=[];
                $scope.statistic=[];
                $scope.cash=0;
                $scope.labels=[];
                $scope.keys=[];

            }
        });
    }



    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap().withOption('order', [[2, 'desc']]);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)


    ];


}).controller('AdvRepAlltransactionsCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource,$http) {
    $scope.open_from = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened_from = true;
    };
    $scope.open_to = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened_to = true;
    };
    $scope.page = {
        title: 'Orders',
        subtitle: 'Place subtitle here...'
    };


    $scope.filter={
        company:'',
        show:'month'
    }
    $scope.orders = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withBootstrap()
        .withOption('order', [[3, 'desc']])
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
        DTColumnDefBuilder.newColumnDef(0).notSortable(),

        DTColumnDefBuilder.newColumnDef(2).notSortable()

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

    $scope.refreshData=function(){
        $scope.GetData();
    }
    $scope.count=0;
    $scope.companies=[];
    $scope.stat=[];

    $scope.GetData=function(){
        $scope.statistic=[];
        $scope.cash=0;
        $http.post("/advertiser/GetTransactions/",$scope.filter).then(function (response) {
            if(response.data.res=='yes'){
                $scope.orders = response.data.clicks;
                $scope.count=response.data.count;
                $scope.companies=response.data.companies;
                $scope.stat=response.data.stat.record;
                $scope.cash=response.data.cash;
                angular.forEach($scope.stat, function(value,key) {
                    $scope.statistic.push(value);
                });
                $scope.basicData=$scope.statistic;
            }else{

                $scope.stat=[];
                $scope.companies=[];
                $scope.orders=[] ;
                $scope.count=0;
            }
        });
    }



    $scope.today = function() {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };



    $scope.open_from = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened_from = true;
    };
    $scope.open_to = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened_to = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        'class': 'datepicker'
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];



}).controller('AdvRepTransitionsCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource,$http) {

    $scope.page = {
        title: 'Orders',
        subtitle: 'Place subtitle here...'
    };

    $scope.open_from = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened_from = true;
    };
    $scope.open_to = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened_to = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        'class': 'datepicker'
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

    $scope.filter={
        company:""
    }
    $scope.orders = [];
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withBootstrap()
        .withOption('order', [[3, 'desc']])
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
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(6).notSortable(),
        DTColumnDefBuilder.newColumnDef(2).notSortable(),
        DTColumnDefBuilder.newColumnDef(5).notSortable()
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

    $scope.refreshData=function(){
        $scope.GetData();
    }
    $scope.count=0;
    $scope.companies=[];
    $scope.GetData=function(){
        $http.post("/advertiser/GetClick/",$scope.filter).then(function (response) {
            if(response.data.res=='yes'){
                $scope.orders = response.data.clicks;
                $scope.count=response.data.count;
                $scope.companies=response.data.companies;
            }else{
                $scope.orders=[] ;
                $scope.companies=[];
                $scope.count=0;
            }
        });
    }



    $scope.today = function() {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };




});