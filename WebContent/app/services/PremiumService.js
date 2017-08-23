POTApp.factory('PremiumService',function( PremiumCalculationService,StorageService ,$q,$http,$filter,CoverageService,UrlConstants) {
		return {
			getStatus : getStatus,
			getErrorDescription : getErrorDescription,
			getUpdateIdv : getUpdateIdv,
			getIdvRange : getIdvRange
		}
		function getUpdateIdv(insurerCode, actualIdv) {
			var details = StorageService.getAll();
	        var vehicleInfo = StorageService.get("vehicleInfo");
	        var personalInfo = StorageService.get("personalInfo");
	        var selectedCover =[];
	        angular.forEach(CoverageService.getSelectedCovers(), function(value, key){
	        	selectedCover.push(value);
			});
	        
	        var data = {
	    			"CustomerDetails" : {
	    				"firstName": personalInfo.firstName,
	    				"lastName" : personalInfo.lastName,
	    				"mobileNo" : personalInfo.mobileNo,
	    				"email"    : personalInfo.email
	    			},
	    			"QuotationData" : {
	    				"quoteNo" 		 : "",
	    				"lineOfBusiness" : details.productcode,
	    				"subLine"        : 'PRIVATE CAR',
	    				"productCode"    : details.subProductCode,
	    				"productName"    : "COMPREHENSIVE",
	    				"businessType"   : "Rollover",
	    				"policyType"     : vehicleInfo.policyType.code,
	    				"inseptionDate"  : '',
	    				"expiryDate"     : vehicleInfo.prevPolicyExpDate,
	    				"effectiveDate"  : "25/05/2017",
	    				"userId"         : "FAS",
	    				"branchCode"     : "FAS001",
	    				"branchName"     : "CHENNAI",
	    				"channelType"    : "POT"
	    			},
	    			"VehicleDetails" : {
	    				"registrationNo"   :  vehicleInfo.regNo1+""+vehicleInfo.regNo2+""+vehicleInfo.regNo3+""+vehicleInfo.regNo4,
	    				"customerType"     :  vehicleInfo.vehicleRegisteredTo.code,
	    				"yearOfMfg"        :  vehicleInfo.yearOfMfg,
	    				"registrationDate" :  vehicleInfo.registrationDate,
	    				"makeCode" 		   :  vehicleInfo.manufacturer.code,
	    				"modelCode"        :  vehicleInfo.model.code,
	    				"makeName"         :  vehicleInfo.manufacturer.name,
	    				"modelName"        :  vehicleInfo.model.name,
	    				"subModelName"     :  vehicleInfo.subModel.subModelName,
	    				"subModelCode"     :  vehicleInfo.subModel.subModelCode,
	    				"engineCC"         :  vehicleInfo.engineCC,
	    				"fuelType"         :  vehicleInfo.fuelType,
	    				"rtoCode"          :  vehicleInfo.rtoCode.rtoCode,
	    				"rtoName"          :  vehicleInfo.rtoCode.rtoLocation,
	    				"policyType"       :  vehicleInfo.policyType.code,
	    				"prevInsurerCode"  :  vehicleInfo.previousPolicyInsurer.insurerCode,
	    				"prevInsurerName"  :  vehicleInfo.previousPolicyInsurer.insurerName,
	    				"prevExpiryDate"   :  vehicleInfo.prevPolicyExpDate,
	    				"actualIdv"        :  actualIdv,
	    				"vehicleAge"       :  PremiumCalculationService.vehicleAgeCaluculation(),
	    				"seatingCapacity"  :  vehicleInfo.seatingCapacity,
	    				"cubicCapacity"	   : vehicleInfo.engineCC,
	    				"previousNCB"	   : vehicleInfo.ncb.name,
	    				"currentNCB"	   : vehicleInfo.ncb.name,
	    				"zoneCode"		   : vehicleInfo.ZoneArea,
	    			},
	    			"CoverDetails" : selectedCover
	    		};
//	        console.log("Requets Data => "+data);
	        
			var deferred=$q.defer();
			
			var method="POST";
			var url = UrlConstants.MIS_CLOUD+UrlConstants.SINGLE_INS_PREMIUM_CALC+insurerCode;
			cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
				premiumDetailsForAll=response.data;
				deferred.resolve(response);
			},function error(response){
				deferred.reject(response);
			});
		
	    return deferred.promise; 
		}

		  function getIdvRange(idv)
		  {
			  var details = StorageService.getAll();
		        var vehicleInfo = StorageService.get("vehicleInfo");
		        var personalInfo = StorageService.get("personalInfo");
		        var selectedCover =[];
		        angular.forEach(CoverageService.getSelectedCovers(), function(value, key){
		        	selectedCover.push(value);
				});
		        
		        var data = {
		    			"CustomerDetails" : {
		    				"firstName": personalInfo.firstName,
		    				"lastName" : personalInfo.lastName,
		    				"mobileNo" : personalInfo.mobileNo,
		    				"email"    : personalInfo.email
		    			},
		    			"QuotationData" : {
		    				"quoteNo" 		 : "",
		    				"lineOfBusiness" : details.productcode,
		    				"subLine"        : 'PRIVATE CAR',
		    				"productCode"    : details.subProductCode,
		    				"productName"    : details.productName,
		    				"businessType"   : "Rollover",
		    				"inseptionDate"  : '',
		    				"expiryDate"     : vehicleInfo.prevPolicyExpDate,
		    				"effectiveDate"  : "25/05/2017",
		    				"userId"         : "FAS",
		    				"branchCode"     : "FAS001",
		    				"branchName"     : "CHENNAI",
		    				"channelType"    : "POT"
		    			},
		    			"VehicleDetails" : {
		    				"registrationNo"   :  vehicleInfo.regNo1+""+vehicleInfo.regNo2+""+vehicleInfo.regNo3+""+vehicleInfo.regNo4,
		    				"customerType"     :  vehicleInfo.vehicleRegisteredTo.code,
		    				"yearOfMfg"        :  vehicleInfo.yearOfMfg,
		    				"registrationDate" :  vehicleInfo.registrationDate,
		    				"makeCode" 		   :  vehicleInfo.manufacturer.code,
		    				"modelCode"        :  vehicleInfo.model.code,
		    				"makeName"         :  vehicleInfo.manufacturer.name,
		    				"modelName"        :  vehicleInfo.model.name,
		    				"subModelName"     :  vehicleInfo.subModel.subModelName,
		    				"subModelCode"     :  vehicleInfo.subModel.subModelCode,
		    				"engineCC"         :  vehicleInfo.engineCC,
		    				"fuelType"         :  vehicleInfo.fuelType,
		    				"rtoCode"          :  vehicleInfo.rtoCode.rtoCode,
		    				"rtoName"          :  vehicleInfo.rtoCode.rtoLocation,
		    				"policyType"       :  vehicleInfo.policyType.code,
		    				"prevInsurerCode"  :  vehicleInfo.previousPolicyInsurer.insurerCode,
		    				"prevInsurerName"  :  vehicleInfo.previousPolicyInsurer.insurerName,
		    				"prevExpiryDate"   :  vehicleInfo.prevPolicyExpDate,
		    				"actualIdv"        :  idv,
		    				"vehicleAge"       :  PremiumCalculationService.vehicleAgeCaluculation(),
		    				"seatingCapacity"  :  vehicleInfo.seatingCapacity,
		    				"cubicCapacity"	   : vehicleInfo.engineCC,
		    				"previousNCB"	   : vehicleInfo.ncb.name,
		    				"currentNCB"	   : vehicleInfo.ncb.name,
		    				"zoneCode"		   : vehicleInfo.ZoneArea,
		    			},
		    			"CoverDetails" : selectedCover
		    		};
//		        console.log("Requets Data => "+data);
			var deferred=$q.defer();
			
			var method="POST";
			var url = UrlConstants.MIS_CLOUD+UrlConstants.MULTIPLE_INS_PREMIUM_CALC;
			cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
				premiumDetailsForAll=response.data;
    			deferred.resolve(response);
			},function error(response){
				deferred.reject(response);
			});
		
		    return deferred.promise; 
		  }
		
       	function getStatus() {
				return "SUCCESS";
			}
			function getErrorDescription() {
				return "";
			}

		});
