POTApp
		.controller(
				'NomineeFinancierController',
				function($scope, $state, NomineeFinancierServices, $filter,
						PersonalInfoService, StorageService) {
					
					$scope.nomineeActive=true;
					
					
					
					var vehicleHrefLinkDetails = StorageService.get('vehicleHrefLink');
					$scope.vehicleHrefLink=false;
					if(angular.isDefined(vehicleHrefLinkDetails)){
						$scope.vehicleHrefLink=true;
					}
					
					var nomineeHrefLinkDetails = StorageService.get('nomineeHrefLink');
					$scope.nomineeHrefLink=false;
					if(angular.isDefined(nomineeHrefLinkDetails)){
						$scope.nomineeHrefLink=true;
					}
					
					var inspectionHrefLinkDetails = StorageService.get('inspectionHrefLink');
					$scope.inspectionHrefLink=false;
					if(angular.isDefined(inspectionHrefLinkDetails)){
						$scope.inspectionHrefLink=true;
					}
					var documentHrefLinkLinkDetails = StorageService.get('documentHrefLink');
					$scope.documentHrefLink = false;
					if (angular.isDefined(documentHrefLinkLinkDetails)) {
						$scope.documentHrefLink = true;
					}

					NomineeFinancierServices
							.getNomineeRelationship()
							.then(
									function(response) {
										$scope.relationship = response.data.partyRelationshipDtoList;

									});
					NomineeFinancierServices
							.getGuardianRelationship()
							.then(
									function(response) {
										$scope.guardianRelation = response.data.partyRelationshipDtoList;

									});

					$scope.cityMasterdtoList = getlistOfCities();
					function getlistOfCities() {
						PersonalInfoService
								.getlistOfCities()
								.then(
										function(d) {
											$scope.cityMasterdtoList = d.data.cityMasterdtoList;
										},
										function(error) {
											$log.error('failure loading movie',
													error);
										});

					}
					$scope.getcity = function(city) {
						var newTemp = $filter("filter")(
								$scope.cityMasterdtoList, {
									cityName : city
								});
						if (newTemp.length === 0) {
							return true;
						} else {
							var result = false;
							angular.forEach(newTemp, function(value, key) {
								if (value.cityName === city) {
									result = true;
								}
							});
							if (result) {
								$scope.arealist = getlistOfAreas(newTemp[0].cityCode);
								return false;
							} else {
								return true;
							}
						}
					}

					$scope.financierNames = [];
					var nomineeFinancierDetails = StorageService
							.get('nomineeFinancierInfo');

					var vehicleDetails = StorageService.get('vehicleInfo');
					
					if (angular.isUndefined(nomineeFinancierDetails)) {
						$scope.nomineeFinancierInfo = {
							nomineeName : '',
							nomineeDOB : '',
							nomineeRelationShip : '',
							guardianName : '',
							guardianDOB : '',
							guardianRelationship : '',
							financierName : '',
							financierCity : ''
						};
						$scope.vehicleInfo = {
								vehicleRegisteredTo:angular.isUndefined(vehicleDetails.vehicleRegisteredTo.name) ? '' : vehicleDetails.vehicleRegisteredTo.name
							};
					} else {
						$scope.nomineeFinancierInfo = nomineeFinancierDetails;
						$scope.vehicleInfo = {
								vehicleRegisteredTo:angular.isUndefined(vehicleDetails.vehicleRegisteredTo.name) ? '' : vehicleDetails.vehicleRegisteredTo.name
							};
					}

					// $scope.goInspectionPage = function() {
					// StorageService.set('nomineeFinancierInfo',
					// $scope.nomineeFinancierInfo);
					//
					// $state.go('inspectionInfo');
					// };
					$scope.minAgeNomineeDob = moment().subtract(90, 'day')
							.format('DD/MM/YYYY');
					$scope.minAgeDob = moment().subtract(18, 'year').format(
							'DD/MM/YYYY');
					$scope.maxAgeDisplay = moment().subtract(100, 'year')
					.format('DD/MM/YYYY');
					$scope.showdp = false;
					$scope.showdp1 = false;
					$scope.today = function() {
						$scope.dt = new Date();
					};
					$scope.monthformat = "MM/yyyy";
					$scope.dateformat = "dd/MM/yyyy";
					$scope.today();
					$scope.showcalendar = function($event) {
						$scope.showdp = true;
					};

					$scope.showcalendar1 = function($event) {

						$scope.showdp1 = true;

					};
					$scope.dateBirthValue = function() {
						var selectedDate = $scope.nomineeFinancierInfo.dob;	
						var a = moment(new Date());
						var b = moment(selectedDate, "DD/MM/YYYY");
						$scope.age = a.diff(b, 'years', true);
						if($scope.age < 18 && b.isValid() && $scope.nomineeFinancierInfo.gdob==''){
							//alert('Guardian Date of Birth Should be greater than 18'+$scope.nomineeFinancierInfo.gdob);
							$scope.nomineeFinancierInfo.gdob = '';
							$scope.showdp1 = false;
							$scope.guardianage = $scope.age;
						}else{
							$scope.showdp1 = true;
						}
					};

					// validate
					$scope.goInspectionPage = function(e, form) {
						e.preventDefault();
						form.$setSubmitted();

						if (form.$valid) {
							StorageService.set('nomineeFinancierInfo',
									$scope.nomineeFinancierInfo);
							
							
							$scope.inspectionHrefLink=true;
							StorageService.set("inspectionHrefLink",$scope.inspectionHrefLink);
							
							$state.go('inspectionInfo');
							

						}
					}
					$scope.goVehicleInfoPage = function() {
						StorageService.set('nomineeFinancierInfo',
								$scope.nomineeFinancierInfo);
						$state.go('vehicleInfo');
					}

					NomineeFinancierServices
							.getFinancierList()
							.then(
									function(response) {
										// alert("inside controller
										// "+JSON.stringify(response));

										$scope.financierNames = response.data.financierNameDto;

									});
					function getlistOfAreas(cityCode) {
						var listOfAreas = [];
						PersonalInfoService.getAreaByCity(cityCode).then(
								function(d) {
									listOfAreas = d.data.areaMasterdtoList;
								}, function(error) {
									$log.error('failure loading movie', error);
								});
						return listOfAreas;
					}

				});
