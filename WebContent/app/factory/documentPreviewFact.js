POTApp.factory('docPreviewFact',function($http, $q, quotationNoService
		, UrlConstants, cacheFactory){
	
	var url=UrlConstants.DMS_URL+UrlConstants.DOCUMENT_DOWNLOAD;
	
	var factory={
		imageUpload : imageUpload
	}
	
	return factory;
	
	function imageUpload(quoteNo)
	{
		var defered=$q.defer();
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithOutCache(method, url + quoteNo, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		}); 
		 
		return defered.promise;
	}
	
	 
	
});