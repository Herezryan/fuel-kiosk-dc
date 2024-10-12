<cfcomponent hint="Owner database functions">

<!---cffunction name="getProfile" output="false" returnType="struct" hint="I return information based on a call sign" access="remote"--->
<cffunction name="getInfo" output="false" returnType="struct" hint="I return information based on a Vehicle Number" access="remote">
<cfargument name="veh_no" type="string" required="false" default="">
<cfset var result = {}>

<!---cfswitch expression="#arguments.EQ_equip_no#">
<cfcase value="iceman">
<cfset result = {firstname="Raymond",trainedspotter=false,licenseplate="XXX11"}>
</cfcase>
<cfcase value="maverick">
<cfset result = {firstname="Tom",trainedspotter=true,licenseplate="AAA11"}>
</cfcase>

<cfcase value="goose">
<cfset result = {firstname="Fred",trainedspotter=false,licenseplate="GGG11"}>
</cfcase>

</cfswitch--->

<cfquery name="vehlookup" datasource="proto">
	select 
			EQ_equip_no, 
			year, 
			manufacturer, 
			model 
		from 
			EQ_MAIN 
		where 
			(
				PROCST_proc_status = 'A' and EQ_equip_no = #arguments.veh_no#
			) 
		order by 
			1 
		;
</cfquery>
<cfset result = {year="2005",manufacturer="Ford",model="F150"}>
<cfreturn result> 
</cffunction>

<!---cffunction name="getCallSigns" output="false" returnType="string" hint="I suggest call signs" access="remote"--->
<cffunction name="getVehInfo" output="false" returnType="string" hint="Vehicle Number" access="remote">
<cfargument name="EQ_equip_no" type="string" required="false" default="">
<!--- create a fake query --->
<!---cfset var q = queryNew("callsign")>
<cfset var r = "">

<cfset queryAddRow(q)>
<cfset querySetCell(q, "callsign", "iceman")>
<cfset queryAddRow(q)>
<cfset querySetCell(q, "callsign", "maverick")>
<cfset queryAddRow(q)>
<cfset querySetCell(q, "callsign", "goose")>

<cfquery name="r" dbtype="query">
select callsign
from q
where upper(callsign) like <cfqueryparam cfsqltype="cf_sql_varchar" value="#ucase(arguments.callsign)#%">
</cfquery--->

<cfquery name="vehlookup" datasource="proto">
		select 
			EQ_equip_no, 
			year, 
			manufacturer, 
			model 
		from 
			EQ_MAIN 
		where 
			(
				PROCST_proc_status = 'A'
			) 
		order by 
			1 
		;
</cfquery>

<!---cfreturn valueList(r.callsign)--->
<cfreturn valueList(vehlookup.EQ_equip_no)>

</cffunction>
</cfcomponent>
