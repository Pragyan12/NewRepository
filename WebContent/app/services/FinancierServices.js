POTApp.factory('NomineeFinancierServices', function($http,$q, UrlConstants, cacheFactory) {
	return {
		getFinancierList : getFinancierList,
		getNomineeRelationship : getNomineeRelationship,
		getGuardianRelationship : getGuardianRelationship
		
	}
	
	function getNomineeRelationship() 
	{
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_ALL_RELATIONSHIP;
		var deffered=$q.defer();
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_ALL_RELATIONSHIP", method, url, data).then(function (response) {
			deffered.resolve(response);
	  	},function error(response){
	  		deffered.reject(response);
	  	});
		
		return deffered.promise;
	}
	function getGuardianRelationship() {
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_ALL_RELATIONSHIP;
		var deffered=$q.defer();
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_ALL_RELATIONSHIP", method, url, data).then(function (response) {
			deffered.resolve(response);
	  	},function error(response){
	  		deffered.reject(response);
	  	});
		
		
		return deffered.promise;
	}
	
	function getFinancierList()
	{
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_ALL_FINANCIER_NAME;
		var deffered=$q.defer();

		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_ALL_FINANCIER_NAME", method, url, data).then(function (response) {
			deffered.resolve(response);
	  	},function error(response){
	  		deffered.reject(response);
	  	});
		
		return deffered.promise;
		
	}
	
});