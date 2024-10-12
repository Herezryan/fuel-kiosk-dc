<cfapplication sessionmanagement="Yes" 
    sessiontimeout=#CreateTimeSpan(0,8,45,0)# name="bulkfuelsite">
<cfparam name="login_message" default="">
<cfparam name="userno" default="">
<cfif isDefined("url.logout") and url.logout>
    <cflogout>
</cfif>
<cflogin>
    <cfif isDefined('cflogin')>
		<cfset variables.roles="">
		<cfquery datasource="proto" name="motorpool_logins">
			select oper_oper_no from USR_MAIN
			where USR_userid = '#cflogin.name#'
			and disabled_reason = '#cflogin.password#'
		</cfquery>
		<cfif motorpool_logins.recordCount gt 0>
			<cfset variables.roles=ListAppend(variables.roles,'#motorpool_logins.oper_oper_no#')>
			<cfset cflogin.name=#motorpool_logins.oper_oper_no#>
		</cfif>
		<cfif ListLen(variables.roles) gt 0>
            <cfloginuser name="#cflogin.name#" password="#cflogin.password#" roles="#variables.roles#">
		<cfelse>
			<cfset login_message="<b>Password did not match for location selected. Please retry.</b>">
        </cfif>
    </cfif>
</cflogin>
