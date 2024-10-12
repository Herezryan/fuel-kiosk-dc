<cfquery name="lookup" datasource="proto">
	SELECT FTK_bulkfuel.pid_info, Count(distinct FTK_bulkfuel.pid_info) AS CountOfpid_info
	FROM FTK_bulkfuel
	WHERE (((FTK_bulkfuel.datetime_Insert)>'1/1/2024'))
	GROUP BY FTK_bulkfuel.pid_info, FTK_bulkfuel.loc_code
	HAVING (((FTK_bulkfuel.pid_info) Not Like 'admin') AND ((FTK_bulkfuel.loc_code)='dairy') AND ((Count(FTK_bulkfuel.pid_info)) Not Like 'ADMIN'));
</cfquery>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Autocomplete - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <script>
  $( function() {
    // Fetch values from ColdFusion queries dynamically
    var availableTags1 = [
	<cfoutput query="lookup">
        "<cfoutput>#lookup.pid_info#</cfoutput>",
      </cfoutput>
    ];

    // Initialize autocomplete for each input
    $( "#tags1" ).autocomplete({
      source: availableTags1
    });


  } );
  </script>
</head>
<body>



<cfform name="form">
<cfinput name="firstName" id="firstName" type="text" autoSuggest="#valueList(lookup.pid_info)#" typeahead="true">
  </cfinput>


 </cfform>
</body>
</html>
