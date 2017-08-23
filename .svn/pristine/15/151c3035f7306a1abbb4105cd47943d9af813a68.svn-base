POTApp.factory('cacheFactory', function ($q, $http, CacheFactory) {

  CacheFactory('dataCache', {
    maxAge: 60 * 60 * 3000, // Items added to this cache expire after 24 minutes(1*60*1000 = 1min)
//     cacheFlushInterval: 60 * 60 * 24000, // This cache will clear itself every 24 hour
    deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
    storageMode: 'localStorage'//'memory', 'localStorage', 'sessionStorage'
  });
  
  function getJsonWithCache(cacheName, method, url, data) {
     var deferred = $q.defer();
     var start = new Date().getTime();
     var dataCache = CacheFactory.get('dataCache');

     if (dataCache.get(cacheName)) {
   		//console.log("cached output for ==> " + cacheName);
     	deferred.resolve(dataCache.get(cacheName));
     } else {
    	 $http({
	   	        method : method,//"GET","POST"
	   	        url : url,
	   	        data : data
	   	  })
	   	  .then(function successCallback(response) {
		   	   //console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
		   	   dataCache.put(cacheName, response);
		   	   deferred.resolve(response);
	  	   }, function errorCallback(response) {
	  		   deferred.reject(response);
	  	  });
     }
     
     return deferred.promise;
   }
  
  function getJsonWithOutCache(method, url, data){
	  var deferred = $q.defer();
	  var start = new Date().getTime();
 	 $http({
   	        method : method,//"GET","POST"
   	        url : url,
   	        data : data
   	  })
   	  .then(function successCallback(response) {
	   	   //console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
	   	   deferred.resolve(response);
  	   }, function errorCallback(response) {
  		   deferred.reject(response);
  	  });
 	 
 	return deferred.promise;
  }
  
  return {
	  getJsonWithOutCache: getJsonWithOutCache,
	  getJsonWithCache: getJsonWithCache
  };
});