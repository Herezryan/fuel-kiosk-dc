<cfset vehno = url.q>
<cfquery name="yearlookup" datasource="proto">
		select 
			EQ_equip_no, 
			year, 
			manufacturer, 
			model 
		from 
			EQ_MAIN 
		where 
			(
				PROCST_proc_status = 'A' and EQ_equip_no = '#vehno#'
			) 
		order by 
			1 
		;
</cfquery>
<cfoutput>#yearlookup.year#,#yearlookup.manufacturer#,#yearlookup.model#</cfoutput>

