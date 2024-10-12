//FUNCTIONS TABLE OF CONTENTS//
/*

FUNCTIONS D: Trip Cost Calculator 
	1) Function D1: Instantiate Datepicker


*/


//Function D1: Instantiate Datepicker
$(document).ready(function(){
	$(function(){
		$( ".datepicker" ).datepicker({ minDate: 0 });
	});
});

//Function D2: Get Value of Datepicker when it is selected 
$(document).ready(function(){
	$(".datepicker").datepicker({
		onSelect: function() { 
			var dateObject = $(this).datepicker('getDate'); 
		
		}
	});
});





