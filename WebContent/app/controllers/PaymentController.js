POTApp.controller('PaymentController',function($state, $scope, StorageService, PaymentService,$window,CoverageService,RatingConstants,PersonalInfoService,$filter) {
					var self = this;
					$scope.bankMasterdtoList = [];
					$scope.disaplePayment = false;
					fetchAllProduct();
					var paymentDetail = StorageService.get('paymentInfo');
					$scope.premiumInfo = StorageService.get('premiumInfo');
					$scope.personalInfo = StorageService.get("personalInfo");
					$scope.vehicleInfo = StorageService.get("vehicleInfo");
					$scope.productCode = StorageService.get("subProductCode");
					$scope.currentDate = new Date();

					 $scope.adjustedPayOutError='';
	                 $scope.adjustedPayOutErrorIsVisible=false;
	                    
					$scope.showAdditionalCover = true;
					$scope.showAddonCover = true;
					$scope.showDiscount = true;
					$scope.chequeAmt = '';
					 $scope.prop = {header: "Ugly tooltip", body: "some content"};
					 
//					 $scope.minChequeDate = moment().subtract(30,'days').format('DD/MM/YYYY');

					if (angular.isUndefined(paymentDetail)) {

						$scope.paymentInfo = {
							bankCode : '',
							branchName : '',
							chequeNo : '',
							chequeDate : '',
							chequeAmt : $scope.premiumInfo.premiumDetails.grossPremium.toFixed(2),
							favourOff : '',
							paymentMode : '',
							adjust_to_pay_amount : ''


						};
					} else {
						$scope.paymentInfo = paymentDetail;

					}

					$scope.resetPayment = function() {
						$scope.paymentInfo.branchName = '';
						$scope.paymentInfo.chequeNo = '';
						$scope.paymentInfo.favourOff = '';
						$scope.paymentInfo.bankCode = '';
						$scope.paymentInfo.chequeDate = '';
						$scope.paymentInfo.adjust_to_pay_amount='';
						$scope.adjuseToPayEnabled='';
					}
					/*$scope.showCheque1 = false;
					$scope.cheque_show1 = function() {
						if ( $scope.showCheque1)
							{
							$scope.showCheque1 = false;
							}
						else{
								$scope.showCheque1 = true;
						}
						
					}
					//$scope.chequeAmtPlus=false;
					$scope.cheque_amtShow=function(){
						if($scope.premiumInfo.premiumDetails.grossPremium<=$scope.paymentInfo.chequeAmt)
							{
							$scope.showCheque1 = false;
							return true;
							}
						else{
							$scope.showCheque1 = true;
							return false;
							
						}
					}
					$scope.make_payment=function(){
						if($scope.premiumInfo.premiumDetails.grossPremium<=$scope.paymentInfo.chequeAmt)
							{
							return true;
							}
						else{
							return false;
						}
					}*/
					
					
					 $scope.adjuseToPayAmt=0;
					$scope.amount = function() {
						$scope.adjuseToPayAmt=(($scope.paymentInfo.chequeAmt)/10);
                        if (!$scope.adjuseToPayEnabled) {  
                        	
                          $scope.paymentInfo.chequeAmt = angular.copy(totalpremium);
                        } else {
                          $scope.paymentInfo.chequeAmt = angular.copy(totalpremium);
                          $scope.paymentInfo.adjust_to_pay_amount='';
                        }
                    };
                    
                    $scope.adjuseToPayAmtError=false;
                    $scope.adPayAmt=function(){
                    	
                    	if(angular.isUndefined($scope.paymentInfo.adjust_to_pay_amount)){
                    		$scope.adjuseToPayAmtError=false;
                    	}else if($scope.paymentInfo.adjust_to_pay_amount<=$scope.adjuseToPayAmt){
                    		$scope.adjuseToPayAmtError=false;
                    	}else{
                    		$scope.adjuseToPayAmtError=true;
                    	}
                    }
					
					function fetchAllProduct() {
						PaymentService
								.fetchAllBankDetails()
								.then(
										function(d) {
											$scope.bankMasterdtoList = d.data.bankMasterdtoList;
										},
										function(error) {
											$log.error('failure loading movie',
													error);
										});
					}

					$scope.resetBankBranch = function() {
						$scope.paymentInfo.branchName = '';

					};
					

					$scope.adjuseToPay = function() {
						return true;
					}
					
					   
					var totalpremium=$scope.premiumInfo.premiumDetails.grossPremium;
					
					CoverageService.getCoverageList($scope.productCode).then(function(d) {
						$scope.additionalCoverList = CoverageService.getCoverDetails(RatingConstants.ADDITIONAL,$scope.premiumInfo.premiumDetails.coverDetails,d);
						$scope.addonCoverList = CoverageService.getCoverDetails(RatingConstants.ADDON,$scope.premiumInfo.premiumDetails.coverDetails,d);
						$scope.discountCoverList = CoverageService.getCoverDetails(RatingConstants.DISCOUNTS,$scope.premiumInfo.premiumDetails.coverDetails,d);
						StorageService.set('additionalCoverList',$scope.additionalCoverList);
						StorageService.set('addonCoverList',$scope.addonCoverList);
					},function(errResponse) {
						console.error('Error while fetching Users');
					});
					
					var chequeAmount=$scope.paymentInfo.chequeAmt;
					$scope.paymentInfo.adjust_to_pay_amount;
					$scope.paymentInfo.chequeAmt;
					
					/*$scope.chequeAmountCheck = function() {
						var chequeAmount=(angular
								.isUndefined($scope.paymentInfo.chequeAmt) ? 0
										: $scope.paymentInfo.chequeAmt);
						var chequeAmount1=(angular
								.isUndefined($scope.paymentInfo.chequeAmount1) ? 0
										: $scope.paymentInfo.chequeAmount1);
						
					};*/
					
					$scope.payNow = function(event, form) {
						event.preventDefault();
						form.$setSubmitted();
						
					$scope.adj=$scope.paymentInfo.adjust_to_pay_amount;
                     $scope.cheque=$scope.paymentInfo.chequeAmt;
                     var addedvalue=parseFloat($scope.adj)+ parseFloat($scope.cheque);
                     
						if ($scope.form.$valid
								&& $scope.paymentInfo.chequeNo.toString().length == 6 ) {
							StorageService.set('paymentInfo',$scope.paymentInfo);
							PaymentService.callServerforOfflinePayment().then(function(response) {
								
							if($scope.adjuseToPayEnabled && $scope.paymentInfo.adjust_to_pay_amount > 0 && addedvalue ==totalpremium){
								$state.go('personalInfo');
								if (this.status === "SUCCESS") {
									$state.go('personalInfo');
								}
							}else if(!$scope.adjuseToPayEnabled){
								StorageService.set('paymentInfo',$scope.paymentInfo);
								$state.go('personalInfo');
								if (this.status === "SUCCESS") {
									$state.go('personalInfo');
								}
							}else{
								 $scope.adjustedPayOutError='Adjust to pay out Amount Greater than zero and equal to Total Premium';
				                 $scope.adjustedPayOutErrorIsVisible=true;
							}
							});
							} 
					};
				
					$scope.test = angular.isUndefined(StorageService.get("vehicleInfo").currentNCB) ? false: StorageService.get("vehicleInfo").currentNCB === '' ? false: true;
					
					/*$scope.disaplePayment = false;
					$scope.termsAndConditionsCheck = function() {
						$scope.disaplePayment = true;

					}*/
					var details = StorageService.getAll();

					$scope.goNextPage = function() {
						$scope.data={
								
								firstName :$scope.personalInfo.firstName,
								lastName:$scope.personalInfo.lastName,
								quoteNo: $scope.premiumInfo.premiumDetails.quoteNo,
								grossPremiumWithAddons :"12333" 
						}
						PaymentService.paymentDetails($scope.data).then(function(response){
			            var requestUrl=response.data.onlinePaymentDto.requestUrl;
			            $window.location.href = 'http://server1:8585/digital/redirectURL?name='+requestUrl;
						});
						}
					var quoteNo = $scope.premiumInfo.premiumDetails.quoteNo;
					PaymentService.fetchPolicyStartDate(quoteNo).then(function(response){
						var policyStartDate = response.data.QuotationData.insceptionDate;
						$scope.minChequeDate = moment(policyStartDate, "DD/MM/YYYY");
						 $scope.minChequeDate = moment().subtract(30,'days').format('DD/MM/YYYY');
						 $scope.maxChequeDate = moment().subtract(0, 'day').format('DD/MM/YYYY');
					});
					
					
					$scope.getBank=function(bank){
						if($scope.paymentInfo.branchName!='' ||$scope.paymentInfo.branchName != null ){
							$scope.paymentInfo.branchName='';
						}
						return getApplicableBankList(bank);	
					}
					/*$scope.getBank1=function(bank){
						if($scope.paymentInfo.branchName1!='' ||$scope.paymentInfo.branchName1 != null ){
							$scope.paymentInfo.branchName1='';
						}
						return getApplicableBankList(bank);	
					}*/
					
					
					function getApplicableBankList(bank){
						var newTemp= $filter("filter")($scope.bankMasterdtoList, {bankName:bank});
						if(newTemp.length===0){
							return true;
						}else{
							var result= false;
							angular.forEach(newTemp, function(value, key){
								if(value.bankName === bank){
								$scope.responseBank = {
										resBankcode : newTemp[0].bankCode,
										resBankname : newTemp[0].bankName
								}
								StorageService.set('responseBank',$scope.responseBank);
					            	result = true;
					            } 
							});
							if(result) {
								return false;
							}else{
								return true;
							}
						}
					}
					
				});
