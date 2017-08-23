POTApp.controller('DocumentPreview', function($scope, $q, imagePreviewFact) {
	
	$scope.quoteNo;
	$scope.documentPreview;
	
	imagePreviewFact.imageUpload().then(function(response){
		$scope.documentPreview = response.data.fileURLs;
		
		angular.forEach(response.data.fileURLs, function(val, key) {
			$scope.quoteNo = key;
		});
	});

});

