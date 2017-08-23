POTApp.factory('PersonalInfoService', function($http,$q, UrlConstants, cacheFactory) {
	return {
		titleList : titleList,
		getlistOfCities : getlistOfCities,
		getAreaByCity : getAreaByCity,
		getallpincode : getallpincode,
		getPaymentResponseOnQuoteNo:getPaymentResponseOnQuoteNo
	}

	function titleList() 
	{
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_ALL_TITLE;
		var deffered=$q.defer();
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_ALL_TITLE", method, url, data).then(function (response) {
			deffered.resolve(response);
		},function error(response){
			deffered.reject(response);
		});
		
		return deffered.promise;
	}
	
	function getlistOfCities()
	{
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_ALL_CITY;
		var deffered=$q.defer();
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_ALL_CITY", method, url, data).then(function (response) {
			deffered.resolve(response);
		},function error(response){
			deffered.reject(response);
		});
		return deffered.promise;
		
	}
	function getAreaByCity(cityCode)
	{
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_AREA_BY_CITY+cityCode;
		var deffered=$q.defer();
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			deffered.resolve(response);
		},function error(response){
			deffered.reject(response);
		});
		
		return deffered.promise;
		
	}
	function getallpincode(areaCode)
	{
		var url=UrlConstants.MASTER_URL+UrlConstants.GET_PINCODE_BY_AREA+areaCode;
		var deffered=$q.defer();
		var method="POST";
		var data = {};
		
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			deffered.resolve(response);
		},function error(response){
			deffered.reject(response);
		});
		
		return deffered.promise;
		
	}

	
	function getPaymentResponseOnQuoteNo()
	{
		var url="http://localhost:8080/digital/redirectTest.json";
		var deffered=$q.defer();
		
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
			deffered.resolve(response);
		},function error(response){
			deffered.reject(response);
		});
		
		return deffered.promise;
		
	}
	
	
});