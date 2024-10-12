<cfset wr_no = url.wr_no>
<cfset status = url.status>
<cfoutput>
<cfquery name="upst" datasource="proto">
	update work_requests set status = '#url.status#' where wr_no = #wr_no#
</cfquery>
<cfif status eq "INSHOP">
	<cfquery name="update" datasource="proto">
		update work_requests set Date_InShop = '#DateFormat(now(), 'mm/dd/yyyy')# #timeformat(now(), 'hh:mm:ss')#' where wr_no = #wr_no#
	</cfquery>
<cfelseif status eq "RECEIVED">
	<cfquery name="update" datasource="proto">
		update work_requests set Date_Received = '#DateFormat(now(), 'mm/dd/yyyy')# #timeformat(now(), 'hh:mm:ss')#' where wr_no = #wr_no#
	</cfquery>
<cfelseif status eq "VENDOR">
	<cfquery name="update" datasource="proto">
		update work_requests set Date_Vendor = '#DateFormat(now(), 'mm/dd/yyyy')# #timeformat(now(), 'hh:mm:ss')#' where wr_no = #wr_no#
	</cfquery>
<cfelseif status eq "OUTSHOP">
	<cfquery name="update" datasource="proto">
		update work_requests set Date_OutShop = '#DateFormat(now(), 'mm/dd/yyyy')# #timeformat(now(), 'hh:mm:ss')#' where wr_no = #wr_no#
	</cfquery>
<cfelseif status eq "READY">
	<cfquery name="update" datasource="proto">
		update work_requests set Date_Ready = '#DateFormat(now(), 'mm/dd/yyyy')# #timeformat(now(), "hh:mm:ss")#' where wr_no = #wr_no#
	</cfquery>
<cfelseif status eq "PICKED UP">
	<cfquery name="update" datasource="proto">
		update work_requests set Date_PickedUp = '#DateFormat(now(), 'mm/dd/yyyy')# #timeformat(now(), "hh:mm:ss")#' where wr_no = #wr_no#
	</cfquery>
</cfif>
</cfoutput>
<cfoutput>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="red">The work request #wr_no# has been updated successfully.</font></cfoutput>

