POTApp.controller('ProductController', function($scope, $rootScope, $state,
		StorageService) {
	$scope.submit = function(product) {
		StorageService.removeAll();
		StorageService.set('productName', 'Motor Insurance');
		StorageService.set('productcode', product);
		$state.go('subProduct');
	}
	
});

POTApp.controller('SubProductController', function($scope, $rootScope, $state,StorageService, ProductService) {
	$scope.subProductList = ProductService.subProductList();
	
	$scope.showQuickQuote = false;
	$scope.productDetails = StorageService.getAll();
	if (angular.isUndefined($scope.productDetails.subProductCode)) {
		$scope.showQuickQuote = false;
	} else {
		$scope.showQuickQuote = true;
	}
	$scope.viewQuickQuote = function(subProductCode, subProductName) {
		$scope.showQuickQuote = true;
		StorageService.set('subProductCode', subProductCode);
		StorageService.set('subProductName', subProductName);
		$scope.productDetails = StorageService.getAll();
		$scope.listproductsName = subProductName;
		if(subProductCode==="PCC"){
			$state.go('basicQuoteInfo');		
		}
		
	}
	$scope.quickQuote = function(e, form) {
		e.preventDefault();
		form.$setSubmitted();
		if ($scope.form.$valid) {
			StorageService.set('aadharNo', $scope.productDetails.aadharNo);
			StorageService.set('vehicleNo', $scope.productDetails.vehicleNo);
			$state.go('basicQuoteInfo');
		}
	}
	$scope.proceed = function() {
		StorageService.set('aadharNo', $scope.productDetails.aadharNo);
		StorageService.set('vehicleNo', $scope.productDetails.vehicleNo);
		$state.go('basicQuoteInfo');
	}
	
	
});
