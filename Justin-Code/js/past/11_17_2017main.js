//FUNCTIONS TABLE OF CONTENTS//
/*

FUNCTIONS A: All Main Site Functions 

FUNCTIONS B: Vehicle Availability Calculator  
	1) Function B1: Instantiate a New Calendar 
	2) Function B2: Get Value of Calendar when User Makes a Change 
	3) Function B3: Get Value of Time Select When User Makes Change 
	4) Function B4: Check if a date and time occurs before or after another date and time 
	
FUNCTIONS D: Dispatch Schedule 
	1) Function D1: Update Current Reservation to Active or Inactive in Database
	2) Function D2: Update Reservation Checkbox across all Pages 
	3) Function D3: Listen for Active Reservation and Redirect to Lobby User Display 
	4) Function D4: Listen for no Active Reservations and Redirect to Normal Lobby Display 
	5) Function D5: Make sure that Correct Box is Checked or Not Checked on Page Load
	
FUNCTIONS C: Trip Cost Calculator 
	1) Function C1: Initialize Google Autocomplete
	2) Function C2: Get Value of Datepicker when it is selected using Calendar 
	3) Function C3: Get Value of Datepicker when it is selected using Time Select	
	4) Function C4: Listen for Changes and set Current Location 
	5) Function C5: Listen for Changes in the Output
	6)  unction C6: Submit form and set cold fusion values 	
	
FUNCTIONS M: All Other Site Functions 
	1) Function M1: Update First Letter to Uppercase 
	
FUNCTIONS UI: Functions Related to User Interface
	1) Function UI.1: Add CSS background class to every other Row on Authorization Form

FUNCTIONS Appendix: Old or Other Functions 
	1) Function Appendix 1: Example AJAX Function 
	2) Function Appendix 2: Instantiate Datepicker
	3) Function Appendix 3: Vehicle Availability Calculator  

	
*/

//FUNCTIONS A: All Main Site Functions 


//FUNCTIONS B: Vehicle Availability Calculator  
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


//FUNCTIONS C: Trip Cost Calculator 
var FORM_VALID = true;

//Function C1: Initialize Google Autocomplete
function initialize() {
	var input = document.getElementById('js_trip_destination');
	var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

//Function C2: Get Value of Datepicker when it is selected using Calendar 
$(document).ready(function(){
	$(".datepicker").datepicker({
		onSelect: function() { 
			
			
		}
	});
});


//Function C3: Get Value of Datepicker when it is selected using Time Select
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


//Function C4: Listen for Changes and set Current Location *Is this needed? 
$(document).ready(function() {
	$("#js_trip_destination").keyup(function(){
		var current_location = $("#js_trip_destination").val();	
		//console.log(current_location);
	});
});
	
	
//Function C5: Listen for Changes in the Output *Is this needed? 
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
	
	
//Function C6: Submit form and set cold fusion values 	
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



//FUNCTIONS D: Dispatch Schedule 
var CURRENT_CITY = "Corvallis";
var CURRENT_STATE = "Oregon";
var RESERVATION_NUMBER = 0;


//Function D1: Update Current Reservation to Active or Inactive in Database
$(document).ready(function() {            
	$(".js-dispatch-active-vehicle").change(function() {
	
	
		//Update Reservation to Active (Checked) 
		if(this.checked) {
			var start_current_active_reservation = $(this).val();	
			var current_reservation_id_full = $(this).attr('id');
			var splitParts;
			splitParts = current_reservation_id_full.split("_");
			var current_reservation_id = splitParts[1];		

			//Make sure only selected box is checked 
			$('.js-dispatch-active-vehicle').prop('checked', false); // Unchecks it
			$("#" + current_reservation_id_full).prop('checked', true); // Checks it	
			
			//Update Database Record to Active 
			$.post('../functions/main.cfm', { start_current_active_reservation: start_current_active_reservation }, 
			
			function(data) {
				console.log("NEW CHECKED");
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

			$.post('../functions/main.cfm', { stop_current_active_reservation: stop_current_active_reservation }, 
		
			function(data) {
				console.log("NEW UNCHECK");
				$("#js-dispatch-current-reservation-number").val(000000);
				RESERVATION_NUMBER = 0;
			})	
		}
	
	});
});


//Function D2: Update Reservation Checkbox across all Pages 
//Description: This runs on a page and listens for a change to a selected reservation (checked) and pushes this to all pages 
//Page: dispatch_schedule.cfm 
var lobby_display_listen_for_selected_user = function() {
	var check_active_reservation = "true";
	
	$.post('../functions/main.cfm', { check_active_reservation: check_active_reservation }, 

	function(data) {
		
		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		//console.log("Selected " + selected_reservation_number);
		
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
					console.log("CHANGE: " + selected_reservation_number + " " + checked_reservation_number );
					
					//No Reservation is selected so remove the checkbox from all pages 
					if(selected_reservation_number == 0) {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
					
					//Reservation is Selected but is incorrect so remove incorrect and add correct checkbox 
					} else {
						$('#js-dispatch-active-vehicle_' + checked_reservation_number).prop('checked', false);
						$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 	
					}
					
				} else {
					console.log("OK: " + selected_reservation_number + " " + checked_reservation_number );			
				}
			
			//STEP 4: Currently All Boxes are Unchecked so 	
			} else {
				if(selected_reservation_number != 0) {
					$("#js-dispatch-active-vehicle_" + selected_reservation_number).prop('checked', true); 
				}				
				console.log("Unchecked ");
			}

		});	
		
	})
};


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


//FUNCTIONS M: All Other Site Functions 
//Function M1: Update First Letter to Uppercase 
function toTitleCase(str){
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
	
//FUNCTIONS UI: Functions Related to User Interface
//Function UI.1: Add CSS background class to every other Row on Authorization Form
$(document).ready(function() {
	$( "div.form-row-container:odd" ).addClass("form-alternate-row-background");
});



//FUNCTIONS Appendix: Old or Other Functions 
//Function Appendix 1: Example AJAX Function 
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


//Function Appendix 2: Instantiate Datepicker
$(document).ready(function(){
	$(function(){
		$( ".datepicker" ).datepicker({ minDate: 0 });
	});
});


//Function Appendix 3: Vehicle Availability Calculator  
$(document).ready(function(){
	$(".datepicker").datepicker({
		onSelect: function() { 
			

	
		}
	});
});



