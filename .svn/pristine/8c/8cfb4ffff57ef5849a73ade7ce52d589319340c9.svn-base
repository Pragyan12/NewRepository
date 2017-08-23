		POTApp
				.controller(
						'DocumentUpload',
					function($scope, $http, $element, fileService, tempService,
							documentListFactory, uploadDocFactory, errorService,
							$state, StorageService, InspectionServices,
							quotationNoService, applicationLoggingService) {
		
		var arr, fileType, fileContent, isErrorOccured;
		$scope.documentFiles = {};
		$scope.documentFilesWithSize = {};
		$scope.stepsModel = [];
		$scope.img_section = true;
		
		$scope.documentuploadActive=true;
		
		var vehicleHrefLinkDetails = StorageService.get('vehicleHrefLink');
		$scope.vehicleHrefLink = false;
		if (angular.isDefined(vehicleHrefLinkDetails)) {
			$scope.vehicleHrefLink = true;
		}
		
		var inspectionHrefLinkDetails = StorageService.get('inspectionHrefLink');
		$scope.inspectionHrefLink = false;
		if (angular.isDefined(inspectionHrefLinkDetails)) {
			$scope.inspectionHrefLink = true;
		}
		
		var nomineeHrefLinkDetails = StorageService.get('nomineeHrefLink');
		$scope.nomineeHrefLink = false;
		if (angular.isDefined(nomineeHrefLinkDetails)) {
			$scope.nomineeHrefLink = true;
		}
		
		var documentHrefLinkLinkDetails = StorageService.get('documentHrefLink');
		$scope.documentHrefLink = false;
		if (angular.isDefined(documentHrefLinkLinkDetails)) {
			$scope.documentHrefLink = true;
		}
		
		
		
		$(window).on("resize", function() {
		var h = $('.img_col').css("height");
		$('.add_update').css("height", h);
		});
		$(document).ready(function() {
			$(".proof_row .img_col:not(:first-child)").addClass("delete_span");
			var test = $('.img_col').css("height");
			$('.add_update').css("height", test);
			
			//return set value.
			angular.forEach($scope.documentFiles, function(v, k){
				if(v != "" ){
					try{
						document.getElementById(k).checked = true;
					}
					catch(e){
					    //catch and just suppress error
					}
					
				}
			});
		});
		/*//preview section
			$scope.preview = function(e, form) {
				alert("HELLO");
				$scope.showpreview = true;
		//		e.preventDefault();
		//		form.$setSubmitted();
		//		$("body").addClass('previewoverflow');
		//		if (form.$valid) {
		//			StorageService.set('documentupload', $scope.documentuploads);
		//			$scope.showpreview = true;
		//			$scope.formData = StorageService.getAll();
		//		}
			};*/
		
		
		/*imageUploadGetServ();*/
		
		$scope.stepsModel = [];
		$scope.img_section = true;
		
		$(window).on("resize", function() {
			var h = $('.img_col').css("height");
			$('.add_update').css("height", h);
			var zoom = $(window).height();
			$('#zoomsection').height(zoom);
		
		});
		$(document).ready(function() {
			$(".proof_row .img_col:not(:first-child)")
					.addClass("delete_span");
			var test = $('.img_col').css("height");
			$('.add_update').css("height", test);
			var zoom = $(window).height();
			$('#zoomsection').height(zoom);
			var docu = $('.docment_row').height();
			$('.document_name_height').css("height", docu);
		});
		
		/* START OF PREVIEW IMAGE ZOOM SECTION */
		$scope.showzoomimage = function(imgSrc) {
			$scope.imgopen = true;
			$('body').addClass("bodyscrollhidden");
			$('.preview_popup_main').addClass("bodyscrollhidden");
			//console.log(imgSrc);
			$("#zoomsection img").attr('src', imgSrc);
		};
		$scope.closezoomicon = function() {
			$scope.imgopen = false;
			$('body').removeClass("bodyscrollhidden");
			$('.preview_popup_main')
					.removeClass("bodyscrollhidden");
		
		};
		/* END OF PREVIEW IMAGE ZOOM SECTION */
		
		imageUploadGetServ();
		
		// preview section
		$scope.preview = function(e, form) {
		
			isErrorOccured = 0;
			errorService.removeAll();
			
			// validation
			if(angular.isUndefined($scope.documentUploadsImg)){
				alert("invalid submit.");
				return;
			}
			
			angular.forEach($scope.documentUploadsImg, function(
					val, key) {
				// val.documentName, val.documentCode, val.mandatory
				if (val.mandatory == true) {
					
					angular.forEach($scope.documentFiles, function(
							base64Arr, docName) {
						if (val.documentName == docName) {
							
							if (base64Arr == "") {
								isErrorOccured = 1;
								errorService.set(val.documentName, val.documentName + " is not valid");
							}
						}
					});
				}
			});
			
			if (isErrorOccured == 1) {
				$scope.errors = errorService.getAll();
				return;
			}
		
			/*
			 * alert(form.$valid); form.$setSubmitted();
			 * $("body").addClass('previewoverflow'); if
			 * (form.$valid) {
			 */
			$('body').addClass("bodyscrollhidden");
			submit();
			StorageService.set('documentupload', $scope.documentuploads);
			$scope.showpreview = true;
			$scope.formData = StorageService.getAll();
			// console.log("datA"+JSON.stringify($scope.formData));
			// }
		};
		
		$scope.clkShow = function(item, bool, docName) {
			if (bool == true) {
				$scope.documentUploadsImg[item].mandatory = true;
			} else {
				$scope.documentUploadsImg[item].mandatory = false;
				$scope.documentFiles[docName] = [];
			}
		}
		
		$scope.add = function(modName) {
			$scope.tmpFiles = modName;
			$("input[type='file']").val("");
		};
		
		$scope.remove = function(removeFiles, $index) {
			$scope.documentFiles[removeFiles].splice($index, 1);
			$scope.documentFilesWithSize[removeFiles].splice(
					$index, 1);
		};
		
		$scope.img_section = true;
		$scope.imageUpload = function(event) {
			var files = event.target.files; // FileList object
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var reader = new FileReader();
				reader.onload = $scope.imageIsLoaded;
				reader.readAsDataURL(file);
			}
		
			$scope.img_section = false;
		
		};
		
		$scope.imageIsLoaded = function(e) {
			$scope.$apply(function() {
				var result = e.target.result;
				var arr = result.split("base64,")
				$scope.pdfOrOther = arr[0];
				var array = arr[0];
				var forVal = array.replace("data:", "");
				if( notAllowedFormat(changeDocType(forVal)) == true || arr[0] == "data:" || arr[0] == "data:;" || arr[0] == ""){
					alert("Incorrect uploaded format.");
					return;
				}
				
				$scope.documentFiles[$scope.tmpFiles].push(e.target.result);
				$scope.documentFilesWithSize[$scope.tmpFiles].push(e.target.result + "$$$$" + e.total);
			});
		};
		
		function submit() {
		
			fileService.removeAll();
			// $('body').addClass("bodyscrollhidden");
		
			angular.forEach($scope.documentFilesWithSize, function(
					base64Arr, docName) {
				// key =INSPECTION PHOTO
				tempService.removeAll();
				angular.forEach(base64Arr, function(base64, index) {
					// base64=ImagePath index=0
		
					arr = base64.split("base64,");
		
					fileType = changeDocType(arr[0].replace(
							"data:", ""));
					fileContent = arr[1].split("$$$$");
		
					tempService.set(fileContent[0], fileType + ","
							+ fileContent[1]);
				});
		
				if (base64Arr != "")
					fileService.set(docName, tempService.getAll());
			});
		
			$scope.formData = StorageService.getAll();
			var quoteNo = StorageService.get("quoteNo");
			quotationNoService.set("quoteNo", quoteNo);
			//console.log("quoteNo-From Doc Upload=" + quoteNo);
			$scope.quoteNoDms = quoteNo;
			tempService.removeAll();
			tempService.set(quoteNo, fileService.getAll());
			fileService.removeAll();
			fileService.set("dmsFileRequestDto", tempService
					.getAll());
		
			StorageService.set('documentuploadstorage', fileService
					.getAll());
		
		}
		;
		$scope.closepreviewfn = function() {
			$("body").removeClass('bodyscrollhidden');
		};
		
		$scope.submit = function() {
			$scope.formData = StorageService.getAll();
			$("body").removeClass('bodyscrollhidden');
//			console.log(JSON.stringify("FormData: "
//					+ $scope.formData));
			var quoteNo = StorageService.get("quoteNo");
		
			InspectionServices.saveEnrichmentDetails()
					.then(function(response) {
					if (response.data.message === "SUCCESS") {
					InspectionServices.getAllEnrichmentDetails(quoteNo)
							.then(function(response) {
					//	console.log("SERVER RESPONSE DATA:: "+ JSON.stringify(response.data));
						StorageService.set('policyDetails',response.data.responseData[0].PolicyDetails);
						StorageService.set('CustomerDetails',response.data.responseData[0].CustomerDetails);
						StorageService.set('VehicleDetails',response.data.responseData[0].VehicleDetails);
						StorageService.set('PaymentDetails',response.data.responseData[0].PaymentDetails[0]);
						StorageService.set('PreviousPolicyDetails',response.data.responseData[0].PreviousPolicyDetails);
						
						uploadDocFactory.uploadDoc()
								.then(function(response) {
							//console.log("FORM DATA:: " + JSON.stringify(StorageService.getAll()));

							if (response.data.status == "success") {
								//console.log("response in controller"+ JSON.stringify(response));
												$state.go('premiumSummaryFinal');
												// alert("success");
											} else {
												// $state.go('premiumSummaryFinal');
												alert("Sorry..Document upload fail");
												applicationLoggingService.error({
													message : quoteNo+"==>Sorry..Document upload fail==>Error."
												});

											}

										});
									},
									function(
											errorResponse) {
										alert("Persistance Failed-->"
												+ JSON
														.stringify(errorResponse));
										alert("Sorry..Document upload fail");
										applicationLoggingService.error({
											message : quoteNo+"==>Sorry..Persistance Failed==>Error."
										});
									});
				} else {
					alert("Persistance Failed");
					applicationLoggingService.error({
						message : quoteNo+"==>Sorry..Persistance Failed==>Error."
					});
				}
							},
							function(errorResponse) {
								alert("Persistance Failed----->"
										+ JSON
												.stringify(errorResponse));
								applicationLoggingService.error({
									message : quoteNo+"==>Sorry..Persistance Failed==>Error."
								});
							});
		
			// $$$$
			// console.log(JSON.stringify(fileService.getAll()));
		
		}

		var documentUploadDetails = StorageService.get('documentUploadTemp');
		
		function imageUploadGetServ() {
			$scope.formData = StorageService.getAll();
			
			documentListFactory.getDocumentList().then(function(response) {
				$scope.documentUploads = response.data.dtos;
				
				var policyType = $scope.formData.vehicleInfo.policyType.code;
//				var policyType = "COMPREHENSIVE";
				if(policyType == "COMPREHENSIVE" || policyType == "THIRDPARTY")
					angular.forEach($scope.documentUploads, function(v, k){
						console.log("val==>" + JSON.stringify(v) + "=key==>" + k);
						if(v.documentName == 'PREVIOUS POLICY COPY')
							$scope.documentUploads[k].mandatory = true;
					});
				
				
				$scope.documentUploadsImg = angular.copy($scope.documentUploads);
				angular.forEach($scope.documentUploads,function(value, key) {
					angular.forEach(value, function(value, key) {
						if (key == "documentName") {
							fileService.set(value, []);
						}
					});
				});
				
				
				
				if (angular.isDefined(documentUploadDetails)) {
					$scope.documentFiles = documentUploadDetails;
					
					var index = 0;
					angular.forEach(documentUploadDetails, function(v, k){
						
						if(v != ""){
							$scope.documentUploadsImg[index].mandatory = true;
						}
						
						
						index = index + 1;
					});
				}else{
					$scope.documentFiles = fileService.getAll();
				}
		
				$scope.documentFilesWithSize = angular.copy($scope.documentFiles);
				
			});
			
			
		}; 
		
		function notAllowedFormat(fileName){
			var vBool = false;
			switch (fileName) {
				case "txt":
					vBool = true;
					break;
				case "js":
					vBool = true;
					break;
				case "css":
					vBool = true;
					break;
				case "class":
					vBool = true;
					break;
				case "java":
					vBool = true;
					break;
				case "doc":
					vBool = true;
					break;
				case "docx":
					vBool = true;
					break;
				case "dotx":
					vBool = true;
					break;
				case "docm":
					vBool = true;
					break;
				case "dotm":
					vBool = true;
					break;
				case "xls":
					vBool = true;
					break;
				case "xlsx":
					vBool = true;
					break;
				case "xltx":
					vBool = true;
					break;
				case "xlsm":
					vBool = true;
					break;
				case "xltm":
					vBool = true;
					break;
				case "xlam":
					vBool = true;
					break;
				case "xlsb":
					vBool = true;
					break;
				case "ppt":
					vBool = true;
					break;
				case "potx":
					vBool = true;
					break;
				case "ppsx":
					vBool = true;
					break;
				case "ppam":
					vBool = true;
					break;
				case "pptm":
					vBool = true;
					break;
				case "ppsm":
					vBool = true;
					break;
				case "mdb":
					vBool = true;
					break;
				case "pptx":
					vBool = true;
					break;
				case "html":
					vBool = true;
					break;
				case "htm":
					vBool = true;
					break;
				case "exe":
					vBool = true;
					break;
			}
			
			return vBool;
		}
		
		function changeDocType(fileType) {
		
			switch (fileType) {
			case "image/jpg;":
				fileType = "jpg";
				break;
			case "image/jpeg;":
				fileType = "jpeg";
				break;
			case "image/png;":
				fileType = "png";
				break;
			case "image/gif;":
				fileType = "gif";
				break;
			case "text/plain;":
				fileType = "txt";
				break;
			case "application/pdf;":
				fileType = "pdf";
				break;
			case "application/postscript;":
				fileType = "ps";
				break;
			case "image/x-rgb;":
				fileType = "rgb";
				break;
			case "image/x-xpixmap;":
				fileType = "xpm";
				break;
			case "image/xpm;":
				fileType = "xpm";
				break;
			case "image/pict;":
				fileType = "pic";
				break;
			case "image/tiff;":
				fileType = "tiff";
				break;
			case "image/x-tiff;":
				fileType = "tiff";
				break;
			case "image/bmp;":
				fileType = "bmp";
				break;
			case "image/x-windows-bmp;":
				fileType = "bmp";
				break;
			case "application/msword;":
				fileType = "doc";
				break;
			// audio files
			case "audio/mpeg3;":
				fileType = "mp3";
				break;
			case "audio/x-mpeg-3;":
				fileType = "mp3";
				break;
			case "video/mpeg;":
				fileType = "mp3";
				break;
			case "video/x-mpeg;":
				fileType = "mp3";
				break;
			case "audio/wav;":
				fileType = "wav";
				break;
			case "audio/x-wav;":
				fileType = "wav";
				break;
			// videos
			case "video/mp4;":
				fileType = "mp4";
				break;
			case "video/avi;":
				fileType = "avi";
				break;
			case "video/x-flv;":
				fileType = "flv";
				break;
			case "video/mpeg;":
				fileType = "mpg";
				break;
			case "video/x-ms-wmv;":
				fileType = "wmv";
				break;
			case "video/quicktime;":
				fileType = "mov";
				break;
			case "video/3gpp;":
				fileType = "3gp";
				break;
			case "video/MP2T;":
				fileType = "ts";
				break;
			case "application/x-mpegURL;":
				fileType = "m3u8";
				break;
				
				//not allow type
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document;":
				fileType = "docx";
				break;
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.template;":
				fileType = "dotx";
				break;
			case "application/vnd.ms-word.document.macroEnabled.12;":
				fileType = "docm";
				break;
			case "application/vnd.ms-word.template.macroEnabled.12;":
				fileType = "dotm";
				break;
			case "application/vnd.ms-excel;":
				fileType = "xls";
				break;
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;":
				fileType = "xlsx";
				break;
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.template;":
				fileType = "xltx";
				break;
			case "application/vnd.ms-excel.sheet.macroEnabled.12;":
				fileType = "xlsm";
				break;
			case "application/vnd.ms-excel.template.macroEnabled.12;":
				fileType = "xltm";
				break;
			case "application/vnd.ms-excel.addin.macroEnabled.12;":
				fileType = "xlam";
				break;
			case "application/vnd.ms-excel.sheet.binary.macroEnabled.12;":
				fileType = "xlsb";
				break;
			case "application/vnd.ms-powerpoint;":
				fileType = "ppt";
				break;
			case "application/vnd.openxmlformats-officedocument.presentationml.presentation;":
				fileType = "pptx";
				break;
			case "application/vnd.openxmlformats-officedocument.presentationml.template;":
				fileType = "potx";
				break;
			case "application/vnd.openxmlformats-officedocument.presentationml.slideshow;":
				fileType = "ppsx";
				break;
			case "application/vnd.ms-powerpoint.addin.macroEnabled.12;":
				fileType = "ppam";
				break;
			case "application/vnd.ms-powerpoint.presentation.macroEnabled.12;":
				fileType = "pptm";
				break;
			case "application/vnd.ms-powerpoint.template.macroEnabled.12;":
				fileType = "pptm";
				break;
			case "application/vnd.ms-powerpoint.slideshow.macroEnabled.12;":
				fileType = "ppsm";
				break;
			case "application/vnd.ms-access;":
				fileType = "mdb";
				break;
				//not allowed
			case "application/javascript;":
				fileType = "js";
				break;
			case "text/html;":
				fileType = "html";
				break;
			case "text/htm;":
				fileType = "htm";
				break;
			case "application/x-msdownload;":
				fileType = "exe";
				break;
			case "text/css;":
				fileType = "css";
				break;
			case "application/java-vm;":
				fileType = "class";
				break;
			case "text/x-java-source,java;":
				fileType = "java";
				break;
			default:
				fileType = "file";
			}
			return fileType;
		};
		
		$scope.previewInspectionInfo = function(){
			StorageService.set('documentUploadTemp', $scope.documentFiles);
		};
		
		
		$scope.download = function(base64, filename) {
			  var element = document.createElement('a');
			  element.setAttribute('href', base64);
			  element.setAttribute('download', filename);

			  element.style.display = 'none';
			  document.body.appendChild(element);

			  element.click();
			  document.body.removeChild(element);
		}
		
	});
		
	POTApp.directive('showHideError', function() {
		return {
			link : function(scope, elem, attrs) {
				elem.bind('change', function() {
					elem.parent().find(".error").hide();
				});
		
			}
		};
	});
	
	
