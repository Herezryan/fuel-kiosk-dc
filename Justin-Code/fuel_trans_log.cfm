<!DOCTYPE html>
<html>
<head>
	<!-- HTML HEAD --> 
	<cfinclude template="include_components\html_head.cfm">
	
</head>

<body>
  
	<!-- HEADER --> 
	<!---cfinclude template="include_components\header.cfm"--->

	<!-- SECTION: Body -->
	<section id = "body">
		<div id="bd" class = ""> 
			<div class="yui3-g">

			<!-- NAVIGATION -->	
				<!---finclude template="include_components\menu_internal.cfm"--->

				<!-- CORE -->
				<div class="yui3-u-5-7">	
					<div id="content">

											
<!--Content---------------Dont edit above this line------------------------------------------------------------------------->
<cfif not len(getAuthUser())>
	<cflocation url="index.cfm">
	<cfelse>
<cfparam name="url.loc_code" default="">
<cfparam name="url.EQ_NO" default="">
<cfparam name="url.FUEL_TYPE" default="">
<cfparam name="url.FTK_DATE" default="">
<cfparam name="url.ACCT_CODE" default="">
<cfparam name="url.business_purpose" default="">
<cfparam name="url.pid_info" default="">
<cfparam name="url.sort" default="datetime_insert">
<cfparam name="totalizer_update" default="">
<cfparam name="update" default="">
<cfif not isdefined ("url.end")>
	<cfSet url.end = DateFormat(Now(), "mm/dd/yyyy")>
	</cfif>
<cfif not isdefined ("url.start")>
	<cfSet url.start = dateformat(url.end -7, "mm/dd/yyyy")>
	</cfif>
<!----Begin form data----------------------------------->
<cfoutput>
		<cfform action="#cgi.SCRIPT_NAME#" method="get">
			<table style="font-size:16px;">
				<tr align="center">	
					<td colspan="4"><font style="font-size:20px;"><u><b>Fuel Trans. Review</b></u></font></td>
					</tr>
				<tr align="center">	
					<td colspan="4"><font style="font-size:20px;"><u><b></b></u>Use % as interior wildcard i.e. 933%45</font></td>
					</tr>					
				<tr>
					<td>LOCATION</td>
					<td><input type="text" name="loc_code" value="#loc_code#" style="width: 125px;" autofocus></td>
					<td>PID_INFO</td>
					<td><input type="text" name="pid_info" value="#pid_info#"style="width: 125px;"></td>
					<td rowspan="5">
						<ul>
							<li><a href="fuel_trans_input.cfm">Go back to log</a></li>
							<li><a href="index.cfm?logout=true">Log Out</a></li>	
							</ul>
							</td>
					</tr></tr>
				<tr>
					<td>FUEL TYPE</td>
					<td><input type="text" name="FUEL_TYPE" value="#FUEL_TYPE#" style="width: 125px;"></td>
					<td>Business Purpose</td>
					<td><input type="text" name="business_purpose" value="#business_purpose#"style="width: 125px;"></td>					
					</tr> 
				<tr>
					<td>EQ NO/Unit</td>
					<td><input type="text" name="EQ_NO" value="#EQ_NO#" style="width: 125px;"></td>
					<td>Project/Unit</td>
					<td><input type="text" name="ACCT_CODE" value="#ACCT_CODE#"style="width: 125px;"></td>
					</tr>
				<tr>
					<td>Start Date</td>
					<td><input type="text" name="start" value="#url.start#"style="width: 125px;"></td>
					<td>End Date</td>
					<td><input type="text" name="end" value="#url.end#"style="width: 125px;"></td>	</tr>
				<tr>
					<td align="left"><button type="button"><a href="#cgi.SCRIPT_NAME#" style="font-size:16px; text-decoration:none;">RESET FILTERS</a></button></td>
					<td><cfinput type="submit" name="Update" value="FILTER"/> </td>
					<td>Apply filters and then:</td>
					<td><cfinput type="submit" name="Update" value="DOWNLOAD"/> </td></tr>	
				</table>
			</cfform>
	</cfoutput>
<cfoutput>
<cfquery name="Trans_Eval" datasource="proto">
	SELECT 
		FTK_bulkfuel.id, 
		FTK_bulkfuel.datetime_Insert, 
		FTK_bulkfuel.ftk_date, 
		FTK_bulkfuel.loc_code, 
		FTK_bulkfuel.fuel_type, 
		FTK_bulkfuel.totalizer_start, 
		FTK_bulkfuel.eq_no, 
		FTK_bulkfuel.pid_info, 
		FTK_bulkfuel.odometer, 
		FTK_bulkfuel.qty_fuel, 
		FTK_bulkfuel.totalizer_end, 
		FTK_bulkfuel.acct_code, 
		FTK_bulkfuel.business_purpose,
		FTK_bulkfuel.totalizer_update
		FROM 
		FTK_bulkfuel 
	WHERE 	(FTK_BULKFUEL.LOC_CODE like '%#url.LOC_CODE#%') 
			and (FTK_BULKFUEL.FUEL_TYPE like '%#url.FUEL_TYPE#')
			and (FTK_BULKFUEL.EQ_NO like '%#url.EQ_NO#%') 
			and (FTK_BULKFUEL.pid_info like '%#url.pid_info#') 			
			and (FTK_BULKFUEL.ACCT_CODE like '%#url.ACCT_CODE#%')
			and (FTK_BULKFUEL.business_purpose like '%#url.business_purpose#%') 
			and convert(datetime, ftk_date, 101) >= convert(datetime,'#url.start#',101) AND convert(datetime, ftk_date, 101) <= convert(datetime,'#url.end#',101)			
	order by 	
			<cfif url.sort eq "loc_code">loc_code
				<cfelseif url.ftk_date eq "eq_no">ftk_date
				<cfelseif url.sort eq "eq_no">eq_no
				<cfelseif url.sort eq "fuel_type">fuel_type
				<cfelseif url.sort eq "acct_code">acct_code
				<cfelseif url.sort eq "pid_info">pid_info
				<cfelseif url.sort eq "business_purpose">business_purpose
				<cfelseif url.sort eq "business_purpose">totalizer_update
				<cfelse>datetime_insert
				</cfif>
</cfquery>
</cfoutput>
<!----Pass download request to export CSV with filtered data--------------------->
<cfif update eq "Download">
<cfsavecontent variable="strExcelData">
<cfoutput>
Datetime,ALT Date,LOC,Fuel_type,Totalizer_Start,UNIT,Pid_info,Odometer,Qty_fuel,Totalizer_End,Proj./Unit,Business Purpose,Eval,
</cfoutput>
<cfoutput query="trans_eval">"#trans_eval.datetime_Insert#","#trans_eval.ftk_date#","#trans_eval.loc_code#","#trans_eval.fuel_type#","#trans_eval.totalizer_start#","#trans_eval.eq_no#","#trans_eval.pid_info#","#trans_eval.odometer#","#trans_eval.qty_fuel#","#trans_eval.totalizer_end#","#trans_eval.acct_code#","#trans_eval.business_purpose#","#decimalformat(abs(trans_eval.totalizer_end - trans_eval.totalizer_start - trans_eval.qty_fuel))#",
</cfoutput>
	</cfsavecontent>
	<cfheader name="Content-Disposition" value="application; filename=bulkfuel.csv"	/>
		<cfset strFilePath = GetTempFile(
			GetTempDirectory(),
			"excel_") />
		<cffile action="WRITE" file="#strFilePath#" output="#strExcelData.Trim()#" />
	<cfcontent type="application/vnd.ms-excel" file="#strFilePath#" deletefile="true" />
</cfif>
<!---Viewable Table--->
<table>
		<tr><cfoutput>
			<th><a href="#cgi.SCRIPT_NAME#?sort=datetime_insert&loc_code=#loc_code#&fuel_type=#url.fuel_type#&eq_no=#eq_no#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>Datetime</u></a></font></th>
			<th><a href="#cgi.SCRIPT_NAME#?sort=ftk_date&loc_code=#loc_code#&eq_no=#eq_no#&fuel_type=#url.fuel_type#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&url.start=#url.start#&start=#start#&end=#end#"><font color="black"><u>ALT Date</u></a></font></th>
			<th><a href="#cgi.SCRIPT_NAME#?sort=loc_code&loc_code=#loc_code#&eq_no=#eq_no#&fuel_type=#url.fuel_type#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>LOC</u></a></font></th>
			<!---th><a href="#cgi.SCRIPT_NAME#?sort=loc_name"><font color="black"><u>Loc_name</u></a></font></th--->
			<th><a href="#cgi.SCRIPT_NAME#?sort=fuel_type&loc_code=#url.loc_code#&eq_no=#eq_no#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>Fuel_type</u></a></font></th>
			<th><font color="black"><u>Start</u></font></th>
			<th><a href="#cgi.SCRIPT_NAME#?sort=eq_no&loc_code=#loc_code#&eq_no=#eq_no#&fuel_type=#url.fuel_type#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>UNIT</u></a></font></th>
			<th><a href="#cgi.SCRIPT_NAME#?sort=pid_info&loc_code=#loc_code#&eq_no=#eq_no#&fuel_type=#url.fuel_type#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>Pid_info</u></a></font></th>
			<th><font color="black"><u>Odometer</u></font></th>
			<th><font color="black"><u>Qty</u></font></th>
			<th><font color="black"><u>End</u></font></th>
			<th><a href="#cgi.SCRIPT_NAME#?sort=business_purpose&loc_code=#loc_code#&eq_no=#eq_no#&fuel_type=#url.fuel_type#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>Business Purpose</u></a></font></th>
			<th><a href="#cgi.SCRIPT_NAME#?sort=acct_code&loc_code=#loc_code#&eq_no=#eq_no#&fuel_type=#url.fuel_type#&pid_info=#pid_info#&acct_code=#acct_code#&business_purpose=#business_purpose#&start=#start#&end=#end#"><font color="black"><u>Proj./Unit</u></a></font></th>
			<th><font color="black"><u>Variance</u></font></th>
			<th><font color="black"><u>Totalizer</u></font></th>			
				</cfoutput>
			</tr>
	<cfoutput query="trans_eval">
		<tr>
			<td>#trans_eval.datetime_Insert#</td>
			<td><cfif decimalformat(trans_eval.datetime_insert - trans_eval.ftk_date) GT 1>#trans_eval.ftk_date#</cfif></td>
			<td><a href="#cgi.SCRIPT_NAME#?sort=#sort#&eq_no=#url.eq_no#&fuel_type=#url.fuel_type#&pid_info=#url.pid_info#&acct_code=#url.acct_code#&business_purpose=#url.business_purpose#&start=#url.start#&end=#url.end#&loc_code=#loc_code#" style="text-decoration:none;">#trans_eval.loc_code#</a></td>
			<!---td>#trans_eval.name#</td--->
			<td><a href="#cgi.SCRIPT_NAME#?sort=#sort#&loc_code=#url.loc_code#&eq_no=#url.eq_no#&pid_info=#url.pid_info#&acct_code=#url.acct_code#&business_purpose=#url.business_purpose#&start=#url.start#&end=#url.end#&fuel_type=#fuel_type#" style="text-decoration:none;">#trans_eval.fuel_type#</td>
			<td>#trans_eval.totalizer_start#</td>
			<td><a href="#cgi.SCRIPT_NAME#?sort=#sort#&loc_code=#url.loc_code#&fuel_type=#url.fuel_type#&pid_info=#url.pid_info#&acct_code=#url.acct_code#&business_purpose=#url.business_purpose#&start=#url.start#&end=#url.end#&eq_no=#eq_no#" style="text-decoration:none;">#trans_eval.eq_no#<a/></td>
			<td><a href="#cgi.SCRIPT_NAME#?sort=#sort#&loc_code=#url.loc_code#&eq_no=#url.eq_no#&fuel_type=#url.fuel_type#&acct_code=#url.acct_code#&business_purpose=#url.business_purpose#&start=#url.start#&end=#url.end#&pid_info=#pid_info#" style="text-decoration:none;">#trans_eval.pid_info#</a></td>
			<td>#trans_eval.odometer#</td>
			<td>#trans_eval.qty_fuel#</td>
			<td>#trans_eval.totalizer_end#</td>
			<td><a href="#cgi.SCRIPT_NAME#?sort=#sort#&loc_code=#url.loc_code#&eq_no=#url.eq_no#&fuel_type=#url.fuel_type#&pid_info=#url.pid_info#&acct_code=#url.acct_code#&start=#url.start#&end=#url.end#&business_purpose=#business_purpose#" style="text-decoration:none;">#trans_eval.business_purpose#</td>
			<td><a href="#cgi.SCRIPT_NAME#?sort=#sort#&loc_code=#url.loc_code#&eq_no=#url.eq_no#&fuel_type=#url.fuel_type#&pid_info=#url.pid_info#&business_purpose=#url.business_purpose#&start=#url.start#&end=#url.end#&acct_code=#acct_code#" style="text-decoration:none;">#trans_eval.acct_code#</td>
			<td><cfif #decimalformat(abs(trans_eval.totalizer_end - trans_eval.totalizer_start - trans_eval.qty_fuel))# GTE 0.1>
				<b>#DECIMALformat((trans_eval.totalizer_end - trans_eval.totalizer_start - trans_eval.qty_fuel))#</b></cfif></td>
			<td>#trans_eval.totalizer_update#</td>					
			</tr>
		</cfoutput>

	</table>
	</cfif>
<!--END Content-------------Dont edit below this line--------------------------------------------------------------------------->
					</div>
				</div> 
				<!--
				<div class="yui3-u-1-6">
					<div id="right_nav" >
					</div>
				</div>
				-->
			</div>
		</div>
	</section>
	<!-- FOOTER --> 	
	<cfinclude template="include_components\footer.cfm">
</body>
</html>