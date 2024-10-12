//FUNCTIONS TABLE OF CONTENTS//
/*

FUNCTIONS A: All Main Site Functions 
	1) Function A1: 
	
FUNCTIONS B: 

FUNCTIONS T: Trip Cost Calculator 
	1) Function T1: Instantiate Datepicker

FUNCTIONS UI: Functions Related to External Site Files
	1) Function UI.1: Add CSS background class to every other Row on Authorization Form
	2) Function T2: Get Value of Datepicker when it is selected using Calendar 
	3) Function T3: Get Value of Datepicker when it is selected using Time Select 
*/


//FUNCTIONS T: Trip Cost Calculator 
var FORM_VALID = true;


//Function T1: Instantiate Datepicker
$(document).ready(function(){
	$(function(){
		$( ".datepicker" ).datepicker({ minDate: 0 });
	});
});


//Function T2: Get Value of Datepicker when it is selected using Calendar 
$(document).ready(function(){
	$(".datepicker").datepicker({
		onSelect: function() { 
			
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
			
			//Type 1: This is not a Valid Date (Return before you left) 
			if(return_time_utc < departure_time_utc) {			
				//console.log("NO: Invalid Calendar Error");
				$("#js-trip-cost-time-error").show();	
				FORM_VALID = false;		
				
			//Type 2: Multi Day Rental (Check that return time is after arrive time)
			} else if(return_time_utc > departure_time_utc){
				//console.log("OK: Many days");
				$("#js-trip-cost-time-error").hide();	
				FORM_VALID = true;
				
			//Type 3: Day Rental
			} else if (return_time_utc = departure_time_utc) {
				
				//Check that they are leaving before their return 
				if(day_trip_valid_test <= 0) {
					//console.log("NO: Same Day Time Error");
					$("#js-trip-cost-time-error").show();
					FORM_VALID = false;
				} else {
					//console.log("OK: Same Day Ok ");	
					$("#js-trip-cost-time-error").hide();	
					FORM_VALID = true;
				}	
				
			//Type 4: Handle any exceptions 			
			} else {
				//console.log("ERROR Exception");				
			}	
	
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
 
	});
});





/*

$(document).ready(function(){
	$("#js-trip-cost-submit").click(function(){
		//var trip_pickup_time = $("#js-trip-cost-pickup-time").val();
		var trip_pickup_time = $("#js-trip-cost-pickup-time").datepicker('getDate');
		//var trip_return_time = $("#js-trip-cost-return-time").val();
		var trip_return_time = $("#js-trip-cost-return-time").datepicker('getDate');
		var total_days = (trip_return_time - trip_pickup_time)/1000/60/60/24;
		$("#js-trip-cost-total-days").text(total_days); 	
		
		//alert(total_days);
	});
});

*/

//FUNCTIONS UI: Functions Related to External Site Files
//Function UI.1: Add CSS background class to every other Row on Authorization Form
$(document).ready(function() {
	$( "div.form-row-container:odd" ).addClass("form-alternate-row-background");
});
















