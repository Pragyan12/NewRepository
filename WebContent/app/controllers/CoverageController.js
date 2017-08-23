POTApp.controller('CoverageController', function($scope, CoverageService) {
	$scope.Addon_CoversList = CoverageService.getCoverageList().AddonCoverServices;
	$scope.Discount_CoversList = CoverageService.getCoverageList().DiscountCoverServices;
	$scope.AdditionalCoversList = CoverageService.getCoverageList().AdditionalCoverServices;
	
	
	$scope.commoncover = function(name,code,type,orderBy,flag) {
		if (flag == true) {
			CoverageService.set(name,code,type,orderBy);
		} else if (flag == false) {
			CoverageService.removeValuesFromJsonArray(code);
		}
	}	
});
