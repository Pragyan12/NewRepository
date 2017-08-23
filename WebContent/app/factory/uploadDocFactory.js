POTApp.factory('uploadDocFactory', function($http, $q, fileService,
		UrlConstants, cacheFactory) {

	var url = UrlConstants.DMS_URL + UrlConstants.DOCUMENT_UPLOAD;
	// var url = "http://192.168.0.22:9080/dms/uploadDoc.json";

	var factory = {
		uploadDoc : uploadDoc
	}

	return factory;

	function uploadDoc() {
		var defferred = $q.defer();
		var data = fileService.getAll();
		
		var method="POST";
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			defferred.resolve(response);
		},function error(response){
			defferred.reject(response);
		});

		return defferred.promise;
	}

});