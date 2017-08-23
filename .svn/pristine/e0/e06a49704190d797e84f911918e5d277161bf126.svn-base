function outputUpdate(vol) {
				document.querySelector('#volume').value = (vol+"%");
			}
$(document).ready(function(){

		 $('[data-toggle="tooltip"]').tooltip(); 
		//date format for reg,manu,prev
			$('.registration_date_calendar').datetimepicker({
				//language:  'fr',
				weekStart: 1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				forceParse: 0,
				format: 'dd/mm/yyyy'
			});
			
			//image animation at start
				$('.premium_insurer_row_list > div').each(function(i) {
				   delay =(i)*150;
				   setTimeout(function (div) {
					div.animate({ 
					opacity: '1.0'
					},'slow','easeOutBounce');
					}, delay, $(this));
				});
				
				//compare_preset
				var img_src="";var img_id="";var idv_value="";var idv_id="";var chk_length="";
				var arr_id=[];
				
				$('.compare_chkbox').on('click',function(e){
					
					if($('.premium_insurer_details input:checkbox:checked').length >= 1){
						$('.compare_premium_preset').show("fast");
					}else{
						$('.compare_premium_preset').hide("fast");
					}
					
					if($('.premium_insurer_details input:checkbox:checked').length >= 2){
						$('.compare_btn p').show("fast");
					}else{
						$('.compare_btn p').hide("fast");
					}
					
					
					if($('.premium_insurer_details input:checkbox:checked').length <= 3){
					if($(this).prop("checked") == true){
					chk_length = $('.premium_insurer_details input:checkbox:checked').length;
					
					
					 img_src = $(this).parents('.premium_insurer_row_list').find('.insurer_image_col .insurer_image img').attr('src');
					 img_id = $(this).parents('.premium_insurer_row_list').find('.insurer_image_col .insurer_image img').attr('id');
					$('.compare_premium_preset .row .image_compare_div').append("<div class='chk_img'><p><img class='img-responsive' src ="+img_src+" id="+img_id+"></p></div>");
					
					if(chk_length == 1){
						var dummy = $(this).parents('.premium_insurer_row_list').attr('id');
						
						arr_id[0]=dummy;
					}
					if(chk_length == 2){
						var dummy = $(this).parents('.premium_insurer_row_list').attr('id');
						
						arr_id[1]=dummy;
					}
					if(chk_length == 3){
						var dummy = $(this).parents('.premium_insurer_row_list').attr('id');
						
						arr_id[2]=dummy;
					}
					/*for(i=0;i<=2; i++){
					var ins_id = $(this).parent('.premium_insurer_row_list').attr('id');
					
						var arr_push = arr_id.push(ins_id);
						console.log(arr_push);
						console.log(arr_id[i]);
						}*/
						
					}
					else if($(this).prop("checked") == false){
					
						var img_idf = $(this).parents('.premium_insurer_row_list').find('img').attr('id');
						
						$(".image_compare_div div img").each(function(){
							if($(this).attr("id")== img_idf){
							$(this).parents('.chk_img').remove();
							}
					});
						
					}
					}
					else{
						alert("only three insurer can be compared");
						e.preventDefault();
					}
				});
				
				//compare_main
				$('.compare_btn').on('click',function(){
					
						//$("#addon_insurer_row").addClass('opacity_color');
				
					
					$(this).parents('.compare_premium_preset').hide();
					$('.compare_premium_main').show("fast"); 
					for(i=0; i<=chk_length-1;i++){
						 arr_id[i];
						
					}
						
					var img = [];var idv = [];var nil = [];var nil_name = [];var rsa = [];var rsa_name = [];var cons = [];var cons_name = [];
					var eng_prot = [];var eng_prot_name = [];var key_cov = [];var key_cov_name = [];var key_high = [];var key_high_name = [];
					var tyre_cov = [];var tyre_cov_name = [];var per_bel = [];var per_bel_name = [];var hos_cash = [];var hos_cash_name = [];
					var roi = [];var roi_name = [];var ncb_prot = [];var ncb_prot_name = [];var zd = [];var zd_name = [];var zdwvd = [];var zdwvd_name = [];
					var hos_assis = [];var hos_assis_name = [];var zd_excess = [];var zd_excess_name = [];var upa = [];var upa_name = [];var llc = [];var llc_name = [];
					var electrical = [];var electrical_name = [];var non_electrical = [];var non_electrical_name = [];var bi_fuel = [];var bi_fuel_name = [];
					var anti_theft = [];var anti_theft_name = [];var auto_assoc = [];var auto_assoc_name = [];var vol_detuct = [];var vol_detuct_name = [];
					var btn = [];
					$('.premium_insurer_details > div').each(function() {
					
					for(i=0; i<=chk_length-1;i++){
						arr_id[i];
						 
					if(($(this).attr('id'))== arr_id[i]){
					

						 img[i] = $(this).find('.insurer_image_col .insurer_image img').attr('src');
						 
						 idv[i] = $(this).find ('.calculated_values_inner p:nth-child(2) input').val();
						 btn[i] = $(this).find ('.hidden_btn_col button').html();
							
							nil_name[i] = $(this).find ('div.nil_depreciation p:nth-child(1)').html();
							nil[i] = $(this).find ('div.nil_depreciation p:nth-child(2)').text();
							
							rsa_name[i] = $(this).find ('div.roadside_assistance p:nth-child(1)').html();
							rsa[i] = $(this).find ('div.roadside_assistance p:nth-child(2)').text();
							
							cons_name[i] = $(this).find ('div.consumables p:nth-child(1)').html();
							cons[i] = $(this).find ('div.consumables p:nth-child(2)').text();
							
							eng_prot_name[i] = $(this).find ('div.engine_protect p:nth-child(1)').html();
							eng_prot[i] = $(this).find ('div.engine_protect p:nth-child(2)').text();
						
							key_cov_name[i] = $(this).find ('div.key_cover p:nth-child(1)').html();
							key_cov[i] = $(this).find ('div.key_cover p:nth-child(2)').text();
							
							key_high_name[i] = $(this).find ('div.Keyhigh_end p:nth-child(1)').html();
							key_high[i] = $(this).find ('div.Keyhigh_end p:nth-child(2)').text();
							
							tyre_cov_name[i] = $(this).find ('div.tyre_cover p:nth-child(1)').html();
							tyre_cov[i] = $(this).find ('div.tyre_cover p:nth-child(2)').text();
							
							per_bel_name[i] = $(this).find ('div.personal_belonging p:nth-child(1)').html();
							per_bel[i] = $(this).find ('div.personal_belonging p:nth-child(2)').text();
							
							hos_cash_name[i] = $(this).find ('div.hospital_cash p:nth-child(1)').html();
							hos_cash[i] = $(this).find ('div.hospital_cash p:nth-child(2)').text();
							
							roi_name[i] = $(this).find ('div.returnto_invoice p:nth-child(1)').html();
							roi[i] = $(this).find ('div.returnto_invoice p:nth-child(2)').text();
							
							ncb_prot_name[i] = $(this).find ('div.ncb_protect p:nth-child(1)').html();
							ncb_prot[i] = $(this).find ('div.ncb_protect p:nth-child(2)').text();
							
							zd_name[i] = $(this).find ('div.zero_depreciation p:nth-child(1)').html();
							zd[i] = $(this).find ('div.zero_depreciation p:nth-child(2)').text();
							
							zdwvd_name[i] = $(this).find ('div.zerodepreciationwd p:nth-child(1)').html();
							zdwvd[i] = $(this).find ('div.zerodepreciationwd p:nth-child(2)').text();
							
							hos_assis_name[i] = $(this).find ('div.hospital_assistance p:nth-child(1)').html();
							hos_assis[i] = $(this).find ('div.hospital_assistance p:nth-child(2)').text();
							
							zd_excess_name[i] = $(this).find ('div.zdexcess p:nth-child(1)').html();
							zd_excess[i] = $(this).find ('div.zdexcess p:nth-child(2)').text();
							
							upa_name[i] = $(this).find ('div.UnnamedPA p:nth-child(1)').html();
							upa[i] = $(this).find ('div.UnnamedPA p:nth-child(2)').text();
							
							llc_name[i] = $(this).find ('div.LegalLiability p:nth-child(1)').html();
							llc[i] = $(this).find ('div.LegalLiability p:nth-child(2)').text();
							
							electrical_name[i] = $(this).find ('div.electrical p:nth-child(1)').html();
							electrical[i] = $(this).find ('div.electrical p:nth-child(2)').text();
							
							non_electrical_name[i] = $(this).find ('div.non_electrical p:nth-child(1)').html();
							non_electrical[i] = $(this).find ('div.non_electrical p:nth-child(2)').text();
							
							bi_fuel_name[i] = $(this).find ('div.bifuelkit p:nth-child(1)').html();
							bi_fuel[i] = $(this).find ('div.bifuelkit p:nth-child(2)').text();
							
							anti_theft_name[i] = $(this).find ('div.anti_theft p:nth-child(1)').html();
							anti_theft[i] = $(this).find ('div.anti_theft p:nth-child(2)').text();
							
							auto_assoc_name[i] = $(this).find ('div.auto_mobile_assc p:nth-child(1)').html();
							auto_assoc[i] = $(this).find ('div.auto_mobile_assc p:nth-child(2)').text();
							
							vol_detuct_name[i] = $(this).find ('div.voluntary_deductible p:nth-child(1)').html();
							vol_detuct[i] = $(this).find ('div.voluntary_deductible p:nth-child(2)').text();

					}
					
					}

					
			});
			
			if(nil_name[0] == "Nil Depreciation"){
				$('.compare_col_nil').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_nil .row').append('<div class="col-xs-3">'+nil[i]+'</div>');	
						}
			}
			if(rsa_name[0] == "Road side assistance"){
				$('.compare_col_rsa').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_rsa .row').append('<div class="col-xs-3">'+rsa[i]+'</div>');	
						}
			}
			
			if(cons_name[0] == "Consumables"){
				$('.compare_col_cons').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_cons .row').append('<div class="col-xs-3">'+cons[i]+'</div>');	
						}
			}
			
			if(eng_prot_name[0] == "Engine Protect"){
				$('.compare_col_eng_prot').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_eng_prot .row').append('<div class="col-xs-3">'+eng_prot[i]+'</div>');	
						}
			}
			
			if(key_cov_name[0] == "Key Cover"){
				$('.compare_col_key_cov').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_key_cov .row').append('<div class="col-xs-3">'+key_cov[i]+'</div>');	
						}
			}
			if(key_high_name[0] == "Key High End"){
				$('.compare_col_key_high').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_key_high .row').append('<div class="col-xs-3">'+key_high[i]+'</div>');	
						}
			}
			if(tyre_cov_name[0] == "Tyre Cover"){
				$('.compare_col_tyre_cov').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_tyre_cov .row').append('<div class="col-xs-3">'+tyre_cov[i]+'</div>');	
						}
			}
			
			if(per_bel_name[0] == "Personal Belonging"){
				$('.compare_col_per_bel').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_per_bel .row').append('<div class="col-xs-3">'+per_bel[i]+'</div>');
						}
			}
			
			if(hos_cash_name[0] == "Hospital Cash"){
				$('.compare_col_hos_cash').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_hos_cash .row').append('<div class="col-xs-3">'+hos_cash[i]+'</div>');	
						}
			}
			
			if(roi_name[0] == "Return to Invoice"){
				$('.compare_col_roi').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_roi .row').append('<div class="col-xs-3">'+roi[i]+'</div>');	
						}
			}
			
			if(ncb_prot_name[0] == "NCB Protect"){
				$('.compare_col_ncb_prot').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_ncb_prot .row').append('<div class="col-xs-3">'+ncb_prot[i]+'</div>');	
						}
			}
			if(zd_name[0] == "Zero Depreciation"){
				$('.compare_col_zdD').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_zdD .row').append('<div class="col-xs-3">'+zd[i]+'</div>');	
						}
			}
			if(zdwvd_name[0] == "Zero depreciation without VD"){
				$('.compare_col_zdwvd').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_zdwvd .row').append('<div class="col-xs-3">'+zdwvd[i]+'</div>');	
						}
			}
			if(hos_assis_name[0] == "Hospital Assistance"){
				$('.compare_col_hos_assis').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_hos_assis .row').append('<div class="col-xs-3">'+hos_assis[i]+'</div>');	
						}
			}
			if(zd_excess_name[0] == "ZD with Excess"){
				$('.compare_col_zd_excess').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_zd_excess .row').append('<div class="col-xs-3">'+zd_excess[i]+'</div>');	
						}
			}
			if(upa_name[0] == "Unnamed PA"){
				$('.compare_col_upa').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_upa .row').append('<div class="col-xs-3">'+upa[i]+'</div>');	
						}
			}
			if(llc_name[0] == "Legal Liability Cover"){
				$('.compare_col_llc').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_llc .row').append('<div class="col-xs-3">'+llc[i]+'</div>');	
						}
			}
			if(electrical_name[0] == "Electrical"){
				$('.compare_col_electrical').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_electrical .row').append('<div class="col-xs-3">'+electrical[i]+'</div>');	
						}
			}
			if(non_electrical_name[0] == "Non-Electrical"){
				$('.compare_col_non_electrical').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_non_electrical .row').append('<div class="col-xs-3">'+non_electrical[i]+'</div>');	
						}
			}
			if(bi_fuel_name[0] == "Bi Fuel Kit"){
				$('.compare_col_bi_fuel').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_bi_fuel .row').append('<div class="col-xs-3">'+bi_fuel[i]+'</div>');	
						}
			}
			if(anti_theft_name[0] == "Anti-Theft"){
				$('.compare_col_anti_theft').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_anti_theft .row').append('<div class="col-xs-3">'+anti_theft[i]+'</div>');	
						}
			}
			if(auto_assoc_name[0] == "Auto mobile association members"){
				$('.compare_col_auto_assoc').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_auto_assoc .row').append('<div class="col-xs-3">'+auto_assoc[i]+'</div>');	
						}
			}
			if(vol_detuct_name[0] == "Voluntary Deductible"){
				$('.compare_col_vol_detuct').show();
					for(i=0; i<=chk_length-1;i++){
							$('.compare_col_vol_detuct .row').append('<div class="col-xs-3">'+vol_detuct[i]+'</div>');	
						}
			}
			
			
			for(i=0; i<=chk_length-1;i++){
							$('.compare_col_insurer .row').append('<div class="col-xs-3"><img class="img-responsive" src='+img[i]+'></div>');
							$('.compare_col_idv .row').append('<div class="col-xs-3">'+idv[i]+'</div>');
							$('.compare_col_premium .row').append('<div class="col-xs-3"><button class="btn">'+btn[i]+'</button></div>');
							
						}
			
			});	
				$('.main_compare_close').on('click',function(){
					if($(this).data('clicked',true)){
					$('.compare_premium_main_col div div').not('div:nth-child(1)').detach();
					$(this).parents('.compare_premium_main').hide();
					$('.premium_insurer_details input:checkbox:checked').prop("checked",false);
					$(".image_compare_div div").remove();
					}
					
				});
				
				//edit_idv
			$(".edit_idv .edit_idv_icon").on('click',function(){
				$(this).parents(".premium_insurer_row_list").find("p input").prop('readonly', false).addClass("idv_input");
				$(this).hide("fast");
				$(this).siblings(".save_idv_icon").show("fast");
				
			});
			
			$(".edit_idv .save_idv_icon").on('click',function(){
				$(this).parents(".premium_insurer_row_list").find("p input").prop('readonly', true).removeClass("idv_input");
				$(this).hide("fast");
				$(this).siblings(".edit_idv_icon").show("fast");
			});
			
			//adddon_cover
			
			$(".addon_list .checkbox").on('click','input[type="checkbox"]',function(){
				name="";
				titles="";
				values="";
				if($(this).prop("checked") == true){
					
					var name = $(this).attr("class");
					var titles = $(this).attr("data-title");
					var values = $(this).val();
						if(name =="UnnamedPA"){
						$('.unnamed_values').show("fast");
						}
						if(name =="bifuelkit"){
						$('.fuelkit_values').show("fast");
							$('.fuelkit_values input[type="radio"]').on('click',function(){
									alert($(this).val());
									if($(this).val()=="Addon"){
										$('.fuelkit_values_text').show();
									}
									else{
										$('.fuelkit_values_text').hide();
									}
							});
								
								
							
						}
						if(name =="electrical"){
						$('.electrical_values').show("fast");
						}
						if(name =="non_electrical"){
						$('.non_electrical_values').show("fast");
						}
						if(name =="voluntary_deductible"){
						$('.voluntary_deductible_values').show("fast");
						}
					$(".calculated_values").append("<div class="+name+"><p>"+titles+"</p><p>"+values+"</p></div>");
					
				}
				else if($(this).prop("checked") == false){
				
						var name = $(this).attr("class");
						if(name =="UnnamedPA"){
						$('.unnamed_values').hide("fast");
						}
						if(name =="bifuelkit"){
						$('.fuelkit_values').hide("fast");
						}
						if(name =="electrical"){
						$('.electrical_values').hide("fast");
						}
						if(name =="non_electrical"){
						$('.non_electrical_values').hide("fast");
						}
						if(name =="voluntary_deductible"){
						$('.voluntary_deductible_values').hide("fast");
						}
						$(".calculated_values div").each(function(){
							if($(this).attr("class")== name){
								$(this).remove();
							}
					});
					
				}
				
			});
			$(".addon_cover_total_list .addon_list .checkbox").on('click','input[type="checkbox"]',function(){
				if ($(".addon_cover_total_list  input:checkbox:checked").length > 0)
				{
					$(".val_btn").addClass("button_show");
					$(".val_btn").show();
					
				}
				else
				{
				   $(".val_btn").hide("slow");
				   
				}
			});
			
			$('.expand_more div').on('click',function(){
				$('.add_toggle').show("fast");
				$(this).parent('div').hide();
				$('.expand_less').show();
			});
			$('.expand_less div').on('click',function(){
				$('.add_toggle').hide("fast");
				$(this).parent('div').hide();
				$('.expand_more').show();
			});
			
			$('.edit_entire_idv').on('click',function(){
//				$('.idv_entire_range').toggle("fast");
			});
			
			$(".hidden_btn").mouseover(function(){
				$(this).addClass("hidden_btn_mouse");
				$(".val_btn").addClass("val_btn_mouse")
			});	
			
			$(".hidden_btn").mouseleave(function(){
				$(this).removeClass("hidden_btn_mouse");
				$(".val_btn").removeClass("val_btn_mouse")
			});
			
			$('.premium_insurer_row_list .premium_breakup_link').on('click',function(){
				$('.premium_breakup').css({"position":"fixed"}).show("slow");
			});
			$('.remove_icon').on('click',function(){
				$('.premium_breakup').hide("slow");
			});
			
			/*ADDON TOGGLES 
				$('.addon_show_icon').on('click',function(){
					$('.addon_hide_icon').show("fast");
					$('.premium_addon_cover').show("fast");
					$(this).hide("fast");
				});
				
				$('.addon_hide_icon').on('click',function(){
					$(this).hide("fast");
					$('.premium_addon_cover').hide("fast");
					$('.addon_show_icon').show("fast");
				});*/
				/*auto checkbox*/
				$(".premium_compare_1").on('click',function(){
					$(this).hide("fast");
					$(".premium_compare_2").show("slow");
					$(".premium_insurer_details .premium_insurer_row_list .compre_checkbox_span").show();
					$('.quote_span').css({"left":"73%"});
					
				});
				
				$(".premium_compare_2").on('click',function(){
					$(this).hide("fast");
					$(".premium_compare_1").show("slow");
					$(".premium_insurer_details .premium_insurer_row_list .compre_checkbox_span").hide();
					$('.quote_span').css({"left":"23%"});
				});
		});	