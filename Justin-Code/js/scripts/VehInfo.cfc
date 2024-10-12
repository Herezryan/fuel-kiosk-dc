<cfcomponent hint="Owner database functions">

   <cffunction name="getProfile" output="false" returnType="struct" hint="I return information based on a call sign" access="remote">
<cfargument name="veh_no" type="string" required="false" default="">
<cfset var result = {}>

<cfquery name="vehlookup" datasource="proto">
	select 
			EQ_equip_no, year, manufacturer, model, emsdba.opr_main.oper_name, email_addr, work_phone
		from 
			EQ_MAIN left outer join emsdba.opr_main on emsdba.eq_main.oper_oper_no = emsdba.opr_main.oper_oper_no
		where 
			(
				PROCST_proc_status = 'A' and EQ_equip_no = '#arguments.veh_no#'
			) 
		order by 
			1 
		;
</cfquery>

<cfset result = {year="#vehlookup.year#",manufacturer="#vehlookup.manufacturer#",model="#vehlookup.model#",contact="#vehlookup.oper_name#",phone="#vehlookup.work_phone#",email="#vehlookup.email_addr#"}>
<cfreturn result> 
</cffunction>

<cffunction name="getVehNum" output="false" returnType="string" hint="I suggest call signs" access="remote">
<cfargument name="veh_no" type="string" required="false" default="">

<cfquery name="EQ_equip_no" datasource="proto">
	select 
			EQ_equip_no as veh_no
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

<cfreturn valueList(EQ_equip_no.veh_no)>

</cffunction>
</cfcomponent>
