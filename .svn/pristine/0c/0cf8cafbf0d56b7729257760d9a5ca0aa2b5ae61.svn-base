/**
 * Premium Computation Logic
 */
POTApp
		.factory(
				'PremiumCalculationService',
				function(CoverageService, StorageService, $http, $q, $filter,
						RatingConstants, UrlConstants,$rootScope, cacheFactory) {
					var premiumDetailsForAll = {};
					return {
						multipleInsurerPremiumCalc : multipleInsurerPremiumCalc,
						calculatePremium : calculatePremium,
						isValidInsurer : isValidInsurer,
						getUpdateIdv : getUpdateIdv,
						isCoverSelected : isCoverSelected,
						vehicleAgeCaluculation : vehicleAgeCaluculation,
						averagesOfIdv : averagesOfIdv,
						singleInsurerPremiumCalc : singleInsurerPremiumCalc,
						singleIdvCalc : singleIdvCalc
					}

					/**
					 * This method is used to calculate multiple insurer premium
					 * calculation
					 */
					function multipleInsurerPremiumCalc(idv) {
						var details = StorageService.getAll();

						var data = {
							"CustomerDetails" : {
								"firstName" : details.personalInfo.firstName,
								"lastName" : details.personalInfo.lastName,
								"mobileNo" : details.personalInfo.mobileNo,
								"email" : details.personalInfo.email,
								"customerType" : details.vehicleInfo.vehicleRegisteredTo.code,
								"aadharNumber" : details.personalInfo.aadhaarNo1
										+ "-"
										+ details.personalInfo.aadhaarNo2
										+ "-" + details.personalInfo.aadhaarNo3,
							},
							"QuotationData" : {
								"quoteNo" : angular.isDefined(StorageService
										.get("quoteNo")) ? StorageService
										.get("quoteNo") : '',
								"lineOfBusiness" : details.productcode,
								"subLine" : details.subProductName,
								"productCode" : details.subProductCode,
								"productName" : "COMPREHENSIVE",
								"businessType" : "Rollover",
								"policyStartDate" : details.vehicleInfo.policyStartDate,
								"expiryDate" : details.vehicleInfo.policyEndDate,
								"userId" : $rootScope.loginId,
								"agentCode" : $rootScope.profileId,
								"oaCode" : "",
								"isVipPolicy" : "N",
								"agentName" : $rootScope.username,
								"channelType" : "POT",
								"branchName" : "",
								"branchCode" : "",
								"quoteStatus" : "QUOTE",
								"PreviousPolicyDetails" : {
									"prevPolicyNo" : "",
									"prevPolicyExp" : details.vehicleInfo.prevPolicyExpDate,
									"prevPolicyNcb" : details.vehicleInfo.ncb.ncbPercentage,
									"prevPolicyInsurerCode" : details.vehicleInfo.previousPolicyInsurer.insurerCode,
									"prevPolicyInsurerName" : details.vehicleInfo.previousPolicyInsurer.insurerName,
									"isPrevPolicyClaim" : details.vehicleInfo.isAnyClaim,
									"prevPolicyType" : details.vehicleInfo.policyType.code,
								}
							},
							"VehicleDetails" : {
								"registrationNo" : details.vehicleInfo.regNo1
										+ "-" + details.vehicleInfo.regNo2
										+ "-" + details.vehicleInfo.regNo3
										+ "-" + details.vehicleInfo.regNo4,
								"yearOfMfg" : details.vehicleInfo.yearOfMfg,
								"registrationDate" : details.vehicleInfo.registrationDate,
								"makeCode" : details.vehicleInfo.manufacturer.code,
								"modelCode" : details.vehicleInfo.model.code,
								"makeName" : details.vehicleInfo.manufacturer.name,
								"modelName" : details.vehicleInfo.model.name,
								"subModelName" : details.vehicleInfo.subModel.subModelName,
								"subModelCode" : details.vehicleInfo.subModel.subModelCode,
								"engineCC" : details.vehicleInfo.engineCC,
								"fuelType" : details.vehicleInfo.fuelType,
								"rtoCode" : details.vehicleInfo.rtoZoneCode,
								"rtoName" : details.vehicleInfo.rtoZoneLocation,
								"actualIdv" : idv,
								"vehicleAge" : vehicleAgeCaluculation(),
								"seatingCapacity" : details.vehicleInfo.seatingCapacity,
								"cubicCapacity" : details.vehicleInfo.engineCC,
								"zone" : details.vehicleInfo.ZoneArea,
								"currentNCB" : details.vehicleInfo.currentNCB.ncbPercentage,
								"isInBuilt" : details.vehicleInfo.inbuilt,
								"isCarOwnerChanged" : details.vehicleInfo.isCarOwnerChanged
							}
						};
						/*console
								.log(("multipleInsurerPremiumCalcData => " + JSON
										.stringify(data)));*/
						var deferred = $q.defer();
						var method="POST";
						var url = UrlConstants.MIS_CLOUD + UrlConstants.MULTIPLE_INS_PREMIUM_CALC;
						cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
							premiumDetailsForAll = response.data;
							StorageService.set("quoteNo", response.data.quoteNo);
							deferred.resolve(response);
						},function error(response){
							deferred.reject(response);
						});
						
						return deferred.promise;
					}

					function singleInsurerPremiumCalc(insurerCode, idv,
							insurerName) {
						var details = StorageService.getAll();
						// console.log(("singleInsurerPremiumCalc2 => " +
						// JSON.stringify(details)));
						var selectedCover = [];
						angular.forEach(CoverageService.getSelectedCovers(),
								function(value, key) {
									var arr = {
										'coverName' : value.name,
										'coverCode' : value.code,
										'coverType' : value.coverType,
										'sumInsured' : value.sumInsured,
										'sumInsuredType' : value.sumInsuredType,
										'isPrevOpted' : value.isPrevOpted
									};
									selectedCover.push(arr);
								});
						var data = {
							"CustomerDetails" : {
								"firstName" : details.personalInfo.firstName,
								"lastName" : details.personalInfo.lastName,
								"mobileNo" : details.personalInfo.mobileNo,
								"email" : details.personalInfo.email,
								"customerType" : details.vehicleInfo.vehicleRegisteredTo.code,
								"aadharNumber" : details.personalInfo.aadhaarNo1
										+ "-"
										+ details.personalInfo.aadhaarNo2
										+ "-" + details.personalInfo.aadhaarNo3,
							},
							"QuotationData" : {
								"quoteNo" : angular.isDefined(StorageService
										.get("quoteNo")) ? StorageService
										.get("quoteNo") : '',
								"lineOfBusiness" : details.productcode,
								"subLine" : details.subProductName,
								"productCode" : details.subProductCode,
								"productName" : "COMPREHENSIVE",
								"businessType" : "Rollover",
								"policyStartDate" : details.vehicleInfo.policyStartDate,
								"expiryDate" : details.vehicleInfo.policyEndDate,
								"userId" : $rootScope.loginId,
								"agentCode" : $rootScope.profileId,
								"oaCode" : "",
								"isVipPolicy" : "N",
								"agentName" : $rootScope.username,
								"channelType" : "POT",
								"branchName" : "",
								"branchCode" : "",
								"quoteStatus" : "QUOTE",
								"insurerCode" : insurerCode,
								"insurerName" : insurerName,
								"PreviousPolicyDetails" : {
									"prevPolicyNo" : "",
									"prevPolicyExp" : details.vehicleInfo.prevPolicyExpDate,
									"prevPolicyNcb" : details.vehicleInfo.ncb.ncbPercentage,
									"prevPolicyInsurerCode" : details.vehicleInfo.previousPolicyInsurer.insurerCode,
									"prevPolicyInsurerName" : details.vehicleInfo.previousPolicyInsurer.insurerName,
									"isPrevPolicyClaim" : details.vehicleInfo.isAnyClaim,
									"prevPolicyType" : details.vehicleInfo.policyType.code,
								}
							},
							"VehicleDetails" : {
								"registrationNo" : details.vehicleInfo.regNo1
										+ "-" + details.vehicleInfo.regNo2
										+ "-" + details.vehicleInfo.regNo3
										+ "-" + details.vehicleInfo.regNo4,
								"yearOfMfg" : details.vehicleInfo.yearOfMfg,
								"registrationDate" : details.vehicleInfo.registrationDate,
								"makeCode" : details.vehicleInfo.manufacturer.code,
								"modelCode" : details.vehicleInfo.model.code,
								"makeName" : details.vehicleInfo.manufacturer.name,
								"modelName" : details.vehicleInfo.model.name,
								"subModelName" : details.vehicleInfo.subModel.subModelName,
								"subModelCode" : details.vehicleInfo.subModel.subModelCode,
								"engineCC" : details.vehicleInfo.engineCC,
								"fuelType" : details.vehicleInfo.fuelType,
								"rtoCode" : details.vehicleInfo.rtoZoneCode,
								"rtoName" : details.vehicleInfo.rtoZoneLocation,
								"actualIdv" : idv,
								"vehicleAge" : vehicleAgeCaluculation(),
								"seatingCapacity" : details.vehicleInfo.seatingCapacity,
								"cubicCapacity" : details.vehicleInfo.engineCC,
								"zone" : details.vehicleInfo.ZoneArea,
								"currentNCB" : details.vehicleInfo.currentNCB.ncbPercentage,
								"isInBuilt" : details.vehicleInfo.inbuilt,
								"isCarOwnerChanged" : details.vehicleInfo.isCarOwnerChanged
							},
							"CoverDetails" : selectedCover
						};
						/*console.log(("singleInsurerPremiumCalc => " + JSON
								.stringify(data)));*/
						StorageService.set("insurerName", insurerName);
						var deferred = $q.defer();
						
						var url= UrlConstants.MIS_CLOUD + UrlConstants.SINGLE_INS_PREMIUM_CALC + insurerCode;
						var method="POST";
						var data = data;
						
						cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
							StorageService.set("quoteNo", response.data.quoteNo);
							deferred.resolve(response);
						},function error(response){
							deferred.reject(response);
						});
						
						return deferred.promise;
					}

					function singleIdvCalc(insurerCode, idv) {
						var details = StorageService.getAll();
						// console.log(("singleInsurerPremiumCalc2 => " +
						// JSON.stringify(details)));
						var selectedCover = [];
						angular.forEach(CoverageService.getSelectedCovers(),
								function(value, key) {
									var arr = {
										'coverName' : value.name,
										'coverCode' : value.code,
										'coverType' : value.coverType,
										'sumInsured' : value.sumInsured,
										'sumInsuredType' : value.sumInsuredType,
										'isPrevOpted' : value.isPrevOpted
									};
									selectedCover.push(arr);
								});
						var data = {
							"CustomerDetails" : {
								"firstName" : details.personalInfo.firstName,
								"lastName" : details.personalInfo.lastName,
								"mobileNo" : details.personalInfo.mobileNo,
								"email" : details.personalInfo.email,
								"customerType" : details.vehicleInfo.vehicleRegisteredTo.code,
								"aadharNumber" : details.personalInfo.aadhaarNo1
										+ "-"
										+ details.personalInfo.aadhaarNo2
										+ "-" + details.personalInfo.aadhaarNo3,
							},
							"QuotationData" : {
								"quoteNo" : angular.isDefined(StorageService
										.get("quoteNo")) ? StorageService
										.get("quoteNo") : '',
								"lineOfBusiness" : details.productcode,
								"subLine" : details.subProductName,
								"productCode" : details.subProductCode,
								"productName" : "COMPREHENSIVE",
								"policyType" : details.vehicleInfo.policyType.code,
								"businessType" : "Rollover",
								"policyStartDate" : details.vehicleInfo.policyStartDate,
								"expiryDate" : details.vehicleInfo.policyEndDate,
								"userId" : $rootScope.loginId,
								"agentCode" : $rootScope.profileId,
								"oaCode" : "",
								"isVipPolicy" : "N",
								"agentName" : $rootScope.username,
								"channelType" : "POT",
								"branchName" : "",
								"branchCode" : "",
								"quoteStatus" : "QUOTE",
								"insurerCode" : insurerCode,
								"PreviousPolicyDetails" : {
									"prevPolicyNo" : "",
									"prevPolicyExp" : details.vehicleInfo.prevPolicyExpDate,
									"prevPolicyNcb" : details.vehicleInfo.ncb.ncbPercentage,
									"prevPolicyInsurerCode" : details.vehicleInfo.previousPolicyInsurer.insurerCode,
									"prevPolicyInsurerName" : details.vehicleInfo.previousPolicyInsurer.insurerName,
									"isPrevPolicyClaim" : details.vehicleInfo.isAnyClaim,
									"prevPolicyType" : details.vehicleInfo.policyType.code
									
								}
							},
							"VehicleDetails" : {
								"registrationNo" : details.vehicleInfo.regNo1
										+ "-" + details.vehicleInfo.regNo2
										+ "-" + details.vehicleInfo.regNo3
										+ "-" + details.vehicleInfo.regNo4,
								"yearOfMfg" : details.vehicleInfo.yearOfMfg,
								"registrationDate" : details.vehicleInfo.registrationDate,
								"makeCode" : details.vehicleInfo.manufacturer.code,
								"modelCode" : details.vehicleInfo.model.code,
								"makeName" : details.vehicleInfo.manufacturer.name,
								"modelName" : details.vehicleInfo.model.name,
								"subModelName" : details.vehicleInfo.subModel.subModelName,
								"subModelCode" : details.vehicleInfo.subModel.subModelCode,
								"engineCC" : details.vehicleInfo.engineCC,
								"fuelType" : details.vehicleInfo.fuelType,
								"rtoCode" : details.vehicleInfo.rtoZoneCode,
								"rtoName" : details.vehicleInfo.rtoZoneLocation,
								"actualIdv" : idv,
								"vehicleAge" : vehicleAgeCaluculation(),
								"seatingCapacity" : details.vehicleInfo.seatingCapacity,
								"cubicCapacity" : details.vehicleInfo.engineCC,
								"zone" : details.vehicleInfo.ZoneArea,
								"currentNCB" : details.vehicleInfo.currentNCB.ncbPercentage,
								"isInBuilt" : details.vehicleInfo.inbuilt,
								"isCarOwnerChanged" : details.vehicleInfo.isCarOwnerChanged
							},
							"CoverDetails" : selectedCover
						};
//						console
//								.log(("singleIdvCalc => " + JSON
//										.stringify(data)));
						var deferred = $q.defer();
						
						var url = UrlConstants.MIS_CLOUD+UrlConstants.SINGLE_IDV_EDIT_CALC+ insurerCode;
						var method="POST";
						cacheFactory.getJsonWithOutCache(method, url, data).then(function (response) {
							deferred.resolve(response);
						},function error(response){
							deferred.reject(response);
						});
						
						return deferred.promise;
					}

					/*
					 * This function can be used to check whether the particular
					 * insurer is applicable or not
					 */
					function isValidInsurer(insurerCode) {
						var premiumDetailsForTheInsurer = premiumDetailsForAll.premium[insurerCode];
						if (angular.isDefined(premiumDetailsForTheInsurer)) {
							var status = premiumDetailsForTheInsurer.status;
							if (angular.isDefined(status)
									&& status === RatingConstants.SUCCESS) {
								var selectedCovers = CoverageService
										.getSelectedCovers();
								if (angular.isDefined(selectedCovers)
										&& !angular.equals({}, selectedCovers)) {
									var noOfCovers = 0;
									var noOfApplicableCovers = 0;
									angular
											.forEach(	
													selectedCovers,
													function(value, key) {
														if (value.coverType === RatingConstants.ADDITIONAL || value.coverType === RatingConstants.DISCOUNTS || value.coverType === RatingConstants.ADDON) {
															noOfCovers = noOfCovers + 1;
															var coverValues = premiumDetailsForTheInsurer.coverDetails[value.code];
															if (angular
																	.isDefined(coverValues)
																	&& !angular
																			.equals(
																					{},
																					coverValues)) {
																if (coverValues.rateType === RatingConstants.RATE) {
																	if (coverValues.rate != RatingConstants.RATE_NA)
																		noOfApplicableCovers = noOfApplicableCovers + 1;
																} else if (coverValues.rateType === RatingConstants.FLAT) {
																	if (coverValues.flat != RatingConstants.RATE_NA)
																		noOfApplicableCovers = noOfApplicableCovers + 1;
																} else if (coverValues.rateType === RatingConstants.BOTH) {
																	if (coverValues.rate != RatingConstants.RATE_NA
																			&& coverValues.flat != RatingConstants.RATE_NA)
																		noOfApplicableCovers = noOfApplicableCovers + 1;
																}
															}
														}
													});
									if (noOfCovers === noOfApplicableCovers) {
										return true;
									} else {
										return false;
									}
								} else {
									return true;
								}
							} else {
								return false;
							}
						} else {
							return false;
						}
					}

					function averagesOfIdv(premium) {
						var resultofidv = 0;
						var listOfInsurer = Object.keys(premium).length;
						if (listOfInsurer > 0) {
							var allidvaddition = 0;
							angular.forEach(premium, function(value, key) {
								allidvaddition = allidvaddition
										+ value.premiumDetails.actualIdv;
								resultofidv = (allidvaddition / listOfInsurer);
							});
						}
						return resultofidv.toFixed(0);
					}

					function calculatePremium(insurerCode) {
						console.log("Insurer Code => " + insurerCode);
						var premium = premiumDetailsForAll.premium[insurerCode];
						var premiumDetails = {};

						var basicOdPremium = getMandatoryCoverPremium(
								RatingConstants.OD_COVER, premium);
						console.log("Basic Od Premium => " + basicOdPremium);

						var basicTpPremium = getMandatoryCoverPremium(
								RatingConstants.TPL_COVER, premium);
						console.log("basicTpPremium => " + basicTpPremium);

						var cpaPremium = getMandatoryCoverPremium(
								RatingConstants.CPA_COVER, premium);
						console.log("cpaPremium => " + cpaPremium);

						var upaPremium = getAdditionalCoverPremium(
								RatingConstants.UPA_COVER, premium);
						console.log("upaPremium => " + upaPremium);

						var lldPremium = getMandatoryCoverPremium(
								RatingConstants.LLD_COVER, premium);
						console.log("lldPremium => " + lldPremium);

						var llePremium = getAdditionalCoverPremium(
								RatingConstants.LLE_COVER, premium);
						console.log("llePremium => " + llePremium);

						var biFuelPremium = getBiFuelPremium(premium,
								basicOdPremium);
						console.log("biFuelPremium => " + biFuelPremium);

						var bifuelTpPremium = getBiFuelTPPremium(premium);
						console.log("bifuelTpPremium => " + bifuelTpPremium);

						var tariffDiscount = getTariffDiscount(premium);
						console.log("tariffDiscount => " + tariffDiscount);

						var tariffDiscountAmount = getDiscountPremium(
								basicOdPremium, tariffDiscount);
						console.log("tariffDiscountAmount => "
								+ tariffDiscountAmount);

						var netOdPremium = checkPremium(basicOdPremium)
								- checkPremium(tariffDiscountAmount)
								+ checkPremium(biFuelPremium);
						console.log("netOdPremium => " + netOdPremium);

						// Discount covers
						var autoMobileAssociationMembers = getDiscountCoverPremium(
								RatingConstants.AMSM, premium, netOdPremium);
						console.log("autoMobileAssociationMembers => "
								+ autoMobileAssociationMembers);

						var voluntaryDeductible = getDiscountCoverPremium(
								RatingConstants.VD, premium, netOdPremium);
												console.log("voluntaryDeductible => "
								+ JSON.stringify(voluntaryDeductible));

						var totalOdPremium = netOdPremium
								- checkPremium(autoMobileAssociationMembers)
								- checkPremium(voluntaryDeductible);
						console.log("totalOdPremium => " + totalOdPremium);
						
						
						var antiTheftDiscountPremium = getDiscountCoverPremium(
								RatingConstants.AT, premium, totalOdPremium);
						console.log("antiTheftDiscountPremium =>"
								+ antiTheftDiscountPremium);

						totalOdPremium = totalOdPremium
								- checkPremium(antiTheftDiscountPremium);
						console.log("totalOdPremium => " + totalOdPremium);

						var ncbDiscountAmount = getNCBPremium(totalOdPremium);
						console
						.log("ncbDiscountAmount => "
						+ ncbDiscountAmount);

						totalOdPremium = totalOdPremium
								- checkPremium(ncbDiscountAmount);
						
						

						
						var paidtoDriver = getAdditionalCoverPremium(
								RatingConstants.PAD, premium);
						console.log("paidtoDriver => " + paidtoDriver);

						var totalTpPremium = checkPremium(bifuelTpPremium)
								+ checkPremium(basicTpPremium)
								+ checkPremium(lldPremium)
								+ checkPremium(llePremium)
								+ checkPremium(cpaPremium)
								+ checkPremium(upaPremium)
								+ checkPremium(paidtoDriver);
						console.log("totalTpPremium => " + totalTpPremium);

						var totalAddonCoverPremium = getTotalAddonPremium(premium);
						console.log("totalAddonCoverPremium => "
								+ totalAddonCoverPremium);

						var totalPremiumWithoutAddons = totalOdPremium
								+ totalTpPremium;
						console.log("totalPremiumWithoutAddons => "
								+ totalPremiumWithoutAddons);

						var totalPremiumWithAddons = totalPremiumWithoutAddons
								+ totalAddonCoverPremium;
						console.log("totalPremiumWithAddons => "
								+ totalPremiumWithAddons);

						var totalPremiumWithoutAddonslistOfTax = calculateServiceTax(
								premium, totalPremiumWithoutAddons);
												console
								.log("totalPremiumWithoutAddonslistOfTax =>"
										+ JSON
												.stringify(totalPremiumWithoutAddonslistOfTax));

						var totalPremiumWithoutAddonssumOfTax = sumOfServiceTax(totalPremiumWithoutAddonslistOfTax);
						console
								.log("totalPremiumWithoutAddonssumOfTax =>"
										+ JSON
												.stringify(totalPremiumWithoutAddonssumOfTax));

						var grossPremiumWithoutAddon = totalPremiumWithoutAddons
								+ totalPremiumWithoutAddonssumOfTax;
						grossPremiumWithoutAddon = roundUp(grossPremiumWithoutAddon);
						console.log("grossPremiumWithoutAddon => "
								+ grossPremiumWithoutAddon);

						var netPremium = roundUp(totalPremiumWithAddons);
						console.log("netPremium => " + netPremium);

						var listOfTax = calculateServiceTax(premium, netPremium);
						console.log("listOfTax =>" + JSON.stringify(listOfTax));

						var sumOfTax = sumOfServiceTax(listOfTax);
						console.log("sumOfTax => " + sumOfTax);

						var grossPremium = netPremium + sumOfTax;
						grossPremium = roundUp(grossPremium);
						console.log("grossPremium => " + grossPremium);

						var coverDetails = [];

						var selectedCovers = CoverageService
								.getSelectedCovers();
						if (angular.isDefined(selectedCovers)
								&& !angular.equals({}, selectedCovers)) {
							angular
									.forEach(
											selectedCovers,
											function(value, key) {
												var coverPremium = -99999;
                                              
                                                if (key === RatingConstants.BFK) {
													coverPremium = biFuelPremium;
												} else if (key === RatingConstants.UPA) {
													coverPremium = upaPremium;
												} else if (key === RatingConstants.PAD) {
													coverPremium = paidtoDriver;
												} else if (key === RatingConstants.LLD) {
													coverPremium = lldPremium;
												} else if (key === RatingConstants.LLE) {
													coverPremium = llePremium;
												} else if (key === RatingConstants.AT) {
													coverPremium = antiTheftDiscountPremium;
												} else if (key === RatingConstants.VD) {
													coverPremium = voluntaryDeductible;
												} else if (key === RatingConstants.AMSM) {
													coverPremium = autoMobileAssociationMembers;
												} else {
													coverPremium = getAddonCoverPremium(
															value.code, premium);
												}
												var array = {
													"coverCode" : key,
													"coverName" : value.name,
													"coverPremium" : coverPremium,
													'sumInsured' : value.sumInsured,
													"coverType" : value.coverType
												};
												coverDetails.push(array);
											});
						}
						premiumDetails = {
							"insurerCode" : insurerCode,
							"actualIdv" : premium.actualIdv,
							"vehicleAge" : premium.vehicleAge,
							"basicOdPremium" : basicOdPremium,
							"basicTpPremium" : basicTpPremium,
							"cpaPremium" : cpaPremium,
							"lldPremium" : lldPremium,
							"tariffDiscount" : tariffDiscount,
							"tariffDiscountAmount" : tariffDiscountAmount,
							"ncbDiscountAmount" : ncbDiscountAmount,
							"totalOdPremium" : totalOdPremium,
							"totalTpPremium" : totalTpPremium,
							"selectedAddonCover" : coverDetails,
							"totalAddonCoverPremium" : totalAddonCoverPremium,
							"totalPremiumWithoutAddons" : totalPremiumWithoutAddons,
							"netPremium" : netPremium,
							"listOfTax" : listOfTax,
							"sumOfTax" : sumOfTax,
							"grossPremiumWithoutAddon" : grossPremiumWithoutAddon,
							"grossPremium" : grossPremium
						}
						 console.log(JSON.stringify(premiumDetails));
						return premiumDetails;
					}

					/**
					 * Calculating Vehicle Age
					 */
					function vehicleAgeCaluculation() {
						var vehicleDetails = StorageService.get("vehicleInfo");
						var vehicleAge = 0;
						var currentSystDate = moment(new Date());
						var registrationDate = moment(
								vehicleDetails.registrationDate, "DD/MM/YYYY");
						if (angular.equals(RatingConstants.NO_POLICY,
								vehicleDetails.policyType.code)) {
							vehicleAge = currentSystDate.diff(registrationDate,
									'years', true);
						} else {
							var prevPolicyExpDate = moment(
									vehicleDetails.prevPolicyExpDate,
									"DD/MM/YYYY");
							if (currentSystDate > prevPolicyExpDate) {
								vehicleAge = currentSystDate.diff(
										registrationDate, 'years', true);
							} else {
								vehicleAge = prevPolicyExpDate.diff(
										registrationDate, 'years', true);
							}
						}
						return vehicleAge.toFixed(2);
					}

					/**
					 * Getting cover premium Details
					 */
					function getCoverPremiumDetails(coverCode, premium) {
						return premium.coverDetails[coverCode];
					}

					/**
					 * This function can be used to getting mandatory cover
					 * premium
					 */
					function getMandatoryCoverPremium(coverCode, premium) {
						var coverPremium = RatingConstants.RATE_NA;
						var coverDetails = getCoverPremiumDetails(coverCode,
								premium);
						if (angular.isDefined(coverDetails)
								&& !angular.equals({}, coverDetails)) {
							coverPremium = coverDetails.premium;
						}
						return coverPremium;
					}

					/**
					 * This function can be used to getting additional cover
					 * premium
					 */
					function getAdditionalCoverPremium(coverCode, premium) {
						var coverPremium = RatingConstants.RATE_NA;
						var coverDetails = isCoverSelected(coverCode);
						if (angular.isDefined(coverDetails)) {
							var coverPremiumDetail = getCoverPremiumDetails(
									coverCode, premium);
							if (angular.isDefined(coverPremiumDetail)
									&& !angular.equals({}, coverPremiumDetail)) {
								if (RatingConstants.SUMINSURED_TYPE_LIST === coverDetails.sumInsuredType) {
									coverPremium = getSumInsuredListTypePremium(
											coverPremiumDetail,
											coverDetails.sumInsured);
								} else if (RatingConstants.SUMINSURED_TYPE_TEXT === coverDetails.sumInsuredType) {
									coverPremium = getSumInsuredTextTypePremium(
											coverPremiumDetail,
											coverDetails.sumInsured);
								} else {
									coverPremium = coverPremiumDetail.premium;
								}
							}
						}
						return coverPremium;
					}

					function getAddonCoverPremium(coverCode, premium) {
						var coverPremium = RatingConstants.RATE_NA;
						var coverDetails = isCoverSelected(coverCode);
						if (angular.isDefined(coverDetails)) {
							var coverPremiumDetail = getCoverPremiumDetails(
									coverCode, premium);
							if (angular.isDefined(coverPremiumDetail)
									&& !angular.equals({}, coverPremiumDetail)) {
								if (RatingConstants.SUMINSURED_TYPE_LIST === coverDetails.sumInsuredType) {
									coverPremium = getSumInsuredListTypePremium(
											coverPremiumDetail,
											coverDetails.sumInsured);
								} else if (RatingConstants.SUMINSURED_TYPE_TEXT === coverDetails.sumInsuredType) {
									coverPremium = getSumInsuredTextTypePremium(
											coverPremiumDetail,
											coverDetails.sumInsured);
								} else {
									coverPremium = coverPremiumDetail.premium;
								}
							}
						}
						return coverPremium;
					}

					function getTotalAddonPremium(premium) {
						var totalAddonPremium = 0;
						var selectedAddonCover = CoverageService
								.getSelectedCovers();
						if (angular.isDefined(selectedAddonCover)) {
							angular
									.forEach(
											selectedAddonCover,
											function(value, key) {
												if (value.coverType === RatingConstants.ADDON) {
													var coverPremium = getAddonCoverPremium(
															value.code, premium);
													if (coverPremium != RatingConstants.RATE_NA) {
														totalAddonPremium = totalAddonPremium
																+ coverPremium;
													}
												}
											});
						}
						return totalAddonPremium;
					}

					/**
					 * This function can be used to getting discount cover
					 * premium
					 */
					function getDiscountCoverPremium(coverCode, premium,
							netOdPremium) {
						var coverPremium = RatingConstants.RATE_NA;
						var coverDetails = isCoverSelected(coverCode);
						if (angular.isDefined(coverDetails)) {
							var coverPremiumDetail = getCoverPremiumDetails(
									coverCode, premium);
							if (angular.isDefined(coverPremiumDetail)
									&& !angular.equals({}, coverPremiumDetail)) {
								if (RatingConstants.SUMINSURED_TYPE_LIST === coverDetails.sumInsuredType) {
									angular
											.forEach(
													coverPremiumDetail.coverElements,
													function(value, key) {
														if (value.type = RatingConstants.SUM_INSURED
																&& coverDetails.sumInsured == value.sumInsured) {
															coverPremium = (netOdPremium * value.rate) / 100;
															coverPremium = coverPremium > value.maxValue ? value.maxValue
																	: coverPremium;
														}
													});
								} else if (RatingConstants.SUMINSURED_TYPE_TEXT === coverDetails.sumInsuredType) {

								} else {
									coverPremium = coverPremuim(
											coverPremiumDetail.rateType,
											coverPremiumDetail.rate,
											coverPremiumDetail.flat,
											netOdPremium);
									angular
											.forEach(
													coverPremiumDetail.coverVariables,
													function(value, key) {
														if (value.name = "MAX_DISCOUNT")
															coverPremium = coverPremium > value.numValue ? value.numValue
																	: coverPremium;
													});
								}
							}
						}
						return coverPremium;
					}

					/**
					 * Getting sum insured type cover premium
					 */
					function getSumInsuredListTypePremium(coverPremiumDetail,
							sumInsured) {
						var coverPremium = RatingConstants.RATE_NA;
						var coverElements = coverPremiumDetail.coverElements;
						if (angular.isDefined(coverElements)) {
							angular
									.forEach(
											coverElements,
											function(value, key) {
												if (angular.isDefined(value)
														&& !angular.equals({},
																value)) {
													var s = parseInt(sumInsured);
													if (angular.isNumber(s)) {
														if (value.type == RatingConstants.SUM_INSURED
																&& value.sumInsured == sumInsured) {
															coverPremium = value.value;
														}
													}
												}
											});
						}
						return coverPremium;
					}

					/**
					 * Getting sum insured type cover premium
					 */
					function getSumInsuredTextTypePremium(coverPremiumDetail,
							sumInsured) {
						var coverPremium = RatingConstants.RATE_NA;
						if (angular.isDefined(coverPremiumDetail)
								&& angular.isNumber(coverPremiumDetail.rate)) {
							coverPremium = coverPremuim(
									coverPremiumDetail.rateType,
									coverPremiumDetail.rate,
									coverPremiumDetail.flat, sumInsured);
						}
						return coverPremium;
					}

					/**
					 * Check whether the cover is selected or not
					 */
					function isCoverSelected(coverCode) {
						var selectedCovers = CoverageService
								.getSelectedCovers();
						if (angular.isDefined(selectedCovers)
								&& !angular.equals({}, selectedCovers)) {
							var coverDetails = selectedCovers[coverCode];
							if (angular.isDefined(coverDetails)) {
								return coverDetails;
							} else {
								return undefined;
							}
						} else {
							return undefined;
						}
					}

					function coverPremuim(rateType, rate, flat, premium) {
						var coverPremium = 0;
						if (RatingConstants.RATE === rateType) {
							if (rate != RatingConstants.RATE_NA) {
								coverPremium = rate * premium / 100;
							} else {
								coverPremium = RatingConstants.RATE_NA;
							}
						} else if (RatingConstants.FLAT === rateType) {
							if (flat != RatingConstants.RATE_NA) {
								coverPremium = flat;
							} else {
								coverPremium = RatingConstants.RATE_NA;
							}

						} else if (RatingConstants.BOTH === rateType) {
							if (rate != RatingConstants.RATE_NA) {
								coverPremium = rate * premium / 100;
							}
							if (flat != RatingConstants.RATE_NA) {
								coverPremium = coverPremium + flat;
							}
							if (rate != RatingConstants.RATE_NA
									&& flat != RatingConstants.RATE_NA) {
								coverPremium = RatingConstants.RATE_NA;
							}
						}
						return coverPremium;
					}

					function getBiFuelPremium(premium, basicOdPremium) {
						var addoncalc = 0;
						var vehicleDetails = StorageService.get("vehicleInfo");
						if (vehicleDetails.fuelType === RatingConstants.FUEL_TYPE_INBUILT) {
							var coverPremiumDetail = getCoverPremiumDetails(
									RatingConstants.BFK, premium);
							if (angular.isDefined(coverPremiumDetail)
									&& !angular.equals({}, coverPremiumDetail)) {
								addoncalc = coverPremiumDetail.rate
										* basicOdPremium / 100;

							}
						} else {
							addoncalc = getAdditionalCoverPremium(
									RatingConstants.BFK, premium);
						}
						return addoncalc;
					}

					function getBiFuelTPPremium(premium) {
						var vehicleDetails = StorageService.get("vehicleInfo");
						var biFuelTPPremium = 0;
						if (vehicleDetails.fuelType === RatingConstants.FUEL_TYPE_INBUILT) {
							var coverDetails = getCoverPremiumDetails(
									RatingConstants.BFK, premium);
							if (angular.isDefined(coverDetails)
									&& !angular.equals({}, coverDetails)) {
								angular
										.forEach(
												coverDetails.coverVariables,
												function(value, key) {
													if (value.name === "BIFUEL_TP")
														biFuelTPPremium = value.numValue;
												});
							}
						} else {
							var coverDetails = isCoverSelected(RatingConstants.BFK);
							if (angular.isDefined(coverDetails)
									&& !angular.equals({}, coverDetails)) {
								var coverPremiumDetails = getCoverPremiumDetails(
										RatingConstants.BFK, premium);
								if (angular.isDefined(coverPremiumDetails)
										&& !angular.equals({},
												coverPremiumDetails)
										&& coverDetails.sumInsured > 0) {
									angular
											.forEach(
													coverPremiumDetails.coverVariables,
													function(value, key) {
														if (value.name === "BIFUEL_TP")
															biFuelTPPremium = value.numValue;
													});
								}
							}
						}
						return biFuelTPPremium;
					}

					function getTariffDiscount(premium) {
						return premium.tariffDiscountRate;
					}

					function getDiscountPremium(basicOdPremium, tariffDiscount) {
						if (angular.isNumber(tariffDiscount))
							return (basicOdPremium * tariffDiscount / 100);
						else
							return 0;
					}
					function getNCBPremium(totalOdPremium) {
						var ncbPremium = 0;
						var vehicleInfo = StorageService.get("vehicleInfo");
						if (!angular.equals(RatingConstants.NO_POLICY,
								vehicleInfo.policyType.code)
								&& !angular.equals(RatingConstants.THIRDPARTY,
										vehicleInfo.policyType.code)) {
							var ncbPercentage = vehicleInfo.currentNCB.ncbPercentage;
							if (ncbPercentage == '' || ncbPercentage == null) {
								ncbPercentage = 0;
							}
							var ncbNumber = parseInt(ncbPercentage);

							if (angular.isNumber(ncbNumber)) {
								ncbPremium = (totalOdPremium) * ncbNumber / 100;
							}
						}
						return ncbPremium;
					}

					function calculateServiceTax(premium, netPremium) {
						var listOfServiceTax = [];
						angular
								.forEach(premium.listOfTax,
										function(value, key) {
											var array = {
												"nameOfTax" : value.nameOfTax,
												"rate" : value.rate,
												"amount" : (netPremium
														* value.rate / 100)
											};
											listOfServiceTax.push(array);
										});
						return listOfServiceTax;
					}

					function sumOfServiceTax(listOfServiceTaxWithOutAddons) {
						var servicTax = 0;
						angular.forEach(listOfServiceTaxWithOutAddons,
								function(value, key) {
									servicTax = servicTax + value.amount;
								});
						return Math.round(servicTax);
					}

					function checkPremium(premium) {
						return premium == -99999 ? 0 : premium;
					}

					function roundUp(value) {
						return Math.ceil(value);
					}

					/* Idv edit for particular insurer */
					function getUpdateIdv(insurerCode, idvForSingleInsurer) {
						angular
								.forEach(
										premiumDetailsForAll.premium,
										function(value, key) {
											if (key === insurerCode) {
												delete premiumDetailsForAll.premium[key];
//												console
//														.log("idvForSingleInsurer"
//																+ JSON
//																		.stringify(idvForSingleInsurer));

												premiumDetailsForAll.premium[key] = idvForSingleInsurer.premium[insurerCode];
											}
										});
					}
				});