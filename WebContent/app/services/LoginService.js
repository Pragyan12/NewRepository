POTApp.factory('LoginService', function($http, $q) {
	var factory = {

		loginValidate : loginValidate

	}

	return factory;

	function loginValidate(username, password) {
		var flag = false;

		if (username === 'FAS' && password === 'FAS') {

			flag = true;

		} else {

			alert("Invalid User Name and Password");
			flag = false;
		}

		return flag;
	}

});
