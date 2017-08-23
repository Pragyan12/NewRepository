'use strict';
POTApp.factory('SearchService', ['$http', '$q','StorageService','UrlConstants','cacheFactory',function($http, $q,StorageService,UrlConstants,cacheFactory){
	
	var factory = {
			getBusinessType :getBusinessType,
			getpaymentStatus:getpaymentStatus,
			fetchAllDetails : fetchAllDetails,
			fetchBasicDetailsbyQuoteNo:fetchBasicDetailsbyQuoteNo,
			fetchAllPrint:fetchAllPrint	
	    };
	 
	    return factory;
	
	function getBusinessType() {
		var deferred = $q.defer();
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_BUSINESS_TYPE;
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_BUSINESS_TYPE", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		
		return deferred.promise;
	}
	
	
	function getpaymentStatus(){
		return [{
			name : 'DRAFT',
		},{
			name : 'Payment Completed',
		}];
	}
	
	
	function fetchAllDetails(data) {
		
		var deferred=$q.defer();

		var url = UrlConstants.MIS_CLOUD+UrlConstants.SEARCH_IN_POLICY;
		var method="POST";
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
			console.log("error in getting response");
		});
		
		return deferred.promise; 
	}
	
	
	function fetchBasicDetailsbyQuoteNo(quoteNo) {
		var deferred=$q.defer();
		
		var url = UrlConstants.MIS_CLOUD+UrlConstants.GET_POLICY_DETAILS + quoteNo;
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			if(response.data.message==="SUCCESS"){
				StorageService.set("quoteNo",response.data.quoteNo);
    		}
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise; 
	}
	
	function fetchAllPrint(data) {
		
		var deferred=$q.defer();
		
		var url = "http://localhost:8080/masters/printPdf.json";
		var method="POST";
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		});
		
		return deferred.promise; 
	}
	
}]);
