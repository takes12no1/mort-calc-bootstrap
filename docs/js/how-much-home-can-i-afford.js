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
		"combinedIncome": "0",
		"childSupport": "0",
		"autoPayments": "0",
		"ccPayments": "0",
		"associationFees": "0",
		"otherObligations": "0",
		"mortgageRate": "3.75",
		"mortgageTerm": "30",
		"downPayment": "0",
		"propertyTaxes": "0",
		"hazardInsurance": "0",
		"frontRatio": "1",
		"backRatio": "1"
	};

	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"monthlyIncome": "0",
		"otherDebts": "0",
		"homeValue": "$.00",
		"responseText": "In general, lenders will cap the maximum monthly housing allowance (including taxes and insurance) by the lesser of two ratios: 28% and 36%.",
		"responseText3": "Your total monthly obligations (monthly housing allowance plus any other long-term obligations) may not exceed 36% of your monthly income.",
		"responseText2": "Your monthly housing allowance may not exceed 28% of your total monthly income.",
		"responseText4": "You have been capped by the 28% ratio. Including your down payment it appears you may qualify for home valued around $0.",
		"backPayment": "$.00",
		"frontPayment": "0",
		"maximumPayment": "$.00",
		"mortgageAmount": "$.00",
		"minimumPayment": "$.00",
		"otherPercentage": "0.0%",
		"taxesInsurance": "$.00",
		"front": "28.0%",
		"back": "36.0%"
	};
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
		"combinedIncome": "0",
		"childSupport": "0",
		"autoPayments": "0",
		"ccPayments": "0",
		"associationFees": "0",
		"otherObligations": "0",
		"mortgageRate": "3.75",
		"mortgageTerm": "30",
		"downPayment": "0",
		"propertyTaxes": "0",
		"hazardInsurance": "0",
		"frontRatio": "1",
		"backRatio": "1"
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
			//buildSummaryTable();
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
			"termMonths": {
				required: true,
				digits: true,
				minlength: 2,
				maxlength: 3
			},
			"propertyValue": {
				required: true,
				digits: true,
				minlength: 4,
				maxlength: 9
			},
			"propertyTaxes": {
				required: true,
				digits: true,
				maxlength: 5
			},
			"hazardInsurance": {
				required: true,
				digits: true,
				maxlength: 5
			},
			"pmi": {
				required: true,
				digits: true,
				maxlength: 4
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

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
		var numMortgageAmount = Number(calcResults.mortgageAmount.replace(/[^0-9\.]+/g, ""));
		var numDownPayment = Number(calcFormModel.downPayment.replace(/[^0-9\.]+/g, ""));
		//create table
		$resultsTable.html("");
		var html =

			"<div class='table-responsive'>" +
			"<table class='table table-bordered'><tbody><tr>" +
			"<th colspan='2' class='section'>Front-End Ratio</th></tr>" +
			"<tr><td>Monthly gross income</td><td>$" + numberWithCommas(calcResults.monthlyIncome) + "</td></tr>" +
			"<tr><td>Front-end ratio</td><td>" + calcResults.front + "</td></tr>" +
			"<tr><td>Calculated payment for front-end ratio</td><td>$" + numberWithCommas(calcResults.frontPayment) + "</td></tr>" +
			"<tr><td></td><td></td></tr>" +
			"<tr><th colspan='2' class='section'>Back-End Ratio</th></tr>" +
			"<tr><td>Debts and obligations</td><td>$" + calcResults.otherDebts + "</td></tr>" +
			"<tr><td>Percent of gross income</td><td>" + calcResults.otherPercentage + "</td></tr>" +
			"<tr><td>Maximum percentage available for mortgage payment</td><td>" + calcResults.back + "</td></tr>" +
			"<tr><td>Calculated payment for back-end ratio</td><td>" + calcResults.backPayment.slice(0, -3) + "</td></tr>" +
			"<tr><td></td><td></td></tr>" +
			"<tr><th colspan='2' class='section'>Payment Calculation</th></tr>" +
			"<tr><td>Minimum of the two ratio options</td><td>" + calcResults.minimumPayment.slice(0, -3) + "</td></tr>" +
			"<tr><td>Less: taxes and insurance</td><td>" + calcResults.taxesInsurance.slice(0, -3) + "</td></tr>" +
			"<tr><td>Equals: maximum allowable payment</td><td>" + calcResults.maximumPayment.slice(0, -3) + "</td></tr>" +
			"<tr><td>Calculated mortgage amount</td><td>" + calcResults.mortgageAmount.slice(0, -3) + "</td></tr>" +
			"<tr><td>Down payment</td><td>$" + calcFormModel.downPayment + "</td></tr>" +
			"<tr><td><b>Home value you can afford</b></td><td><b>$" + (numMortgageAmount + numDownPayment).toLocaleString().slice(0, -3) + "</b></td></tr>" +
			"</tbody></table>" +
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
		var html = "<h4 style='color: #1c5a7c; padding: 10px; line-height: 1.4em'>" + calcResults.responseText4 + "</h4>" +
			"<div class='panel panel-default'>" +
			"<div class='panel-heading'><h3 class='panel-title'>Explanation of Results</h3></div>" +
			"<div class='panel-body'>" +
			"<p class='resultText'>" + calcResults.responseText + "</p>" +
			"<p class='resultText'>" + calcResults.responseText2 + "</p>" +
			"<p class='resultText'>" + calcResults.responseText3 + "</p>" +
			"</div>" +
			"</div>";
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
			url: 'https://www.calcxml.com/rest/hom01',
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
				console.log(data);
			}
		});
	}

	function updateModelwithFormEntries() {
		calcFormModel.combinedIncome = $('#combinedIncome').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.childSupport = $('#childSupport').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.autoPayments = $('#autoPayments').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.ccPayments = $('#ccPayments').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.associationFees = $('#associationFees').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.otherObligations = $('#otherObligations').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.mortgageRate = formPercentageToFloatAsString($('#mortgageRate').val());
		calcFormModel.mortgageTerm = $('input[name=mortgageTerm]:checked').val();
		calcFormModel.downPayment = $('#downPayment').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.propertyTaxes = $('#propertyTaxes').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.hazardInsurance = $('#hazardInsurance').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.frontRatio = $('input[name=frontRatio]:checked').val();
		calcFormModel.backRatio = $('input[name=backRatio]:checked').val();
		//console.log(calcFormModel);
	}

	// enable all tooltips and popovers in document
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$("a.tooltip").tooltip();

});
