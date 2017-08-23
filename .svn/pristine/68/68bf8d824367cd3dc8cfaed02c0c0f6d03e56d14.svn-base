POTApp.factory('InsurerComparision', function(INSURER_LIST) {
	var premiumComparision = {};
	return {
		setInsurer : setInsurer,
		getInsurer : getInsurer
	}
	function setInsurer(insurerCode, insurerValues) {
		var insurerCompare = {};
		insurerCompare = {
			'insurerImge' : insurerValues.imgSrc,
			'idv' : insurerValues.actualIdv,
			'premium' : insurerValues.grossPremium
		};
		premiumComparision[insurerCode] = insurerCompare;
	}
	function getInsurer() {
		return premiumComparision;
	}

});
