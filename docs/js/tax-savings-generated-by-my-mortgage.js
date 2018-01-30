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
		"chartTitle": "Cumulative Values",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"loanAmount": "200000",
		"interestRate": "3.75",
		"termMonths": "360",
		"taxBracket": "25",
		"amortization": "2"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"year": [{
			"interest": "$7,437",
			"beginningBalance": "$200,000",
			"endingBalance": "$196,322",
			"taxSavings": "$1,859",
			"period": "1",
			"payment": "$11,115"
		}, {
			"interest": "7,297",
			"beginningBalance": "196,322",
			"endingBalance": "192,505",
			"taxSavings": "1,824",
			"period": "2",
			"payment": "11,115"
		}, {
			"interest": "7,151",
			"beginningBalance": "192,505",
			"endingBalance": "188,541",
			"taxSavings": "1,788",
			"period": "3",
			"payment": "11,115"
		}, {
			"interest": "7,000",
			"beginningBalance": "188,541",
			"endingBalance": "184,426",
			"taxSavings": "1,750",
			"period": "4",
			"payment": "11,115"
		}, {
			"interest": "6,843",
			"beginningBalance": "184,426",
			"endingBalance": "180,155",
			"taxSavings": "1,711",
			"period": "5",
			"payment": "11,115"
		}, {
			"interest": "6,680",
			"beginningBalance": "180,155",
			"endingBalance": "175,720",
			"taxSavings": "1,670",
			"period": "6",
			"payment": "11,115"
		}, {
			"interest": "6,511",
			"beginningBalance": "175,720",
			"endingBalance": "171,116",
			"taxSavings": "1,628",
			"period": "7",
			"payment": "11,115"
		}, {
			"interest": "6,335",
			"beginningBalance": "171,116",
			"endingBalance": "166,337",
			"taxSavings": "1,584",
			"period": "8",
			"payment": "11,115"
		}, {
			"interest": "6,153",
			"beginningBalance": "166,337",
			"endingBalance": "161,375",
			"taxSavings": "1,538",
			"period": "9",
			"payment": "11,115"
		}, {
			"interest": "5,964",
			"beginningBalance": "161,375",
			"endingBalance": "156,224",
			"taxSavings": "1,491",
			"period": "10",
			"payment": "11,115"
		}, {
			"interest": "5,767",
			"beginningBalance": "156,224",
			"endingBalance": "150,876",
			"taxSavings": "1,442",
			"period": "11",
			"payment": "11,115"
		}, {
			"interest": "5,563",
			"beginningBalance": "150,876",
			"endingBalance": "145,324",
			"taxSavings": "1,391",
			"period": "12",
			"payment": "11,115"
		}, {
			"interest": "5,351",
			"beginningBalance": "145,324",
			"endingBalance": "139,561",
			"taxSavings": "1,338",
			"period": "13",
			"payment": "11,115"
		}, {
			"interest": "5,131",
			"beginningBalance": "139,561",
			"endingBalance": "133,577",
			"taxSavings": "1,283",
			"period": "14",
			"payment": "11,115"
		}, {
			"interest": "4,903",
			"beginningBalance": "133,577",
			"endingBalance": "127,366",
			"taxSavings": "1,226",
			"period": "15",
			"payment": "11,115"
		}, {
			"interest": "4,666",
			"beginningBalance": "127,366",
			"endingBalance": "120,917",
			"taxSavings": "1,167",
			"period": "16",
			"payment": "11,115"
		}, {
			"interest": "4,420",
			"beginningBalance": "120,917",
			"endingBalance": "114,222",
			"taxSavings": "1,105",
			"period": "17",
			"payment": "11,115"
		}, {
			"interest": "4,165",
			"beginningBalance": "114,222",
			"endingBalance": "107,272",
			"taxSavings": "1,041",
			"period": "18",
			"payment": "11,115"
		}, {
			"interest": "3,900",
			"beginningBalance": "107,272",
			"endingBalance": "100,057",
			"taxSavings": "975",
			"period": "19",
			"payment": "11,115"
		}, {
			"interest": "3,624",
			"beginningBalance": "100,057",
			"endingBalance": "92,566",
			"taxSavings": "906",
			"period": "20",
			"payment": "11,115"
		}, {
			"interest": "3,338",
			"beginningBalance": "92,566",
			"endingBalance": "84,790",
			"taxSavings": "835",
			"period": "21",
			"payment": "11,115"
		}, {
			"interest": "3,042",
			"beginningBalance": "84,790",
			"endingBalance": "76,717",
			"taxSavings": "760",
			"period": "22",
			"payment": "11,115"
		}, {
			"interest": "2,734",
			"beginningBalance": "76,717",
			"endingBalance": "68,336",
			"taxSavings": "683",
			"period": "23",
			"payment": "11,115"
		}, {
			"interest": "2,414",
			"beginningBalance": "68,336",
			"endingBalance": "59,636",
			"taxSavings": "604",
			"period": "24",
			"payment": "11,115"
		}, {
			"interest": "2,082",
			"beginningBalance": "59,636",
			"endingBalance": "50,603",
			"taxSavings": "521",
			"period": "25",
			"payment": "11,115"
		}, {
			"interest": "1,738",
			"beginningBalance": "50,603",
			"endingBalance": "41,226",
			"taxSavings": "434",
			"period": "26",
			"payment": "11,115"
		}, {
			"interest": "1,380",
			"beginningBalance": "41,226",
			"endingBalance": "31,491",
			"taxSavings": "345",
			"period": "27",
			"payment": "11,115"
		}, {
			"interest": "1,008",
			"beginningBalance": "31,491",
			"endingBalance": "21,384",
			"taxSavings": "252",
			"period": "28",
			"payment": "11,115"
		}, {
			"interest": "623",
			"beginningBalance": "21,384",
			"endingBalance": "10,892",
			"taxSavings": "156",
			"period": "29",
			"payment": "11,115"
		}, {
			"interest": "223",
			"beginningBalance": "10,892",
			"endingBalance": "0",
			"taxSavings": "56",
			"period": "30",
			"payment": "11,115"
		}],
		"responseText": "Based on your marginal tax rate of 25.0 % you can expect to save $33, 361 in taxes over the life of the loan.",
		"chartUrl": "img/defaultTaxSavingsChart.png"
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
		"chartTitle": "Cumulative Values",
		"threeD": "0",
		"chartHeight": "360",
		"chartWidth": "480",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"loanAmount": "200000",
		"interestRate": ".0375",
		"termMonths": "360",
		"taxBracket": "0.25",
		"amortization": "2"
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

	//Change when moving between fields
	// var formChanged = false;
	// $(':input').on('input propertychange paste', function() {
	// 	return formChanged = true;
	// });
	// $(':input').blur(function() {
	// 	if (formChanged == true) {
	// 		//console.log(formChanged);
	// 		updateModelwithFormEntries();
	// 		postData();
	// 		return formChanged = false;
	// 	}
	// });

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
			"<th>Tax Savings</th>" +
			"</tr>";
		$.each(calcResults.year, function(i, item) {
			html += "<tr>" +
				"<td>" + calcResults.year[i].period + "</td>" +
				"<td>" + calcResults.year[i].beginningBalance + "</td>" +
				"<td>" + calcResults.year[i].interest + "</td>" +
				"<td>" + calcResults.year[i].payment + "</td>" +
				"<td>" + calcResults.year[i].endingBalance + "</td>" +
				"<td>" + calcResults.year[i].taxSavings + "</td></tr>";
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
			url: 'https://www.calcxml.com/rest/hom09',
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
				console.log(calcResults);
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
		calcFormModel.taxBracket = formPercentageToFloatAsString($('#taxBracket').val());
		calcFormModel.amortization = $('input[name=amortization]:checked').val();
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
