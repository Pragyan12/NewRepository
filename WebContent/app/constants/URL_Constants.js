POTApp.constant('UrlConstants', {

	MASTER_URL : 'http://server1:8585/masters/api/',
	//MASTER_URL : 'http://localhost:9080/masters/api/',
	//MASTER_URL : 'http://fapmdm.azurewebsites.net/api/',
	//MASTER_URL : 'http://fasmaster.azurewebsites.net/api/',

	// ///////////////// MASTER SERVER/CLOUD - JSON
	// //////////////////////////
	VIEW_ALL_COVERAGE : 'viewAllCoverages.json',
	GET_ALL_RELATIONSHIP : 'getallrelationship.json',
	GET_ALL_FINANCIER_NAME : 'getallfinanciername.json',
	GET_INSURER_DETAILS : 'getInsurerDetails.json',
	GET_RTOCODE_FOR_ZONALMAPPING : 'getrtocodeforzonalmapping.json',
	GET_ALL_MAPPED_INSURER : 'getAllMappedInsurer.json?productCode=PCC',
	GET_RTO_ZONAL_MAPPING : 'getrtozonalmapping.json',
	
//	GET_MAKE : 'getMake.json',
//	GET_MAKE_MODEL : 'getMakeModel.json',
//	GET_MODEL_SUBMODEL : 'getModelSubModel.json',
	
	GET_MAKE : 'getMakes.json',
	GET_MAKE_MODEL : 'getModelByMake.json',
	GET_MODEL_SUBMODEL : 'getSubModelByModel.json',
	
	GET_ALL_NCB_TYPE : 'getallncbtype.json',	
	
	GET_ALL_TITLE : 'getalltitle.json',
	//GET_ALL_CITY : 'getallcity.json',
	
	GET_ALL_CITY:'getCityAndState.json',
	
	GET_PINCODE_BY_AREA : 'getPincodeByArea.json?areaCode=',
	GET_ALL_BANK_MASTER : 'getallbankmaster.json',
	GET_AREA_BY_CITY : 'getAreaByCity.json?cityCode=',

	LIST_COVERAGE_DETAILS_SUMINSURED : 'getCoverageList.json?productCode=',
	LIST_COVERAGE_DETAILS : 'viewAllCoverages.json?productCode=',

	GET_BUSINESS_TYPE : 'getBusinessType.json',
	//DOCUMENT_LIST : 'documents.json',
	
	DOCUMENT_TYPES: 'documents.json?productCode=PCC',
	
	GET_PREFERRED_INSURER_DETAILS : 'getPreferredInsurer.json',

	//MIS_CLOUD : 'http://localhost:9080/mis/',
	MIS_CLOUD : 'http://server1:8585/mis/',
	//MIS_CLOUD:'http://fapmis.azurewebsites.net/mis/',
	//MIS_CLOUD : 'http://fasmis1.azurewebsites.net/',
	// MIS_CLOUD : 'http://localhost:9080/mis/',
	// MIS_CLOUD : 'http://fasmisserv.azurewebsites.net/',
	// MIS_CLOUD : 'http://fasmis.azurewebsites.net/',

	// //////////////// MIS SERVER URLS ///////////////
	UPDATE_ENRICHMENT : 'updateEnrichment.json',
	GET_POLICY_DETAILS : 'getPolicyDetails.json?quoteNo=',
	MULTIPLE_INS_PREMIUM_CALC : 'multipleInsurerCalc.json',
	PERSIST_POLICY : 'persistPolicy.json',
	SINGLE_INS_PREMIUM_CALC : 'singleInsurerCalc.json?insurerCode=',
	SINGLE_IDV_EDIT_CALC : 'idvEdit.json?insurerCode=',
	POLICY_START_DATE : 'fetchQuoteByQuoteNo.json?quoteNo=',
	SEARCH_IN_POLICY : 'searchInPolicy.json',

	//DMS_URL : 'http://localhost:9080/dms/api/',
	DMS_URL : 'http://server1:8585/dms/api/',
	//DMS_URL : 'http://fasdmsserver.azurewebsites.net/api/',
	//DMS_URL : 'http://fapmdm.azurewebsites.net/dms/api/',
	// //////////DMS REST Service Name//////////
	DOCUMENT_UPLOAD : 'uploadDoc.json',
	DOCUMENT_DOWNLOAD : 'download.json',
	DMS_DOCUMENT_DOWNLOAD : 'documentDownload.json?urlParam=',
	DOCUMENT_PREVIEW : 'documentPreview.json?quoteNo=',
	// //////////DMS REST Service Name//////////

	// Other Rest URLS
	LOADING_URL : 'http://localhost:8080/digital/loading.json',
	REDIRECT_TEST_URL : 'http://localhost:8080/digital/redirectTest.json',
	//LOGIN_URL : 'http://fassecurity.azurewebsites.net/login',
	
	LOGIN_SECURITY_URL : 'http://fapmdm.azurewebsites.net/security/login',
	
	
});
