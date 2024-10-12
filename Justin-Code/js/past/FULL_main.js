

//FUNCTIONS TABLE OF CONTENTS//
/*

FUNCTIONS A: All Main Site Functions 
	1) Function A1: Instantiate Datepicker

FUNCTIONS B: Vehicle Availability Calculator  
	1) Function B1: Instantiate a New Calendar 
	2) Function B2: Get Value of Calendar when User Makes a Change  
	3) Function B3: Get Value of Time Select When User Makes Change 
	4) Function B4: Check if a date and time occurs before or after another date and time
	
FUNCTIONS D: Dispatch Schedule 
	1) Function D1: Update Reservation to Active (Only one can be active at a time)
	2) Function D2: Call Database to Update Reservations

	
FUNCTIONS T: Trip Cost Calculator 
	1) Function T1: Instantiate Datepicker
	2) Function T2: Get Value of Datepicker when it is selected using Calendar 
	3) Function T3: Get Value of Datepicker when it is selected using Time Select 
	4) Function T4: Get Value of Datepicker when it is selected using Time Select
	5) Function T5: Listen for Changes and set Current Location *Is this needed? 
	6) Function T6: Listen for Changes in the Output *Is this needed? 
	7) Function T7: Submit form and set cold fusion values  
	
	
FUNCTIONS UI: Functions Related to User Interface
	1) Function UI.1: Add CSS background class to every other Row on Authorization Form

*/

//FUNCTIONS D: Dispatch Schedule 
var CURRENT_CITY = "Corvallis";
var CURRENT_STATE = "Oregon";
var RESERVATION_NUMBER = 0;

//Function: Update Active Reservations on Page Load (dispatch page) 

//Function D1: Update Current Reservation to Active or Inactive in Database (dispatch_schedule)
//Page: dispatch_schedule.cfm 
$(document).ready(function() {            
	$(".js-dispatch-active-vehicle").change(function() {
		
		//STEP 1: Get Reservation Location and Number 
		var current_dispatch_page_location = $("#js-dispatch-page-current-location").val();	
		current_dispatch_page_location = current_dispatch_page_location.toLowerCase();	
		current_dispatch_page_location = current_dispatch_page_location.trim();	

		var current_active_reservation_id = $(this).val();	
		var current_reservation_id_full = $(this).attr('id');
		var splitParts;
		splitParts = current_reservation_id_full.split("_");
		var current_reservation_id = splitParts[1];	

		
		/*
		//LOCATION Corvallis	
		if(current_dispatch_page_location == 40) {
			//console.log("Corvallis");
			//var start_active_reservation_corvallis = current_reservation_id;
			//var stop_active_reservation_corvallis = current_reservation_id;
			
			//STEP 2: Update Reservation to Active (Checked) 
			if(this.checked) {
				
				var start_active_reservation_corvallis = current_reservation_id;
				
				console.log("Corvallis Checked ");
				
				//Update Database Record to Active 
				$.post('../functions/main.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis }, 
				
				function(data) {
					
					//STEP 3: Update Dispatch Page to Reflect Active Reservations (The checkboxes)
					//Create an Array of Active Reservations 
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });
					
					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
						console.log(current_active_reservation);
					}	
			
				})		
				
				
			//STEP 3: Update Reservation to Not Active (Uncheck)
			} else {
				//console.log("Corvallis UN Checked ");			
				var stop_active_reservation_corvallis = current_reservation_id;

				$.post('../functions/main.cfm', { stop_active_reservation_corvallis: stop_active_reservation_corvallis }, 
			
				function(data) {
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);			
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });				
					

					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
							console.log(current_active_reservation);
					}
				
				})
				
			}		
		
		
		//LOCATION: Eugene
		} else if(current_dispatch_page_location.localeCompare("eugene") == 0){
			//console.log("Eugene");
			var start_active_reservation_eugene = current_reservation_id;
			var stop_active_reservation_eugene = current_reservation_id;			

			//STEP 2: Update Reservation to Active (Checked) 
			if(this.checked) {
					console.log("Eugene Checked ");					

				var start_active_reservation_corvallis = current_reservation_id;
				
				//Update Database Record to Active 
				$.post('../functions/main.cfm', { start_active_reservation_eugene: start_active_reservation_eugene }, 
				
				function(data) {
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);			
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });				
					console.log(current_reservations_array);
					
					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
					}				
					
				})		
				
			//STEP 3: Update Reservation to Not Active (Uncheck)
			} else {
						console.log("Eugene UN Checked ");				
		
				$.post('../functions/main.cfm', { stop_active_reservation_eugene: stop_active_reservation_eugene }, 
			
				function(data) {
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);			
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });				
					
					
					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
					}	
				})	
			
				
			}		
			
		//LOCATION: Error Finding Location 
		} else {
			console.log(current_dispatch_page_location + " Not Found");
		}
		
		*/
	
	
	});
});



//Function D5: Update Reservation Checkbox across all Pages (Corvallis) 
//Description: This runs on a page and listens for a change to a selected reservation (checked) and pushes this to all pages 
//Page: dispatch_schedule.cfm 

/*
var listen_for_selected_user_corvallis = function() {
	var check_active_reservation_corvallis = "true";
	
	$.post('../functions/main.cfm', { check_active_reservation_corvallis: check_active_reservation_corvallis }, 

	function(data) {

		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		
		//Get Dispatch Page Location 
		var current_dispatch_location_view = $("#js-dispatch-current-page-location-view").val();
		
		//console.log("Selected " + selected_reservation_number + " Current Location: " + current_dispatch_location_view);

		
		//STEP 2: Get the Currently checked box displaying on all dispatch_schedule.cfm pages 
		$("#js-dispatch-table input:checkbox").each(function(){
			var $this = $(this);
			if($this.is(":checked")){

				//Get the ID of the Currently selected Checkbox 
				var reservation_checked_id_full = $(this).attr('id');
				var splitParts;
				splitParts = reservation_checked_id_full.split("_");
				var checked_reservation_number = splitParts[1];	
				
				checked_reservation_array.push(checked_reservation_number);
			 
				//STEP 3: Adjust if the selected reservation does not equal 
				if(selected_reservation_number != checked_reservation_number) {
					//console.log("CHANGE: " + selected_reservation_number + " " + checked_reservation_number );
					
					//No Reservation is selected so remove the checkbox from all pages 
					if(selected_reservation_number == 0) {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
					
					//Reservation is Selected but is incorrect so remove incorrect and add correct checkbox 
					} else {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
						$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 	
					}
					
				} else {
					//console.log("OK: " + selected_reservation_number + " " + checked_reservation_number );			
				}
			
			//STEP 4: Currently All Boxes are Unchecked so 	
			} else {
				if(selected_reservation_number != 0) {
					$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 
				}				
				//console.log("Unchecked ");
			}
		
		});	
	
	})
};

*/

/*
//Function D5: Update Reservation Checkbox across all Pages (Eugene) 
var listen_for_selected_user_eugene = function() {
	var check_active_reservation_eugene = "true";
	
	$.post('../functions/main.cfm', { check_active_reservation_eugene: check_active_reservation_eugene }, 

	function(data) {

		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		
		//Get Dispatch Page Location 
		var current_dispatch_location_view = $("#js-dispatch-current-page-location-view").val();
		
		//console.log("Selected " + selected_reservation_number + " Current Location: " + current_dispatch_location_view);

		
		//STEP 2: Get the Currently checked box displaying on all dispatch_schedule.cfm pages 
		$("#js-dispatch-table input:checkbox").each(function(){
			var $this = $(this);
			if($this.is(":checked")){

				//Get the ID of the Currently selected Checkbox 
				var reservation_checked_id_full = $(this).attr('id');
				var splitParts;
				splitParts = reservation_checked_id_full.split("_");
				var checked_reservation_number = splitParts[1];	
				
				checked_reservation_array.push(checked_reservation_number);
			 
				//STEP 3: Adjust if the selected reservation does not equal 
				if(selected_reservation_number != checked_reservation_number) {
					//console.log("CHANGE: " + selected_reservation_number + " " + checked_reservation_number );
					
					//No Reservation is selected so remove the checkbox from all pages 
					if(selected_reservation_number == 0) {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
					
					//Reservation is Selected but is incorrect so remove incorrect and add correct checkbox 
					} else {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
						$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 	
					}
					
				} else {
					//console.log("OK: " + selected_reservation_number + " " + checked_reservation_number );			
				}
			
			//STEP 4: Currently All Boxes are Unchecked so 	
			} else {
				if(selected_reservation_number != 0) {
					$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 
				}				
				//console.log("Unchecked ");
			}
		
		});	
	
	})
};


*/

//Trim All Elements in an Array 

//Clean all Empty Values From Array 	
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}



/*
//Function D3: Listen for Active Reservation and Redirect to Lobby User Display 
//Description: This function listens for an active reservation and redirects to mp_corvallis_user.cfm if there is one 
//Page: mp_corvallis.cfm 
var lobby_check_for_active_reservation = function() {
	var check_active_reservation = "true";
	
	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		
		
		//ACTIVE RESERVATION: Redirect to User Display Page 
		if(display_user_info.localeCompare("true")==0){ 
			//console.log("redirect");
			window.location.href = 'development_mp_corvallis_user.cfm';
			
		//NORMAL DISPLAY: Item is Not Checked (Normal Display) 
		} else {			
			//console.log("NORMAL DISPLAY: do nothing");
		}
		
	})
};
*/

/*
//Function D4: Listen for no Active Reservations and Redirect to Normal Lobby Display 
//Description: This function listens for an active reservation and redirects to mp_corvallis_user.cfm if there is one 
//Page: mp_corvallis_user.cfm 
var check_for_non_active_reservation = function() {
	var check_active_reservation = "true";
	var current_reservation = $("#js-lobby-display-current-reseration-number").val();
	var current_reservation = parseInt(current_reservation);

	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		

		//var new_reservation = $("#js-lobby-display-current-reseration-number").val();	
		var new_reservation = parseInt(RESERVATION_NUMBER );
		
			//UPDATE: Refresh Page if The Reservation Number Changed 
			if(new_reservation != current_reservation) {				
				if(current_reservation == 0) {
					//console.log("USER DISPLAY: do nothing");
				} else {
					//console.log("RELOAD");
					window.location.href = 'development_mp_corvallis.cfm';
				}						
			}	
		
		$("#js-lobby-display-current-reseration-number").val(RESERVATION_NUMBER);
		
	})
};
*/



/******************* OLD *********************/

		/*
		
		//Update Reservation to Active (Checked) 
		if(this.checked) {
			
			var start_active_reservation_corvallis = current_reservation_id;
			
			//Update Database Record to Active 
			$.post('../functions/main.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis }, 
			
			function(data) {
				console.log(data);

			})		
			
		} else {
			$.post('../functions/main.cfm', { stop_active_reservation_corvallis: stop_active_reservation_corvallis }, 
		
			function(data) {
				console.log(data);
			})		

		}
		
		
		*/

//STEP 2B: Location (Eugene)

//Part 1: Remove all checkboxes
//$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it

//Part 2: Check Eugene and Corvallis Box 
//$("#" + current_reservation_id_full).prop('checked', true); //Checks it	

//RESERVATION_NUMBER = current_reservation_id;


//$("#js-dispatch-current-reservation-number").val(current_reservation_id);



/////OLD//////



/*

//Function D1: Update Current Reservation to Active or Inactive in Database (dispatch_schedule)
$(document).ready(function() {            
	$(".js-dispatch-active-vehicle").change(function() {
		

		//Update Reservation to Active (Checked) 
		if(this.checked) {
			var start_current_active_reservation = $(this).val();	
			var current_reservation_id_full = $(this).attr('id');
			var splitParts;
			splitParts = current_reservation_id_full.split("_");
			var current_reservation_id = splitParts[1];		
			//console.log("START " + current_dispatch_page_location + " " + start_current_active_reservation);

			//Update Database Record to Active 
			$.post('../functions/main.cfm', { start_current_active_reservation: start_current_active_reservation }, 
			
			function(data) {
				
				//Part 1: Remove all checkboxes
				$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
				
				//Part 2: Check Eugene and Corvallis Box 
				$("#" + current_reservation_id_full).prop('checked', true); //Checks it	
				
				RESERVATION_NUMBER = current_reservation_id;
				$("#js-dispatch-current-reservation-number").val(current_reservation_id);
			})	
			
			
			
		//Update Reservation to Not Active (Unchecked)
		} else {
			
			var stop_current_active_reservation = $(this).val();	
			var stop_current_reservation_id_full = $(this).attr('id');
			var splitParts;
			splitParts = stop_current_reservation_id_full.split("_");
			var stop_current_reservation_id = splitParts[1];	
			
			//console.log("END " + current_dispatch_page_location + " " + stop_current_reservation_id);		
			
			$.post('../functions/main.cfm', { stop_current_active_reservation: stop_current_active_reservation }, 
		
			function(data) {
				console.log("NEW UNCHECK");
				$("#js-dispatch-current-reservation-number").val(000000);
				RESERVATION_NUMBER = 0;
			})	
			
			//Make Sure Correct Boxes are Checked on both Eugene and Corvallis Pages 
			
		}
		


				//STEP 1: Get Reservation Information 
		var current_dispatch_page_location = $("#js-dispatch-page-current-location").val();	
		current_dispatch_page_location = current_dispatch_page_location.toLowerCase();	
		current_dispatch_page_location = current_dispatch_page_location.trim();	
	
		var current_selected_reservation = $(this).val();	
		
		
		//start_active_reservation_corvallis
		//start_active_reservation_eugene
		
		//STEP 2: Determine if change was to Corvallis or Eugene Dispatch Page
		if(current_dispatch_page_location == 40) {
			console.log("Corvallis");
			var start_active_reservation_corvallis = current_selected_reservation;
			
			//STEP 3: Update Selected Reservation to Active 
			$.post('../functions/main.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis, current_dispatch_page_location: current_dispatch_page_location }, 
			
			function(data) {
				alert(data);
				$("#js-dispatch-current-reservation-number").val(current_reservation_id);
			})	
					
			
			
			//STEP 4: Update Selected Reservation to Inactive 
		
		
		
		
		
		} else if(current_dispatch_page_location.localeCompare("eugene") == 0){
			console.log("Eugene");
			

			//STEP 3: Update Selected Reservation to Active 
			
			
			
			//STEP 4: Update Selected Reservation to Inactive 
			
			
			
		} else {
			console.log(current_dispatch_page_location + " Not Found");
		
		
		
		}
	
		
		

	
	
	
	});
});
*/


/*
//Function D5: Make sure that Correct Box is Checked or Not Checked on Page Load
$(document).ready(function() {            
	var check_active_reservation = "true";
	
	//STEP 1: This has a Selected Reservation (get this) 
	var selected_reservations_array = $("#js-dispatch-table input:checkbox").map(function(i, el) { return $(el).attr("id"); }).get();

	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		//console.log("PAGE LOAD: " + selected_reservation_number);
		$('.js-dispatch-active-vehicle').prop('checked', false); // Unchecks it
		$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); // Checks it
		
	})
			
});



*/




function toTitleCase(str){
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//Function: Example AJAX Function 
$(document).ready(function() {
	$("#ajax_trigger").click(function(){
		//var operator_id = 930694191;
		//var operator_name = "David Vasquez";
      	var operator_id     = $('input[name=operator-id]').val();	
		var operator_name   = $('input[name=operator-name').val();	
				
		$.post('ajax_handle.cfm', {	operator_id: operator_id, operator_name: operator_name }, 
	
		function(data) {
			var json_output = JSON.parse(data); 
			$("#ajax_response").text(data);
			//console.log(json_output);
			//console.log(json_output.name);
			
		})		
	});
});



//Function B1: Instantiate a New Calendar 
$(document).ready(function(){
	$(function(){
		$( ".js-datepicker" ).datepicker({ minDate: 0 });
		//$(".js-datepicker").datepicker('setDate', new Date());
	});
});


//Function B2: Get Value of Calendar when User Makes a Change 
$(document).ready(function(){
	$(".js-datepicker").datepicker({
		onSelect: function() { 
			
			var depart_date_valid = false;
			var return_date_valid = false;
			
			//Step 1: Check if Depart Date has been selected 
			if (($("#js-depart-date").datepicker('getDate') != null) == true){	
				depart_date_valid = true;
			} 
			
			//Step 2: Check if Return Date has been selected 		
			if (($("#js-return-date").datepicker('getDate') != null) == true){
				return_date_valid = true;
			} 
			
			//Step 3: Check that All Needed Dates have Been Selected 
			if(depart_date_valid == true && return_date_valid == true) {
				
				//Depart Date and Time
				var depart_date = $("#js-depart-date").datepicker('getDate');
				var depart_date_year  = depart_date.getFullYear(); 
				var depart_date_month = depart_date.getMonth() + 1;
				var depart_date_day   = depart_date.getDate();  
				var depart_date_utc   = (Math.floor((depart_date).getTime() / 1000));  
				var depart_time = $("#js-depart-time").find(':selected').val();
				var depart_time_standard = $("#js-depart-time").find(':selected').text();
			
				//Return Date and Time 
				var return_date 	  = $("#js-return-date").datepicker('getDate');				
				var return_date_year  = $("#js-return-date").datepicker('getDate').getFullYear(); 
				var return_date_month = $("#js-return-date").datepicker('getDate').getMonth() + 1;
				var return_date_day   = $("#js-return-date").datepicker('getDate').getDate();  
				var return_date_utc   = (Math.floor((return_date).getTime() / 1000));        
				var return_time = $("#js-return-time").find(':selected').val();
				var return_time_standard = $("#js-return-time").find(':selected').text();

				//Step 5: Call Function to Determine if Date Range is Valid 
				var date_time_range_valid = checkDateTimeOrder(depart_date, return_date, depart_time, return_time);
				
				//Step 6: Handle Outcome
				
				//SUCCESS: Valid Date and Time
				if(date_time_range_valid == 1) {		
					$("#js-availability-date-time-invalid").hide();	 
					$("#js-availability-date-time-valid").show();
					
				//NOT VALID: Returning before Trip Starts	
				} else {
					$("#js-availability-date-time-valid").hide();					
					$("#js-availability-date-time-invalid").show();	 							
				}	

				console.log("Depart: " + depart_date + " " + depart_time);
				console.log("Return: " + return_date + " " + return_time);
				
			} else {
				//console.log("not ok");
			}

			
		}
	});
});


//Function B3: Get Value of Time Select When User Makes Change 
$(document).ready(function(){
	$("select.js-time-select").change(function() {	
	
		var depart_date_valid = false;
		var return_date_valid = false;
		
		//Step 1: Check if Depart Date has been selected 
		if (($("#js-depart-date").datepicker('getDate') != null) == true){	
			depart_date_valid = true;
		} 
		
		//Step 2: Check if Return Date has been selected 		
		if (($("#js-return-date").datepicker('getDate') != null) == true){
			return_date_valid = true;
		} 
		
		//Step 3: Check that All Needed Dates have Been Selected 
		if(depart_date_valid == true && return_date_valid == true) {
			
			//Depart Date and Time
			var depart_date = $("#js-depart-date").datepicker('getDate');
			var depart_date_year  = depart_date.getFullYear(); 
			var depart_date_month = depart_date.getMonth() + 1;
			var depart_date_day   = depart_date.getDate();  
			var depart_date_utc   = (Math.floor((depart_date).getTime() / 1000));  
			var depart_time = $("#js-depart-time").find(':selected').val();
			var depart_time_standard = $("#js-depart-time").find(':selected').text();			
		
			//Return Date and Time 
			var return_date 	  = $("#js-return-date").datepicker('getDate');				
			var return_date_year  = $("#js-return-date").datepicker('getDate').getFullYear(); 
			var return_date_month = $("#js-return-date").datepicker('getDate').getMonth() + 1;
			var return_date_day   = $("#js-return-date").datepicker('getDate').getDate();  
			var return_date_utc   = (Math.floor((return_date).getTime() / 1000));        
			var return_time = $("#js-return-time").find(':selected').val();
			var return_time_standard = $("#js-depart-time").find(':selected').text();

			//Step 5: Call Function to Determine if Date Range is Valid 
			var date_time_range_valid = checkDateTimeOrder(depart_date, return_date, depart_time, return_time);
			
			//Step 6: Handle Outcome
			
			//SUCCESS: Valid Date and Time
			if(date_time_range_valid == 1) {
				$("#js-availability-date-time-invalid").hide();	 
				$("#js-availability-date-time-valid").show();		
				
			//NOT VALID: Returning before Trip Starts	
			} else {
				$("#js-availability-date-time-valid").hide();					
				$("#js-availability-date-time-invalid").show();	 					
			}
			
			console.log("Depart: " + depart_date + " " + depart_time_standard);
			console.log("Return: " + return_date + " " + return_time_standard);
				
		} else {
			//console.log("not ok");
		}
	
	});
});


//Function B4: Check if a date and time occurs before or after another date and time 
function checkDateTimeOrder(depart_date, return_date, depart_time, return_time) {
  
	//Step 1: Handle Variables 
	var output_response   = "";
	depart_time = parseInt(depart_time);
	return_time = parseInt(return_time);
	var return_date_utc   = (Math.floor((return_date).getTime() / 1000));  
	var depart_date_utc   = (Math.floor((depart_date).getTime() / 1000)); 

	//Step 2: Check if Return Date was Before Depart Date
	if (return_date_utc < depart_date_utc) {
		//output_response = "You must return the car after you pick it up ";
		output_response = 0;
		
	//Step 3: Handle Same Day Pickup and Return
	} else if (return_date_utc == depart_date_utc) {
		//output_response = "Same Day";
		
		//One Day Rental: Time Frame Ok
		if(depart_time <= return_time) {
			//output_response = "OK";
			output_response = 1;
			
		//One Day Rental: Returning Before Pickup 	
		} else {
			//output_response = "You must return the car after you pick it up";
			output_response = 0;
		}
	
	//Step 4: Valid Date and Times 
	} else if (return_date_utc > depart_date_utc) {
		//output_response = "OK";		
		output_response = 1;	
		
	} else {
		//output_response = "error";
		output_response = 0;		
	}
  	
	//Output: Valid Time (1) Invalid Time (0)
    return output_response;
}






















//// ORGANIZE ///




//Function A1: Instantiate Datepicker
$(document).ready(function(){
	$(function(){
		$( ".datepicker" ).datepicker({ minDate: 0 });
	});
});


//FUNCTIONS B: Vehicle Availability Calculator  
//Function B1: 
$(document).ready(function(){
	$(".datepicker").datepicker({
		onSelect: function() { 
			

	
		}
	});
});








//FUNCTIONS T: Trip Cost Calculator 
var FORM_VALID = true;

//Function T1: Initialize Google Autocomplete
function initialize() {
	var input = document.getElementById('js_trip_destination');
	var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

//Function T2: Get Value of Datepicker when it is selected using Calendar 
$(document).ready(function(){
	$(".datepicker").datepicker({
		onSelect: function() { 
			alert();
			/*
			
			//STEP 1: Get All Information From Fields 
			var calendar_id_arrive = $("#js-calendar-depart-date").datepicker('getDate');
			var calendar_id_return = $("#js-calendar-return-date").datepicker('getDate');
			var selected_depart_time = $("#js-trip-cost-depart-time option:selected").val();
			var selected_return_time = $("#js-trip-cost-return-time option:selected").val();
			var time_pickup_test = $("#js-trip-cost-depart-time").find(':selected').data('pickup');
			var time_return_test = $("#js-trip-cost-return-time").find(':selected').data('return');
			
			//STEP 2: Perform any needed calculations 
			var departure_time_utc = (Math.floor((calendar_id_arrive).getTime() / 1000));
			var return_time_utc = (Math.floor((calendar_id_return).getTime() / 1000));
			var day_trip_valid_test = time_return_test - time_pickup_test;

			//STEP 3: Perform Day Calculation Test 	
			//console.log(calendar_id_arrive +  " " + calendar_id_return);
			//console.log(selected_depart_time +  " " + selected_return_time);
			//console.log(time_pickup_test +  " " + time_return_test);
			//console.log(departure_time_utc +  " " + return_time_utc);
			alert();
			//Type 1: This is not a Valid Date (Return before you left) 
			if(return_time_utc < departure_time_utc) {			
				console.log("NO: Invalid Calendar Error");
				$("#js-trip-cost-time-error").show();	
				FORM_VALID = false;		
				
			//Type 2: Multi Day Rental (Check that return time is after arrive time)
			} else if(return_time_utc > departure_time_utc){
				console.log("OK: Many days");
				$("#js-trip-cost-time-error").hide();	
				FORM_VALID = true;
				
			//Type 3: Day Rental
			} else if (return_time_utc = departure_time_utc) {
				
				//Check that they are leaving before their return 
				if(day_trip_valid_test <= 0) {
					console.log("NO: Same Day Time Error");
					$("#js-trip-cost-time-error").show();
					FORM_VALID = false;
				} else {
					console.log("OK: Same Day Ok ");	
					$("#js-trip-cost-time-error").hide();	 
					FORM_VALID = true;
				}	
				
			//Type 4: Handle any exceptions 			
			} else {
				console.log("ERROR Exception");				
			}	
			*/
			
		}
	});
});


//Function T3: Get Value of Datepicker when it is selected using Time Select
$(document).ready(function(){
	$("select.js-trip-cost-time").change(function() {
		
		//STEP 1: Get All Information From Fields 
		var calendar_id_arrive = $("#js-calendar-depart-date").datepicker('getDate');
		var calendar_id_return = $("#js-calendar-return-date").datepicker('getDate');
		var selected_depart_time = $("#js-trip-cost-depart-time option:selected").val();
		var selected_return_time = $("#js-trip-cost-return-time option:selected").val();
		var time_pickup_test = $("#js-trip-cost-depart-time").find(':selected').data('pickup');
		var time_return_test = $("#js-trip-cost-return-time").find(':selected').data('return');
		
		//STEP 2: Perform any needed calculations 
		var departure_time_utc = (Math.floor((calendar_id_arrive).getTime() / 1000));
		var return_time_utc = (Math.floor((calendar_id_return).getTime() / 1000));
		var day_trip_valid_test = time_return_test - time_pickup_test;

		//STEP 3: Perform Day Calculation Test 	
		alert();
		
		
		//Type 1: This is not a Valid Date (Return before you left) 
		if(return_time_utc < departure_time_utc) {			
			$("#js-trip-cost-time-error").show();
			FORM_VALID = false;	
		//Type 2: Multi Day Rental (Check that return time is after arrive time)
		} else if(return_time_utc > departure_time_utc){
			$("#js-trip-cost-time-error").hide();	
			FORM_VALID = true;
		//Type 3: Day Rental
		} else if (return_time_utc = departure_time_utc) {
			
			//Check that they are leaving before their return 
			if(day_trip_valid_test <= 0) {
				$("#js-trip-cost-time-error").show();
					FORM_VALID = false;				
			} else {
				$("#js-trip-cost-time-error").hide();	
				FORM_VALID = true;
			}	
			
		//Type 4: Handle any exceptions 			
		} else {
			//console.log("ERROR Exception");
			FORM_VALID = false;			
		}
		console.log("change");
 
	});
});


//Function T4: Listen for Changes and set Current Location *Is this needed? 
$(document).ready(function() {
	$("#js_trip_destination").keyup(function(){
		var current_location = $("#js_trip_destination").val();	
		//console.log(current_location);
	});
});
	
	
//Function T5: Listen for Changes in the Output *Is this needed? 
$(document).ready(function() {
	$("#output").click(function(){
		var final_location_string = $("#js_trip_destination").val();	
		var final_location_array = final_location_string.split(',');
		var final_location_count = final_location_array.length;
		var destination_state    = final_location_array[final_location_count-2];
		var destination_city     = final_location_array[final_location_count-3]; 
		console.log(final_location_array);
		console.log(destination_city + " " + destination_state);
		
	});
});
	
	
//Function T6: Submit form and set cold fusion values 	
$(document).ready(function(){
	$("#js-trigger-trip-cost-submit").click(function(){
		var final_location_string = $("#js_trip_destination").val();	
		var final_location_array = final_location_string.split(',');
		var final_location_count = final_location_array.length;
		var destination_state    = final_location_array[final_location_count-2];
		var destination_city     = final_location_array[final_location_count-3]; 
		$("#js-trip-cost-destination-city-holder").val(destination_city);
		$("#js-trip-cost-destination-state-holder").val(destination_state);
			
		if(FORM_VALID === false) {
			//alert("You must specify a valid Trip Duration ");
			$("#js-trip-cost-time-error").show();
		} else {			
			$('#js-trip-cost-submit').click();			
		}

	});
});



//FUNCTIONS UI: Functions Related to External Site Files
//Function UI.1: Add CSS background class to every other Row on Authorization Form
$(document).ready(function() {
	$( "div.form-row-container:odd" ).addClass("form-alternate-row-background");
});




/*
fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyDVmUMdq6BOCdHW77accBb411VOIN5vau4')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        console.log(data);  
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });



function checkValidLocation(city, state) {
	var API_key = "AIzaSyDVmUMdq6BOCdHW77accBb411VOIN5vau4";
	//https://maps.googleapis.com/maps/api/directions/json?origin=Corvallis,Oregon&destination=Universal+Studios+Hollywood4&key=AIzaSyDVmUMdq6BOCdHW77accBb411VOIN5vau4

    return city + " " + state;              
}

console.log(checkValidLocation("Corvallis", "Or"));

//fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Corvallis,OR&destinations=Allann+Brothers+Cafe+5th,West+5th+Avenue,Eugene,OR,United+States&key=AIzaSyAabchXVp_e81NIvOxfmWgZFrs2P7QDGNo', {

//https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyDVmUMdq6BOCdHW77accBb411VOIN5vau4

*/






////////

//$("#texens").val("tinkumaster");

///OLD
/*
	var check_active_reservation = "true";
	var current_reservation = $("#js-lobby-display-current-reseration-number").val();
	var current_reservation = parseInt(current_reservation);

	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		

		//var new_reservation = $("#js-lobby-display-current-reseration-number").val();	
		var new_reservation = parseInt(RESERVATION_NUMBER );
		
			//UPDATE: Refresh Page if The Reservation Number Changed 
			if(new_reservation != current_reservation) {				
				if(current_reservation == 0) {
					//console.log("USER DISPLAY: do nothing");
				} else {
					//console.log("RELOAD");
					window.location.href = 'development_mp_corvallis.cfm';
				}						
			}	
		
		
		
		
*/

/*

I don't think  this is used right now 
//Function D2: Call Database to Update Reservations and Listen for Unchecked Box 
var check_for_active_reservation = function() {
	var check_active_reservation = "true";
	
	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		
	
		//CUSTOMER DISPLAY: Item is Checked (Show user info)
		if(display_user_info.localeCompare("true")==0){ 
			//console.log("CHECKED ");
			
		//NORMAL DISPLAY: Item is Not Checked (Normal Display) 
		} else {			
			//console.log("NOT CHECKED ");	

		}
		
	})
};
*/





/*


//Function D4: Call Database to Update Reservations and Listen for Unchecked Box (CHECKED)
var check_for_non_active_reservation = function() {
	total_time = total_time + 1;
	var check_active_reservation = "true";
	var current_reservation = $("#js-lobby-display-current-reseration-number").val();
	var current_reservation = parseInt(current_reservation);
	
	//console.log("CURRENT " + current_reservation);
	
	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		
		
		//console.log(reservation_details_json);
		
		/*
			{ "status":"#display_reservation_information#", 
			 "reservation_no":" #active_reservations.resv_reserv_no#", 
			 "reservations_found": #records_found#,
			 "destination_city": "#active_reservations.destination_city#",
			 "destination_state": "#active_reservations.destination_state#",
			 "due_datetime_orig": "#active_reservations.due_datetime_orig#",
			 "due_datetime": "#active_reservations.due_datetime#",
			 "qty_passengers": "#active_reservations.qty_passengers#",
			 "meter_1_reading_out": "#active_reservations.meter_1_reading_out#",
			 "actual_months": "#active_reservations.actual_months#",
			 "actual_weeks": "#active_reservations.actual_weeks#",
			 "rental_operator": "#active_reservations.primary_oper_name#",
			 "actual_days": "#active_reservations.actual_days#"
			 } 
		*//*
		
		//var new_reservation = $("#js-lobby-display-current-reseration-number").val();	
		var new_reservation = parseInt(RESERVATION_NUMBER );
		
			//UPDATE: Refresh Page if The Reservation Number Changed 
			if(new_reservation != current_reservation) {
				
				
				if(current_reservation == 0) {
					//console.log("DONT RELOAD");
				} else {
					//console.log("RELOAD");
					window.location.href = 'development_mp_corvallis.cfm';
				}
				//console.log("NEW " + new_reservation + " and CURRENT " + current_reservation);
				//
				//alert("UPDATE");				
				//var reservation_number 		= reservation_details_json.reservation_no; 
				//var rental_operator 		= reservation_details_json.rental_operator; 
				//rental_operator 			= toTitleCase(rental_operator);
				//var destination_city 		= reservation_details_json.destination_city; 
				//destination_city			= toTitleCase(destination_city);
				//var destination_state 		= reservation_details_json.destination_state; 
				//destination_state			= toTitleCase(destination_state);			
				//var due_datetime_orig 		= reservation_details_json.due_datetime_orig; 
				//var due_datetime 			= reservation_details_json.due_datetime; 
				//var qty_passengers 			= reservation_details_json.qty_passengers; 
				//var meter_one_reading_out 	= reservation_details_json.meter_1_reading_out; 
				//var meter_one_reading_out 	= reservation_details_json.meter_1_reading_out; 
				//var actual_months			= reservation_details_json.actual_months; 
				//var actual_weeks 			= reservation_details_json.actual_weeks; 
				//var actual_days 			= reservation_details_json.actual_days; 
				//document.getElementById('js-lobby-user-trip-map').contentWindow.location.reload();
				//Update Map
				
				
				//var loc = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAabchXVp_e81NIvOxfmWgZFrs2P7QDGNo&origin=Corvallis,Oregon&destination=" + destination_city + "," + destination_state + "&avoid=tolls|highways";
				//document.getElementById('js-lobby-user-trip-map').src = loc;					
				
				//location.reload(); 
				//window.location.replace("map_reload.cfm");
						
			}	
		
		
		$("#js-lobby-display-current-reseration-number").val(RESERVATION_NUMBER);
		
		//console.log("NEW " + new_reservation);	
		
		//CUSTOMER DISPLAY: Item is Checked (Show user info) also this is fetching the current reservation info so use this to update the page if it needs it
		if(display_user_info.localeCompare("true")==0){ 		
			//console.log("CUSTOMER DISPLAY ");
			//console.log(reservation_details_json);
		//NORMAL DISPLAY: Item is Not Checked (Normal Display) 
		} else {			
			//console.log("GO BACK ");
			//console.log(reservation_details_json);
			//window.location.href = 'development_mp_corvallis.cfm';
		}
		
	})
};

*/


/************************************************************/
//FUNCTIONS D: Dispatch Schedule 
var CURRENT_CITY = "Corvallis";
var CURRENT_STATE = "Oregon";
var RESERVATION_NUMBER = 0;

//Function: Update Active Reservations on Page Load (dispatch page) 

//Function D1: Update Current Reservation to Active or Inactive in Database (dispatch_schedule)
//Page: dispatch_schedule.cfm 
$(document).ready(function() {            
	$(".js-dispatch-active-vehicle").change(function() {
		
		//STEP 1: Get Reservation Location and Number 
		var current_dispatch_page_location = $("#js-dispatch-page-current-location").val();	
		current_dispatch_page_location = current_dispatch_page_location.toLowerCase();	
		current_dispatch_page_location = current_dispatch_page_location.trim();	

		var current_active_reservation_id = $(this).val();	
		var current_reservation_id_full = $(this).attr('id');
		var splitParts;
		splitParts = current_reservation_id_full.split("_");
		var current_reservation_id = splitParts[1];	

		
		/*
		//LOCATION Corvallis	
		if(current_dispatch_page_location == 40) {
			//console.log("Corvallis");
			//var start_active_reservation_corvallis = current_reservation_id;
			//var stop_active_reservation_corvallis = current_reservation_id;
			
			//STEP 2: Update Reservation to Active (Checked) 
			if(this.checked) {
				
				var start_active_reservation_corvallis = current_reservation_id;
				
				console.log("Corvallis Checked ");
				
				//Update Database Record to Active 
				$.post('../functions/main.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis }, 
				
				function(data) {
					
					//STEP 3: Update Dispatch Page to Reflect Active Reservations (The checkboxes)
					//Create an Array of Active Reservations 
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });
					
					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
						console.log(current_active_reservation);
					}	
			
				})		
				
				
			//STEP 3: Update Reservation to Not Active (Uncheck)
			} else {
				//console.log("Corvallis UN Checked ");			
				var stop_active_reservation_corvallis = current_reservation_id;

				$.post('../functions/main.cfm', { stop_active_reservation_corvallis: stop_active_reservation_corvallis }, 
			
				function(data) {
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);			
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });				
					

					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
							console.log(current_active_reservation);
					}
				
				})
				
			}		
		
		
		//LOCATION: Eugene
		} else if(current_dispatch_page_location.localeCompare("eugene") == 0){
			//console.log("Eugene");
			var start_active_reservation_eugene = current_reservation_id;
			var stop_active_reservation_eugene = current_reservation_id;			

			//STEP 2: Update Reservation to Active (Checked) 
			if(this.checked) {
					console.log("Eugene Checked ");					

				var start_active_reservation_corvallis = current_reservation_id;
				
				//Update Database Record to Active 
				$.post('../functions/main.cfm', { start_active_reservation_eugene: start_active_reservation_eugene }, 
				
				function(data) {
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);			
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });				
					console.log(current_reservations_array);
					
					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
					}				
					
				})		
				
			//STEP 3: Update Reservation to Not Active (Uncheck)
			} else {
						console.log("Eugene UN Checked ");				
		
				$.post('../functions/main.cfm', { stop_active_reservation_eugene: stop_active_reservation_eugene }, 
			
				function(data) {
					var string_data = data;
					var current_reservations_array = string_data.split(",");
					current_reservations_array = cleanArray(current_reservations_array);			
					current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });				
					
					
					//Remove all Current Check boxes
					$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
					
					//Loop through array and check active reservations  
					var current_reservations_array_length = current_reservations_array.length;
					
					for (var i = 0; i < current_reservations_array_length; i++) {
						var current_active_reservation_number = current_reservations_array[i];
						//$("#" + current_reservation_id_full).prop('checked', true); //Checks it
						var current_active_reservation = current_reservations_array[i];
						$("#js-dispatch-active-vehicle_" + current_active_reservation).prop('checked', true); //Checks it	
					}	
				})	
			
				
			}		
			
		//LOCATION: Error Finding Location 
		} else {
			console.log(current_dispatch_page_location + " Not Found");
		}
		
		*/
	
	
	});
});



//Function D5: Update Reservation Checkbox across all Pages (Corvallis) 
//Description: This runs on a page and listens for a change to a selected reservation (checked) and pushes this to all pages 
//Page: dispatch_schedule.cfm 

/*
var listen_for_selected_user_corvallis = function() {
	var check_active_reservation_corvallis = "true";
	
	$.post('../functions/main.cfm', { check_active_reservation_corvallis: check_active_reservation_corvallis }, 

	function(data) {

		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		
		//Get Dispatch Page Location 
		var current_dispatch_location_view = $("#js-dispatch-current-page-location-view").val();
		
		//console.log("Selected " + selected_reservation_number + " Current Location: " + current_dispatch_location_view);

		
		//STEP 2: Get the Currently checked box displaying on all dispatch_schedule.cfm pages 
		$("#js-dispatch-table input:checkbox").each(function(){
			var $this = $(this);
			if($this.is(":checked")){

				//Get the ID of the Currently selected Checkbox 
				var reservation_checked_id_full = $(this).attr('id');
				var splitParts;
				splitParts = reservation_checked_id_full.split("_");
				var checked_reservation_number = splitParts[1];	
				
				checked_reservation_array.push(checked_reservation_number);
			 
				//STEP 3: Adjust if the selected reservation does not equal 
				if(selected_reservation_number != checked_reservation_number) {
					//console.log("CHANGE: " + selected_reservation_number + " " + checked_reservation_number );
					
					//No Reservation is selected so remove the checkbox from all pages 
					if(selected_reservation_number == 0) {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
					
					//Reservation is Selected but is incorrect so remove incorrect and add correct checkbox 
					} else {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
						$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 	
					}
					
				} else {
					//console.log("OK: " + selected_reservation_number + " " + checked_reservation_number );			
				}
			
			//STEP 4: Currently All Boxes are Unchecked so 	
			} else {
				if(selected_reservation_number != 0) {
					$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 
				}				
				//console.log("Unchecked ");
			}
		
		});	
	
	})
};

*/

/*
//Function D5: Update Reservation Checkbox across all Pages (Eugene) 
var listen_for_selected_user_eugene = function() {
	var check_active_reservation_eugene = "true";
	
	$.post('../functions/main.cfm', { check_active_reservation_eugene: check_active_reservation_eugene }, 

	function(data) {

		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		
		//Get Dispatch Page Location 
		var current_dispatch_location_view = $("#js-dispatch-current-page-location-view").val();
		
		//console.log("Selected " + selected_reservation_number + " Current Location: " + current_dispatch_location_view);

		
		//STEP 2: Get the Currently checked box displaying on all dispatch_schedule.cfm pages 
		$("#js-dispatch-table input:checkbox").each(function(){
			var $this = $(this);
			if($this.is(":checked")){

				//Get the ID of the Currently selected Checkbox 
				var reservation_checked_id_full = $(this).attr('id');
				var splitParts;
				splitParts = reservation_checked_id_full.split("_");
				var checked_reservation_number = splitParts[1];	
				
				checked_reservation_array.push(checked_reservation_number);
			 
				//STEP 3: Adjust if the selected reservation does not equal 
				if(selected_reservation_number != checked_reservation_number) {
					//console.log("CHANGE: " + selected_reservation_number + " " + checked_reservation_number );
					
					//No Reservation is selected so remove the checkbox from all pages 
					if(selected_reservation_number == 0) {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
					
					//Reservation is Selected but is incorrect so remove incorrect and add correct checkbox 
					} else {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
						$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 	
					}
					
				} else {
					//console.log("OK: " + selected_reservation_number + " " + checked_reservation_number );			
				}
			
			//STEP 4: Currently All Boxes are Unchecked so 	
			} else {
				if(selected_reservation_number != 0) {
					$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 
				}				
				//console.log("Unchecked ");
			}
		
		});	
	
	})
};


*/

//Trim All Elements in an Array 

//Clean all Empty Values From Array 	
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}



/*
//Function D3: Listen for Active Reservation and Redirect to Lobby User Display 
//Description: This function listens for an active reservation and redirects to mp_corvallis_user.cfm if there is one 
//Page: mp_corvallis.cfm 
var lobby_check_for_active_reservation = function() {
	var check_active_reservation = "true";
	
	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		
		
		//ACTIVE RESERVATION: Redirect to User Display Page 
		if(display_user_info.localeCompare("true")==0){ 
			//console.log("redirect");
			window.location.href = 'development_mp_corvallis_user.cfm';
			
		//NORMAL DISPLAY: Item is Not Checked (Normal Display) 
		} else {			
			//console.log("NORMAL DISPLAY: do nothing");
		}
		
	})
};
*/

/*
//Function D4: Listen for no Active Reservations and Redirect to Normal Lobby Display 
//Description: This function listens for an active reservation and redirects to mp_corvallis_user.cfm if there is one 
//Page: mp_corvallis_user.cfm 
var check_for_non_active_reservation = function() {
	var check_active_reservation = "true";
	var current_reservation = $("#js-lobby-display-current-reseration-number").val();
	var current_reservation = parseInt(current_reservation);

	//Call Database and check if there is an active reservation 
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		

		//var new_reservation = $("#js-lobby-display-current-reseration-number").val();	
		var new_reservation = parseInt(RESERVATION_NUMBER );
		
			//UPDATE: Refresh Page if The Reservation Number Changed 
			if(new_reservation != current_reservation) {				
				if(current_reservation == 0) {
					//console.log("USER DISPLAY: do nothing");
				} else {
					//console.log("RELOAD");
					window.location.href = 'development_mp_corvallis.cfm';
				}						
			}	
		
		$("#js-lobby-display-current-reseration-number").val(RESERVATION_NUMBER);
		
	})
};
*/



/******************* OLD *********************/

		/*
		
		//Update Reservation to Active (Checked) 
		if(this.checked) {
			
			var start_active_reservation_corvallis = current_reservation_id;
			
			//Update Database Record to Active 
			$.post('../functions/main.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis }, 
			
			function(data) {
				console.log(data);

			})		
			
		} else {
			$.post('../functions/main.cfm', { stop_active_reservation_corvallis: stop_active_reservation_corvallis }, 
		
			function(data) {
				console.log(data);
			})		

		}
		
		
		*/

//STEP 2B: Location (Eugene)

//Part 1: Remove all checkboxes
//$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it

//Part 2: Check Eugene and Corvallis Box 
//$("#" + current_reservation_id_full).prop('checked', true); //Checks it	

//RESERVATION_NUMBER = current_reservation_id;


//$("#js-dispatch-current-reservation-number").val(current_reservation_id);



/////OLD//////



/*

//Function D1: Update Current Reservation to Active or Inactive in Database (dispatch_schedule)
$(document).ready(function() {            
	$(".js-dispatch-active-vehicle").change(function() {
		

		//Update Reservation to Active (Checked) 
		if(this.checked) {
			var start_current_active_reservation = $(this).val();	
			var current_reservation_id_full = $(this).attr('id');
			var splitParts;
			splitParts = current_reservation_id_full.split("_");
			var current_reservation_id = splitParts[1];		
			//console.log("START " + current_dispatch_page_location + " " + start_current_active_reservation);

			//Update Database Record to Active 
			$.post('../functions/main.cfm', { start_current_active_reservation: start_current_active_reservation }, 
			
			function(data) {
				
				//Part 1: Remove all checkboxes
				$('.js-dispatch-active-vehicle').prop('checked', false); //Unchecks it
				
				//Part 2: Check Eugene and Corvallis Box 
				$("#" + current_reservation_id_full).prop('checked', true); //Checks it	
				
				RESERVATION_NUMBER = current_reservation_id;
				$("#js-dispatch-current-reservation-number").val(current_reservation_id);
			})	
			
			
			
		//Update Reservation to Not Active (Unchecked)
		} else {
			
			var stop_current_active_reservation = $(this).val();	
			var stop_current_reservation_id_full = $(this).attr('id');
			var splitParts;
			splitParts = stop_current_reservation_id_full.split("_");
			var stop_current_reservation_id = splitParts[1];	
			
			//console.log("END " + current_dispatch_page_location + " " + stop_current_reservation_id);		
			
			$.post('../functions/main.cfm', { stop_current_active_reservation: stop_current_active_reservation }, 
		
			function(data) {
				console.log("NEW UNCHECK");
				$("#js-dispatch-current-reservation-number").val(000000);
				RESERVATION_NUMBER = 0;
			})	
			
			//Make Sure Correct Boxes are Checked on both Eugene and Corvallis Pages 
			
		}
		


				//STEP 1: Get Reservation Information 
		var current_dispatch_page_location = $("#js-dispatch-page-current-location").val();	
		current_dispatch_page_location = current_dispatch_page_location.toLowerCase();	
		current_dispatch_page_location = current_dispatch_page_location.trim();	
	
		var current_selected_reservation = $(this).val();	
		
		
		//start_active_reservation_corvallis
		//start_active_reservation_eugene
		
		//STEP 2: Determine if change was to Corvallis or Eugene Dispatch Page
		if(current_dispatch_page_location == 40) {
			console.log("Corvallis");
			var start_active_reservation_corvallis = current_selected_reservation;
			
			//STEP 3: Update Selected Reservation to Active 
			$.post('../functions/main.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis, current_dispatch_page_location: current_dispatch_page_location }, 
			
			function(data) {
				alert(data);
				$("#js-dispatch-current-reservation-number").val(current_reservation_id);
			})	
					
			
			
			//STEP 4: Update Selected Reservation to Inactive 
		
		
		
		
		
		} else if(current_dispatch_page_location.localeCompare("eugene") == 0){
			console.log("Eugene");
			

			//STEP 3: Update Selected Reservation to Active 
			
			
			
			//STEP 4: Update Selected Reservation to Inactive 
			
			
			
		} else {
			console.log(current_dispatch_page_location + " Not Found");
		
		
		
		}
	
		
		

	
	
	
	});
});
*/


/*
//Function D5: Make sure that Correct Box is Checked or Not Checked on Page Load
$(document).ready(function() {            
	var check_active_reservation = "true";
	
	//STEP 1: This has a Selected Reservation (get this) 
	var selected_reservations_array = $("#js-dispatch-table input:checkbox").map(function(i, el) { return $(el).attr("id"); }).get();

	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		//console.log("PAGE LOAD: " + selected_reservation_number);
		$('.js-dispatch-active-vehicle').prop('checked', false); // Unchecks it
		$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); // Checks it
		
	})
			
});



*/


