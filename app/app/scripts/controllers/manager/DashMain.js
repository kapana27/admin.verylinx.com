/**
 * Created by kapana27 on 22-08-2017.
 */
app
    .controller('MainUsersCtrl', function ($scope,$http,$state,$mdDialog) {
        $scope.users=[];
        $scope.GetUsers=function(){
            $http.get("/panel/GetUsers").then(function(response){
                if(response.data.res=='yes'){
                    $scope.users=response.data.users;
                    $scope.bigTotalItems=response.data.total;

                }else{
                    $scope.users=[];
                }

            });
        }
        $scope.showAllusers=false;
        $scope.showAll=function(){
           console.log($scope.showAllusers);
        }

        $scope.filter=function(u){
           if($scope.showAllusers){
               return true;
           }else{
               if(u.checked=='no' || u.status=='pending' || u.verified=='no'){
                   return true;
               }
           }
        }
        $scope.checkUser=function(u){

           $http.post("/panel/checkuser",u).then(function(response){
                if(response.data.res=='yes'){
                    if(u.selected){
                        u.checked="yes";
                    }else{
                        u.checked="no";
                    }
                }
           });
        }
        $scope.editUser = function(ev,user) {
            if(user.group_id=="6"){
                $scope.templateUri='publisher.tmpl.html';
            } else if(user.group_id=="5"){
                $scope.templateUri='advertiser.tmpl.html';
            }

            $mdDialog.show({
                templateUrl:$scope.templateUri ,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                controller: function($scope, $mdDialog){
                    console.log(user);
                    if(user.group_id=="6"){
                        $scope.publisher={
                            id:user.id,
                            fname:user.fname,
                            lname:user.lname,
                            country:user.p_country,
                            p_status:user.p_status,
                            mail:user.mail,
                            username:user.username,
                            password:user.password,
                            space_type:user.space_type,
                            sp_address:user.sp_address,
                            segment:user.segment,
                            sp_name:user.sp_name,
                            s_region:user.s_region,
                            p_category:user.p_category,
                            promote:user.promote,
                            status:user.status
                        }
                        $scope.params=$scope.publisher;
                        $scope.action="/panel/UpdatePublisher";
                    } else if(user.group_id=="5"){
                        $scope.advertiser={
                            id:user.id,
                            fname:user.fname,
                            lname:user.lname,
                            mail:user.mail,
                            username:user.username,
                            url:user.website,
                            phone:user.phone,
                            segment:user.segment,
                            status:user.status,
                            verified:user.verified,
                            option2value:user.option2value
                        };
                        $scope.params=$scope.advertiser;
                        $scope.action="/panel/UpdateAdvertiser";
                    }
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.save=function(){
                        $http.post($scope.action,$scope.params).then(function (response) {
                            if(response.data.res=='yes'){
                                $mdDialog.cancel();
                            }else{
                                $scope.errors=response.data.error;
                            }

                        });
                    }

                }
            })
                .finally(function(answer) {
                    $scope.GetUsers();
                });
        };
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

            angular.forEach($scope.users, function(mail) {
                mail.selected = $scope.selectedAll;
            });
        };

        $scope.viewby = 10;
        $scope.bigCurrentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; //Number of pager buttons to show
    }).controller('MainCompaniesCtrl', function ($scope,$http,$state,$mdDialog) {

    $scope.page = {
        title: 'კომპანიები',
        subtitle: 'Place subtitle here...'
    };
    $scope.users=[];
    $scope.GetCompanies=function(){
        $http.post("/panel/GetCompanies").then(function (response) {
            if(response.data.res=='yes'){
                $scope.users=response.data.users;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.users=[];
            }

        });
    }
    $scope.editcompany = function(ev,company) {
        $scope.templateUri='company.tmpl.html';
        $mdDialog.show({
            templateUrl:$scope.templateUri ,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function($scope, $mdDialog, $timeout,$rootScope){
                $scope.company={};
                if(company !=undefined){
                    $scope.company.companyName=company.companyName;
                    $scope.company.Identification=company.Identification;
                    $scope.company.companyUrl=company.companyUrl;
                    $scope.company.id=company.id;
                    $scope.company.logo=company.logo;
                    $scope.company.status=company.status;
                    $rootScope.logo=$scope.company.logo;
                    $timeout(
                        function(){
                            $scope.api.addRemoteFile('/b/getImage?logo='+$rootScope.logo,$rootScope.logo,'image');
                        }
                    )
                }


                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.save=function(){
                    $scope.errors={};
                    var formData= new FormData();


                    angular.forEach($scope.company.logo,function(obj) {
                        if(!obj.isRemote){
                            formData.append('files[]', obj.lfFile);
                        }
                    });


                    if($scope.company.id !="" && $scope.company.id !=undefined){
                        formData.append('id', $scope.company.id);
                    }
                    if($scope.company.companyName !="" && $scope.company.companyName !=undefined){
                        formData.append('companyName', $scope.company.companyName);
                    }
                    if($scope.company.Identification !="" && $scope.company.Identification !=undefined){
                        formData.append('Identification', $scope.company.Identification);
                    }
                    if($scope.company.companyUrl !="" && $scope.company.companyUrl !=undefined){
                        formData.append('companyUrl', $scope.company.companyUrl);
                    }
                    if($scope.company.status !="" && $scope.company.status !=undefined){
                        formData.append('status', $scope.company.status);
                    }
                    $http.post('/panel/editCompany/', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(response){
                        if(response.data.res=="yes"){
                            $mdDialog.hide();
                        }else{
                            $scope.errors=response.data.error;
                        }
                    },function(err){
                        // do sometingh
                    });
                }

            }
        })
            .finally(function(answer) {
                $scope.GetCompanies();
            });
    };
    $scope.selectedAll = false;

    $scope.selectAll = function () {
        angular.forEach($scope.users, function(user) {
            user.selected = $scope.selectedAll;
        });
    };

    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

}).controller('MainCategoriesCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {
    $scope.page = {
        title: 'კომპანიები',
        subtitle: 'Place subtitle here...'
    };
    $scope.users=[];
    $scope.getMycategories=function(){
        $http.post("/panel/GetCategories").then(function (response) {
            if(response.data.res=='yes'){
                $scope.users=response.data.users;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.users=[];
            }

        });
    }
    $scope.category = function(ev,c) {
        console.log(c);
        $mdDialog.show({
            templateUrl: 'category.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,

            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function ($scope, $mdDialog) {

                $http.post('/company/GetCompany').then(function(response){
                    if(response.data.res=="yes"){
                        $scope.companies=response.data.company;
                    }else{
                        $scope.companies=[];
                    }
                },function(err){});
                $http.post('/company/GetCategories').then(function(response){
                    if(response.data.res=="yes"){
                        $scope.categories=response.data.categories;
                    }else{
                        $scope.categories=[];
                    }
                },function(err){});
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.selectedCompany={
                    id:c.cid,
                    companyName:c.companyName
                };
                $scope.selectedItem={
                    id:c.catid,
                    name:c.name,
                    pay:c.pay
                };
                $scope.mycatid=c.mycatid;
                $scope.global_change=c.global_change;
                $scope.price={
                    cpa:c.cpa,
                    cpatype:(c.cpatype=='fixed')?true:false,
                    cpltype:(c.cpltype=='fixed')?true:false,
                    cpl:c.cpl,
                    user_cpl:c.user_cpl,
                    user_cpa:c.user_cpa
                }
                $scope.status=c.status;
                $scope.getSelectedText = function() {
                    console.log($scope.selectedItem);
                    if ($scope.selectedItem.id !== undefined) {
                        return  $scope.selectedItem.name;
                    } else {
                        return "აირჩიეთ კატეგორია";
                    }
                };
                $scope.getSelectedCompany = function() {

                    if ($scope.selectedCompany.id !== undefined) {
                        return  $scope.selectedCompany.companyName;
                    } else {
                        return "აირჩიეთ კომპანია";
                    }
                };
                $scope.accept = function(answer) {
                    $scope.params={
                        id:c.id,
                        cid:$scope.selectedCompany.id,
                        catid:$scope.selectedItem.id,
                        cpa:$scope.price.cpa,
                        cpatype:$scope.price.cpatype,
                        cpltype:$scope.price.cpltype,
                        cpl:$scope.price.cpl,
                        pay:$scope.selectedItem.pay,
                        user_cpa:$scope.price.user_cpa,
                        user_cpl:$scope.price.user_cpl,
                        mycatid:$scope.mycatid,
                        status:$scope.status,
                        global_change:$scope.global_change
                    };
                    $http.post('/panel/editmycategory', $scope.params ).then(function(response){
                        if(response.data.res=="yes"){
                            $mdDialog.hide();
                            $rootScope.$broadcast($scope.getMycategories());
                        }else{
                            $scope.error=response.data.error;

                        }
                    },function(err){});
                };

            }
        }).finally(function(answer) {
            $scope.getMycategories();
        });
    };
    $scope.selectedAll = false;

    $scope.selectAll = function () {
        angular.forEach($scope.users, function(user) {
            user.selected = $scope.selectedAll;
        });
    };

    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

}).controller('MainBannersCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {
    $scope.page = {
        title: 'კომპანიები',
        subtitle: 'Place subtitle here...'
    };
    $scope.users=[];
    $scope.GetBanners=function(){
        $http.post("/panel/GetBanners").then(function (response) {
            if(response.data.res=='yes'){
                $scope.users=response.data.users;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.users=[];
            }

        });
    }
    $scope.editcompany = function(ev,banners) {
        $scope.templateUri='company.tmpl.html';
        $mdDialog.show({
            templateUrl:$scope.templateUri ,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function($scope, $mdDialog, $timeout,$rootScope){

                $scope.company={};
                $scope.companies=[];
                $scope.categories
                $scope.banner={
                    id:banners.id,
                    company:banners.companyId,
                    category:banners.catid,
                    name:banners.name,
                    redirecUri:banners.redirecUri,
                    status:banners.status
                };

                $rootScope.image=banners.url;
                $timeout(
                    function(){
                        $scope.api.addRemoteFile('/site/view?src='+$rootScope.image,$rootScope.image,'image');
                    }
                )
                console.log($scope.banners);
                $http.post('/panel/GetCompany').then(function(response){
                    if(response.data.res=="yes"){
                        $scope.companies=response.data.company;
                    }else{
                        $scope.companies=[];
                    }
                },function(err){ });

                $scope.com_id=function(){
                    $http.post('/panel/GetMyCategories',{catid:   $scope.banner.company} ).then(function(response){
                        if(response.data.res=="yes"){
                            $scope.categories=response.data.categories;

                        }else{
                            $scope.categories=[];

                        }
                    },function(err){});
                }
                $scope.com_id();

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.save=function(){
                    var formData= new FormData();

                    angular.forEach($scope.file,function(obj) {
                        if(!obj.isRemote){
                            formData.append('files[]', obj.lfFile);
                        }
                    });
                    if($scope.banner.id !="" && $scope.banner.id !=undefined){
                        formData.append('id', $scope.banner.id);
                    }
                    if($scope.banner.name !="" && $scope.banner.name !=undefined){
                        formData.append('name', $scope.banner.name);
                    }
                    if($scope.banner.redirecUri !="" && $scope.banner.redirecUri !=undefined){
                        formData.append('redirecUri', $scope.banner.redirecUri);
                    }
                    if($scope.banner.company !="" && $scope.banner.company !=undefined){
                        formData.append('company', $scope.banner.company);
                    }
                    if($scope.banner.status !="" && $scope.banner.status !=undefined){
                        formData.append('status', $scope.banner.status);
                    }
                    if($scope.banner.category !="" && $scope.banner.category !=undefined){
                        formData.append('category', $scope.banner.category);
                    }
                    $http.post('/panel/UpdateBanners', formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(response){
                        if(response.data.res=="yes"){

                            $mdDialog.cancel();
                        }else{
                            $scope.error=response.data.error;
                        }
                    },function(err){
                        // do sometingh
                    });
                }

            }
        })
            .finally(function(answer) {
                $scope.GetBanners();
            });
    };
    $scope.selectedAll = false;

    $scope.selectAll = function () {
        angular.forEach($scope.users, function(user) {
            user.selected = $scope.selectedAll;
        });
    };

    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    }).controller('MainRequestsCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {

    $scope.page = {
        title: 'მოთხოვნები',
        subtitle: 'Place subtitle here...'
    };
    $scope.users=[];
    $scope.GetRequests=function(){
        $http.post("/panel/GetRequests").then(function (response) {
            if(response.data.res=='yes'){
                $scope.users=response.data.requests;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.users=[];
            }

        });
    }
    $scope.joined = function(ev,details) {
        $scope.templateUri='joined.tmpl.html';
        $mdDialog.show({
            templateUrl:$scope.templateUri ,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function($scope, $mdDialog, $timeout,$rootScope){
                $scope.details={
                    id:details.id,
                    companyName:details.companyName,
                    name:details.name,
                    website:details.website,
                    joined:details.joined,
                    manager_ok:details.manager_ok,
                    company_ok:details.company_ok,
                    status:details.status
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.save=function(){
                    $http.post("/panel/UpdateRequests",$scope.details).then(function (response) {
                        $scope.error='';
                        if(response.data.res=='yes'){
                            $mdDialog.cancel();
                        }else{
                            $scope.error=response.data.error;
                        }
                    });
                }
            }
        }).finally(function(){
            $scope.GetRequests();
        })
        ;
    };
    $scope.selectedAll = false;

    $scope.selectAll = function () {
        angular.forEach($scope.users, function(user) {
            user.selected = $scope.selectedAll;
        });
    };

    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
});