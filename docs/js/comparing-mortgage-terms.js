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
		"chartTitle": "Total (Discounted) Outlay",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "4984B0",
		"barColor2": "957A5D",
		"barColor3": "252C37",
		"barColor4": "5E5553",
		"barColor5": "252C37",
		"barColor6": "957A5D",
		"loanAmount": "150000",
		"termYears1": "15",
		"termYears2": "20",
		"termYears3": "30",
		"interestRate1": "3",
		"interestRate2": "3.5",
		"interestRate3": "4",
		"comparisonRate": "0.99",
		"overrideRate": "5",
		"taxBracket": "25",
		"comparisonYear": "30"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"investmentReturn": "0.05",
		"responseText": "It appears that the 30 year loan is the least expensive.",
		"chartUrl": "img/defaultCompareChart.png",
		"pvLoan1": "$220,601.14",
		"pvLoan2": "$178,162.82",
		"pvLoan3": "$136,019.84",
		"totalCost3": "$143,153.80",
		"totalCost2": "$137,130.12",
		"totalCost1": "$136,019.84",
		"monthlyPayment1": "$1,047.08",
		"monthlyPayment2": "$879.51",
		"monthlyPayment3": "$722.88",
		"remainingBalance1": "$-77,447.33",
		"remainingBalance2": "$-41,032.71",
		"remainingBalance3": "$.00"
	};

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
		"chartTitle": "Total (Discounted) Outlay",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "4984B0",
		"barColor2": "957A5D",
		"barColor3": "252C37",
		"barColor4": "5E5553",
		"barColor5": "252C37",
		"barColor6": "957A5D",
		"loanAmount": "300000",
		"termYears1": "15",
		"termYears2": "20",
		"termYears3": "30",
		"interestRate1": ".03",
		"interestRate2": ".035",
		"interestRate3": ".04",
		"comparisonRate": "0.99",
		"overrideRate": ".10",
		"taxBracket": ".25",
		"comparisonYear": "30"
	};
	buildSummary();
	postGraphic();
	//INIT done

	//SETUP VARS



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
	$('a[rel=popover]').popover({
		html: true,
		trigger: 'hover',
		placement: 'bottom',
		content: function() {
			return '<img src="' + $(this).data('img') + ' " style="width:460px" />';
		}
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
	}

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

	//Build the summary table
	function buildSummary() {
		//specify div that houses table
		var $summary = $("#summary");
		//change strings to numbers for adding
		//var numMortgageAmount = Number(calcResults.mortgageAmount.replace(/[^0-9\.]+/g, ""));
		//var numDownPayment = Number(calcFormModel.downPayment.replace(/[^0-9\.]+/g, ""));
		var compare1PercentString = $('#interestRate1').val();
		var compare2PercentString = $('#interestRate2').val();
		var compare3PercentString = $('#interestRate3').val();
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
			"<th><span style='display: block'>Loan 1</span>" + calcFormModel.termYears1 + " Years @ " + compare1PercentString + "%</th>" +
			"<th><span style='display: block'>Loan 2</span>" + calcFormModel.termYears2 + " Years @ " + compare2PercentString + "%</th>" +
			"<th><span style='display: block'>Loan 3</span>" + calcFormModel.termYears3 + " Years @ " + compare3PercentString + "%</th>" +
			"</tr><tr>" +
			"<td>Monthly payment (P&amp;I)</td>" +
			"<td>" + calcResults.monthlyPayment1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.monthlyPayment2.slice(0, -3) + "</td>" +
			"<td>" + calcResults.monthlyPayment3.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Total (discounted) outlay</td>" +
			"<td>" + calcResults.pvLoan1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.pvLoan2.slice(0, -3) + "</td>" +
			"<td>" + calcResults.pvLoan3.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Plus (discounted) remaining principal balance (if any)</td>" +
			"<td>" + calcResults.remainingBalance1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.remainingBalance2.slice(0, -3) + "</td>" +
			"<td>" + calcResults.remainingBalance3.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Equals total (discounted) outlay</td>" +
			"<td>" + calcResults.totalCost1.slice(0, -3) + "</td>" +
			"<td>" + calcResults.totalCost2.slice(0, -3) + "</td>" +
			"<td>" + calcResults.totalCost3.slice(0, -3) + "</td>" +
			"</tr></tbody></table>";
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
			url: 'https://www.calcxml.com/rest/hom04',
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
		calcFormModel.loanAmount = $('#loanAmount').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.termYears1 = $('#termYears1').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.termYears2 = $('#termYears2').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.termYears3 = $('#termYears3').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.interestRate1 = formPercentageToFloatAsString($('#interestRate1').val());
		calcFormModel.interestRate2 = formPercentageToFloatAsString($('#interestRate2').val());
		calcFormModel.interestRate3 = formPercentageToFloatAsString($('#interestRate3').val());
		//calcFormModel.comparisonRate = formPercentageToFloatAsString($('#overrideRate').val());
		calcFormModel.overrideRate = formPercentageToFloatAsString($('#overrideRate').val());
		calcFormModel.taxBracket = formPercentageToFloatAsString($('#taxBracket').val());
		calcFormModel.comparisonYear = $('#comparisonYear').val();
		//console.log(calcFormModel);
		//calcFormModel.backRatio = $('input[name=backRatio]:checked').val();
	}

	// enable all tooltips and popovers in document
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$("a.tooltip").tooltip();

});
