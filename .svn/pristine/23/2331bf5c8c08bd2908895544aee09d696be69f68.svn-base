POTApp.factory("InsurerService", [ "$q", "$http","UrlConstants", "cacheFactory", 
	function($q, $http, UrlConstants, cacheFactory) {
	var listOfInsurer = []; 
	var preferedInsurerList=[];
	return {
		getInsurerList : getInsurerList,
		getRtoListFromRestUrl : getRtoListFromRestUrl,
		getInsuredFromProduct : getInsuredFromProduct,
		getListOfInsurer:getListOfInsurer,
		setPreferredInsurerList:setPreferredInsurerList,
		getPreferredInsurerList:getPreferredInsurerList
	}
	
	function getListOfInsurer(){
		return listOfInsurer;
	}
	function getRtoListFromRestUrl() {
		var deferred = $q.defer();
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_RTOCODE_FOR_ZONALMAPPING;
		var method = "POST";
		var data = {};
		
		cacheFactory.getJsonWithCache("GET_RTOCODE_FOR_ZONALMAPPING", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		
		return deferred.promise;
	}
	function getPreferredInsurerList() {
		return preferedInsurerList;
	}
	
	function setPreferredInsurerList(data) {
		var deferred = $q.defer();
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_PREFERRED_INSURER_DETAILS;
		var method = "POST";
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			preferedInsurerList = response.data.preferredInsurers;
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		return deferred.promise;
	}
	
	
	
	function getInsurerList() {
		var deferred = $q.defer();
		
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_INSURER_DETAILS;
		var method = "POST";
		var data = {};
		
		cacheFactory.getJsonWithCache("GET_INSURER_DETAILS", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		
		return deferred.promise;
	}
	
	function getInsuredFromProduct(productCode) {
		var deferred = $q.defer();
		
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_ALL_MAPPED_INSURER;
		var method = "POST";
		var data = {};
		
		cacheFactory.getJsonWithCache("GET_ALL_MAPPED_INSURER", method, url, data).then(function (response) {
			listOfInsurer = response.data.insurerMappedList;
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		
		return deferred.promise;
	}
} ]);
