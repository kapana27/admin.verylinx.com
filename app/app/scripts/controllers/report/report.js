'use strict';

app.controller('commisionsCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder,$http) {
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
		$http.post("/publisher/GetComission/",$scope.filter).then(function (response) {
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


}).controller('alltransactionsCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource,$http) {
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
		$http.post("/publisher/GetTransactions/",$scope.filter).then(function (response) {
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
   


}).controller('trafficCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder,$http) {

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

	$scope.color=['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
	$scope.GetData=function(){
		$scope.statistic=[];
		$scope.companies=[];
		
		$scope.projects = [];
		$http.post("/publisher/GetTraffic/",$scope.filter).then(function (response) {
			if(response.data.res=='yes'){
				$scope.stat=response.data.trafic;
				angular.forEach($scope.stat, function(value,key) {
				  $scope.statistic.push(value);
				});
				$scope.companies=response.data.companies;
				$scope.basicData=$scope.statistic;
				
			}else{
				$scope.companies=[];	
				$scope.basicData=[];
			}
		});
	} 
	


    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap().withOption('order', [[0, 'asc']]);
    $scope.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2)
     
 
    ];


}).controller('transitionsCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource,$http) {
	 
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
		$http.post("/publisher/GetClick/",$scope.filter).then(function (response) {
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



   
}).controller('monthlytableCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder,$http) {


	$scope.getyear=function(){
		var d = new Date();
		var n = d.getFullYear();
		$scope.years=[];
		for(var i=2015; i<=n; i++){
			$scope.years.push(i);
		}
		return $scope.years;
	}
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

	$scope.filter={
		month:"2017"
	}
	$scope.avg=[];
	$scope.sum=[];
	$scope.companies=[];
	$scope.color=['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];
	$scope.GetData=function(){
		$scope.statistic=[];
	
		
		$scope.projects = [];
		$http.post("/publisher/GetMonthly/",$scope.filter).then(function (response) {
			if(response.data.res=='yes'){
				$scope.stat=response.data.trafic;
				$scope.avg=response.data.avg;
				$scope.sum=response.data.sum;
				$scope.companies=response.data.companies;
				angular.forEach($scope.stat, function(value,key) {
				  $scope.statistic.push(value);
				});
				$scope.basicData=$scope.statistic;
				
			}else{
				$scope.avg=[];
				$scope.sum=[];
				$scope.basicData=[];
			}
		});
	} 
	


    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap().withOption('order', [[0, 'asc']]);
    $scope.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2)
     
 
    ];

}).controller('paymentsCtrl', function ($scope,$stateParams,$mdDialog,$state,$http, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {
    $scope.page = {
        title: 'Orders',
        subtitle: 'Place subtitle here...'
    };


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
        $http.post("/publisher/GetAccountDetails").then(function(response){
            if(response.data.res=='yes'){
                $scope.details=response.data.details;
            }else{
                $scope.details=[];
            }
        });
    }
    $scope.NewRequests = function(ev) {
        $mdDialog.show({
            templateUrl: 'NewPaymentRequests.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function ($scope,$mdDialog,$http) {
                $scope.balance=0;
                $scope.GetBalance=function(){
                    $http.post("/publisher/GetBalance/").then(function (response) {
                        if(response.data.res=='yes'){
							$scope.balance=response.data.balance;
                        }else{
                        	$scope.balance=0;
						}
                    });
                }
                $scope.save=function(){

                    $http.post("/publisher/RequestAmount/",{amount:$scope.amount}).then(function (response) {
                        if(response.data.res=='yes'){

                        }else{

                        }
                    });
				};
                $scope.GetBalance();
                $scope.cancel=function(){
                    $mdDialog.cancel();
				}

            }
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
})
