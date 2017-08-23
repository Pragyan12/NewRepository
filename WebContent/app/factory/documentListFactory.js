POTApp.factory('documentListFactory',function($http, $q, fileService
		, UrlConstants, cacheFactory){
	var url=UrlConstants.MASTER_URL+UrlConstants.DOCUMENT_TYPES;
	
	
	var factory={
		getDocumentList : getDocumentList
	}
	
	return factory;
	
	function getDocumentList()
	{
		var defered=$q.defer();
		var data=fileService.getAll();
		var method="POST";
		
		cacheFactory.getJsonWithCache("DOCUMENT_LIST", method, url, data).then(function (response) {
			defered.resolve(response);
		},function error(response){
			defered.reject(response);
		}); 
		 
		return defered.promise;
	}
	
});