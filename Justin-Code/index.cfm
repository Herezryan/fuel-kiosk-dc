<!DOCTYPE html>
<html>
<head>
	<!-- HTML HEAD --> 
	<cfinclude template="include_components\html_head.cfm">

</head>


<body>
											
<!--Content---------------Dont edit above this line------------------------------------------------------------------------->

	<cfif not len(getAuthUser())>
			<!---Adding locations query--->
	<cfquery datasource="proto" name="locations">
		select LOC_loc_code, name, email_addr
		from LOC_MAIN 
		where (emsdba.LOC_MAIN.is_fuel_site = 'Y') 
		and loc_loc_code not in ('30','50')
		order by loc_loc_code;
		</cfquery>
	<!---End locations query--->
		<cfoutput>
			<table style="width: 575px; font-size:16px;">
			<cfform name="cflogin" action="#cgi.script_name#" method="post">
				<tr align="center">
					<td colspan="2"><h3 style="font-size:20px;"><p>Bulk Fuel Login</p></h3></td>
					</tr>
				<tr style="height:50px; width: 100px; font-size:16px;">
					<!---td><cfinput type="text" name="j_username" value=" User Name" accesskey="s" onFocus="if(value==' User Name'){value=''}" onBlur="if(value==''){value=' User Name'}"  size="30"/></td--->
					<td><cfselect name="j_username" required="yes" style="height:50px; font-size:16px;">
							<option value="default" disabled selected style="font-size:16px;">Select:</option>
							<cfloop query="locations">
								<option value="#loc_loc_code#">#loc_loc_code#--#name#</option>
								</cfloop>
								</cfselect></td>
					<td><cfinput type="number" step=".1" placeholder="Password" name="j_password" size="10" style="height:50px; width: 125px; font-size:20px;"/></td>
					</tr>
					<cfif isdefined ("login_message")>
					<tr>
						<td colspan="2">#login_message#</td>
						</tr>
						</cfif>
				<tr align="right" style="height:50px; width: 100px; font-size:20px;">
					<td align="center" style="font-size: 20px;">#DateFormat(Now(), "dddd mm/dd/yyyy")# #TimeFormat(Now(), "HH:mm")#</td>
					<td><input type="submit" value="LOGIN" style="height:50px; width: 100%; font-size:20px;"/></td>
					</tr>
				</cfform>
				</table>
			</cfoutput>
		<cfelse>
			<cfif isuserinrole ("ADMIN")>
				<cflocation url="totalizer_initialize.cfm">	</cfif>		
			<cfif len(getAuthUser())>
				<cflocation url="fuel_trans_input.cfm">
			<!---cfif isUserInRole("bulkfuel")>
				<cflocation url="fuel_trans_input.cfm"--->
			<cfelse>
				<cflocation url="https://transportation.oregonstate.edu/motorpool/">
				</cfif>
		</cfif>				
<!-----Add content here to display on login screen below login form-------------------->			

<!--END Content-------------Dont edit below this line--------------------------------------------------------------------------->

</body>
</html>