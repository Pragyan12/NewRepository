
POTApp.service('tempService', function() {
	var formData = {}
	return {
		set : set,
		get : get,
		remove : remove,
		removeAll : removeAll,
		getAll : getAll
	}
	function get(key) {
		return formData[key];
	}
	function getAll() {
		return formData;
	}
	function set(key, value) {
		formData[key] = value;
	}

	function remove(key) {

	}
	function removeAll() {
		formData = {};
	}
	
});