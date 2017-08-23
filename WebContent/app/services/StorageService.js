POTApp.factory('StorageService', function() {
	var formData = {'productName':'Motor Insurance','productcode':'Motor','subProductCode':'PCC','subProductName':'PRIVATE CAR','personalInfo':{'title':'MR.','firstName':'DDFFDSF','lastName':'DSFDFD','dob':'01/07/1999','address1':'FDGFDGFD','address2':'','address3':'','isEnableAreaEdit':'','city':'CHENNAI','area':'KODAMBAKKAM','pincode':'600014','mobileNo':'8987978978','alterMobileNo':'','panNo':'DFGFG3454R','std':'','phonealt':'','email':'MMM@GMAIL.COM','alterEmail':''},'vehicleInfo':{'vehicleRegisteredTo':{'name':'INDIVIDUAL','code':'CUSTOMER_INDIVIDUAL'},'policyType':{'name':'COMPREHENSIVE','code':'COMPREHENSIVE'},'manufacturer':{'name':'ASHOK LEYLAND','code':'AKL'},'modelSubModel':'STILE,LX Captain Alloy,7','registrationDate':'01/07/2017','rtoCode':{'rtoLocation':'CHENNAI','rtoCode':'CHE','effectiveStartDate':'01-01-2017','effectiveEndDate':'01-01-2020','status':'ACTIVE','createdBy':null,'createdDate':null,'lastModifiedDate':null,'lastModifiedBy':null,'message':null},'fuelType':'DIESEL','ZoneArea':'ZONE A','engineCC':'1461','yearOfMfg':2017,'previousPolicyInsurer':{'insurerCode':'101','imagePath':'images/new/101.png','insurerName':'ADITYA BIRLA HEALTH INSURANCE CO. LIMITED'},'prevPolicyExpDate':'02/07/2017','ncb':'','currentNCB':'','isInBuilt':false,'isCarOwnerChanged':'Y','isAnyClaim':'','regNo1':'DD','regNo2':'33','regNo3':'DD','regNo4':'3333','year':'1900','seatingCapacity':'7','model':{'name':'STILE','code':'MD000001','$$hashKey':'object:485'},'subModel':{'subModelCode':'SM00000001','subModelName':'LX Captain Alloy','fuelType':'DIESEL','engineCC':'1461','seatingCapacity':'7','year':'1900','$$hashKey':'object:487'}},'quoteNo':'1000003020','premiumInfo':{'insurerCode':'104','imagePath':'images/new/104.png','insurerName':'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD.','premiumDetails':{'quoteNo':'1000000377','insurerCode':'104','actualIdv':475000,'vehicleAge':0.04,'tariffDiscountRate':0,'tariffDiscountAmt':0,'totalOdPremium':15594.25,'totalTPPremium':2963,'ncb':null,'addonCoverPremium':0,'premiumWithoutAddon':18557.25,'commissionPremium':null,'netPremium':18557.25,'taxAmount':null,'grossPremium':21897.56,'status':'SUCCESS','errorDescriptions':null,'coverDetails':{'TPL':{'code':'TPL','rate':-99999,'flat':2863,'rateType':'FLAT','premium':2863,'type':null,'deductibleAmt':null,'sumInsuredAmt':null,'coverElements':[],'coverVariables':null,'coverClauses':null},'OD':{'code':'OD','rate':3.283,'flat':-99999,'rateType':'RATE','premium':15594.25,'type':'OD','deductibleAmt':null,'sumInsuredAmt':null,'coverElements':[],'coverVariables':null,'coverClauses':null},'CPA':{'code':'CPA','rate':-99999,'flat':100,'rateType':'FLAT','premium':100,'type':'ADDITIONAL','deductibleAmt':null,'sumInsuredAmt':null,'coverElements':[],'coverVariables':null,'coverClauses':null,'name':'Compulsory Personal Accident','$$hashKey':'object:1492'}},'insurerElements':[{'code':'TARIFF_DISCOUNT_RATE','value':0},{'code':'TARIFF_DISCOUNT_AMT','value':0},{'code':'TOTAL_OD_PREMIUM','value':15594.25},{'code':'TOTAL_LIABILITY_PREMIUM','value':2963}],'insurerVariables':null,'insurerClauses':null,'listOfTax':[{'nameOfTax':'servicetax','rate':17,'amount':3154.73},{'nameOfTax':'krish kalayan','rate':0.5,'amount':92.79},{'nameOfTax':'swach bharath','rate':0.5,'amount':92.79}]}},'additionalCoverList':[{'code':'CPA','rate':-99999,'flat':100,'rateType':'FLAT','premium':100,'type':'ADDITIONAL','deductibleAmt':null,'sumInsuredAmt':null,'coverElements':[],'coverVariables':null,'coverClauses':null,'name':'Compulsory Personal Accident','$$hashKey':'object:1492'}],'addonCoverList':[],'paymentInfo':{'bankCode':{'bankName':'A P JANATA CO-OP URBAN BANK SECUNDERABAD','bankCode':'B0001','effectiveStartDate':'01-01-2017','effectiveEndDate':'01-01-2020','status':'ACTIVE','createdBy':null,'createdDate':null,'lastModifiedDate':null,'lastModifiedBy':null,'message':null},'branchName':'DSFDFDS','chequeNo':'676765','chequeDate':'01/07/2017','chequeAmt':'21897.56','favourOff':'FDGFDGFD','paymentMode':'Offline Payment','adjust_to_pay_amount':''},'vehicleHrefLink':true,'additionalVehicleInfo':{'registrationNo':'','engineNo':'CVCXVCXV','chassisNo':'CXVXCVXCV','prevInsurer':'','prevPolicyNo':'XCVCXVCXVCX','sameAsAboveAddressFlag':true,'address1':'FDGFDGFD','address2':'','address3':'','city':'CHENNAI','area':'KODAMBAKKAM','pincode':'600014','isEnableAreaEdit':''},'nomineeHrefLink':true,'nomineeFinancierInfo':{'nomineeName':'XCVCXVX','nomineeDOB':'','nomineeRelationShip':{'relationshipName':'FATHER','insuredCode':'FT','nomineeCode':'NFT','effectiveStartDate':'01-01-2017','effectiveEndDate':'01-01-2020','status':'ACTIVE'},'guardianName':'XCVCXV','guardianDOB':'','guardianRelationship':{'relationshipName':'FATHER','insuredCode':'FT','nomineeCode':'NFT','effectiveStartDate':'01-01-2017','effectiveEndDate':'01-01-2020','status':'ACTIVE'},'financierName':'','financierCity':'','dob':'01/04/2017','gdob':'01/07/1999'},'inspectionHrefLink':true,'inspectionInfo':{'inspectionRequired':'','inspectBy':'','inspectionType':'','inspecDate':'15/07/2017','inspecTime':'08:00 PM','comments':'CXVCXVCX','inspectionReason':'BREAK-IN','inspectionInformation':'Y','inspectionBy':'SELF'}}
	//var formData={};
	
	return {
		set: set,
		get: get,
		remove : remove,
		removeAll:removeAll,
		getAll:getAll
	}
	function get(key){     
	    return formData[key];
	}
	function getAll(){     
	    return formData;
	}
	function set(key, value){
		formData[key] = value;
	}
	
	function remove(key){
		
	}
	function removeAll(){
		formData = {};
	}
});