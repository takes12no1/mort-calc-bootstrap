$(function() {
	'use strict';

	//INIT
	var formDataDefault = {
		"username": "guest",
		"password": "water",
		"responseType": "raw2",
		"returnDataTable": "true",
		"chartLibrary": "image",
		"language": "en",
		"countryCode": "US",
		"version": "1.3",
		"chartTitle": "Ammortization Graph",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"loanAmount": "100,000",
		"interestRate": "4.50",
		"currentTerm": "300",
		"refinanceRate": "3.75",
		"refinanceTerm": "360",
		"originationFee": "1",
		"discountPoints": "0",
		"refinanceFees": "2,500"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"currentPayment": "$555.83",
		"responseText": "A 'traditional' breakeven analysis calculates all costs associated with a refinancing and divides by the monthly payment savings achieved by refinancing. Although the 'traditional' method does a good job evaluating when you might make your money back it ignores one key factor-your new mortgage will probably now have a longer term than your existing one.",
		"chartUrl": "img/defaultRefiChart.png",
		"responseText3": "If you plan on staying in your home for longer than 38 months it may be time to refinance. After 38 months you would breakeven (recover the closing cost) and save money over your current mortgage situation. Your monthly payment would drop from $556 to $463, putting $93 each month into your own pocket and you could save $28 in interest over the life of the loan.",
		"responseText2": "To overcome this discrepancy, we recommend that you increase your monthly payment on your refinanced loan slightly until the refinanced loan pays off at the same time as the existing mortgage - 'enhanced' refinance. Your monthly payment will be slightly higher than the 'traditional' refinance, but your mortgage will pay off faster and you will reduce your overall interest paid. Below is an analysis of your situation.",
		"enhancedTerm": "300.0",
		"currentTermO": "300.0",
		"traditionalPayment": "$463.12",
		"traditionalInterest": "$66,721.61",
		"enhancedInterest": "$54,239.36",
		"traditionalBreakeven": "38 months",
		"enhancedPayment": "$514.13",
		"enhancedBreakeven": "84 months",
		"traditionalTerm": "360.0",
		"currentInterest": "$66,749.74"
	};
	buildSummaryTable();
	buildSummary();
	postGraphic();
	//INIT done

	//SETUP VARS
	var calcFormModel = {
		"username": "guest",
		"password": "water",
		"responseType": "raw2",
		"returnDataTable": "true",
		"chartLibrary": "image",
		"language": "en",
		"countryCode": "US",
		"version": "1.3",
		"chartTitle": "Ammortization Graph",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"loanAmount": "100000",
		"interestRate": ".0475",
		"currentTerm": "360",
		"refinanceRate": ".0375",
		"refinanceTerm": "360",
		"originationFee": ".01",
		"discountPoints": "0",
		"refinanceFees": "2500"
	};


	//INTERACTIVE EVENTS
	// Reset Button
	$('form').on('reset', function(event) {
		setTimeout(function() {
			//put default items back into form
			populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
			//data back to default
			updateModelwithFormEntries();
			postData();
		});
	});

	//open advanced form feilds and change button text
	$("#advancedSimple").click(function() {
		//$(this).toggleClass("active");
		if ($(this).html() == 'Advanced <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>') {
			$(this).html('Simple <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>');
			//set estimateTipmi to N
			//mortgageCalcFormModel.estimateTipmi = "N";
			//console.log("Estimate? " + mortgageCalcFormModel.estimateTipmi);

		}
		else {
			$(this).html('Advanced <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>');
			//console.log("simple function");
			//set estimateTipmi to Y
			//mortgageCalcFormModel.estimateTipmi = "Y";
			//console.log("Estimate? " + mortgageCalcFormModel.estimateTipmi);
		}
	});

	//Tabs for results
	$('#summary a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})
	$('#resultsGraphic a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})
	$('#resultsTableContainer a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})

	//Change when moving between fields
	var formChanged = false;
	$(':input').on('input propertychange paste', function() {
		return formChanged = true;
	});
	$(':input').blur(function() {
		if (formChanged == true) {
			console.log(formChanged);
			updateModelwithFormEntries();
			postData();
			return formChanged = false;
		}
	});

	// Validation
	$('#restRequestForm').validate({
		rules: {
			"loanAmount": {
				required: true,
				number: true,
				minlength: 5,
				maxlength: 10
			},
			"interestRate": {
				required: true,
				number: true,
				minlength: 1,
				maxlength: 5
			},
			"termMonths": {
				required: true,
				digits: true,
				minlength: 2,
				maxlength: 3
			},

		},
		// submitHandler: function(form) {
		// 	console.log("Validate submitHandler");

		// },
		// invalidHandler: function(event, validator) {
		// 	console.log("number of invalid fields" + validator.numberOfInvalids());
		// },

	});

	//FUNCTIONS
	//push the graphic to Ammortization tab
	function postGraphic() {
		//change the graphic source to https
		var httpsChartURL = calcResults.chartUrl.replace(/^http:\/\//i, 'https://');
		//look to see if the div exists
		var exists = $('#resultsGraphic');
		//if it doesn't draw it
		if (!exists.length) {
			$('#resultsGraphic').prepend('<img id="resultsGraphic" src="' + httpsChartURL + '"/>');
		}
		//if it does erase the old and paint the new
		else {
			$('#resultsGraphic').html("");
			$('#resultsGraphic').prepend('<img id="resultsGraphic" src="' + httpsChartURL + '"/>');
		}
	}

	//push Default Data into form
	function populate(frm, formDataDefault) {
		$.each(formDataDefault, function(key, value) {
			var ctrl = $('[name=' + key + ']', frm);
			switch (ctrl.prop("type")) {
				case "radio":
				case "checkbox":
					ctrl.each(function() {
						if ($(this).attr('value') == value) $(this).attr("checked", value);
					});
					break;
				default:
					ctrl.val(value);
			}
		});
	};

	//Build the summary table
	function buildSummaryTable() {
		//specify div that houses table
		var $resultsTable = $("#resultsTableContainer");
		//change strings to numbers for adding
		//var numMortgageAmount = Number(calcResults.mortgageAmount.replace(/[^0-9\.]+/g, ""))
		//create table
		$resultsTable.html("");
		var html = "<div class='table-responsive'>" +
			"<table class='table table-bordered'><tbody><tr>" +
			"<th></th>" +
			"<th scope='col'>Current</th>" +
			"<th scope='col'>Traditional Refinance</th>" +
			"<th scope='col'>Enhanced Refinance</th></tr>" +
			"<tr>" +
			"<td>Term</td>" +
			"<td>" + parseInt(calcResults.currentTermO) + "</td>" +
			"<td>" + parseInt(calcResults.traditionalTerm) + "</td>" +
			"<td>" + parseInt(calcResults.enhancedTerm) + "</td>" +
			"</tr><tr>" +
			"<td>Payment</td>" +
			"<td>" + calcResults.currentPayment.slice(0, -3) + "</td>" +
			"<td>" + calcResults.traditionalPayment.slice(0, -3) + "</td>" +
			"<td>" + calcResults.enhancedPayment.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Breakeven</td>" +
			"<td>N/A</td>" +
			"<td>" + calcResults.traditionalBreakeven + "</td>" +
			"<td>" + calcResults.enhancedBreakeven + "</td>" +
			"</tr><tr>" +
			"<td>Total Interest</td>" +
			"<td>" + calcResults.currentInterest.slice(0, -3) + "</td>" +
			"<td>" + calcResults.traditionalInterest.slice(0, -3) + "</td>" +
			"<td>" + calcResults.enhancedInterest.slice(0, -3) + "</td>" +
			"</tr></tbody></table>" +
			"</div>";
		$resultsTable.html(html);
	}

	//Build the summary table
	function buildSummary() {
		//specify div that houses table
		var $summary = $("#summary");
		//change strings to numbers for adding
		//var numMortgageAmount = Number(calcResults.mortgageAmount.replace(/[^0-9\.]+/g, ""))
		//create table
		$summary.html("");
		var html = "<p>&nbsp</p>" +
			"<p class='resultText'>" + calcResults.responseText + "</p>" +
			"<h3>Explanation of Results</h3>" +
			"<p class='resultText'>" + calcResults.responseText3 + "</p>" +
			"<p class='resultText'>" + calcResults.responseText2 + "</p>";
		$summary.html(html);
	}

	//SubmitHandler
	$('#restRequestForm').submit(function(e) {

		e.preventDefault();
		updateModelwithFormEntries();
		postData();

	});

	function postData() {
		// var data = JSON.stringify(eval(mortgageCalcFormModel));
		// console.log(data);
		var data = JSON.stringify(calcFormModel);
		//console.log(data2);
		$.ajax({
			url: 'https://www.calcxml.com/rest/hom02',
			type: 'post',
			data: data,
			headers: {
				'accept': 'application/json',
				'Content-Type': 'application/json',
				'charset': 'utf-8'
			},
			dataType: 'json',
			success: function(data) {
				calcResults = data;
				buildSummaryTable();
				buildSummary();
				postGraphic();
				console.log(data);
			}
		});
	}

	function updateModelwithFormEntries() {
		calcFormModel.loanAmount = $('#loanAmount').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.interestRate = formPercentageToFloatAsString($('#interestRate').val());
		calcFormModel.currentTerm = $('#currentTerm').val();
		calcFormModel.refinanceRate = formPercentageToFloatAsString($('#refinanceRate').val());
		calcFormModel.refinanceTerm = $('#refinanceTerm').val();
		calcFormModel.originationFee = formPercentageToFloatAsString($('#originationFee').val());
		calcFormModel.discountPoints = formPercentageToFloatAsString($('#discountPoints').val());
		calcFormModel.refinanceFees = $('#refinanceFees').val().replace(/[^0-9\.]+/g, "");
		//console.log(calcFormModel);
	}

	// enable all tooltips and popovers in document
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$("a.tooltip").tooltip();

});
