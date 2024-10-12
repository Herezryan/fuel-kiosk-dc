<!-- Uncomment this when these sub directory files go to the main menu 
<!--
<div class="yui3-u-1-6">
	<nav>
		<div id="side_nav">
-->			
			<ul id="nav" class = "">
				<li><a href="http://motorpool.oregonstate.edu/">Motor Pool Home</a></li>  
				<!--<li><a href="../dispatch_schedule.cfm">Dispatch Schedule</a></li>-->
				<li><a href="../dispatch_schedule.cfm">Dispatch Schedule</a></li>				
				<li><a href="../available_vehicles.cfm">Available Vehicles</a></li>
				<li><a href="../reservation_emails.cfm">Reservation E-mails</a></li>
				<li><a href="../reservation_requests.cfm">Reservation Requests</a></li>
				<li><a href="../auth_emails.cfm">Authorization E-mails</a></li>		
				<li><a href="../vehicle_inventory.cfm">Vehicle Inventory</a></li>
				<li><a href="../internal_authform.cfm">Internal Auth Form</a></li>
				<li><a href="../detailing.cfm">In/Out</a></li>
				<li><a href="../condition_mapping.cfm">Condition Mapping</a></li>
				<li><a href="../view_update_po.cfm">View/Update PO</a></li>
				<li><a href="../work_requests.cfm">Work Requests</a></li>
				<li><a href="../usage_analysis.cfm">Usage Analysis</a></li>	
				<li><cfif len(getAuthUser())><a href="?logout=true">Logout</a></cfif></li>				
			</ul>
<!--			
		</div>
	</nav>	
</div>
-->