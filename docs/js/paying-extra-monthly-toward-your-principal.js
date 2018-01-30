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
		"chartTitle": "Cumulative Interest",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "ddeeaa",
		"barColor2": "00ffff",
		"barColor3": "ffeb00",
		"barColor4": "aabbcc",
		"barColor5": "ff00ff",
		"barColor6": "bbaa00",
		"loanAmount": "200000",
		"interestRate": "3.75",
		"termMonths": "360",
		"paymentsMade": "24",
		"additionalPayment": "500"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"year": [{
			"year": "1",
			"interest": "$7,047",
			"beginningBalance": "$192,505",
			"endingBalance": "$182,437",
			"payment": "$17,115"
		}, {
			"year": "2",
			"interest": "6,663",
			"beginningBalance": "182,437",
			"endingBalance": "171,985",
			"payment": "17,115"
		}, {
			"year": "3",
			"interest": "6,264",
			"beginningBalance": "171,985",
			"endingBalance": "161,134",
			"payment": "17,115"
		}, {
			"year": "4",
			"interest": "5,850",
			"beginningBalance": "161,134",
			"endingBalance": "149,870",
			"payment": "17,115"
		}, {
			"year": "5",
			"interest": "5,420",
			"beginningBalance": "149,870",
			"endingBalance": "138,176",
			"payment": "17,115"
		}, {
			"year": "6",
			"interest": "4,974",
			"beginningBalance": "138,176",
			"endingBalance": "126,035",
			"payment": "17,115"
		}, {
			"year": "7",
			"interest": "4,511",
			"beginningBalance": "126,035",
			"endingBalance": "113,432",
			"payment": "17,115"
		}, {
			"year": "8",
			"interest": "4,030",
			"beginningBalance": "113,432",
			"endingBalance": "100,347",
			"payment": "17,115"
		}, {
			"year": "9",
			"interest": "3,531",
			"beginningBalance": "100,347",
			"endingBalance": "86,764",
			"payment": "17,115"
		}, {
			"year": "10",
			"interest": "3,013",
			"beginningBalance": "86,764",
			"endingBalance": "72,662",
			"payment": "17,115"
		}, {
			"year": "11",
			"interest": "2,475",
			"beginningBalance": "72,662",
			"endingBalance": "58,022",
			"payment": "17,115"
		}, {
			"year": "12",
			"interest": "1,916",
			"beginningBalance": "58,022",
			"endingBalance": "42,823",
			"payment": "17,115"
		}, {
			"year": "13",
			"interest": "1,337",
			"beginningBalance": "42,823",
			"endingBalance": "27,045",
			"payment": "17,115"
		}, {
			"year": "14",
			"interest": "735",
			"beginningBalance": "27,045",
			"endingBalance": "10,665",
			"payment": "17,115"
		}, {
			"year": "15",
			"interest": "143",
			"beginningBalance": "10,665",
			"endingBalance": "0",
			"payment": "10,808"
		}],
		"chartUrl": "img/defaultExtraPaymentsChart.png",
		"remainingTerm": "336",
		"newPayment": "$1,426.23",
		"responseText": "It appears that by paying an extra $500 per month, you could save $60,799 in interest ($118,709 vs. $57,911), and own the asset 13.4 years sooner than under your current schedule (28 years vs. 14.6 years).",
		"proposedYears": "14.63",
		"currentYears": "28.0",
		"totalInterest": "$60,798.56",
		"savedYears": "13.37",
		"initialPayment": "$926.23",
		"remainingPrincipal": "$192,504.59",
		"currentInterest": "$118,709.09",
		"proposedInterest": "$57,910.53"
	};
	var calcFormModel = {
		"username": "guest",
		"password": "water",
		"responseType": "raw2",
		"returnDataTable": "true",
		"chartLibrary": "image",
		"language": "en",
		"countryCode": "US",
		"version": "1.3",
		"chartTitle": "Cumulative Interest",
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
		"interestRate": ".0375",
		"termMonths": "360",
		"paymentsMade": "24",
		"additionalPayment": "500"
	};
	buildSummary();
	postGraphic();
	buildDataTable();
	//INIT done

	//INTERACTIVE EVENTS
	// enable all tooltips and popovers in document
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$("a.tooltip").tooltip();

	// Reset Button
	$('form').on('reset', function(event) {
		setTimeout(function() {
			//put default items back into form
			populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
			//data back to default
			updateModelwithFormEntries();
			//redraw everything
			//buildPaymentSchedule();
			$('#resultsGraphicFromCalcXML').html("");
			$("#dataTableContainer").html("");
			// mortCalcChart.data.datasets[0] = {
			// 	data: [1432.25, 291.67, 291.67, 130.00],
			// 	backgroundColor: ["#91B7D9", "rgb(250,109,33)", "rgb(154,154,154)", "#2E3A52"],
			// };
			// updateChart();
		});
	});


	//FUNCTIONS
	//push the graphic to Ammortization tab
	function postGraphic() {
		var exists = $('#resultsGraphic');
		if (!exists.length) {
			$('#resultsGraphic').prepend('<img id="loanBalanceComparison" src="' + calcResults.chartUrl + '" style="width: 100%"/>');
		}
		else {
			$('#resultsGraphic').html("");
			$('#resultsGraphic').prepend('<img id="loanBalanceComparison" src="' + calcResults.chartUrl + '" style="width: 100%"/>');
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

	//Build the schedule
	function buildDataTable() {
		var $tbody = $("#resultsTableContainer");
		$tbody.html("");
		var html = "<div class='table-responsive'>" +
			"<table class='table table-bordered'><tbody><tr>" +
			"<th>Year</th>" +
			"<th>Beginning Balance</th>" +
			"<th>Interest</th>" +
			"<th>Payment</th>" +
			"<th>Ending Balance</th>" +
			"</tr>";
		$.each(calcResults.year, function(i, item) {
			html += "<tr>" +
				"<td>" + calcResults.year[i].year + "</td>" +
				"<td>" + calcResults.year[i].beginningBalance + "</td>" +
				"<td>" + calcResults.year[i].interest + "</td>" +
				"<td>" + calcResults.year[i].payment + "</td>" +
				"<td>" + calcResults.year[i].endingBalance + "</td></tr>";
		});
		html += "<tr></tr></tbody></table>";
		$tbody.html(html);
	}

	//Build the schedule
	function buildSummary() {
		var $summary = $("#summary");
		$summary.html("");
		var html = '<p>&nbsp</p>' +
			"<div class='panel panel-default'>" +
			"<div class='panel-body'>" +
			"<p class='resultText'>" + calcResults.responseText + "</p>" +
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
		var data = JSON.stringify(calcFormModel);
		$.ajax({
			url: 'https://www.calcxml.com/rest/det09',
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
				//console.log(calcResults);
				buildSummary();
				postGraphic();
				buildDataTable();
			}
		});
	}

	function updateModelwithFormEntries() {
		calcFormModel.loanAmount = $('#loanAmount').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.interestRate = formPercentageToFloatAsString($('#interestRate').val());
		calcFormModel.termMonths = $('#termMonths').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.paymentsMade = $('#paymentsMade').val().replace(/[^0-9\.]+/g, "");
		calcFormModel.additionalPayment = $('#additionalPayment').val().replace(/[^0-9\.]+/g, "");
		//console.log(calcFormModel);
	}

	// Extend the default Number object with a formatMoney() method:
	// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
	// defaults: (2, "$", ",", ".")
	Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "$";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var number = this,
			negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	};

	// Example usage:
	//	formatMoney(54321);  $54,321
	function formatMoney(number, places, symbol, thousand, decimal) {
		number = number || 0;
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "$";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	}


});
