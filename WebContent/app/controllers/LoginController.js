POTApp.controller('LoginController', function($scope, $rootScope, $state,$http,$base64,
		cacheFactory, UrlConstants) {
	$scope.isDisabled=true;
	$scope.errorMessage = '';
	$scope.login = {
		'username' : '',
		'password' : ''
	};
	
	$scope.loginSubmit = function(event, form) {
		if ($scope.form.$valid && $scope.isDisabled) {
			$scope.isDisabled=false;
		   
			/*$http({
		        method: 'POST',
		        url: 'http://fasloginsecurity.azurewebsites.net/login',
		        data: $.param( {'username' : $scope.login.username,'password' : $base64.encode($scope.login.password),'accessType' : 'POT'}),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).then(function successCallback(response) {
		    	$scope.isDisabled=true;
		    	$rootScope.username = response.data.userDetails.Username;
				$rootScope.token = response.data.token;
				$rootScope.loginId = response.data.userDetails.loginId;
				$rootScope.profileId = response.data.userDetails.ProfileId;
				if(response.data.agentDetails!=null){
					$rootScope.intermediaryName = response.data.agentDetails.firstName;
					$rootScope.intermediaryCode = response.data.agentDetails.intermediaryCode;
				}else{
					$rootScope.intermediaryName = '';
				}
				$state.go('product');
		  	  }, function errorCallback(response) {
		  		 $scope.isDisabled=true;
		  		 $scope.login.password = '';
		  		 $scope.errorMessage = response.data.message;
		  		 $state.go('login');
		  	  });*/
		   
		   $state.go('product');
		    
		};
	}
	
	/*$scope.loginSubmit = function(event, form) {
		if($scope.form.$valid && $scope.isDisabled) {
			$scope.isDisabled=false;
			$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		    $http({
		        method: 'POST',
		        url: 'http://fasecurity1.azurewebsites.net/login',
		        data: $.param( {'username' : $scope.login.username,'password' : $base64.encode($scope.login.password),'accessType' : 'MIS'}),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).then(function successCallback(response) {
		    	$scope.isDisabled=true;
		    	$rootScope.username = response.data.userDetails.Username;
				$rootScope.token = response.data.token;
				$rootScope.loginId = response.data.userDetails.loginId;
				$rootScope.profileId = response.data.userDetails.ProfileId;
				if(response.data.agentDetails!=null){
					$rootScope.intermediaryName = response.data.agentDetails.firstName;
					$rootScope.intermediaryCode = response.data.agentDetails.intermediaryCode;
				}else{
					$rootScope.intermediaryName = '';
				}
				$state.go('product');
		  	   }, function errorCallback(response) {
		  		 $scope.isDisabled=true;
		  		 $scope.login.password = '';
		  		$scope.errorMessage = response.data.message;
				$state.go('login');
					
		  	  });
		    
		};
		
		
		if ($scope.form.$valid) {
			$http({
	   	        method : "POST",//"GET","POST"
	   	        url : UrlConstants.LOGIN_URL,
	   	        data : $scope.login,
	   	     headers: {
	   	        "Content-Type": "application/json"
	   	    }
	   	  })
	   	  .then(function successCallback(response) {
	   		$rootScope.username = response.data.userDetails.Username;
			$rootScope.token = response.data.token;
			$rootScope.loginId = response.data.userDetails.loginId;
			$rootScope.profileId = response.data.userDetails.ProfileId;
			if(response.data.agentDetails!=null){
				$rootScope.intermediaryName = response.data.agentDetails.firstName;
				$rootScope.intermediaryCode = response.data.agentDetails.intermediaryCode;
			}else{
				$rootScope.intermediaryName = '';
			}
			$state.go('product');
	  	   }, function errorCallback(response) {
	  		   $scope.login.password = '';
				$state.go('login');
				$scope.errorMessage = error.data.message;
	  	  });
		}
		;

	}*/

});

POTApp.controller('HeaderController',
		function($scope, $rootScope, $state) {
			$scope.quickLink = true;
			$scope.toggleQuickLink = function() {
				$scope.quickLink = ($scope.quickLink === false) ? true : false;
			};

			if ($state.current.name == 'product') {
				$scope.headertext = true;
			}

			if ($state.current.name == 'product'
					|| $state.current.name == 'subProduct') {
				$scope.navheader = true;
			}

			$scope.logout = function() {
				$state.go('login');
			}

			$scope.home = function() {
				$state.go('product');
			}

		});
