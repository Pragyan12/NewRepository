POTApp
		.factory(
				'CoverageService',
function($q, $http, RatingConstants, UrlConstants, cacheFactory) {
	var selectedCovers = {};
	var coverSumInsured = {
		'upaSumInsured' : '10000',
		'vdSumInsured' : '2500',
		'bifuelSumInsured' : 0,
		'padSumInsured' : '10000'
	};
	var url = UrlConstants.MASTER_URL
			+ UrlConstants.VIEW_ALL_COVERAGE;

	return {
		set : set,
		getSelectedCovers : getSelectedCovers,
		getCoverageList : getCoverageList,
		removeAllCovers : removeAllCovers,
		removeValuesFromJsonArray : removeValuesFromJsonArray,
		setCoverSumInsured : setCoverSumInsured,
		getCoverSumInsured : getCoverSumInsured,
		removeCoverSumInsured : removeCoverSumInsured,
		removeAll : removeAll,
		getCoverDetails : getCoverDetails,
		getCoverageListWithSumInsured : getCoverageListWithSumInsured,
		isPreviouslyOpted : isPreviouslyOpted,
		getCoverDetailsBasedOnCoverType : getCoverDetailsBasedOnCoverType
	}

	function set(code, name, type, sumInsured, sumInsuredType) {
		var arr = {};
		arr = {
			'name' : name,
			'code' : code,
			'coverType' : type,
			'sumInsured' : sumInsured,
			'sumInsuredType' : sumInsuredType
		};
		selectedCovers[code] = arr;
	}
	
	function isPreviouslyOpted(code, isPreviouslyOpted){
		angular.forEach(selectedCovers, function(value, key) {
			if (value.code === code) {
				delete selectedCovers[code];
				value["isPrevOpted"]=isPreviouslyOpted;
				selectedCovers[code]=value;
			}
		});
	}

	function setCoverSumInsured(code, name, type, sumInsured,
			sumInsuredType) {
		delete selectedCovers[code];
		set(code, name, type, sumInsured, sumInsuredType);
	}

	function getCoverSumInsured(key) {
		return coverSumInsured[key];
	}

	function removeCoverSumInsured(key) {
		delete coverSumInsured[key];
	}

	function removeAll() {
		selectedCovers = {};
	}

	function removeAllCovers() {
		angular.forEach(selectedCovers, function(value, key) {
			if (value.coverType === RatingConstants.ADDON) {
				delete selectedCovers[key];
			}
		});
	}

	function getSelectedCovers() {
		return selectedCovers;
	}

	function removeValuesFromJsonArray(code) {
		angular.forEach(selectedCovers, function(value, key) {
			if (code == value.code) {
				delete selectedCovers[key];
			}
		});
		return selectedCovers;
	}
	function getCoverageListWithSumInsured(productCode) {
		var deferred = $q.defer();
		var url = UrlConstants.MASTER_URL+UrlConstants.LIST_COVERAGE_DETAILS_SUMINSURED + productCode;
		var method = "POST";
		var data = {};
		cacheFactory.getJsonWithCache("CoverageListWithSumInsured",method, url, data).then(function (response) {
			deferred.resolve(response.data.coverageList);
	  	},function error(response){
	  		deferred.reject(response);
	  		console.log("error fetching result in getcoveragelist function");
	  	});
		return deferred.promise;
	}

	function getCoverageList(productCode) {
		var deferred = $q.defer();
		var url = UrlConstants.MASTER_URL+UrlConstants.LIST_COVERAGE_DETAILS+ productCode;
		
		var method = "POST";
		var data = {};
		cacheFactory.getJsonWithCache("CoverageList",method, url, data).then(function (response) {
			deferred.resolve(response.data.coverageMasterDtoList);
	  	},function error(response){
	  		deferred.reject(response);
	  		console.log("error fetching result in getcoveragelist function");
	  	});
		return deferred.promise;
	}

	function getCoverDetails(coverType, listOfSelectedCovers,
			listOfCovers) {
		var coverList = [];
		angular.forEach(listOfSelectedCovers,function(coverValue, coverKey) {
			if (coverValue.type === coverType) {
				angular.forEach(listOfCovers, function(value, key) {
					//console.log(coverValue.code === value.coverCode);
					if (coverValue.code === value.coverCode) {
						coverValue['name'] = value.coverName;
						coverList.push(coverValue);
					}
				});
			}
		});
		return coverList;
	}
	
	function getCoverDetailsBasedOnCoverType(coverType) {
		var coverList = {};
		angular.forEach(selectedCovers,function(coverValue, coverKey) {
			if (coverValue.coverType === coverType) {
				coverList[coverValue.code]=coverValue;
			}
		});
		return coverList;
	}

});