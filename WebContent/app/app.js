var POTApp = angular.module('POTApp', [ 'ui.router','ngAnimate', 'ui.bootstrap', 'angular-loading-bar','moment-picker', 'angular-cache','base64']);

POTApp.directive('stringOnly', function() { 
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        if(!ngModelCtrl) {
          return; 
        }

        ngModelCtrl.$parsers.push(function(val) {
          if (angular.isUndefined(val)) {
              var val = '';
          }
          var clean = val.replace(/[^a-zA-Z ]/g, '');
          var decimalCheck = clean.split('.');

          if(!angular.isUndefined(decimalCheck[1])) {
              decimalCheck[1] = decimalCheck[1].slice(0,2);
              clean =decimalCheck[0] + '.' + decimalCheck[1];
          }

          if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
          }
          return clean;
        });

       /*
		 * element.bind('keypress', function(event) { if(event.keyCode === 32) {
		 * event.preventDefault(); } });
		 */
      }
    };
  })

// pan
POTApp.directive('panRegex', function () {
	var regex,result,special,digit;
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(value) {
                result="";
                regexp = /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/;
                if (!regexp.test(value)) {
			                	if(value.length<=5){
			                		result = value.replace(/[^a-zA-Z]/gi,'');
			                	}
			                	 if(value.length>5 && value.length<=10)
			                    	{
			                		 	var splitString = value.substr(0,5);
			                		 	result = splitString; 
			                    		for(var i=5;i<=value.length-1;i++)
			                    			{
			                    					result = value.substr(0,value.length-1);
			                    					ngModelCtrl.$setViewValue(result);
			                    					return result;
			                    				
			                    			}// for
				                    	ngModelCtrl.$setViewValue(result);
				                    	ngModelCtrl.$render();
			                    	}// end of digit if
					                    ngModelCtrl.$setViewValue(result);
					                	ngModelCtrl.$render();
					                    return result;
					                }else{
					                	ngModelCtrl.$setViewValue(value);
					                	result=value;
					                }
                				
                ngModelCtrl.$render();
	                return result;
            }// outer if
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


POTApp.directive('aadharRegex', function () {
	var regex,result,special,digit;
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(value) {
                result="";
                regexp = /^([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9]([0-9])?)?)?)?)?)?)?)?)?)?)?)?$/;
                if (!regexp.test(value)) {
					                    ngModelCtrl.$setViewValue(result);
					                	ngModelCtrl.$render();
					                    return result;
					                }else{
					                	ngModelCtrl.$setViewValue(value);
					                	result=value;
					                }
                				
                ngModelCtrl.$render();
	                return result;
            }// outer if
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

POTApp.directive('validateEmail', function() {
	  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*[@{1}][a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
	  return {
	    link: function(scope, elm) {
	      elm.on("keyup",function(){
	            var isMatchRegex = EMAIL_REGEXP.test(elm.val());
	            if( isMatchRegex&& elm.hasClass('warning') || elm.val() == ''){
	              alert("error");
	            }else if(isMatchRegex == false && !elm.hasClass('warning')){
	            	// alert("error");
	            }
	      });
	    }
	  }
	});


POTApp.directive('validationEmail', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/, '');
                  if(transformedInput.match(/@/g)){
                	  var transformedInputLength=transformedInput.match(/@/g).length;  
                	 
                	  if(transformedInputLength>1){
                		  
                      	transformedInput=transformedInput.replace(/@/g,'');
                      	 
                      }
                  }
               
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                else{

                }
               
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


// pin code validate
POTApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                else{
// alert("Please enter only numbers");
                }
                // return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


POTApp.directive("preventTypingGreater", function() {
	  return {
		  require: 'ngModel',
	    link: function(scope, element, attributes) {
	      var oldVal = null;
	      element.on("keydown keyup", function(e) {
	    if (Number(element.val()) > Number(attributes.max) &&
	          e.keyCode != 46 // delete
	          &&
	          e.keyCode != 8 // backspace
	        ) {
	          e.preventDefault();
	          element.val(oldVal);
	        } else {
	          oldVal = Number(element.val());
	        }
	      });
	    }
	  };
	});



POTApp.directive('allowNumbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


// forces keystrokes that satisfy the regExp passed
POTApp.directive("alphaRegex", function() {

    var regexp;
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            regexp = /^[a-z]*$/;
            var char;
            elem.bind("keypress", function(event) {
                char = String.fromCharCode(event.which)
                if(!regexp.test(elem.val() + char))
                    event.preventDefault();
            })
        }
    }

});

// Jitu - 23.6.17 //
POTApp.directive('onlyString', function () {
        var regex,result,transformedText;
        return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(value) {
                    regexp = /^[A-Za-z]+$/;
                    
                if (!regexp.test(value)) {
                    result = value.replace(/[^a-zA-Z]/g, '');
                    
                    ngModelCtrl.$setViewValue(result);
                        ngModelCtrl.$render();
                    return result;
                }else{
                        if(value.length<=50){
                                
                                ngModelCtrl.$setViewValue(value);
                                result=value;
                        }else{
                                result = value.substr(0,50);
                                ngModelCtrl.$setViewValue(result);
                        }
                }
                ngModelCtrl.$render();
                return result;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
        
    
});


// DIV
POTApp.directive('onlyStrNo', function () {
    var regex,result,transformedText;
    return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(value) {
                regexp = /^[A-Za-z0-9/\&/./,/ ]+$/;
                
            if (!regexp.test(value)) {
                result = value.replace(/[^A-Za-z0-9/\&/./,/ ]/g, '');
                
                ngModelCtrl.$setViewValue(result);
                    ngModelCtrl.$render();
                return result;
            }else{
                    if(value.length<=50){
                            
                            ngModelCtrl.$setViewValue(value);
                            result=value;
                    }else{
                            result = value.substr(0,50);
                            ngModelCtrl.$setViewValue(result);
                    }
            }
            ngModelCtrl.$render();
            return result;
        }            
        ngModelCtrl.$parsers.push(fromUser);
    }
};
    

});

POTApp.directive('noSpecialChar', function() {
	
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == undefined)
            return ''
          cleanInputValue = inputValue.replace(/[^a-zA-Z0-9/\&/.-]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
  });
POTApp.directive('notAllowSpecial', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == null)
            return ''
          cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
  });


//
// mobile num
POTApp.directive('numericRegex', function () {
	var regex,result;
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(value) {
            	regexp = /^([7-9])([0-9]){0,9}$/;
            	var space = /\s/g;
                if (!regexp.test(value)) {
                    result = value.replace(/[^\d]/gi,'');
                    if(/\d/gi.test(result) && !regexp.test(result))
                    	{
	                    	result = value.replace(/[\d\s]/gi,'');
	                    	ngModelCtrl.$setViewValue(result);
	                    	ngModelCtrl.$render();
                    	}
                    ngModelCtrl.$setViewValue(result);
                	ngModelCtrl.$render();
                    return result;
                }else{
                	ngModelCtrl.$setViewValue(value);
                	result=value;
                }
                ngModelCtrl.$render();
                return result;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
//

// POTApp.directive("numericRegex", function() {
//
// var regexp;
// return {
// restrict: "A",
// link: function(scope, elem, attrs) {
// regexp = /^([7-9])([0-9]){0,9}$/;
// var char;
// elem.bind("keypress", function(event) {
// char = String.fromCharCode(event.which)
// if(!regexp.test(elem.val() + char))
// event.preventDefault();
// })
// }
// }
//
// });
// STD
POTApp.directive("stdCode", function() {
	var regexp;
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {
        	ngModel.$parsers.push(function(value){
        		var inputvalue = value;
        		regexp = /^([0])([0-9]){0,9}$/;
        		
        		if(!regexp.test(inputvalue))
        			{
        			ngModel.$setViewValue('');
            		ngModel.$render();
        			}
        		return inputvalue;
            });
           }
      };
});

POTApp.directive("telephoneNo", function() {
	var regexp;
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {
        	ngModel.$parsers.push(function(value){
        		var inputvalue = value;
        		regexp = /^([1-9])([0-9]){0,9}$/;
        		
        		if(!regexp.test(inputvalue))
        			{
        			ngModel.$setViewValue('');
            		ngModel.$render();
        			}
        		return inputvalue;
            });
           }
      };
});

// register no:
POTApp.directive("regNo", function() {

    var regexp;
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            regexp = /^([a-zA-Z]([a-zA-Z]([0-9]([0-9]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9])?)?)?)?)?)?)?)?)?)?$/;
            var char;
            elem.bind("keypress", function(event) {
                char = String.fromCharCode(event.which)
                if(!regexp.test(elem.val().toUpperCase() + char.toUpperCase()))
                    event.preventDefault();
            })
        }
    }

});
 // uppercase
POTApp.directive('capitalize', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        if (inputValue == undefined) inputValue = '';
        var capitalized = inputValue.toUpperCase();
        if (capitalized !== inputValue) {
          modelCtrl.$setViewValue(capitalized);
          modelCtrl.$render();
        }
        return capitalized;
      }
      modelCtrl.$parsers.push(capitalize);
      capitalize(scope[attrs.ngModel]); // capitalize initial value
    }
  };
});


// payment summery
POTApp.directive("chequeNo", function() {
	var regexp;
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {
        	ngModel.$parsers.push(function(value){
        		var inputvalue = value;
        		regexp = /^([0-9]){0,6}$/;
        		
        		if(!regexp.test(inputvalue))
        			{
        			ngModel.$setViewValue('');
            		ngModel.$render();
        			}
        		return inputvalue;
            });
           }
      };
});

POTApp.directive("chequeAmount", function() {
	var regexp;
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {
        	ngModel.$parsers.push(function(value){
        		var inputvalue = value;
        		regexp = /^([0-9]){0,9}$/;
        		
        		if(!regexp.test(inputvalue))
        			{
        			ngModel.$setViewValue('');
            		ngModel.$render();
        			}
        		return inputvalue;
            });
           }
      };
});

POTApp.directive("moveNextOnMaxlength", function() {
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                if(element.val().length == element.attr("maxlength")) {
                    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
});


POTApp.directive('areaValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) { 
                    var transformedInput = text.replace(/[^a-zA-Z0-9/\ .-/,]/gi, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});




POTApp.directive("limitToMax", function() {
	  return {
	    link: function(scope, element, attributes) {
	      element.on("keydown keyup", function(e) {
	    if (Number(element.val()) > Number(attributes.max) &&
	          e.keyCode != 46 // delete
	          &&
	          e.keyCode != 8 // backspace
	        ) {
	          e.preventDefault();
	          element.val(attributes.max);
	        }
	      });
	    }
	  };
	});
/*
 * POTApp.run( ['$rootScope', '$state', '$stateParams', function ($rootScope,
 * $state, $stateParams) { $rootScope.$state = $state; $rootScope.$stateParams =
 * $stateParams; } ]);
 */
POTApp.config(function(cfpLoadingBarProvider,$stateProvider, $locationProvider, $urlRouterProvider,$injector,$httpProvider) {
	$httpProvider.defaults.cache = true;
	cfpLoadingBarProvider.includeSpinner=true;
	$urlRouterProvider.otherwise(function($injector){
		  $injector.invoke(['$state', function($state) {
		     $state.go('login');			 
			  //$state.go('personalInfo');
		  }]);
		}); 
	
	
	$locationProvider.html5Mode(false).hashPrefix('');
	$stateProvider.state('login', {
		url : "/",
		views : {
			"body" : {
				templateUrl : 'views/login.html',
				controller : 'LoginController'
			},
			"footer" : {
				templateUrl : 'views/footer.html'
			}
		}
	}).state('product', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/product.html',
				controller : 'ProductController'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('subProduct', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/subProduct.html',
				controller : 'SubProductController'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('basicQuoteInfo', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/basicQuoteInfo.html',
				controller : 'BasicQuoteInfo'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('search', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/subProduct.html',
				controller : 'SubProductController'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('premiumComparision', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/premiumComparision.html',
				controller : 'PremiumComparision'
			},"footer" : {
				templateUrl : 'views/footer.html',
			},
			'coverages@premiumComparision': { 
				templateUrl : 'views/coverages.html'
            },
		}
	}).state('premiumSummary', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/premiumSummary.html',
				controller : 'PaymentController'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('onlinePaymentResponse', {
		url :"/OnlinePaymentResponse?msg&quoteNo",
		views : {
			"body" : {
				controller : 'OnlinePaymentResponse'
			}
		}
	}).state('personalInfo', {
		
        views : {
        	'customer_header@personalInfo':
        	{ 
        		templateUrl : 'views/customer_header.html' 
        },
        	"header" : {
                templateUrl : 'views/header.html',
                controller : 'HeaderController'
            },
            "body" : {
                templateUrl : 'views/personalInfo.html',
                controller : 'PersonalInfoController'
            },
            "footer" : {
                templateUrl : 'views/footer.html'
            }
        }
    })
    .state('vehicleInfo', {
        views : {
        	'customer_header@vehicleInfo':
        	{ 
        		templateUrl : 'views/customer_header.html' 
        },
        	"header" : {
                templateUrl : 'views/header.html',
                controller : 'HeaderController'
            },
            "body" : {
                templateUrl : 'views/additionalVehicleInfo.html',
                controller : 'AdditionalVehicleInfo'
            },
            "footer" : {
                templateUrl : 'views/footer.html'
            }
        }
    })
    .state('nomineeFinancierInfo', {
        views : {
        	'customer_header@nomineeFinancierInfo':
        	{ 
        		templateUrl : 'views/customer_header.html' 
        },
        	"header" : {
                templateUrl : 'views/header.html',
                controller : 'HeaderController'
            },
            "body" : {
                templateUrl : 'views/nomineeFinancierInfo.html',
                controller : 'NomineeFinancierController'
            },
            "footer" : {
                templateUrl : 'views/footer.html'
            }
        }
    })
    .state('inspectionInfo', {
        views : {
        	'customer_header@inspectionInfo':
        	{ 
        		templateUrl : 'views/customer_header.html' 
        },
        	"header" : {
                templateUrl : 'views/header.html',
                controller : 'HeaderController'
            },
            "body" : {
                templateUrl : 'views/InspectionInfo.html',
                controller : 'InspectionController'
            },
            "footer" : {
                templateUrl : 'views/footer.html'
            }
        }
    }).state('premiumSummaryFinal', {
        views : {
        	/*
			 * 'customer_header@premiumSummaryFinal': { templateUrl :
			 * 'views/premiumSummaryFinal.html' },
			 */
        	"header" : {
                templateUrl : 'views/header.html',
                controller : 'HeaderController'
            },
            "body" : {
                templateUrl : 'views/premiumSummaryFinal.html',
                controller : 'PremiumSummaryFinal'
            },
            "footer" : {
                templateUrl : 'views/footer.html'
            }
        }
    }).state('searchpage', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/search.html',
                controller : 'SearchController'

			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	})
	.state('documentupload1', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/documentupload1.html',
				controller : 'DocumentUpload',
				css: 'css/documentupload.css'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('documentupload', {
		views : {
			
			'customer_header@documentupload':
        	{ 
        		templateUrl : 'views/customer_header.html' 
        },
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/documentupload.html',
				controller : 'DocumentUpload',
				css: 'css/documentupload.css'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('documentpreview', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/documentpreview.html',
				controller : 'DocumentPreview'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	}).state('documentuploadfinal', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/documentuploadfinal.html',
				controller : 'DocumentUploadFinal'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	})
	.state('autopopulate', {
		views : {
			"header" : {
				templateUrl : 'views/header.html',
				controller : 'HeaderController'
			},
			"body" : {
				templateUrl : 'views/autopopulate.html',
				controller : 'AutoPopulate',
				css: 'css/autopopulate.css'
			},"footer" : {
				templateUrl : 'views/footer.html',
			}
		}
	});
});








var StacktraceService = function() {}
StacktraceService.prototype.print = function($window, exception) {
  return $window.printStackTrace({
    e: exception
  });
};
POTApp.service('stacktraceService', StacktraceService);

POTApp.config(function($provide) {
  // $provide provider is used to register the components in angular internally.

  // use decorator to customise the behaviour of a service. 
  $provide.decorator('$exceptionHandler', ['$delegate', '$window', 'stacktraceService', function($delegate, $window, stacktraceService) {

    // exception: exception associated with the error
    // cause: optional information about the context in which the error was thrown.

    return function(exception, cause) {

      // $delegate: provides the original service to the method which is used to call the base implementation
      // of $exceptionHandler service which internally delegates to $log.error.
      $delegate(exception, cause);
      
      var stacktrace = stacktraceService.print($window, exception);
      var errorUrl='http://server1:8585/dms/clientLog.json';
      
      var clientSideErrorInfo = {
        cause: cause || '', // the cause of the issue
        message: exception.message, // the message in the exception
        url: $window.location.href, // the location in the browser's address bar when error occurred
        stacktrace: stacktrace.join('\n') // join array items to populate a string
      };

      console.log(clientSideErrorInfo.stacktrace);
      
      // the angular $http service cannot be used in the $log 
      // decorator because it will cause a circular dependecy.
      // to overcome this  a direct ajax call should be made.
      $.ajax({
        type: 'POST',
        url: errorUrl, // this is the server end-point where you can log this error
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(clientSideErrorInfo)
      });

    };

  }]);

});

POTApp.factory(
	    "applicationLoggingService",
	    ["$log","$window",function($log, $window){
	    	var errorUrl="http://server1:8585/dms/errorLog.json";
	        return({
	            error: function(message){
	            	
	                // preserve default behaviour
	                $log.error.apply($log, arguments);
	                // send server side
	                $.ajax({
	                    type: "POST",
	                    url: errorUrl,
	                    contentType: "application/json",
	                    data: angular.toJson({
	                        url: $window.location.href,
	                        message: message,
	                        type: "error"
	                    })
	                });
	            },
	            debug: function(message){
	                $log.log.apply($log, arguments);
	                $.ajax({
	                    type: "POST",
	                    url: errorUrl,
	                    contentType: "application/json",
	                    data: angular.toJson({
	                        url: $window.location.href,
	                        message: message,
	                        type: "debug"
	                    })
	                });
	            },
	            
	            info: function(message){
	                $log.log.apply($log, arguments);
	                $.ajax({
	                    type: "POST",
	                    url: errorUrl,
	                    contentType: "application/json",
	                    data: angular.toJson({
	                        url: $window.location.href,
	                        message: message,
	                        type: "info"
	                    })
	                });
	            },
	            
	            warn: function(message){
	                $log.log.apply($log, arguments);
	                $.ajax({
	                    type: "POST",
	                    url: errorUrl,
	                    contentType: "application/json",
	                    data: angular.toJson({
	                        url: $window.location.href,
	                        message: message,
	                        type: "warn"
	                    })
	                });
	            }
	        });
	    }]
	);





