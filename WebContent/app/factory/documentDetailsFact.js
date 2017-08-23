POTApp.factory('documentDetailsFact', function($http, $q
		, UrlConstants, cacheFactory) {

	var url = UrlConstants.DMS_URL + UrlConstants.DOCUMENT_PREVIEW;
	
	var factory = {
		imageUpload : imageUpload
	}

	return factory;

	function imageUpload(quotNo) {
		var defferred = $q.defer();
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithOutCache(method, url + quotNo, data).then(function (response) {
			defferred.resolve(response);
		},function error(response){
			defferred.reject(response);
		}); 
		
		return defferred.promise;
	}

});