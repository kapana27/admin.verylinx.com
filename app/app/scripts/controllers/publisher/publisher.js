app.controller('publisherCtrl', function($scope,$http,$moment){
    $scope.page = {
        title: 'publisher',
        subtitle: 'dashboard...'
    };
    $scope.filter={
        startDate:'',
        endDate:''
    }
    $scope.transaction={
        accept:0,
        decline:0,
        pending:0,
        sum:0
    };

    /*datepicker section*/
    $scope.startDate = $moment().subtract(1, 'days').format('MMMM D, YYYY');
    $scope.endDate = $moment().add(31, 'days').format('MMMM D, YYYY');
    $scope.rangeOptions = {
        ranges: {
            Today: [$moment(), $moment()],
            Yesterday: [$moment().subtract(1, 'days'), $moment().subtract(1, 'days')],
            'Last 7 Days': [$moment().subtract(6, 'days'), $moment()],
            'Last 30 Days': [$moment().subtract(29, 'days'), $moment()],
            'This Month': [$moment().startOf('month'), $moment().endOf('month')],
            'Last Month': [$moment().subtract(1, 'month').startOf('month'), $moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'left',
        startDate: $moment().subtract(29, 'days'),
        endDate: $moment(),
        parentEl: '#content'
    };
    $scope.$watch("startDate", function(newValue, oldValue) {
       // console.log("I've changed : ", newValue);
        $scope.updateData();
    });
    $scope.$watch("endDate", function(newValue, oldValue) {
       // console.log("I've changed : ", newValue);

    });

    $scope.updateData=function(){
        $scope.filter={
            startDate:$scope.startDate,
            endDate:$scope.endDate
        }

       $scope.GetTransactionInfo();
        $scope.incomingStat();
        $scope.GetAmountWithCompanies();
        $scope.GetDifferentReport();
        $scope.GetCategoryDifferent();
    }
    /*end datepicker section*/

    $scope.getUsers = function(){
        $scope.data=[];
        var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=3&callback=JSON_CALLBACK';

        /*$http.jsonp(url ).success(function(data){
         $scope.data=data;
         });*/
        $http.get(url).then(function (response) {
            $scope.data=data;
        });
    };
   
    $scope.dataset = [{

        data: [],
        label: 'შემოსავალი',
        bars: {
            show: true,
            barWidth: 0.6,
            lineWidth: 0,
            fillColor: { colors: [{ opacity: 0.3 }, { opacity: 0.8}] }
        }
    }];

    $scope.options = {
        colors: ['#61c8b8'],
        series: {
            shadowSize: 0
        },
        legend: {
            backgroundOpacity: 0,
            margin: -7,
            position: 'ne',
            noColumns: 2
        },
        xaxis: {
            tickLength: 0,
            font: {
                color: '#fff'
            },
            position: 'bottom',
            ticks: [

            ]
        },
        yaxis: {
            tickLength: 0,
            font: {
                color: '#fff'
            }
        },
        grid: {
            borderWidth: {
                top: 0,
                right: 0,
                bottom: 1,
                left: 1
            },
            borderColor: 'rgba(255,255,255,.3)',
            margin:0,
            minBorderMargin:0,
            labelMargin:20,
            hoverable: true,
            clickable: true,
            mouseActiveRadius:6
        },
        tooltip: true,
        tooltipOpts: {
            content: '%s: %y',
            defaultTheme: false,
            shifts: {
                x: 0,
                y: 20
            }
        }
    };

    $scope.getUsers();
    $scope.GetTransactionInfo=function () {

        $http.post('/publisher/dashboard_Get_transaction_info',$scope.filter).then(function(response){
            if(response.data.res=="yes"){
                $scope.transaction=response.data.transaction;

            }
        },function(err){});

    }
    $scope.donutdataset = [

    ];

    $scope.donutoptions = {
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
    $scope.incomingStat=function () {

        $http.post('/publisher/dashboard_incomingStat',$scope.filter).then(function(response){
            if(response.data.res=="yes"){

                $scope.options.xaxis.ticks=response.data.dates;
                $scope.dataset[0].data=response.data.values;

            }else{
                $scope.options.xaxis.ticks=[1,0];
                $scope.dataset[0].data=[1,0];

            }
        },function(err){});

    }
    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        tab1: {
            open: true
        },
        tab2: {
            open: false
        },
        tab3: {
            open: false
        }
    };
    $scope.company=[];
    $scope.donut=[];

    $scope.GetAmountWithCompanies=function () {
        $scope.donutdataset=[];
        $scope.donut=[];
        $http.post('/publisher/GetAmountWithCompanies',$scope.filter).then(function(response){
            if(response.data.res=="yes"){
                angular.forEach(response.data.donut, function(value,key) {
                     $scope.donut.push({label:value.label,data:value.value});
                });
              $scope.donutdataset=$scope.donut;
              $scope.company=response.data.company;
              $scope.donutoptions.colors=response.data.colors;
         }else{
                $scope.donut=[];
                $scope.company=[];
                $scope.donutdataset=[];
         }
        },function(err){});

    }
    $scope.report={
       max:0,
       avg:0,
       my:0
    }
    $scope.GetDifferentReport=function () {

        $http.post('/publisher/GetMaxCompany',$scope.filter).then(function(response){
           if(response.data.res=='yes'){

               $scope.report={
                   max:response.data.max,
                   avg:response.data.avg,
                   my:response.data.my,
               }
            }else{
               $scope.report={
                   max:0,
                   avg:0,
                   my:0
               }
            }
        },function(err){});

    }
    $scope.easypiechart = {
        percent: 100,
        options: {
            animate: {
                duration: 3000,
                enabled: true
            },
            barColor: '#418bca',
            scaleColor: false,
            lineCap: 'round',
            size: 140,
            lineWidth: 4
        }
    };
    $scope.easypiechart2 = {
        percent: 75,
        options: {
            animate: {
                duration: 3000,
                enabled: true
            },
            barColor: '#e05d6f',
            scaleColor: false,
            lineCap: 'round',
            size: 140,
            lineWidth: 4
        }
    };
    $scope.easypiechart3 = {
        percent: 46,
        options: {
            animate: {
                duration: 3000,
                enabled: true
            },
            barColor: '#16a085',
            scaleColor: false,
            lineCap: 'round',
            size: 140,
            lineWidth: 4
        }
    };
    $scope.categories=[];
    $scope.GetAllCategories=function () {

        $http.post('/publisher/GetCategories').then(function(response){
            if(response.data.res=="yes"){
  				$scope.categories=response.data.categories;
				
            }else{
                $scope.categories=[];
            }
        },function(err){});

    }
    $scope.selectedItem={};
    $scope.getSelectedText = function() {

        if ($scope.selectedItem.id !== undefined) {
            return  $scope.selectedItem.name;
        } else {
            return "აირჩიეთ კატეგორია";
        }
    };
    $scope.GetAllCategories();

    $scope.$watch("selectedItem", function(newValue, oldValue) {
        // console.log("I've changed : ", newValue);
        $scope.GetCategoryDifferent();
    });
	$scope.areaData = [];
    $scope.GetCategoryDifferent=function(){
        $scope.filter.category=$scope.selectedItem.id

        $http.post('/publisher/GetCategoryDifferent',$scope.filter).then(function(response){
            if(response.data.res=="yes"){
				$scope.areaData = [
					{ 
						name:response.data.data.name,
						my:response.data.data.my,
						other:response.data.data.other,
					}
				];
			}else{
				$scope.areaData = [];
			}
        },function(err){});

    }
});