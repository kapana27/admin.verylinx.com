'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MailCtrl
 * @description
 * # MailCtrl
 * Controller of the minovateApp
 */
app.controller('panelCtrl', function ($scope,$http) {})
.controller('panelusersCtrl',['$scope','$http','$filter','$mdDialog' ,function ($scope,$http,$filter,$mdDialog) {
	 $scope.page = {
		  title: 'იუზერები', 
		  subtitle: 'Place subtitle here...'
		};
		$scope.users=[];
		 $scope.GetUsers=function(){
			$http.post("/panel/GetUsers").then(function (response) {
				if(response.data.res=='yes'){
					$scope.users=response.data.users;
					$scope.bigTotalItems=response.data.total;

				}else{
					$scope.users=[];
				}

			});
		}
	 $scope.editUser = function(ev,user) {
		if(user.group_id=="6"){
			$scope.templateUri='publisher.tmpl.html';
		} else if(user.group_id=="5"){
			$scope.templateUri='advertiser.tmpl.html';
		}
		   console.log(user);
		$mdDialog.show({
			templateUrl:$scope.templateUri ,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
			controller: function($scope, $mdDialog){
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
                     $scope.action="panel/UpdatePublisher";
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
                        option2value:user.option2value
                    };
                    $scope.params=$scope.advertiser;
                    $scope.action="panel/UpdateAdvertiser";
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
}]).controller('panelcompaniesCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {
	
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
						$scope.api.addRemoteFile('b/getImage?logo='+$rootScope.logo,$rootScope.logo,'image');
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
	
}).controller('panelcategoriesCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {
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

}).controller('panelbanersCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {
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
}).controller('panelrequestsCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope) {
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
}).controller('paneluserPercentCtrl', function ($scope,$http,$filter,$mdDialog, $timeout,$rootScope,$state) {
    $scope.page = {
        title: 'კომპანიები',
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

    $scope.refreshData=function(){
        $scope.GetCompanies();
    }
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
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.go=function(id){

        $state.go("app.panel.personalPercent",{ "id": id});
    }
})
.controller('panelpersonalCommisionsCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {
    $scope.page = {
        title: 'პერსონალური საკომისიო (სია)',
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
    $scope.filter={
        id:$scope.id
    };
    $scope.refreshData=function(){

        $scope.GetPersonalComission();
    };
    $scope.company=[];
    $scope.users=[];
    $scope.category=[];
    $scope.load=false;
    $scope.GetPersonalComission=function(){


        $http.post("/panel/GetPersonalComissionList",$scope.filter).then(function (response) {
            if(response.data.res=='yes'){

                $scope.commission=response.data.commission;
                $scope.bigTotalItems=response.data.total;
                if(!$scope.load){
                    $scope.load=true;
                    $scope.company=response.data.company;
                    $scope.users=response.data.users;
                    $scope.category=response.data.category;
                }

            }else{
                $scope.commission=[];
            }
        });
    };
    $scope.refreshData=function(){
        $scope.GetPersonalComission();
    };
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.go=function(id){
        console.log(id);
       $state.go("app.panel.personalPercent",{ "id": id});
    }
}]) .controller('panelpersonalPercentCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {
    $scope.id=$stateParams.id;
    $scope.page = {
        title: 'პერსონალური საკომისიო',
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
    $scope.filter={
        id:$scope.id
    };
    $scope.refreshData=function(){

        $scope.GetPersonalComission();
    };
    $scope.GetCompamyInfo=function(){
        $http.post("/panel/GetViewCompany",{id:$scope.id}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.company=response.data.info;
                $scope.GetCategories();
           }else{
                $state.go('app.dashboard');
            }
        });
    };
    $scope.GetUsers=function(){
        $http.post("/panel/GetJoinedUsers",{id:$scope.id}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.users=response.data.users;
            }else{
                $scope.users=[];
            }
        });
    };

    $scope.GetCategories=function(){
        $http.post("/panel/GetCompanyCategories",{id:$scope.id}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.categories=response.data.categories;
            }else{
                $scope.categories=[];
            }
        });
    };
    $scope.GetPersonalComission=function(){
        $scope.GetUsers();

        $http.post("/panel/GetPersonalComission",$scope.filter).then(function (response) {
            if(response.data.res=='yes'){
                $scope.commission=response.data.commission;
                $scope.bigTotalItems=response.data.total;
            }else{
                $scope.commission=[];
            }
        });
    };
    $scope.refreshData=function(){
        $scope.GetPersonalComission();
     };
    $scope.AddCommission=function(ev){

        $mdDialog.show({
            templateUrl: "AddCommission.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function ($scope, $mdDialog, $timeout, $rootScope) {
                $scope.comission={};
                $scope.id=$stateParams.id;
                $scope.cancel=function () {
                    $mdDialog.cancel();
                };

                $scope.GetCategories=function(){
                    $http.post("/panel/GetCompanyCategories",{id:$scope.id}).then(function (response) {
                        if(response.data.res=='yes'){
                            $scope.categories=response.data.categories;

                        }else{
                            $scope.categories=[];
                        }
                    });
                };
				$scope.GetUsers=function(){
                    $http.post("/panel/GetJoinedUsers",{id:$scope.id}).then(function (response) {
                        if(response.data.res=='yes'){
                            $scope.users=response.data.users;
                        }else{
                            $scope.users=[];
                        }
                    });
                };
                $scope.comission.status='active';
                $scope.GetCategories();
				$scope.GetUsers();
                $scope.multipercent=[];
                $scope.comissions=[0];
                $scope.add=function(){
                   $scope.comissions.push($scope.comissions.length);

                };

				$scope.changeCategory=function(){
					$scope.commisType();
					if($scope.comissions.length>0){
						for(var i=0;i<$scope.comissions.length;i++){

							$scope.multicommission(i);
						}
					}
				};

				$scope.commisType=function(){


                    $scope.comission.cpa=$scope.categories[$scope.comission.category].user_cpa;
                    $scope.comission.cpatype=$scope.categories[$scope.comission.category].user_cpatype;
                    $scope.comission.cpl=$scope.categories[$scope.comission.category].user_cpl;
                    $scope.comission.cpltype=$scope.categories[$scope.comission.category].user_cpltype;

				};


				$scope.multicommission=function(i){

                    if( $scope.multipercent[i].type=='cpa'){
                        $scope.multipercent[i].price=$scope.categories[$scope.comission.category].user_cpa;
                        $scope.multipercent[i].percent=$scope.categories[$scope.comission.category].cpatype;
                    }else if($scope.multipercent[i].type=='cpl'){
                        $scope.multipercent[i].price=$scope.categories[$scope.comission.category].user_cpl;
                        $scope.multipercent[i].percent=$scope.categories[$scope.comission.category].cpltype;
                    }
 				};
				
                $scope.save=function(){
					$scope.params={
						id:$scope.id,
						comission:$scope.comission,
						multiple:$scope.multipercent,
						multi:$scope.comission.multiple

					};	
                   $http.post("/panel/AddpersonalComission",$scope.params).then(function (response) {
                       if(response.data.res=='yes'){
                           $mdDialog.cancel();
                        }else{
                           if(response.data.alert=='yes'){
                                alert(response.data.error);
                           }
                           $scope.error=response.data.error;
                        }
                    });
                };
                $scope.delete=function(i){
                    var index =  $scope.comissions.indexOf(i);
					$scope.multipercent.splice(index, 1);
                    $scope.comissions.splice(index, 1);
                }

            }
        }).finally(function(){
            $scope.GetPersonalComission();
        });
  };

   $scope.editComission=function(ev,cat){


       $mdDialog.show({
           templateUrl: "AddCommission.html",
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose: true,
           fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
           controller: function ($scope, $mdDialog, $timeout, $rootScope) {

               $scope.cancel = function () {
                   $mdDialog.cancel();
               }
               $scope.comission = {};
               $scope.id = $stateParams.id;
               $scope.GetCategories = function () {
                   $http.post("/panel/GetCompanyCategories", {id: $scope.id}).then(function (response) {
                       if (response.data.res == 'yes') {
                           $scope.categories = response.data.categories;
                       } else {
                           $scope.categories = [];
                       }
                   });
               };
               $scope.GetUsers = function () {
                   $http.post("/panel/GetJoinedUsers", {id: $scope.id}).then(function (response) {
                       if (response.data.res == 'yes') {
                           $scope.users = response.data.users;
                       } else {
                           $scope.users = [];
                       }
                   });
               };
               $scope.add=function(){
                   $scope.comissions.push($scope.comissions.length);

               }
               $scope.comission={
                   category:cat.catid,
                   userid:cat.uid,
                   multiple:cat.multiple,
                   status:cat.status,
                   cpa:cat.cpa,
                   cpl:cat.cpl,

                   cpltype:(cat.cpltype=='fixed')? true:false,
                   cpatype:(cat.cpatype=='fixed')? true:false
               };

               $scope.comissions=[];
               $scope.multipercent=[];
               if(cat.multiple=='yes'){
                   var data=JSON.parse(cat.data);
                    for(var i=0;i<data.length;i++){
                        $scope.comissions.push(i);
                       $scope.multipercent.push({
                            min:data[i].min,
                            max:data[i].max,
                            type:data[i].type,
                            percent:data[i].percent,
                            price:data[i].price
                        });
                        //$scope.multipercent[i].min=data[i].min;
                       // $scope.multipercent[i].max=data[i].max;
                        //$scope.multipercent[i].type=data[i].type;
                       // $scope.multipercent[i].percent=data[i].percent;
                       // $scope.multipercent[i].price=data[i].price;
                        console.log(data[i]);
                    }
                  console.log($scope.multipercent);

               }
               $scope.commisType=function(){


                   $scope.comission.cpa=$scope.categories[$scope.comission.category].user_cpa;
                   $scope.comission.cpatype=$scope.categories[$scope.comission.category].user_cpatype;
                   $scope.comission.cpl=$scope.categories[$scope.comission.category].user_cpl;
                   $scope.comission.cpltype=$scope.categories[$scope.comission.category].user_cpltype;

               };


               $scope.multicommission=function(i){

                   if( $scope.multipercent[i].type=='cpa'){
                       $scope.multipercent[i].price=$scope.categories[$scope.comission.category].user_cpa;
                       $scope.multipercent[i].percent=$scope.categories[$scope.comission.category].cpatype;
                   }else if($scope.multipercent[i].type=='cpl'){
                       $scope.multipercent[i].price=$scope.categories[$scope.comission.category].user_cpl;
                       $scope.multipercent[i].percent=$scope.categories[$scope.comission.category].cpltype;
                   }
               };

               $scope.GetCategories();
               $scope.GetUsers();
               $scope.delete=function(i){
                   var index =  $scope.comissions.indexOf(i);
                   $scope.multipercent.splice(index, 1);
                   $scope.comissions.splice(index, 1);
               }
               $scope.save=function(){
                   $scope.params={
                       id:$scope.id,
                       comission:$scope.comission,
                       multiple:$scope.multipercent,
                       multi:$scope.comission.multiple,
                       update:'yes',
                       pc:cat.id
                   };
                   $http.post("/panel/AddpersonalComission",$scope.params).then(function (response) {
                       if(response.data.res=='yes'){
                           $mdDialog.cancel();
                       }else{
                           if(response.data.alert=='yes'){
                               alert(response.data.error);
                           }
                           $scope.error=response.data.error;
                       }
                   });
               }

           }}).finally(function(){
           $scope.GetPersonalComission();
       });

   }

    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
}]) .controller('panelverylinxCategoriesCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {


    $scope.categories=[];
    $scope.GetCategories=function(){
        $http.post("/panel/GetAllCategories").then(function(response){

            if(response.data.res=="yes"){
                $scope.categories=response.data.categories;
                $scope.bigTotalItems=$scope.categories.length;
            }else{
                $scope.categories=[];
            }

        });

    }
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
   $scope.GetCategories();

    $scope.AddNewCategory=function(ev,cat,type,form){
        console.log(form);
        $mdDialog.show({
           
            templateUrl: 'addcategory.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen,
            controller: function ($scope,$mdDialog,$http) {
                $scope.cat=cat;
                $scope.form=form;
                $scope.save=function(){
                    $scope.error=[];
                    $http.post("/panel/saveCategory",$scope.form).then(function(response){
                       if(response.data.res=='yes'){
                          // $mdDialog.hide();
                           $scope.GetCategories();
                       }else{
                           $scope.error=response.data.error;
                           console.log($scope.error);
                       }
                    });

                }
                $scope.cancel=function(){
                    $mdDialog.cancel();
                }
            }


        })
            .finally(function(){
                $scope.GetCategories();
            });

    }

}]).controller('panelglobalChangeCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {

    $scope.page = {
        title: 'კომპანიები',
        subtitle: 'Place subtitle here...'
    };
    $scope.users=[];
    $scope.getMycategories=function(){
        $http.post("/panel/GetCategories",{lang:$scope.currentLanguage}).then(function (response) {
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

    $scope.viewby = 50;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.changes=function(ev){
        $mdDialog.show({
            templateUrl: 'globalchange.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,

            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            controller: function ($scope, $mdDialog,$http) {
                $scope.form={};
                $scope.error="";
                $scope.save=function(){
                    $http.post("/panel/changeglobalcommission",$scope.form).then(function(response){
                        if(response.data.res=="yes"){
                            $mdDialog.hide();
                        }else{
                            $scope.error=response.data.error;
                        }
                    });
                }
                $scope.cancel=function(){
                    $mdDialog.cancel();
                }

            }
        })
    }
}]).controller('panelnewsCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {
        $scope.news=[];
       $scope.GetNews=function () {
           $http.post("/panel/GetNews").then(function(response){
               if(response.data.res=='yes'){
                    $scope.news=response.data.news;
                   $scope.bigTotalItems=$scope.news.length;
               }else{
                    $scope.news=[];
               }
           });
       }
      $scope.go=function(ev,news){
          $mdDialog.show({
              templateUrl: 'news.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,

              fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
              controller: function ($scope, $mdDialog,$http) {
                $scope.n=news;
                $scope.save=function () {
                     $http.post("/panel/saveNews",$scope.n).then(function(response){
                        if(response.data.res=="yes"){
                            $mdDialog.cancel();
                        }
                     });
                }

                $scope.cancel=function () {
                    $mdDialog.cancel();
                }
              }
          }).finally(function () {
              $scope.GetNews();
          });

      }

    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show


}]).controller('PanelAllprogramsCtrl',['$scope','$stateParams','$mdDialog','$state','$http',  function ($scope,$stateParams,$mdDialog,$state,$http) {
    $scope.page = {
        title: 'ყველა პროგრამა',
        subtitle: 'Place subtitle here...'
    };
    $scope.form={};
    $scope.data=[];
    $scope.GetCompanies=function(){
        $http.post("/allprograms/GetPrograms",$scope.form).then(function (response) {
            if(response.data.res=='yes'){
                $scope.data=response.data.company;
                $scope.bigTotalItems=response.data.total;

            }else{
                $scope.data=[];
            }

        });
    }
    $scope.viewby = 10;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show


    $scope.$watch('currentLanguage',function(){

        $scope.GetCategories();
    });
    $scope.categories=[];
    $scope.GetCategories=function(){
        $http.post("/global/GetCategories",{lang:$scope.currentLanguage}).then(function (response) {
            if(response.data.res=='yes'){
                $scope.categories=response.data.categories;
                console.log($scope.categories);
            }  else{
                $scope.categories=[];
            }
        });
    }
    $scope.GetCategories();
    $scope.refreshData=function(){
        $scope.GetCompanies();
    }
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.go=function(id){
        $state.go("app.programs.view",{ "id": id});
    };
}]);

