POTApp.factory("RTO_SERVICE", ["$q","$http",function($q,$http,UrlConstants) {
	var common_filter_values = {};
	return {
		getRtoListFromRestUrl : getRtoListFromRestUrl
		   }
	
	function getRtoListFromRestUrl() {
		var deferred = $q.defer();
		
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_RTOCODE_FOR_ZONALMAPPING;
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_RTOCODE_FOR_ZONALMAPPING", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		
		return deferred.promise;
	}
}]);
	
	
































/*
 * AngApp.factory("VEHICLEINFO_LIST", [function() { return [
 * {manufacturer:'TATA',modelCc:'i201500',rto:'CHN',registrationDate:'18-6-17',manufactureryear:'2015',fuelType:'DIESEL',seatingCapacity:'7',previousPolicyExpiryDate:''}, ];
 * }]);
 */