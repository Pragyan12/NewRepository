POTApp
		.controller(
				'BasicQuoteInfo',
				function($scope, $rootScope, $state, $log, RTO_SERVICE,
						StorageService, VehicleService, InsurerService,
						PremiumService, CoverageService,
						PremiumCalculationService,$filter) {

					$scope.manufacturerYear = VehicleService.yearOfMfgList();
					$scope.vechileRegistration = VehicleService
							.vehicleRegisteredTo();
					$scope.policyTypeList = VehicleService.policyTypeList();
					/*alert(":::" + JSON.stringify($scope.policyTypeList));*/
					$scope.productCode = StorageService.get("subProductCode");
					$scope.modelList = '';
					$scope.subModelList = '';
					$scope.prevPolicyExpDate = '';
					$scope.zoneCode = '';
					$scope.adhaarNo1 = {
						'isValid' : true
					};
					$scope.adhaarNo2 = {
						'isValid' : true
					};
					$scope.adhaarNo3 = {
						'isValid' : true
					};

					$scope.emailregEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,3}(?:\.[a-z]{2})?)$/i;

					$scope.minRegisterationDate = moment().subtract(5, 'year')
							.format('DD/MM/YYYY');
					$scope.maxRegisterationDate = moment().subtract(1, 'day')
							.format('DD/MM/YYYY');
					$scope.minPreviousPolicyDate = moment().subtract(1, 'year')
							.format('DD/MM/YYYY');
					$scope.maxPreviousPolicyDate = moment().add(60, 'days')
							.format('DD/MM/YYYY');

					$scope.chooseRegDate = function() {
						chooseRegDate();
					}
					
					function chooseRegDate() {
						var manufacturerYear = $scope.vehicleInfo.yearOfMfg;
						var minRegiDate = new Date();
						minRegiDate.setDate(01);
						minRegiDate.setMonth(0);
						minRegiDate.setFullYear(manufacturerYear);
						$scope.minRegisterationDate = moment(
								new Date(minRegiDate)).format('DD/MM/YYYY');
					}
					
					
					
					
					$scope.prepolicydatehide = function() {
						var predate = $scope.vehicleInfo.registrationDate;
						var b = moment(predate, "DD/MM/YYYY");
						$scope.minPreviousPolicyDate = b.add(1, 'days').format(
								'DD/MM/YYYY');
						$scope.vehicleInfo.isCarOwnerChanged = '';
					}

					var customerDetails = StorageService.get("personalInfo");
					var vehicleDetails = StorageService.get("vehicleInfo");

					
					// //////////////////// Jitu //////////////////////
					$scope.submodelsList = [];
					$scope.modelname = '';

					VehicleService.getNCBListFromRestUrl().then(
							function(response) {
								$scope.ncbList = response.data.ncbDtoList;
							}, function(error) {
								console.log("error")
							});

					$scope.currectNCBCalc = function(prevncb) {
						$scope.vehicleInfo.currentNCB = {};
						angular
								.forEach(
										$scope.ncbList,
										function(value, index) {
											if (prevncb === value.ncbPercentage) {
												if ((index + 1) === $scope.ncbList.length) {
													$scope.vehicleInfo.currentNCB = $scope.ncbList[index];
												} else {
													$scope.vehicleInfo.currentNCB = $scope.ncbList[index + 1];
												}
											}
										});

					}

					VehicleService.getMakeListFromRestUrl().then(
							function(response) {
								// console.log("data :
								// "+JSON.stringify(response.data));
								$scope.makelist = response.data.makeList;
							}, function(error) {
								console.log("error")
							});
					InsurerService.getInsurerList().then(function(response) {
						$scope.insurerList = response.data.insurerList;
					});

					InsurerService
							.getRtoListFromRestUrl()
							.then(
									function(response) {
										$scope.rtoList = response.data.rtoMasterdtoList;
									});

					// //////////////////// Jitu //////////////////////
					if (angular.isUndefined(customerDetails)) {
						$scope.personalInfo = {
							firstName : '',
							lastName : '',
							mobileNo : '',
							email : ''
						}
					} else {
						/*alert("::" + JSON.stringify(customerDetails));*/
						$scope.personalInfo = customerDetails;
					}
					if (angular.isUndefined(vehicleDetails)) {
						$scope.vehicleInfo = {
							vehicleRegisteredTo : '',
							policyType : '',
							manufacturer : '',
							modelSubModel : '',
							registrationDate : '',
							rtoCode : '',
							fuelType : '',
							ZoneArea : '',
							engineCC : '',
							yearOfMfg : '',
							previousPolicyInsurer : '',
							prevPolicyExpDate : '',
							ncb : '',
							policyStartDate :'',
							policyEndDate   :'',
 							currentNCB : ncbPercentage = 0,
							isInBuilt : false
						}
					} else {
						$scope.vehicleInfo = vehicleDetails;
						
//						$scope.vehicleInfo.policyStartDate = moment(new Date(vehicleDetails.policyStartDate)).format('DD/MM/YYYY');//moment(vehicleDetails.policyStartDate, "DD/MM/YYYY");
//						$scope.vehicleInfo.policyEndDate = moment(new Date(vehicleDetails.policyEndDate)).format('DD/MM/YYYY');//moment(vehicleDetails.policyEndDate, "DD/MM/YYYY");
						chooseRegDate();
					}

					$scope.showModelList = function(makeobj) {
						$scope.vehicleInfo.modelSubModel = '';
						$scope.vehicleInfo.fuelType = '';
						$scope.vehicleInfo.engineCC = '';
						$scope.vehicleInfo.year = '';
						$scope.vehicleInfo.seatingCapacity = '';
						getModelList(makeobj.code);
						$scope.makename = makeobj.name;
						
					}
					function getModelList(makeCode) {
						VehicleService.getModelsFromRestUrl().then(function(response) {
							if (angular.isDefined(response.data.makeModelMap[makeCode])) {
								$scope.modelsList = response.data.makeModelMap[makeCode];
							}
						});
					}

					$scope.zoneCode = function(rtoLocation) {
						var newTemp= $filter("filter")($scope.rtoList, {rtoLocation:rtoLocation});
						if(newTemp.length===0){
							return true;
						}else{
							var result= false;
							angular.forEach(newTemp, function(value, key){
								if(value.rtoLocation === rtoLocation){
									$scope.vehicleInfo.rtoZoneCode = newTemp[0].rtoCode;
									$scope.vehicleInfo.rtoZoneLocation = newTemp[0].rtoLocation;

										VehicleService.zoneValue().then(function(response) {
											$scope.vehicleInfo.ZoneArea = response.data[$scope.vehicleInfo.rtoZoneCode];
										});
					            	result = true;
					            } 
							});
							if(result) {
								return false;
							}else{
								return true;
							}
						};
					}
					$scope.updateModel = function(model) {
						$scope.model = false;
						$scope.subModel = true;
						$scope.modelname = model.name;
						$scope.modelCode = model.code;
						$scope.vehicleInfo.model = model;
						getSubModelList(model.code);
					}
					function getSubModelList(modelCode) {
						VehicleService
								.getMakeSubmodelFromRestUrl()
								.then(
										function(response) {
											if (!angular
													.isUndefined(response.data.modelSubModelMap[modelCode])) {
												$scope.submodelsList = response.data.modelSubModelMap[modelCode];
											}
										});
					}
					$scope.updateSubModel = function(subModel) {

						$scope.vehicleInfo.fuelType = subModel.fuelType;
						$scope.vehicleInfo.engineCC = subModel.engineCC;
						$scope.vehicleInfo.year = subModel.year;
						$scope.vehicleInfo.seatingCapacity = subModel.seatingCapacity;

						$scope.model = false;
						$scope.subModel = false;
						$scope.vehicleInfo.subModel = subModel;
						$scope.vehicleInfo.modelSubModel = $scope.modelname
								+ "," + subModel.subModelName + ","
								+ subModel.seatingCapacity;
					}
					$scope.showCarOwnerShip = function() {
						if (angular
								.isUndefined($scope.vehicleInfo.prevPolicyExpDate)
								|| angular.equals('',
										$scope.vehicleInfo.prevPolicyExpDate)
								|| !$scope.isNoPolicy) {
							$scope.vehicleInfo.isCarOwnerChanged = '';
							$scope.vehicleInfo.isAnyClaim = '';
							return false;
						} else {
							return true;
						}
					}
					$scope.isNoPolicy = function() {
						if (angular.equals('NO POLICY',
								$scope.vehicleInfo.policyType.code)) {
							return false;
						} else {
							return true;
						}
					}

					$scope.ncbValue = function() {
						if (angular.equals('THIRDPARTY',
								$scope.vehicleInfo.policyType.code)) {
							return false;
						} else {
							return true;
						}
					}

					$scope.resetValue = function() {
						$scope.vehicleInfo.previousPolicyInsurer = '';
						$scope.vehicleInfo.prevPolicyExpDate = '';
						$scope.vehicleInfo.currentNCB = '';
						$scope.isCarOwnerChanged = '';
						$scope.isAnyClaim = '';

					};

					$scope.resetclaim = function() {
						$scope.vehicleInfo.isAnyClaim = '';
						$scope.vehicleInfo.ncb = '';
						$scope.vehicleInfo.currentNCB = '';
					}
					
					
					
					
					$scope.aadharNoError=false;
					$scope.aadharValidate=function(){
						
						var aadhar1Length=(angular
								.isUndefined($scope.personalInfo.aadhaarNo1) ? 0
										: $scope.personalInfo.aadhaarNo1.toString().length);
						var aadhar2Length=(angular
								.isUndefined($scope.personalInfo.aadhaarNo2) ? 0
										: $scope.personalInfo.aadhaarNo2.toString().length);
						var aadhar3Length=(angular
								.isUndefined($scope.personalInfo.aadhaarNo3) ? 0
										: $scope.personalInfo.aadhaarNo3.toString().length);
						
						console.log("aadhar1Length"+(aadhar1Length+aadhar2Length+aadhar3Length));
						if(($scope.personalInfo.aadhaarNo1=='0000' ||
								$scope.personalInfo.aadhaarNo2=='0000'||
								$scope.personalInfo.aadhaarNo3=='0000')||
								(((aadhar1Length+aadhar2Length+aadhar3Length)>0) && ((aadhar1Length+aadhar2Length+aadhar3Length)<12))||
								((aadhar1Length>0 && aadhar1Length<4)||
										(aadhar2Length>0 && aadhar2Length<4) ||
										(aadhar3Length>0 && aadhar3Length<4))){
							
							$scope.aadharNoError=true;
							
						}else{
							$scope.aadharNoError=false;
						}
					}
					$scope.submit = function(event, form) {

						
						var aadharNoLength = (angular
								.isUndefined($scope.personalInfo.aadhaarNo1) ? 0
								: $scope.personalInfo.aadhaarNo1.toString().length)
								+ (angular
										.isUndefined($scope.personalInfo.aadhaarNo2) ? 0
										: $scope.personalInfo.aadhaarNo2
												.toString().length)
								+ (angular
										.isUndefined($scope.personalInfo.aadhaarNo3) ? 0
										: $scope.personalInfo.aadhaarNo3
												.toString().length);
						
//						alert("$scope.form.$valid::::" + $scope.form.$valid
//								+ ":aadharNoLength:" + aadharNoLength);
						var vehRegNo = $scope.vehicleInfo.regNo1.toString().length
								+ $scope.vehicleInfo.regNo2.toString().length
								+ $scope.vehicleInfo.regNo4.toString().length;
						
						
						if (($scope.form.$valid) && (aadharNoLength==0 ||aadharNoLength==12)
								&& (vehRegNo == 8) && ($scope.vehicleInfo.regNo4!='0000')&&($scope.personalInfo.aadhaarNo1!='0000' || $scope.personalInfo.aadhaarNo2!='0000'||$scope.personalInfo.aadhaarNo3!='0000')
								&& !$scope.isInValidRto) {
							StorageService.set("personalInfo",$scope.personalInfo);
							StorageService.set("vehicleInfo",$scope.vehicleInfo);
							CoverageService.removeAll();
							PremiumCalculationService.multipleInsurerPremiumCalc('0').then(function(response) {
								if (response.data.message === "SUCCESS") {
									var data={
											"makeCode":$scope.vehicleInfo.manufacturer.code,
											"modelCode" :$scope.vehicleInfo.model.code,
											"rtoCode":$scope.vehicleInfo.rtoZoneCode,
											"productCode":$scope.productCode
										}
									InsurerService.setPreferredInsurerList(data).then(function(response) {
											$state.go('premiumComparision');
										},function(error) {
											console.error('failure loading preferrdInsurer');
										});				
									} else {
										alert("Premium Calculation Failed");
									}
								},function(errorResponse) {
									alert("Premium Calculation Failed(MIS)");
								});
						}
					};

					$scope.Thirdparty = function() {
						if (angular.equals('THIRDPARTY',
								$scope.vehicleInfo.policyType.code)) {
							return false;
						} else {
							return true;
						}
					}
					$scope.isCarOwnerChangedFun = function() {
						if (angular.equals('THIRDPARTY',
								$scope.vehicleInfo.policyType.code)) {
							return false;
						} else if (angular.equals('COMPREHENSIVE',
								$scope.vehicleInfo.policyType.code)
								&& $scope.dayDifference < 91) {
							return true;
						}
					}

					$scope.Comprehensive = function() {
						if (angular.equals('COMPREHENSIVE',
								$scope.vehicleInfo.policyType.code)) {
							return false;
						} else {
							return true;
						}
					}

					$scope.dateSelect = function(user) {
						var currentDate = moment(new Date());
						var prevPolicyExpDate = moment(user, "DD/MM/YYYY");
						$scope.dayDifference = currentDate.diff(
								prevPolicyExpDate, 'days', true);
					}

					$scope.patternAadharNumber = (function() {

						return {
							test : function(value) {
								if ($scope.requirePhoneNumber === false) {
									return true;
								}
								//alert(regexp.test(value));
								return regexp.test(value);
							}
						};
					});
					function validateRegex(value){
						var regexp = /^[0-9]*$/;
						if(regexp.test(value) && value.length === 4){
							return true;
						}else{
							return false;
						}
					}
				    var newStartDates = new Date();
					$scope.$watch('vehicleInfo.prevPolicyExpDate', function (newValue, oldValue) {
						if($scope.vehicleInfo.prevPolicyExpDate != null && $scope.vehicleInfo.prevPolicyExpDate !=''){
						$scope.minDates = moment(new Date(newStartDates)).format('DD/MM/YYYY');
						var a = moment(newValue,"DD/MM/YYYY");
						var c = moment($scope.minDates,"DD/MM/YYYY"); 
						var days = a.diff(c, 'days');
						if(days>0){		
						var b = moment(newValue, "DD/MM/YYYY");
						$scope.vehicleInfo.policyStartDate = b.add(1, 'days').format('DD/MM/YYYY');
						}else{
							$scope.vehicleInfo.policyStartDate = c;
						}
					}else{
						$scope.vehicleInfo.policyStartDate='';
						}
					});
					$scope.$watch('vehicleInfo.policyStartDate', function (newValue, oldValue) {
						if($scope.vehicleInfo.policyStartDate != null && $scope.vehicleInfo.policyStartDate !=''){
								var b = moment(newValue, "DD/MM/YYYY");
								$scope.vehicleInfo.policyEndDate = b.add(1, 'year').format('DD/MM/YYYY');
						}else{
							$scope.vehicleInfo.policyEndDate='';
						}
					});
					
					$scope.autoDate = function() {
						if (angular.equals('NO POLICY',$scope.vehicleInfo.policyType.code)) {
							   var noPolicyStartDt='';
							    noPolicyStartDt = moment(new Date(newStartDates)).format('DD/MM/YYYY');
							   $scope.vehicleInfo.policyStartDate=noPolicyStartDt;						}
					}
					
					
					$scope.policystartdatehide = function() {
							var starthidedate = $scope.vehicleInfo.prevPolicyExpDate;
							var b = moment(starthidedate, "DD/MM/YYYY");
							$scope.minstartDate = b.add(1, 'days').format(
							'DD/MM/YYYY');
					}
					
					
					$scope.resetdate = function() {
						$scope.vehicleInfo.prevPolicyExpDate = '';
						$scope.vehicleInfo.registrationDate='';
						/*var selectedDate = $scope.vehicleInfo.registrationDate;	
						if(null!=selectedDate && ''!=selectedDate){
							var selectedYear = $scope.vehicleInfo.yearOfMfg;	
							
							var b = moment(selectedDate, "DD/MM/YYYY").year();
							if(b<selectedYear){
								$scope.vehicleInfo.registrationDate='';
							}
						}*/
					} 
				});
