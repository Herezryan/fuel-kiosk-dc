<!doctype html>
<html lang="en">
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
      <cfoutput query="query1">
        "<cfoutput>#lookup.columnName#</cfoutput>",
      </cfoutput>
    ];
    var availableTags2 = [
      <cfoutput query="query2">
        "<cfoutput>#query2.columnName#</cfoutput>",
      </cfoutput>
    ];

    // Initialize autocomplete for each input
    $( "#tags1" ).autocomplete({
      source: availableTags1
    });

    $( "#tags2" ).autocomplete({
      source: availableTags2
    });
  } );
  </script>
</head>
<body>
<cfquery name="lookup" datasource="proto">
	SELECT bulkfuel.pid_info, Count(bulkfuel.pid_info) AS CountOfpid_info
	FROM bulkfuel
	WHERE (((bulkfuel.datetime_Insert)>"1/1/2024")) and (((bulkfuel.pid_info) Not Like "admin") AND ((bulkfuel.loc_code)="dairy") AND ((Count(bulkfuel.pid_info)) Not Like "ADMIN"));
GROUP BY bulkfuel.pid_info, bulkfuel.loc_code	
</cfquery>

<div class="ui-widget">
  <label for="tags1">Tags 1: </label>
  <input id="tags1">
</div>

<div class="ui-widget">
  <label for="tags2">Tags 2: </label>
  <input id="tags2">
</div>
 
</body>
</html>
