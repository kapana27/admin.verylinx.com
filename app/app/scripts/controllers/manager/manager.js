app.controller('managerCtrl', function($scope,$http, $mdToast,$rootScope, $timeout,$interval,$moment) {
    $scope.page = {
        title: 'manager',
        subtitle: 'dashboard...'
    };
    var promise;

    $scope.searchquery='';

    $scope.showUsers=function(){
        console.log($scope.searchquery);

    }

    // simulated items array
    $scope.items = [];

    // starts the interval
    $scope.start = function() {
        // stops any running interval to avoid two intervals running at the same time
        $scope.stop();

        // store the interval promise
        promise = $interval($scope.showCustomToast, 10000);
    };

    // stops the interval
    $scope.stop = function() {
        $interval.cancel(promise);
    };

    // starting the interval by default


    // stops the interval when the scope is destroyed,
    // this usually happens when a route is changed and
    // the ItemsController $scope gets destroyed. The
    // destruction of the ItemsController scope does not
    // guarantee the stopping of any intervals, you must
    // be responsible for stopping it when the scope is
    // is destroyed.
    $scope.$on('$destroy', function() {
        $scope.stop();
    });

    $scope.check=function(){

        $http.get("user/checkNotification").then(function (response) {
            if(response.data.res=="yes"){
                 $scope.start();
            }else{
                $scope.stop();
            }
        });
    }



    $scope.showCustomToast = function() {
        $mdToast.show({
            hideDelay   : 10000,
            position    : 'top right',
            templateUrl : 'toast-notification.html',
            controller:function($scope,$mdToast,$mdDialog){
                var isDlgOpen;
                $scope.closeToast = function() {
                    if (isDlgOpen) return;

                    $mdToast
                        .hide()
                        .then(function() {
                            isDlgOpen = false;
                        });
                };

                $scope.openMoreInfo = function(e) {
                    if ( isDlgOpen ) return;
                    isDlgOpen = true;

                    $mdDialog.show($mdDialog
                            .alert()
                            .title('More info goes here.')
                            .textContent('Something witty.')
                            .ariaLabel('More info')
                            .ok('Got it')
                            .targetEvent(e)
                        )
                        .then(function() {
                            isDlgOpen = false;
                        });
                };
            }
        });
    };
    $scope.mails=[];
    $http.get("/message/GetInboxEmail").then(function(response){
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
}).controller('ManagerReportCtrl', function($scope,$http, $mdToast,$rootScope, $timeout,$interval,$moment) {
    $scope.page = {
        title: 'manager',
        subtitle: 'dashboard...'
    };
    $scope.data=[];
    $scope.publisher_stat=[];
    $scope.advertiser_stat=[];
    $scope.startDate = $moment().format('MMMM D, YYYY');
    $scope.endDate = $moment().add(0, 'days').format('MMMM D, YYYY');
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
        startDate: $moment(),
        endDate: $moment(),
        parentEl: '#content'
    };

    $scope.$watch('startDate', function() {
        $scope.GetReport();
    });
    $scope.GetReport=function(){
      $http.post("/managerStatistic/GetInfo",{startDate:$scope.startDate, endDate:$scope.endDate}).then(function(response){
            if(response.data.res=='yes'){
                $scope.data=response.data.data;
                $scope.publisher_stat=response.data.publisher_stat;
                $scope.advertiser_stat=response.data.advertiser_stat;
                $scope.click_stat_publisher=response.data.click_stat_publisher;
                $scope.click_stat_advertiser=response.data.click_stat_advertiser;
                $scope.pub_amount_list=response.data.pub_amount_list;
                $scope.pub_click_list=response.data.pub_click_list;
                $scope.top_cpa=response.data.top_cpa;
                $scope.top_cpl=response.data.top_cpl;
            }else{
                $scope.data=[];
            }
       });
   }
});
