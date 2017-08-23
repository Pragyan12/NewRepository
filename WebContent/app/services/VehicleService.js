POTApp.factory('VehicleService', function($http, $q, $filter,UrlConstants, cacheFactory) {

		return {
			yearOfMfgList : yearOfMfgList,
			vehicleRegisteredTo : vehicleRegisteredTo,
			getNCBListFromRestUrl : getNCBListFromRestUrl,
			policyTypeList : policyTypeList,

			getMakeListFromRestUrl : getMakeListFromRestUrl,
			getModelsFromRestUrl : getModelsFromRestUrl,
			getMakeSubmodelFromRestUrl : getMakeSubmodelFromRestUrl,

			processMakeModelData : processMakeModelData,
			processMakeSubmodelData : processMakeSubmodelData,
			zoneValue : zoneValue
		}

					// /////////// Jitu /////////////
		function getMakeListFromRestUrl() {
			var deferred = $q.defer();
			
			var method="POST";
			var url = UrlConstants.MASTER_URL+UrlConstants.GET_MAKE;
			var data = {};
			
			cacheFactory.getJsonWithCache("GET_MAKE", method, url, data).then(function (response) {
				deferred.resolve(response);
			},function error(response){
				deferred.reject(response);
			}); 
			
			return deferred.promise;
		}

		
		function yearOfMfgList() {
			var date = new Date();
			var year = $filter('date')(date, "yyyy");
			var dateBefore5Year = [];
			    year = year - 1;
			for (var i = 0; i < 10; i++) {
				dateBefore5Year[i] = year - i;
			}
			return dateBefore5Year;
		}

		function getNCBListFromRestUrl() {
			var deferred = $q.defer();
			var url = UrlConstants.MASTER_URL+UrlConstants.GET_ALL_NCB_TYPE;
			var method="POST";
			var data = {};
			cacheFactory.getJsonWithCache("GET_ALL_NCB_TYPE", method, url, data).then(function (response) {
				deferred.resolve(response);
			},function error(response){
				deferred.reject(response);
			});
			
			return deferred.promise;
		}

		function vehicleRegisteredTo() {
			return [ {
				name : 'INDIVIDUAL',
				code : 'CUSTOMER_INDIVIDUAL'
			}, {
				name : 'COMPANY',
				code : 'COMPANY'
			} ];
		}
		function policyTypeList() {
			return [ {
				name : 'COMPREHENSIVE',
				code : 'COMPREHENSIVE'
			},{
				name : 'THIRDPARTY',
				code : 'THIRDPARTY'
			},{
				name : 'NO POLICY',
				code : 'NO POLICY'
			}];
		}
					
	function processMakeModelData(make_code) {
		var models = [];
		getModelsFromRestUrl().then(function(response) {
			angular.forEach(response.data.makeModelMap, function(outer_value, outer_key) {
				if (outer_key == make_code) {
					if (outer_value.length != 0) {
						angular.forEach(outer_value, function(inner_value, inner_key) {
									models.push(inner_value);
						});
				} else {
					console.log("There is no models with this name")
				}
			}
			});
	
		});
		return models;
	}

	function getModelsFromRestUrl() {
		var deferred = $q.defer();
		
		var url =UrlConstants.MASTER_URL+UrlConstants.GET_MAKE_MODEL;
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_MAKE_MODEL", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		}); 
		
		return deferred.promise;
	}

	function processMakeSubmodelData(model_code) {
		// console.log("model code : "+model_code)
		var SubModels = [];
		getMakeSubmodelFromRestUrl().then( function(response) {
			angular.forEach(response.data.modelSubModelMap, function(outer_value, outer_key) {
				if (outer_key == model_code) {
					if (outer_value.length != 0) {
						angular.forEach(outer_value, function(inner_value, inner_key) {
							SubModels.push(inner_value);
						});
					} else
						console.log("There is no submodels with this name")
				}
			});

		});
		return SubModels;
	}

	function getMakeSubmodelFromRestUrl() {
		var deferred = $q.defer();
		
		var url = UrlConstants.MASTER_URL+UrlConstants.GET_MODEL_SUBMODEL;
		var method="POST";
		var data = {};
		cacheFactory.getJsonWithCache("GET_MODEL_SUBMODEL", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		}); 

		return deferred.promise;
	}

	function zoneValue() {
		var deferred = $q.defer();
		
		var url =UrlConstants.MASTER_URL+UrlConstants.GET_RTO_ZONAL_MAPPING;
		var method="POST";
		var data = {};
		
		cacheFactory.getJsonWithCache("GET_RTO_ZONAL_MAPPING", method, url, data).then(function (response) {
			deferred.resolve(response);
		},function error(response){
			deferred.reject(response);
		}); 
		
		return deferred.promise;
	}
});
