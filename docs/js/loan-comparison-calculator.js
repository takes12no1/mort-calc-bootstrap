$(function() {
	'use strict';

	//INIT
	//Used to fill out the form on page load or reset
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
		"barColor1": "4984B0",
		"barColor2": "957A5D",
		"barColor3": "252C37",
		"barColor4": "5E5553",
		"barColor5": "252C37",
		"barColor6": "957A5D",
		"loanAmount1": "300000",
		"loanAmount2": "300000",
		"loanAmount3": "300000",
		"termYears1": "15",
		"termYears2": "20",
		"termYears3": "30",
		"statedRate1": "3",
		"statedRate2": "3.5",
		"statedRate3": "4",
		"discount1": "0",
		"discount2": "0",
		"discount3": "0",
		"origination1": "1",
		"origination2": "1",
		"origination3": "1",
		"lender1": "600",
		"lender2": "600",
		"lender3": "600",
		"title1": "50",
		"title2": "50",
		"title3": "50",
		"other1": "300",
		"other2": "300",
		"other3": "300"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"investmentReturn": "",
		"responseText": "",
		"chartUrl": "",
		"pvLoan1": "",
		"pvLoan2": "",
		"pvLoan3": "",
		"totalCost3": "",
		"totalCost2": "",
		"totalCost1": "",
		"monthlyPayment1": "",
		"monthlyPayment2": "",
		"monthlyPayment3": "",
		"remainingBalance1": "",
		"remainingBalance2": "",
		"remainingBalance3": ""
	};
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
		"chartTitle": "Ammortization Graph",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "4984B0",
		"barColor2": "957A5D",
		"barColor3": "252C37",
		"barColor4": "5E5553",
		"barColor5": "252C37",
		"barColor6": "957A5D",
		"loanAmount1": "300000",
		"loanAmount2": "300000",
		"loanAmount3": "300000",
		"termYears1": "15",
		"termYears2": "20",
		"termYears3": "30",
		"statedRate1": ".03",
		"statedRate2": ".035",
		"statedRate3": ".04",
		"discount1": "0",
		"discount2": "0",
		"discount3": "0",
		"origination1": ".01",
		"origination2": ".01",
		"origination3": ".01",
		"lender1": "600",
		"lender2": "600",
		"lender3": "600",
		"title1": "50",
		"title2": "50",
		"title3": "50",
		"other1": "300",
		"other2": "300",
		"other3": "300"
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
	// $('#restRequestForm').validate({
	// 	rules: {
	// 		"loanAmount": {
	// 			required: true,
	// 			digits: true,
	// 			minlength: 5,
	// 			maxlength: 9
	// 		},
	// 		"interestRate": {
	// 			required: true,
	// 			minlength: 1,
	// 			maxlength: 5
	// 		},
	// 		"termMonths": {
	// 			required: true,
	// 			digits: true,
	// 			minlength: 2,
	// 			maxlength: 3
	// 		},
	// 		"propertyValue": {
	// 			required: true,
	// 			digits: true,
	// 			minlength: 4,
	// 			maxlength: 9
	// 		},
	// 		"propertyTaxes": {
	// 			required: true,
	// 			digits: true,
	// 			maxlength: 5
	// 		},
	// 		"hazardInsurance": {
	// 			required: true,
	// 			digits: true,
	// 			maxlength: 5
	// 		},
	// 		"pmi": {
	// 			required: true,
	// 			digits: true,
	// 			maxlength: 4
	// 		},
	// 	},
	// 	// submitHandler: function(form) {
	// 	// 	console.log("Validate submitHandler");

	// 	// },
	// 	// invalidHandler: function(event, validator) {
	// 	// 	console.log("number of invalid fields" + validator.numberOfInvalids());
	// 	// },

	// });

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
	function buildSummaryTable() {
		//specify div that houses table
		var $resultsTable = $("#resultsTableContainer");
		//change strings to numbers for adding
		//var numMortgageAmount = Number(calcResults.mortgageAmount.replace(/[^0-9\.]+/g, ""));
		//var numDownPayment = Number(calcFormModel.downPayment.replace(/[^0-9\.]+/g, ""));
		var compare1PercentString = $('#interestRate1').val();
		var compare2PercentString = $('#interestRate2').val();
		var compare3PercentString = $('#interestRate2').val();
		//create table
		$resultsTable.html("");
		var html = '<p>&nbsp</p>' +
			"<div class='panel panel-default'>" +
			"<div class='panel-heading'><h3 class='panel-title'>Explanation of Results</h3></div>" +
			"<div class='panel-body'>" +
			"<p class='resultText'>" + calcResults.responseText + "</p>" +
			"</div>" +
			"</div>" +

			"<div class='table-responsive'>" +
			"<table class='table table-bordered'><tbody><tr>" +
			"<th class='col-xs-6'></th>" +
			"<th class='col-xs-2'><span style='display: block'>Loan 1</span></th>" +
			"<th class='col-xs-2'><span style='display: block'>Loan 2</span></th>" +
			"<th class='col-xs-2'><span style='display: block'>Loan 3</span></th>" +
			"</tr><tr>" +
			"<td>Estimated monthly payment (without closing costs financed)</td>" +
			"<td>" + calcResults.moPaymentsWithout1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.moPaymentsWithout2.slice(0, -3) + "</td>" +
			"<td>" + calcResults.moPaymentsWithout3.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Estimated monthly payment (with closing costs)</td>" +
			"<td>" + calcResults.moPaymentsWith1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.moPaymentsWith2.slice(0, -3) + "</td>" +
			"<td>" + calcResults.moPaymentsWith3.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>APR</td>" +
			"<td>" + calcResults.apr1 + "</td>" +
			"<td>" + calcResults.apr2 + "</td>" +
			"<td>" + calcResults.apr3 + "</td>" +
			"</tr></tbody></table>";
		$resultsTable.html(html);
	}

	//SubmitHandler
	$('#restRequestForm').submit(function(event) {

		event.preventDefault();
		updateModelwithFormEntries();
		postData();

	});

	function postData() {
		var data = JSON.stringify(calcFormModel);
		$.ajax({
			url: 'https://www.calcxml.com/rest/hom15',
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
				buildSummaryTable();
			}
		});
	}

	function updateModelwithFormEntries() {
		calcFormModel.loanAmount1 = $('#loanAmount1').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.loanAmount2 = $('#loanAmount2').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.loanAmount3 = $('#loanAmount3').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.termYears1 = $('#termYears1').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.termYears2 = $('#termYears2').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.termYears3 = $('#termYears3').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.statedRate1 = formPercentageToFloatAsString($('#statedRate1').val());
		calcFormModel.statedRate2 = formPercentageToFloatAsString($('#statedRate2').val());
		calcFormModel.statedRate3 = formPercentageToFloatAsString($('#statedRate3').val());
		calcFormModel.discount1 = formPercentageToFloatAsString($('#discount1').val());
		calcFormModel.discount2 = formPercentageToFloatAsString($('#discount2').val());
		calcFormModel.discount3 = formPercentageToFloatAsString($('#discount3').val());
		calcFormModel.origination1 = formPercentageToFloatAsString($('#origination1').val());
		calcFormModel.origination2 = formPercentageToFloatAsString($('#origination2').val());
		calcFormModel.origination3 = formPercentageToFloatAsString($('#origination3').val());
		calcFormModel.lender1 = $('#lender1').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.lender2 = $('#lender2').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.lender3 = $('#lender3').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.title1 = $('#title1').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.title2 = $('#title2').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.title3 = $('#title3').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.other1 = $('#other1').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.other2 = $('#other2').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.other3 = $('#other3').val().replace(/[^0-9\.]+/g, "");
		console.log(calcFormModel);
	}

	// enable all tooltips and popovers in document
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$("a.tooltip").tooltip();

});
