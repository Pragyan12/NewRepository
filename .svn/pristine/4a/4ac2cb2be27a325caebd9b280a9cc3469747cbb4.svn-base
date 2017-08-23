'use strict';
POTApp.factory('PaymentService', ['StorageService','$http','$rootScope', '$q',"UrlConstants","cacheFactory", 
	function(StorageService,$http,$rootScope, $q, UrlConstants, cacheFactory){
	var paymentDetailsForAll = {};

	var factory = {
			fetchAllBankDetails: fetchAllBankDetails,
			paymentDetails : paymentDetails,
			callServerforOfflinePayment :callServerforOfflinePayment,
			fetchPolicyStartDate:fetchPolicyStartDate
	    };
	 
	    return factory;
	    
	    function fetchAllBankDetails() {
	        var deferred = $q.defer();
	        var url = UrlConstants.MASTER_URL+UrlConstants.GET_ALL_BANK_MASTER;
	        var method="POST";
	        var data = {};
	        cacheFactory.getJsonWithCache("GET_ALL_BANK_MASTER", method, url, data).then(function (response) {
	        	deferred.resolve(response);
        	},function error(response){
        		console.error('Error while fetching Users');
        		deferred.reject(response);
        	});
	        
	        return deferred.promise;
	    }
	    
	    
	    function paymentDetails(data)
	    {
	    	alert("inside paymentdetails"+JSON.stringify(data));
	    	
	    	var deferred = $q.defer();
	    	var method="POST";
	        var url = "http://localhost:8080/digital/loading.json";
	        cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
	        	deferred.resolve(response);
        	},function error(response){
        		console.error('Error while fetching Users');
        		deferred.reject(response);
        	});
	       
	        return deferred.promise;
	    }
	    
	 
	 // offline payment
	    function callServerforOfflinePayment(){
			var details = StorageService.getAll();
			var insurerName = StorageService.get('insurerName');
			var paymentDetail = StorageService.get('paymentInfo');
			var bankDetail = StorageService.get('responseBank');
			var data = {
			    "bankCode"        : bankDetail.resBankcode,
				"bankName"        : bankDetail.resBankname,
				"branch"          : paymentDetail.branchName,
				"instrumentNo"    : paymentDetail.chequeNo,
				"instrumentDate"  : paymentDetail.chequeDate,
				"favourOff"       : paymentDetail.favourOff,
				"adjustedAmount"  : '',//paymentDetail.adjust_to_pay_amount
				"paymentMode"     : 'CHEQUE',
				"quoteNo"		  : details.premiumInfo.premiumDetails.quoteNo,
				"amount"          : paymentDetail.chequeAmt,
				"userId"		  : $rootScope.loginId,
				"insurerCode"	  :  details.premiumInfo.premiumDetails.insurerCode,
				"insurerName"	  :  insurerName
    		};
			
	        var deferred=$q.defer();
	        var method="POST";
	        var url = UrlConstants.MIS_CLOUD+UrlConstants.PERSIST_POLICY;
	        cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
	        	paymentDetailsForAll=response.data;
	        	deferred.resolve(response);
        	},function error(response){
        		deferred.reject(response);
        	});
        
	        return deferred.promise; 
	    }
	    
	    function fetchPolicyStartDate(quoteNo) {
	        var deferred = $q.defer();
	        var method="POST";
	        var data = {};
	        var url =UrlConstants.MIS_CLOUD+UrlConstants.POLICY_START_DATE + quoteNo;
	        cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
	        	deferred.resolve(response);
        	},function error(response){
        		console.error('Error while fetching Users');
        		deferred.reject(response);
        	});
	        
	        return deferred.promise;
	    }
	
}]);


