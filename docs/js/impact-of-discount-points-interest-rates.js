$(function() {
	'use strict';

	//INIT
	//Used to fill out the form on page load or reset
	var formDataDefault = {
		"username": "guest",
		"password": "water",
		"responseType": "raw2",
		"returnDataTable": "true",
		"chartLibrary": "",
		"language": "en",
		"countryCode": "US",
		"version": "1.3",
		"chartTitle": "",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"loanAmount": "150000",
		"termYears": "30",
		"interestRate1": "3",
		"interestRate2": "3.5",
		"discountPoints1": "0",
		"discountPoints2": "1"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"monthlySavings": "$-41.16",
		"monthlyPayment1": "$632.41",
		"monthlyPayment2": "$673.57",
		"discountSpread": "$1,500.00",
		"discountPoints1Amount": "$.00",
		"discountPoints2Amount": "$1,500.0",
		"responseText": "It doesn't appear to make sense to pay (extra) discount points to lower the rate as there is no additional costs associated with the discount points.",
		"chartUrl": "img/defaultImpactChart.png",
		"breakeven": "0.0"
	};
	buildSummary();
	postGraphic();

	//INIT done

	//SETUP VARS
	//used to build JSON object for submital
	var calcFormModel = {
		"username": "guest",
		"password": "water",
		"responseType": "raw2",
		"returnDataTable": "true",
		"chartLibrary": "image",
		"language": "en",
		"countryCode": "US",
		"version": "1.3",
		"chartTitle": "Principal and Interest Payments",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"loanAmount": "150000",
		"termYears": "30",
		"interestRate1": ".03",
		"interestRate2": ".035",
		"discountPoints1": "0",
		"discountPoints2": ".01"
	};


	//INTERACTIVE EVENTS
	// Reset Button
	$('form').on('reset', function(event) {
		setTimeout(function() {
			//put default items back into form
			populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
			//data back to default
			updateModelwithFormEntries();
			//redraw everything
			buildSummaryTable();
		});
	});

	//Change when moving between fields
	// var formChanged = false;
	// $(':input').on('input propertychange paste', function() {
	// 	return formChanged = true;
	// });
	// $(':input').blur(function() {
	// 	if (formChanged == true) {
	// 		console.log(formChanged);
	// 		updateModelwithFormEntries();
	// 		postData();
	// 		return formChanged = false;
	// 	}
	// });

	// Validation
	$('#restRequestForm').validate({
		rules: {
			"loanAmount": {
				required: true,
				digits: true,
				minlength: 5,
				maxlength: 9
			},
			"interestRate": {
				required: true,
				minlength: 1,
				maxlength: 5
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
	function buildSummary() {
		//specify div that houses table
		var $summary = $("#summary");
		//change strings to numbers for adding
		//var numMortgageAmount = Number(calcResults.mortgageAmount.replace(/[^0-9\.]+/g, ""));
		//var numDownPayment = Number(calcFormModel.downPayment.replace(/[^0-9\.]+/g, ""));
		var compare1PercentString = $('#interestRate1').val();
		var compare2PercentString = $('#interestRate2').val();

		//create table
		$summary.html("");
		var html = '<p>&nbsp</p>' +
			"<div class='panel panel-default'>" +
			"<div class='panel-heading'><h3 class='panel-title'>Explanation of Results</h3></div>" +
			"<div class='panel-body'>" +
			"<p class='resultText'>" + calcResults.responseText + "</p>" +
			"</div>" +
			"</div>" +

			"<div class='table-responsive'>" +
			"<table class='table table-bordered'><tbody><tr><th></th>" +
			"<th><span style='display: block'>Loan&nbsp;1</span>(" + compare1PercentString + "%)</th>" +
			"<th><span style='display: block'>Loan&nbsp;2</span>(" + compare2PercentString + "%)</th>" +
			"<th><span style='display: block'>Totals</span></th>" +
			"</tr><tr>" +
			"<td>Monthly payment (P&amp;I)</td>" +
			"<td>" + calcResults.monthlyPayment1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.monthlyPayment2.slice(0, -3) + "</td>" +
			"<td></td>" +
			"</tr><tr>" +
			"<td>Cost of discount points</td>" +
			"<td>" + calcResults.discountPoints1Amount.slice(0, -3) + "</td>" +
			"<td>" + calcResults.discountPoints2Amount.slice(0, -3) + "</td>" +
			"<td></td>" +
			"</tr><tr>" +
			"<td>Discount difference points between two loans</td>" +
			"<td></td>" +
			"<td></td>" +
			"<td>" + calcResults.discountSpread.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Divided by the monthly payment savings</td>" +
			"<td></td>" +
			"<td></td>" +
			"<td>" + calcResults.monthlySavings + "</td>" +
			"</tr><tr>" +
			"<td>Equals the months to breakeven</td>" +
			"<td></td>" +
			"<td></td>" +
			"<td>" + calcResults.breakeven + "</td>" +
			"</tr></tbody></table>";
		$summary.html(html);
	}

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
			url: 'https://www.calcxml.com/rest/hom05',
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
				console.log(data);
				buildSummary();
				postGraphic();
			}
		});
	}

	function updateModelwithFormEntries() {
		calcFormModel.loanAmount = $('#loanAmount').val();
		calcFormModel.termYears = $('#termYears').val();
		calcFormModel.interestRate1 = formPercentageToFloatAsString($('#interestRate1').val());
		calcFormModel.interestRate2 = formPercentageToFloatAsString($('#interestRate2').val());
		calcFormModel.discountPoints1 = formPercentageToFloatAsString($('#discountPoints1').val());
		calcFormModel.discountPoints2 = formPercentageToFloatAsString($('#discountPoints2').val());
		//console.log(calcFormModel);
	}

	// enable all tooltips and popovers in document
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$("a.tooltip").tooltip();

});
