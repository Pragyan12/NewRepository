/**
 * Premium Computation Logic
 */
POTApp.factory('PolicyDetailsService', function(CoverageService, StorageService, 
		$http, $q,RatingConstants,UrlConstants, cacheFactory) {
	
	return {
		getPolicyDetails : getPolicyDetails
	}

	function getPolicyDetails(quoteNo) {
		var url = UrlConstants.MIS_CLOUD+UrlConstants.GET_POLICY_DETAILS+ quoteNo;
		var deferred = $q.defer();
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			if(response.data.message==="SUCCESS"){
				StorageService.set("quoteNo",response.data.quoteNo);
				maPersonalDetails(response.data.personalInfo);
			}
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		});
	
		return deferred.promise;
	}
	
	function mapDetails(response){
		var personalInfo = {
				firstName : response.personalInfo.firstName,
				lastName : response.personalInfo.lastName,
				mobileNo : response.personalInfo.mobileNo,
				email : response.personalInfo.email,
				aadharNumber : response.personalInfo.aadharNumber,//We Want to split addhar number
		}
		
		
	}

});