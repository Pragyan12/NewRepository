'use strict';
POTApp.controller('PremiumComparision', function($q, $scope, RatingConstants, PremiumService, CoverageService,
	$state, StorageService, PremiumCalculationService, InsurerService) {	
	$scope.vehicleInfo = StorageService.get("vehicleInfo");
	$scope.productCode = StorageService.get("subProductCode");
	$scope.compareValues = [];
	$scope.premiumbreakup = [];
	$scope.showCompare = false;
	$scope.showComparePreset = false;
	$scope.showCompareButton = false;
	$scope.showCompareInsurerDetails = false;
	$scope.showInsurerComparition = false;
	$scope.additional_Covers = [];
	$scope.addon_Covers = [];
	$scope.discount_coverage = [];
	$scope.insurerListValues = calculatePremium();
	$scope.averagesOfIdv = 0;
	
	$scope.checkSingleInsIdVChanges=function(idv,insurerCode){
//		alert("IDV => "+idv);
//		alert("insurerCode => "+insurerCode);
		var idvVal = 0.0;
		if (angular.isNumber(parseInt(idv)) && parseInt(idv) >0) {
			idvVal= idv;
		}else{
			var insurerPremiumDetails = getInsurerPremiumDetails(insurerCode);
			if (angular.isDefined(insurerPremiumDetails)) {
				idvVal = insurerPremiumDetails.premiumDetails.actualIdv;
			}
		}
//		alert("idvVal => "+idvVal);
		return idvVal;
	}
	$scope.checkMulInsIdVChanges=function(idv){
//		alert("IDV => "+idv);
		if (angular.isNumber(parseInt(idv)) && parseInt(idv) >0) {
			$scope.averagesOfIdv = idv;
		}else{
			$scope.averagesOfIdv = PremiumCalculationService.averagesOfIdv($scope.insurerListValues);
		}
//		alert("idvVal => "+$scope.averagesOfIdv);
	}

	/**
	 * This method used to get the cover list
	 */
	$scope.coverList = getAddonCoverList();
	function getAddonCoverList() {
		CoverageService.getCoverageListWithSumInsured($scope.productCode).then(function(coverList) {
			angular.forEach(coverList, function(value, index) {
				if (value.coverType === RatingConstants.ADDITIONAL) {
					$scope.additional_Covers.push(value);
//					alert("LINE NUMBER:30"+$scope.additional_Covers.push(value));
				} else if (value.coverType === RatingConstants.ADDON) {
					$scope.addon_Covers.push(value);
				} else if (value.coverType === RatingConstants.DISCOUNTS) {
					$scope.discount_coverage.push(value);
					
				}
			});
		}, function(errResponse) {
			console.error('Error while fetching Users');
		});
	}

	/**
	 * This method used to calculate premium
	 */
	function calculatePremium() {
		var premiumDetails = {};
		angular.forEach(InsurerService.getPreferredInsurerList(), function(insurerValue, insurerKey) {
			if (PremiumCalculationService.isValidInsurer(insurerValue.insurerCode)) {
				var premiumInfo = PremiumCalculationService.calculatePremium(insurerValue.insurerCode);
				insurerValue["premiumDetails"] = premiumInfo;
				premiumDetails[insurerValue.insurerCode] = insurerValue;
			}
		});
		return premiumDetails;
		
	}

	/**
	 * Adding selected covers to the coverage service  
	 */
	$scope.addCover = function(coverCode, coverName, coverType, flag,sumInsuredType) {
		if (flag == true) {
			var sumInsured = 0;
			if (coverCode === RatingConstants.UPA) {
				sumInsured = '10000';
			} else if (coverCode === RatingConstants.VD) {
				sumInsured = '2500';
			} else if (coverCode === RatingConstants.PAD) {
				sumInsured = '10000';
			} else if (coverCode === RatingConstants.BFK) {
				sumInsured = '100';
			} else if (coverCode === RatingConstants.PB) {
				sumInsured = '2500';
			} 
			CoverageService.setCoverSumInsured(coverCode, coverName, coverType, sumInsured,sumInsuredType);
			$scope.insurerListValues = calculatePremium();
		} else if (flag == false) {
			CoverageService.removeValuesFromJsonArray(coverCode);
			$scope.insurerListValues = calculatePremium();;
		}
		return sumInsured;
	}
	
	$scope.isPreviouslyOpted = function(coverCode, isPreviouslyOpted) {
		CoverageService.isPreviouslyOpted(coverCode, isPreviouslyOpted);
	}
	

	/**
	 * Adding Cover suminsured to the coverage service
	 */
	$scope.updateCoverSumInsured = function(coverCode, coverName, coverType, sumInsured,sumInsuredType) {
		var sumInsuredVal = parseInt(sumInsured);
		if (angular.isNumber(sumInsuredVal) && sumInsuredVal >=0) {
			CoverageService.setCoverSumInsured(coverCode, coverName, coverType, sumInsured,sumInsuredType);
			$scope.insurerListValues = calculatePremium();
		}
	}
	/**
	 * Check whether cover is selected or not
	 */
	$scope.isCoverSelected = function(coverCode) {
		var value=false;
		if (angular.isDefined(PremiumCalculationService.isCoverSelected(coverCode))) {
			value=true;
		}
		return value;
	}
	
	$scope.getCoverSumInsured = function(coverCode) {
		var sumInsured = 0;
		if (angular.isDefined(CoverageService.getSelectedCovers())) {
			var coverDetails = CoverageService.getSelectedCovers()[coverCode];
			if (angular.isDefined(coverDetails)) {
				sumInsured= coverDetails.sumInsured;
			}
		}
		return sumInsured;
	}

	
	

	/**
	 * This method can be used to getting insurer premium details
	 */

	function getInsurerPremiumDetails(insurerCode) {
		var premiumDetails = {};
		angular.forEach(InsurerService.getPreferredInsurerList(), function(insurerValue, insurerKey) {
			if (insurerCode === insurerValue.insurerCode) {
				var premiumInfo = PremiumCalculationService
					.calculatePremium(insurerValue.insurerCode);
				insurerValue["premiumDetails"] = premiumInfo;
				premiumDetails = insurerValue;

			}
		});
		return premiumDetails;
	}


	$scope.showPremiumBreakUp = function(insurerCode) {
		$("body").addClass("premiumoverflow");
		$scope.isPremiumBreakup = true;
		var arr = [];
		var premiumInfo = $scope.insurerListValues[insurerCode].premiumDetails;
		arr = [
			{
				'name' : RatingConstants.BasicOwndamage,
				'premium' : premiumInfo.basicOdPremium,
				'orderby' : '1'
			},
			{
				'name' : RatingConstants.BasicThirdpartyPropertydamage,
				'premium' : premiumInfo.basicTpPremium,
				'orderby' : '2'
			},
			{
				'name' : RatingConstants.OwndriverCoverCPA,
				'premium' : premiumInfo.cpaPremium,
				'orderby' : '3'
			},
			{
				'name' : 'LEGAL LIABILITY PAID TO DRIVER',
				'premium' : premiumInfo.lldPremium,
				'orderby' : '4'
			},
			{
				'name' : 'Tariff Discounts ('
					+ premiumInfo.tariffDiscount + ' % ):',
				'premium' : premiumInfo.tariffDiscountAmount,
				'orderby' : '5'
			}, {
				'name' : RatingConstants.NoClaimBonus,
				'premium' : premiumInfo.ncbDiscountAmount,
				'orderby' : '6'
			} ];
			
			angular.forEach(premiumInfo.selectedAddonCover, function(value, key) {
				var coverPremium = {
					'name' : value.coverName,
					'premium' : value.coverPremium,
					'orderby' : 7
				};
				arr.push(coverPremium);
			});
			
			angular.forEach(premiumInfo.listOfTax, function(value, key) {
				var coverPremium = {
					'name' : value.nameOfTax+" ("+value.rate+" % )",
					'premium' : Math.round(value.amount),
					'orderby' : 8
				};
				arr.push(coverPremium);
			});
			
		var premiumDetails = {};
		premiumDetails["coverPremium"] = arr;
		premiumDetails["premiumDetails"] = premiumInfo;
		angular.forEach(InsurerService.getPreferredInsurerList(), function(insurerValue, insurerKey) {
			if (insurerCode === insurerValue.insurerCode) {
				premiumDetails["insurerDetails"] = insurerValue;
			}
		});
		$scope.premiumbreakup = premiumDetails;
	}
	$scope.closePremiumBreakup = function() {
		$("body").removeClass("premiumoverflow");
		$scope.isPremiumBreakup = false;
	}
	/**
	 * Insurer Comparision
	 */
	$scope.compare_chkbox = function(insurerCode, checkvalue) {
		var result = false;
		if (checkvalue == true) {
			if ($scope.compareValues.length >= 3) {
				alert("Maximum 3 insurance offers can be compared");
				result = false;
			} else {
				$scope.compareValues
					.push(getInsurerPremiumDetails(insurerCode));
				result = true;
			}
		} else {
			angular
				.forEach(
					$scope.compareValues,
					function(value, key) {
						if (value.premiumDetails.insurerCode === insurerCode) {
							delete $scope.compareValues.splice(key, 1);
						}
					});
			result = false;
		}
		if (Object.keys($scope.compareValues).length >= 2) {
			$scope.showComparePreset = true;
			$scope.showCompareButton = true;
		} else if (Object.keys($scope.compareValues).length >= 1) {
			$scope.showComparePreset = true;
			$scope.showCompareButton = false;
		} else {
			$scope.showComparePreset = false;
			$scope.showCompareButton = false;
		}
		return result;
	}
	
	/*$scope.reset_compare_chkbox=function(){
		$scope.compare_chkbox=$scope.compare_chkbox;
	}*/
	
	
	$scope.ncbshow = angular.isUndefined(StorageService.get("vehicleInfo").currentNCB) ? false: StorageService.get("vehicleInfo").currentNCB === '' ? false: true;

	$scope.parsevalue = '';
	$scope.check = '';
	$scope.compareInsurer = function() {
		$("body").addClass("premiumoverflow");
		$scope.showInsurerComparition = true;
		$scope.check = $('.test1').css('width');
		var test = [];
		var i = 0;
		var data = 0;
		$(".compare_premium_ind_row div:first-child").each(function() {
			for (i = 0; i < $scope.compareValues.length + 1; i++) {
				test[i] = $(this).css('width').substring(0, 3);
				data = parseInt($(this).css('width').substring(0, 3)) + data;
			}
		});
		$scope.check = data + 60 + 'px';
		$scope.breakup_width = {
			"width" : $scope.check
		}
		var result = [];
		angular.forEach($scope.compareValues, function(value, key) {
			result.push(getInsurerPremiumDetails(value.premiumDetails.insurerCode));
		});
		return $scope.compareValues = result;
	}
	$scope.emptyCompare = function() {
		$("body").removeClass("premiumoverflow");
		$scope.showInsurerComparition = false;
		$scope.compareCheckBox = false;
		
		angular.forEach($scope.insurerListValues, function(v, k){
			document.getElementById(v.insurerName).checked = false;
		});
		
		$scope.compareValues = [];
		for (var i = 0; i < $scope.insurerListValues.length; i++) {
			$scope.checkvalue[i] = false;
		}

		
		
//		$(".premium_insurer_details").find("input[type='checkbox']").attr("checked" = "false");
		
	}
	$scope.compareClose = function() {
		$("body").removeClass("premiumoverflow");
	}
	$scope.selectedCovers = function() {
		
		return CoverageService.getSelectedCovers();
	}

	$scope.closepopupaddon = function(){
		$scope.showPreviousOptedCovers=false;
		$("body").removeClass("premiumoverflow");
	}
	
//	$scope.dummyaddon = function(){}
	
	
	$scope.roundOff = function(premium){
		return Math.round(premium);
	}
	
	
	
	
	
	/* Premium details to next page for payment */
	$scope.buynow = function(selectedinsurerCode, isAddon, idv) {	
		buyNow(selectedinsurerCode, isAddon, idv);
	}
	$scope.newbuynow = function(selectedinsurerCode, isAddon, idv) {	
		var count=Object.keys(CoverageService.getCoverDetailsBasedOnCoverType(RatingConstants.ADDON)).length;
		//console.log("AHAMED AHAMED ::::::::::::::"+JSON.stringify($scope.coverCount));
		if(count>0){
			$("body").addClass("premiumoverflow");
			var OptedCovers={
					"insurerCode" : selectedinsurerCode,
					"selectedCovers" : CoverageService.getCoverDetailsBasedOnCoverType(RatingConstants.ADDON),
					"actualIdv" : idv
			};
			$scope.showPreviousOptedCovers=true;
			$scope.OptedCovers = OptedCovers;
		}
		else{
			$("body").removeClass("premiumoverflow");
			buyNow(selectedinsurerCode, isAddon, idv);
		}
	}

	function buyNow(selectedinsurerCode, isAddon, idv){
		$("body").removeClass("premiumoverflow");
		if (!isAddon) {
			CoverageService.removeAllCovers();
		}
		angular.forEach(InsurerService.getPreferredInsurerList(), function(insurerValue, insurerKey) {
			if (selectedinsurerCode === insurerValue.insurerCode) {
				var insurerName = insurerValue.insurerName;
				PremiumCalculationService.singleInsurerPremiumCalc(selectedinsurerCode, idv,insurerName).then(function(response) {
					if (response.data.message === "SUCCESS" && angular.isDefined(response.data.premium[selectedinsurerCode])) {
						insurerValue["premiumDetails"] = response.data.premium[selectedinsurerCode];
						StorageService.set('premiumInfo', insurerValue);
						//console.log(JSON.stringify(StorageService.get('premiumInfo')));
						$state.go('premiumSummary');
					} else {
						alert("Premium Calculation Failed");
					}
				}, function(errorResponse) {
					alert("Premium Calculation Failed" + JSON.stringify(errorResponse));
				});
			}
		});
	}
	
	$scope.erroraddon="";
	//	START ADDON POUP BUYNOW
	$scope.addonbuynow = function(selectedinsurerCode, isAddon, idv){
		var addcount = [];
		var i= 0;
		$('.preaddonrow > div:nth-child(2)').each(function(){
			if($(this).find('input:radio:checked').length > 0){
				addcount[i++] = "true";
			}
			else{
				addcount[i++] ="false";
			}
		});
		//console.log(addcount);
		var addoncovers = false;
//		alert("::"+addcount.indexOf('false'));
//		if(addcount.indexOf('false')!=-1){
//			addoncovers=false;
//		}
		if(jQuery.inArray("false", addcount) == -1){
			$("body").removeClass("premiumoverflow");
			buyNow(selectedinsurerCode, isAddon, idv);
		}else{
			$scope.erroraddon="Please select all the Addon Covers";
		}
	}
//	END ADDON POUP BUYNOW
	$scope.validateSingleIdvEdit = function(idv) {
		if (angular.isDefined(idv) || angular.isNumber(idv)) {
			$scope.editIdv = true;
			$scope.saveIdv = false;
			$scope.save_click = 'input_border_hide'
			return true;
		} else {
			$scope.editIdv = false;
			$scope.saveIdv = true;
			$scope.save_click = 'input_border'
		}
		return false;
	}

	/* update the particular insurer method */
	$scope.updateIdv = function(insurerCode, actualIdv, idv) {
		$scope.insurerListValues = '';
		PremiumCalculationService.singleIdvCalc(insurerCode, idv).then(function(response) {
			if (response.data.message === "SUCCESS") {
				PremiumCalculationService.getUpdateIdv(insurerCode, response.data);
				$scope.insurerListValues = calculatePremium();
				$scope.averagesOfIdv = PremiumCalculationService.averagesOfIdv($scope.insurerListValues);
			} else {
				alert("Premium Calculation Failed");
			}
		}, function(errorResponse) {
			alert("Premium Calculation Failed" + JSON.stringify(errorResponse));
		});
	}

	/* update the whole insurer for idvrange */
	$scope.updatefullIdv = function(idv) {
		if (idv != null) {
			$scope.insurerListValues = '';
			PremiumCalculationService.multipleInsurerPremiumCalc(idv).then(function(response) {
				//console.log("hjfghdsg  " + JSON.stringify(response));
				if (response.data.message === "SUCCESS") {
					$scope.insurerListValues = calculatePremium();
				} else {
					alert("Premium Calculation Failed");
				}
			}, function(errorResponse) {
				alert("Premium Calculation Failed" + JSON.stringify(errorResponse));
			});
		} else {
			$scope.averagesOfIdv = 0;
		}
	}
	$scope.averagesOfIdv = PremiumCalculationService.averagesOfIdv($scope.insurerListValues);

	$scope.fuelTypeChange = function(coverCode) {
		var result = false;
		if (coverCode === RatingConstants.BFK) {
			var fuelType = $scope.vehicleInfo.fuelType;
			if (fuelType === 'PETROL' || fuelType === 'DIESEL') {
				result = true;
			}
		} else if (coverCode === RatingConstants.UPA) {
			var vehicleRegisteredTo = $scope.vehicleInfo.vehicleRegisteredTo.name;
			if (vehicleRegisteredTo === 'INDIVIDUAL') {
				result = true;
			}
		} else if (coverCode === RatingConstants.PAD || coverCode === RatingConstants.LLD_COVER || coverCode === RatingConstants.LLE_COVER) {
			var vehicleRegisteredTo = $scope.vehicleInfo.vehicleRegisteredTo.name;
			if (vehicleRegisteredTo === 'COMPANY') {
				result = true;
			}
		} else {
			result = true;
		}
		return result;
	}
});
