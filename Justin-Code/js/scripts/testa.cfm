<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">;
<html>
<head>

</head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Untitled Document</title>


<br><br>

<body>
<cfform>
<table>
<tr>
<td>Vehicle Number:</td>
<td><cfinput type="text" name="veh_no" id="veh_no" autosuggest="cfc:carInfo.getVehInfo({cfautosuggestvalue})"></td>
</tr>
<tr>
<td>Year:</td>
<td><cfinput type="text" name="year" id="year"></td>
</tr>
<tr>
<td>Make:</td>
<td><cfinput type="checkbox" name="make" id="make"></td>
</tr>
<tr>
<td>Model:</td>
<td><cfinput type="text" name="model" id="model"></td>
</tr>
</table>
<cfajaxproxy bind="javaScript:loadit({veh_no})">
<cfajaxproxy cfc="carInfo" jsclassname="carinfoservice">
</cfform>

</body>
</html>

<script>
var ci = new carinfoservice();
function loadit(cs) {
var data = ci.getInfo(cs);
alert(data.year);
if(data.year != null) document.getElementById('year').value = data.year;
if(data.manufacturer != null) document.getElementById('make').value = data.manufacturer;
if(data.model != null) document.getElementById('model').value = data.model;
console.dir(data);
}
</script>



