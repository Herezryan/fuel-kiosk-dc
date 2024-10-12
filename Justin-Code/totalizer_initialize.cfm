<!DOCTYPE html>
<html>
<head>
	<!-- HTML HEAD --> 
	<cfinclude template="include_components\html_head.cfm">

</head>


<body>
											
<!--Content---------------Dont edit above this line------------------------------------------------------------------------->
<cfif not len(getAuthUser())>
	<cflocation url="index.cfm">

<!---cfif not isUserInRole("bulkfuel")>
	<cflocation url="index.cfm"--->
	<cfelse>

<!---Params and such------------------------------------------------->
<cfparam name="form.page" default="0">
<cfparam name="update" default="0">
<cfparam name="totalizer_verify" default="YES">
<cfparam name="totalizer_start" default="0">
<cfparam name="fuel_site" default="MP">
<cfparam name="fuel_type" default="">
<cfparam name="business_purpose" default="MP">
<cfparam name="totalizer_update" default="">
<cfparam name="acct_code" default="">
<cfif not isdefined ("url.form.page")>
	<cfset url.form.page=0>
	</cfif>

<cfset form.page = url.form.page + 1>
<!---If form data being submitted insert into FTK_bulkfuel---------------->
	<cfif #update# eq "submit">
		<cfquery name="AddRecord" datasource="proto">
			INSERT INTO FTK_bulkfuel ([datetime_insert],[ftk_date],[loc_code], [fuel_type], [totalizer_start], [eq_no], [pid_info], [odometer], [qty_fuel], [totalizer_end], [acct_code], [business_purpose], [totalizer_update])
			VALUES ('#datetime_insert#','#date_time#','#fuel_site#', '#fuel_type#', '#totalizer_start#', '#unit_identifier#', '#pid_info#', '#odometer#', '#qty_fuel#', '#totalizer_end#', '#acct_code#', '#business_purpose#', '#totalizer_update#')
			</cfquery>
		<cfmail from="motorpool@oregonstate.edu" to="#email_addr#" subject="Fuel Ticket: #fuel_site#-#Unit_identifier#" type="html">
				<html>
					<style type="text/css">body { font-family: Arial, Helvetica, sans-serif; }</style>
					<body>			
			<table>
				<tr>	
					<td colspan="2"><b>Fuel Site Entry Log</b></td>
					</tr>
				<tr>	
					<td>Date/Time Insert:</td>
					<td>#datetime_insert#</td>
					</tr>
				<tr>
				<tr>	
					<td>Date:</td>
					<td>#date_time#</td>
					</tr>
				<tr>	
					<td>Totalizer Start:</td>
					<td>#totalizer_start#</td>
					</tr>
				<tr>
					<td>Fuel Site:</td>
					<td>#fuel_site#</td>
					</tr>
				<tr>
					<td>Fuel Type:</td>
					<td>#fuel_type#</td>
					</tr>
				<tr>	
					<td>Veh ID:</td>
					<td>#unit_identifier#</td>
					</tr>
				<tr>	
					<td>PID Info:</td>
					<td>#pid_info#</td>
					</tr>					
				<tr>	
					<td>Odometer:</td>
					<td>#odometer#</td>
					</tr>
				<tr>	
					<td>Gallons Pumped:</td>
					<td>#qty_fuel#</td>
					</tr>
				<tr>	
					<td>Totalizer End:</td>
					<td>#totalizer_end#</td>
					</tr>
				<tr>	
					<td>Index-Activity:</td>
					<td>#acct_code#</td>
					</tr>
				<tr>	
					<td>Business Purpose:</td>
					<td>#business_purpose#</td>
					</tr>
					</table>
				<p>Thank You,<br>
				Motor Pool<br><br>
				(541) 737-4141  Phone<br>
				<a href="mailto:motorpool@oregonstate.edu">motorpool@oregonstate.edu</a></p>
					</body>
				</html>	
			</cfmail>				
		</cfif>
<!---Step 1 -------------------------------------------------------------->
<cfif form.page eq 1>
<div style="width: 575px; align="center";>
	<!---Adding locations query--->
	<cfquery datasource="proto" name="locations">
		select LOC_loc_code, name, email_addr
		from LOC_MAIN 
		where (emsdba.LOC_MAIN.is_fuel_site = 'Y') 
		and loc_loc_code not in ('30','50')
		order by loc_loc_code;
		</cfquery>
<cfset fuel_loc=#GetUserRoles()#>
	<!---End locations query--->
	<cfform name="form" method="post" action="#cgi.SCRIPT_NAME#?form.page=1" >
		<cfoutput>
		<table style="width: 575px;" align="center">
		<tr align="center">
			<td><h3 style="font-size:20px;"><p>Select Bulk Fuel Site and Fuel Type</p></h3></td>
			</tr>
			<tr align="center">
				<td>
					<cfinput type="hidden" name="page" value="#form.page#" />

						<cfselect name="fuel_site" required="yes" style="height:50px; font-size:20px;">
							<option value="default" disabled style="font-size:20px;">Select:</option>
							<cfloop query="locations">
								<option value="#loc_loc_code#" <cfif #fuel_loc# eq #loc_loc_code#>selected</cfif>>#loc_loc_code#--#name#</option>
								</cfloop>
							</cfselect></td>
				</tr>
			<tr align="center">
				<td><cfinput type="submit" name="fuel_type" value="UNL" style="height:50px; width:75px; font-size:20px;"/>
					<cfinput type="submit" name="fuel_type" value="DSL" style="height:50px; width:75px; font-size:20px;"/>
					<cfinput type="submit" name="fuel_type" value="DSL OFF ROAD" style="height:50px; width:175px; font-size:20px;"/>
					<cfinput type="submit" name="fuel_type" value="CLEAR GAS" style="height:50px; width:125px; font-size:20px;"/></td> 
				</tr>
				<tr align="center">
					<td style="height:50px; font-size:20px;" bgcolor="white">#DateFormat(Now(), "dddd mm/dd/yyyy")# #TimeFormat(Now(), "HH:mm")#</td>
					</tr>
				<tr align="center">
					<td><button type="button" style="height:50px; width:300px; font-size:20px;"><a href="fuel_trans_log.cfm" style="text-decoration:none;">View Transaction Records</a></button></td>
					<tr>
				<tr align="center">
					<td><button type="button" style="height:50px; width:300px; font-size:20px;"><a href="index.cfm?logout=true" style="text-decoration:none;">Log Out</a></button></td>
					<tr>					
			</table>	
			</cfoutput>	
		</cfform>	
  </div>
<!---Step 2--------------------------------------------------------------->
<cfelseif form.page eq 2>
	<cfif #fuel_site# eq "MP">
		<table style="width: 575px; font-size:20px;">
			<tr align="center">
				<td><p><b>Please go back and pick a fuel site.<b></p></td>
				</tr>
			<tr align="center">
				<td><button type="button" style="height:50px; width:300px; font-size:20px;"><a href="fuel_trans_input.cfm" style="text-decoration: none;">Return to location selection</a></button></td>
				</tr>
			</table>
		<cfelse>
			<cfoutput>
			<cfquery name="totalizer_lookup" datasource="proto">
				SELECT Max(FTK_bulkfuel.id) AS MaxOfid, FTK_bulkfuel.loc_code, FTK_bulkfuel.fuel_type, Max(FTK_bulkfuel.totalizer_end) AS MaxOftotalizer_end
				FROM FTK_bulkfuel
				GROUP BY FTK_bulkfuel.loc_code, FTK_bulkfuel.fuel_type
				HAVING (((FTK_bulkfuel.loc_code)='#fuel_site#') AND ((FTK_bulkfuel.fuel_type)='#fuel_type#'))
				</cfquery>
				<cfif totalizer_lookup.recordcount gt 0>
					<cfset totalizer_start = #totalizer_lookup.Maxoftotalizer_end#> 
					</cfif>
			<cfquery datasource="proto" name="contact_lookup">
				select LOC_loc_code, name, email_addr
				from LOC_MAIN 
				where (LOC_MAIN.loc_loc_code = '#fuel_site#');
				</cfquery>
				<cfif isUserInRole ("ADMIN")>
				<!---Admin action code----------------------------------------------------------------->
					<cfform name="form" action="#cgi.SCRIPT_NAME#?form.page=2" method="post">
						<!---Hidden values to pass to next step---------->
						<cfinput type="hidden" name="fuel_site" value="#fuel_site#" />
						<cfinput type="hidden" name="fuel_type" value="#fuel_type#" />
						<cfinput type="hidden" name="email_addr" value="#contact_lookup.email_addr#" />
						<table style="width: 575px; font-size:20px;">
							<tr align="center">	
								<td colspan="2"><h3>Totalizer Initialization/Reset</h3> <u>#fuel_site# -- #fuel_type#</u></td>
								</tr>
							<tr align="right" style="border: 1px solid black ;">	
								<td>Totalizer Start ----> </td>
								<td align="center"><cfinput type="number" step=".1" name="totalizer_start" value="#totalizer_start#" style="width: 75px;" validate="range" range=".1,9999" required="Yes" message="* You must enter starting totalizer reading." maxlength="8">#totalizer_start#</td>
								</tr>			
							<tr align="center">
								<td>Enter/Update Totalizer</td>
								<td><!---cfinput type="submit" name="totalizer_verify" value="YES" style="height:50px; width:75px; font-size:20px;"/---> 
									<cfinput type="submit" name="totalizer_verify" value="SUBMIT" style="height:50px; width:100px; font-size:20px;"/> <a href="#cgi.SCRIPT_NAME#"> RESET</a></td>
								</tr>
							</table>
					</cfform>	
					<cfelse>					
				<!---Regular user code---------------------------------------->
					<cfform name="form" action="#cgi.SCRIPT_NAME#?form.page=2" method="post">
						<!---Hidden values to pass to next step---------->
						<cfinput type="hidden" name="fuel_site" value="#fuel_site#" />
						<cfinput type="hidden" name="fuel_type" value="#fuel_type#" />
						<cfinput type="hidden" name="email_addr" value="#contact_lookup.email_addr#" />
						<table style="width: 575px; font-size:20px;">
							<tr align="center">	
								<td colspan="2"><h3>Verify Totalizer Start: <u>#fuel_site# -- #fuel_type#</u></h3></td>
								</tr>
							<tr align="right" style="border: 1px solid black ;">	
								<td>Totalizer Start ----> </td>
								<td align="center"><cfinput type="hidden" name="totalizer_start" value="#totalizer_start# "style="width: 75px;">#totalizer_start#</td>
								</tr>			
							<tr align="left">
								<td>Does this value match?</td>
								<td><cfinput type="submit" name="totalizer_verify" value="YES" style="height:50px; width:75px; font-size:20px;"/> 
									<cfinput type="submit" name="totalizer_verify" value="NO" style="height:50px; width:75px; font-size:20px;"/> <a href="#cgi.SCRIPT_NAME#"> RESET</a></td>
								</tr>
							</table>
					</cfform>
</cfif>					
				</cfoutput>	
		</cfif>
<!---Step 3--------------------------------------------------------------->
<!---If the totalizer failed verification generate an email and advance to Step 3 for re-entry------------------>
<cfelseif form.page eq 3>
	<cfif totalizer_verify neq "YES">
		<!-------------------------CFMAIL------------------------------------->
		<cfoutput>
			<cfmail from="motorpool@oregonstate.edu" to="#email_addr#" subject="Totalizer Reading Error" type="html">
				<html>
					<style type="text/css">body { font-family: Arial, Helvetica, sans-serif; }</style>
					<body>			
						<p>There is a user generated flag for beginning totalizer reading at #fuel_site# for #fuel_type#.</p>
						<p>The user will be prompted to enter a corrected totalizer starting number.</p>
							
						<p>Thank You,<br>
						Motor Pool<br><br>
						(541) 737-4141  Phone<br>
						<a href="mailto:motorpool@oregonstate.edu">motorpool@oregonstate.edu</a></p>
						</body>
					</html>	
				</cfmail>
			<table style="width: 575px; font-size:20px;">
				<tr align="center">
					<td><h2><p>An email alert was generated.</p></h2>
							<p>Please continue and update the starting totalizer reading.</p></td>
					</tr>
				</table>
		</cfoutput>
		</cfif>
<!---Start data entry form to pass to check values---->
<cfSet dt = DateFormat(Now(), "mm/dd/yyyy") & " " & TimeFormat(Now(), "HH:mm")>
	<cfoutput>
		<cfform name="form" action="#cgi.SCRIPT_NAME#?form.page=3" method="post">
			<cfinput type="hidden" name="email_addr" value="#email_addr#" />
			<table style="width: 575px; font-size:20px;">
				<!---tr align="center">	
					<td colspan="2"><h3><p>Bulk Fuel Site Log:  Step 3</p></h3></td>
					</tr--->
				<tr align="center">	
					<td colspan="2"><h3>#fuel_site#-#fuel_type#</h3></td>
					</tr>
					<cfinput type="hidden" name="datetime_insert" value="#dt#" style="width: 100%;">
					<cfinput type="hidden" name="date_time" value="#DateFormat(Now(),"mm/dd/yyyy")#" style="width: 125px;" required="yes">
					<cfinput type="hidden" name="totalizer_update" value="Update" />
					<cfinput type="hidden" name="fuel_site" value="#fuel_site#" /><cfinput type="hidden" name="fuel_type" value="#fuel_type#" />
					<cfinput type="hidden" name="unit_identifier" value="Admin Totalizer" style="width: 100%;" maxlength="50"/>
					<cfinput type="hidden" name="pid_info" value="ADMIN" style="width: 100%;" maxlength="50"/>
					<cfinput type="hidden" name="odometer" value="0" style="width: 125px;" placeholder="No Tenths" maxlength="6"/>
					<cfinput type="hidden" step=".1" name="qty_fuel" value="0" style="width: 75px;"  />
					<cfinput type="hidden" step=".1" name="totalizer_end" value="#totalizer_start#" style="width: 75px;" validate="range" range=".0,9999" />
				<tr>
					<td>Totalizer Value:</td>
					<td><cfinput type="hidden" step=".1" name="totalizer_start" value="#totalizer_start#" style="width: 75px;" validate="range" range="0,9999"  maxlength="8" />#totalizer_start#</td>
					</tr>
				<tr>	
					<td>Exp. Category: (Required)</td>
					<td><cfselect id="business_purpose" name="business_purpose" required="yes" message="* Please enter ending totalizer reading.">
							<option value="Choose" disabled selected>Select:</option>
							<option value="Initialization">Initialization</option>
							<option value="Reset">Reset</option>
							</cfselect></td>
					</tr>	
				<!---tr>	
					<td>Project or Unit</td>
					<td><cfinput type="text" name="acct_code" value="" style="width: 100%px;" placeholder="Recommended" maxlength="50" /></td>
					</tr--->
				<tr>	
					<td>Don't Forget ---></td>
					<td><cfinput type="submit" name="update" value="Check Values" /> <a href="#cgi.SCRIPT_NAME#">RESET</a></td>
					</tr>					
				</table>
			</cfform>
		</cfoutput>
<!---Step 4 Check values---->
<cfelseif form.page eq 4>
<cfSet dt = DateFormat(Now(), "mm/dd/yyyy") & " " & TimeFormat(Now(), "HH:mm")>
<cfparam name="check_count" default="0">
	<cfoutput>
<!---Checking the error values before loading form ---->
				<cfif not isdate(#date_time#)><cfset check_count = check_count + 1></cfif>
				<!---cfif #qty_fuel# LT .0><cfset check_count = check_count + 1></cfif>
				<cfif #decimalformat(abs(totalizer_end - totalizer_start - qty_fuel))# GTE 0.2><cfset check_count = check_count + 1></cfif>
				<cfif #business_purpose# eq "MP"><cfset check_count = check_count + 1></cfif--->
				<cfif check_count eq "0">
					<cfset url.form.page=0>
					<cfelse>
					<cfset url.form.page=3>
				</cfif>
		<cfform name="form" action="#cgi.SCRIPT_NAME#?form.page=#url.form.page#" method="post">
			<table style="width: 575px; font-size:18px;">
				<tr align="center">	
					<td colspan="2"><h3><p><cfif check_count eq "0">Thank you for verifying the transaction information.<cfelse>We need you to review some information.</cfif></p></h3></td>
					</tr>
				<cfinput type="hidden" name="datetime_insert" value="#dt#" style="width: 100%;" />
				<cfinput type="hidden" name="totalizer_start" value="#totalizer_start#" />
				<cfinput type="hidden" name="fuel_site" value="#fuel_site#" />
				<cfinput type="hidden" name="fuel_type" value="#fuel_type#" />
				<cfinput type="hidden" name="unit_identifier" value="#unit_identifier#" />
				<cfinput type="hidden" name="pid_info" value="#pid_info#" />	
				<cfinput type="hidden" name="acct_code" value="#acct_code#" />
				<cfinput type="hidden" name="odometer" value="#odometer#" />
				<cfinput type="hidden" name="email_addr" value="#email_addr#" />
				<cfinput type="hidden" name="totalizer_update" value="#totalizer_update#" />
	<!----Check values-------------->			
				<cfif not isdate(#date_time#)>
				<tr>	
					<td>Date</td>
					<td><cfinput type="text" name="date_time" value="#DateFormat(Now(),"mm/dd/yyyy")#" style="width: 125px;" required="yes"></td>
					</tr><cfset check_count = check_count + 1>
					<cfelse><cfinput type="hidden" name="date_time" value="#date_time#" />
				</cfif>
				<cfif #qty_fuel# LT 0.0>
				<tr>	
					<td>Gallons Pumped: xx.x</td>
					<td><cfinput type="number" step=".1" name="qty_fuel" value="" style="width: 75px;"></td>
					</tr><cfset check_count = check_count + 1>
					<cfelse><cfinput type="hidden" name="qty_fuel" value="#qty_fuel#" />
					</cfif>
				<cfif #decimalformat(abs(totalizer_end - totalizer_start - qty_fuel))# GTE 0.2>
				<tr>
					<td>Totalizer End: xxx.x</td>
					<td><cfinput type="number" step=".1" name="totalizer_end" value="#totalizer_end#" style="width: 75px;" required="yes" message="Totalizer End: You must enter ending totalizer number."> Suggest: #(totalizer_start+qty_fuel)# <a href="#cgi.SCRIPT_NAME#?form.page=1&fuel_site=#fuel_site#&fuel_type=#fuel_type#">Go back</a></td>
					</tr><cfset check_count = check_count + 1>
					<cfelse><cfinput type="hidden" name="totalizer_end" value="#totalizer_end#" />					
					</cfif>
				<cfif #business_purpose# eq "MP">
				<tr>	
					<td>Business Purpose: (Required)</td>
					<td><cfselect id="business_purpose" name="business_purpose" required="yes">
							<option value="default" disabled selected>Select:</option>
							<option value="Field work">Field Work</option>
    						<option value="Research">Research</option>
    						<option value="Local travel">Local travel</option>
    						<option value="Out of state travel">Out of state travel</option>
							<option value="Various">Various</option>
							<option value="Totalizer">Totalizer Reading</option>
							</cfselect></td>
					</tr><cfset check_count = check_count + 1>
					<cfelse><cfinput type="hidden" name="business_purpose" value="#business_purpose#" maxlength="50" />
						</cfif>
				<cfif check_count neq '0'>
				<tr>			
					<td></td>
					<td><cfset form.page = 3><cfinput type="submit" name="update" value="Recheck" /> <a href="#cgi.SCRIPT_NAME#">RESET</a></td>
					</tr>
				<cfelse>
					<tr>			
					<td>Please submit final information</td>
					<td><cfset form.page = 5><cfinput type="submit" name="update" value="Submit" /> <!---a href="#cgi.SCRIPT_NAME#">RESET</a---></td>
					</tr></cfif>					
				</table>
			</cfform>
		</cfoutput>
</cfif>
</cfif>
<!---ul>
	<li><a href="aes_transeval.cfm" style="text-decoration:none;">Transaction Log</a></li>
	<li><a href="https://apps.motorpool.oregonstate.edu/apps/motorpool" style="text-decoration:none;">MP</a></li>
	</ul--->
	
<!--END Content-------------Dont edit below this line--------------------------------------------------------------------------->

</body>
</html>