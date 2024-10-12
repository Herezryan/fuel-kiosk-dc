//FUNCTIONS TABLE OF CONTENTS//
/*

FUNCTIONS D: Dispatch Schedule 
	1) Function D1: Update Current Reservation to Active or Inactive in Database (dispatch_schedule) 
	2) Function D2: Update Corvallis to Active 
	3) Function D3: Update Corvallis to Inactive 
	4) Function D4: Update Eugene to Active 
	5) Function D5: Update Eugene to Inactive 
	6) Function D6: Update all Corvallis Dispatch Schedule Pages to Reflect Changes 
	7) Function D7: Update all Eugene Dispatch Schedule Pages to Reflect Changes 
	8) Function D8: Listen for Active Reservation and Redirect to Lobby User Display (Corvallis) 
	9) Function D9: Listen for no Active Reservations and Redirect to Normal Lobby Display  (Corvallis) 
	10) Function D10: Listen for Active Reservation and Redirect to Lobby User Display (Eugene) 
	11) Function D11: Listen for no Active Reservations and Redirect to Normal Lobby Display  (Eugene) 	
*/


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

		//console.log(current_dispatch_page_location + " " + current_reservation_id_full + " " + current_reservation_id + " " + current_active_reservation_id);
		
		//LOCATION Corvallis	
		if(current_dispatch_page_location == 40) {

			//Update Reservation to Active (Checked) 
			if(this.checked) {
				//console.log("Corvallis Checked ");
				var start_active_reservation_corvallis = current_reservation_id;
				updateCorvallisReservationActive(start_active_reservation_corvallis);
				
			//Update Reservation to Not Active (Uncheck)
			} else {
				//console.log("Corvallis UN Checked ");	
				var stop_active_reservation_corvallis = current_reservation_id;				
				updateCorvallisReservationInActive(stop_active_reservation_corvallis);
			}		

			
		//LOCATION: Eugene
		} else if(current_dispatch_page_location.localeCompare("eugene") == 0){

			//Update Reservation to Active (Checked) 
			if(this.checked) {
				//console.log("Eugene Checked ");	
				var start_active_reservation_eugene = current_reservation_id;			
				updateEugeneReservationActive(start_active_reservation_eugene);
				
			//Update Reservation to Not Active (Uncheck)
			} else {
				//console.log("Eugene UN Checked ");	
				var stop_active_reservation_eugene = current_reservation_id;				
				updateEugeneReservationInActive(stop_active_reservation_eugene);				
			}		

		//LOCATION: Error Finding Location 
		} else {
			console.log(current_dispatch_page_location + " Not Found");
		}		
		
	});
});

//Function D2: Update Corvallis to Active 
function updateCorvallisReservationActive(start_active_reservation_corvallis) {			

	//Update Database Record to Active 
	$.post('../functions/dispatch.cfm', { start_active_reservation_corvallis: start_active_reservation_corvallis }, 
	
	function(data) {
		
		//Update Dispatch Page to Reflect Active Reservations (The checkboxes)
		//Create an Array of Active Reservations 
		var string_data = data;
		var current_reservations_array = string_data.split(",");
		current_reservations_array = cleanArray(current_reservations_array);
		current_reservations_array = current_reservations_array.map(function(s) { return String.prototype.trim.apply(s); });
		//console.log(current_reservations_array);
		
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

//Function D3: Update Corvallis to Inactive 
function updateCorvallisReservationInActive(stop_active_reservation_corvallis) {

	$.post('../functions/dispatch.cfm', { stop_active_reservation_corvallis: stop_active_reservation_corvallis }, 

	function(data) {
		//console.log(data);
	})	   
}

//Function D4: Update Eugene to Active 
function updateEugeneReservationActive(start_active_reservation_eugene) {			

	//Update Database Record to Active 
	$.post('../functions/dispatch.cfm', { start_active_reservation_eugene: start_active_reservation_eugene }, 
	
	function(data) {
		
		//Update Dispatch Page to Reflect Active Reservations (The checkboxes)
		//Create an Array of Active Reservations 
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
				           
}

//Function D5: Update Eugene to Inactive 
function updateEugeneReservationInActive(stop_active_reservation_eugene) {

	$.post('../functions/dispatch.cfm', { stop_active_reservation_eugene: stop_active_reservation_eugene }, 

	function(data) {
		//console.log(data);
	})	   
}


//Function D6: Update all Corvallis Dispatch Schedule Pages to Reflect Changes 
var sync_dispatch_corvallis = function() {	
	var check_active_reservation_corvallis = "true";
	

	
	$.post('../functions/dispatch.cfm', { check_active_reservation_corvallis: check_active_reservation_corvallis }, 

	function(data) {

		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
		
		//console.log("CORVALLIS: " + selected_reservation_number);
		
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


//Function D7: Update all Eugene Dispatch Schedule Pages to Reflect Changes 
var sync_dispatch_eugene = function() {
	var check_active_reservation_eugene = "true";
	
	$.post('../functions/dispatch.cfm', { check_active_reservation_eugene: check_active_reservation_eugene }, 

	function(data) {

		//STEP 1: Get the reservation that is active in the database (if there is one)		
		var checked_reservation_array = new Array();
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		var selected_reservation_number =  parseInt(reservation_details_json.reservation_no); 		
	
		//console.log("EUGENE: " + selected_reservation_number);
	
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


//Function D8: Listen for Active Reservation and Redirect to Lobby User Display (Corvallis) 
//Description: This function listens for an active reservation and redirects to mp_corvallis_user.cfm if there is one 
//Page: mp_corvallis.cfm 
var lobby_check_for_active_reservation_corvallis = function() {
	var check_active_reservation_corvallis = "true";

	//Call Database and check if there is an active reservation 
	$.post('../functions/dispatch.cfm', { check_active_reservation_corvallis: check_active_reservation_corvallis }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		//var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		
		
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

//Function D9: Listen for no Active Reservations and Redirect to Normal Lobby Display  (Corvallis) 
//Description: This function listens for an active reservation and redirects to mp_corvallis_user.cfm if there is one 
//Page: mp_corvallis_user.cfm 
var check_for_non_active_reservation_corvallis = function() {
	var check_active_reservation_corvallis = "true";

	//Call Database and check if there is an active reservation 
	$.post('../functions/dispatch.cfm', { check_active_reservation_corvallis: check_active_reservation_corvallis }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		display_user_info.toLowerCase();
		
		//console.log(display_user_info);
		
		if(display_user_info.localeCompare("false") == 0) {
			window.location.href = 'development_mp_corvallis.cfm';
		}
	})

};


//Function D10: Listen for Active Reservation and Redirect to Lobby User Display (Eugene) 
var lobby_check_for_active_reservation_eugene = function() {
	var check_active_reservation_eugene = "true";
	console.log("Dispatch");

	//Call Database and check if there is an active reservation 
	$.post('../functions/dispatch.cfm', { check_active_reservation_eugene: check_active_reservation_eugene }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		//var RESERVATION_NUMBER = reservation_details_json.reservation_no; 		
		console.log(reservation_details_json);
		//ACTIVE RESERVATION: Redirect to User Display Page 
		if(display_user_info.localeCompare("true")==0){ 
			//console.log("redirect");
			window.location.href = 'development_mp_eugene_user.cfm';
			
		//NORMAL DISPLAY: Item is Not Checked (Normal Display) 
		} else {			
			//console.log("NORMAL DISPLAY: do nothing");
		}
		
	})

};

//Function D11: Listen for no Active Reservations and Redirect to Normal Lobby Display  (Eugene) 	
var check_for_non_active_reservation_eugene = function() {
	var check_active_reservation_eugene = "true";
	
	//Call Database and check if there is an active reservation 
	$.post('../functions/dispatch.cfm', { check_active_reservation_eugene: check_active_reservation_eugene }, 

	function(data) {
		var reservation_details_json = JSON.parse(data); 
		var display_user_info = reservation_details_json.status;
		display_user_info.toLowerCase();
		
		//console.log(reservation_details_json);
		
		if(display_user_info.localeCompare("false") == 0) {
			window.location.href = 'development_mp_eugene.cfm';
		}
	})

	
};





//Function A: Appendix
//Function A1: Clean all Empty Values From Array 	
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}



//////////////////////////////
	