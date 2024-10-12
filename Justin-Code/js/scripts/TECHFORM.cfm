<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<body>
<cfif not IsDefined("url.wr_no")>
	<cfset url.wr_no = 0>
</cfif>
<!---cfset url.wr_no = 100001--->
<cfquery name="wr" datasource="proto">
	Select * from work_requests where wr_no = #url.wr_no#
</cfquery>
<cfoutput> 
<table cellspacing="0" cellpadding="0">
  <TABLE style="font-size:9pt;" width="650" border="1" bordercolor="black" cellpadding="0" cellspacing="0">
      <tr>
        <td colSpan="20"  style="border:solid 1px ##000000;"><H2 align="center">Work Request #wr.wr_no#</H2></td>
      </tr>
      <tr>
        <td align="left" colspan="3">VEH <strong>#wr.veh_no#</strong></td>
        <td align="left" colspan="5" width="100">ODO <strong>#wr.odometer#</strong></td>
        <td  align="left" colSpan="7" width="150">SCHEDULED <strong>#dateformat(wr.Date_Scheduled, "mm/dd/yyyy")#</strong></td>
        <td align="left" colSpan="5">REQUIRED <strong>#dateformat(wr.Date_Req, "mm/dd/yyyy")#</strong></td>
      </tr>
      <tr>
        <td colspan="6">POOL<input type="checkbox" <cfif #wr.why# eq "Pool">checked="checked"</cfif> />PA<input type="checkbox" <cfif #wr.why# eq "PA">checked="checked"</cfif> />DO<input type="checkbox" <cfif #wr.why# eq "Department Owned">checked="checked"</cfif> />EXT<input type="checkbox" <cfif #wr.why# eq "External to OSU">checked="checked"</cfif> /></td>
        <td colSpan="8">YEAR <strong>#wr.Year#</strong></td>
        <td colspan="6">MAKE/MOD <strong>#wr.Make#/#wr.Model#</strong></td>
      </tr>
      <tr>
        <td colspan="3">PM A<input type="checkbox" <cfif #wr.Service# eq "A">checked="checked"</cfif> />B<input type="checkbox" <cfif #wr.Service# eq "B">checked="checked"</cfif> /></td>
        <td colSpan="12">CONTACT <strong>#wr.Contact_Name#</strong></td>
        <td colSpan="5">WO <strong>#wr.wo_num#</strong></td>
      </tr>
      <tr height="100" valign="top">
        <td colSpan="20">CUSTOMER COMMENT: #wr.repair_comment#</td>
      </tr>
	</TABLE>
</cfoutput>
	<TABLE style="font-size:10pt;" width="650" height="300" border="1" bordercolor="black" cellpadding="0" cellspacing="0">
	<tr>
		<td colspan="40"></td>
	</tr>
    <tr valign="top">
        <td colSpan="25" rowspan="11" width="300">TECH COMMENTS</td><td colspan="1" width="40" align="center">TECH</td><td colspan="11" align="center">LABOR CODE</td><td colspan="3" width="50" align="center">TIME</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="1">&nbsp;</td><td colspan="11">&nbsp;</td><td colspan="3">&nbsp;</td>
	</tr>
	</TABLE>
	<TABLE style="font-size:10pt;" width="650" height="375" border="1" bordercolor="black" cellpadding="0" cellspacing="0">
	<tr>
		<td colspan="20"></td>
	</tr>
	<tr>
		<td colspan="2" align="center">QTY</td>
		<td colSpan="7" align="center">PART NO</td>
		<td colSpan="7" align="center">DESCRIPTION</td>
		<td colSpan="4" align="center">PART CODE</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="7">&nbsp;</td>
		<td colSpan="4">&nbsp;</td>
	</tr>
  </TABLE>
</table>
</body>
</html>