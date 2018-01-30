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
		"chartTitle": "Loan Balance Comparison",
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
		"interestRate": "3.75",
		"termMonths": "360"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"year": [{
			"year": "1",
			"endingBalance": "$146,532",
			"beginningBalance": "$150,000",
			"interest": "$5,563",
			"payment": "$9,031"
		}, {
			"year": "2",
			"endingBalance": "142,932",
			"beginningBalance": "146,532",
			"interest": "5,430",
			"payment": "9,031"
		}, {
			"year": "3",
			"endingBalance": "139,194",
			"beginningBalance": "142,932",
			"interest": "5,293",
			"payment": "9,031"
		}, {
			"year": "4",
			"endingBalance": "135,314",
			"beginningBalance": "139,194",
			"interest": "5,150",
			"payment": "9,031"
		}, {
			"year": "5",
			"endingBalance": "131,285",
			"beginningBalance": "135,314",
			"interest": "5,002",
			"payment": "9,031"
		}, {
			"year": "6",
			"endingBalance": "127,102",
			"beginningBalance": "131,285",
			"interest": "4,848",
			"payment": "9,031"
		}, {
			"year": "7",
			"endingBalance": "122,760",
			"beginningBalance": "127,102",
			"interest": "4,689",
			"payment": "9,031"
		}, {
			"year": "8",
			"endingBalance": "118,252",
			"beginningBalance": "122,760",
			"interest": "4,523",
			"payment": "9,031"
		}, {
			"year": "9",
			"endingBalance": "113,572",
			"beginningBalance": "118,252",
			"interest": "4,351",
			"payment": "9,031"
		}, {
			"year": "10",
			"endingBalance": "108,713",
			"beginningBalance": "113,572",
			"interest": "4,172",
			"payment": "9,031"
		}, {
			"year": "11",
			"endingBalance": "103,669",
			"beginningBalance": "108,713",
			"interest": "3,986",
			"payment": "9,031"
		}, {
			"year": "12",
			"endingBalance": "98,432",
			"beginningBalance": "103,669",
			"interest": "3,794",
			"payment": "9,031"
		}, {
			"year": "13",
			"endingBalance": "92,995",
			"beginningBalance": "98,432",
			"interest": "3,594",
			"payment": "9,031"
		}, {
			"year": "14",
			"endingBalance": "87,351",
			"beginningBalance": "92,995",
			"interest": "3,386",
			"payment": "9,031"
		}, {
			"year": "15",
			"endingBalance": "81,490",
			"beginningBalance": "87,351",
			"interest": "3,171",
			"payment": "9,031"
		}, {
			"year": "16",
			"endingBalance": "75,407",
			"beginningBalance": "81,490",
			"interest": "2,947",
			"payment": "9,031"
		}, {
			"year": "17",
			"endingBalance": "69,090",
			"beginningBalance": "75,407",
			"interest": "2,715",
			"payment": "9,031"
		}, {
			"year": "18",
			"endingBalance": "62,533",
			"beginningBalance": "69,090",
			"interest": "2,473",
			"payment": "9,031"
		}, {
			"year": "19",
			"endingBalance": "55,725",
			"beginningBalance": "62,533",
			"interest": "2,223",
			"payment": "9,031"
		}, {
			"year": "20",
			"endingBalance": "48,658",
			"beginningBalance": "55,725",
			"interest": "1,963",
			"payment": "9,031"
		}, {
			"year": "21",
			"endingBalance": "41,320",
			"beginningBalance": "48,658",
			"interest": "1,693",
			"payment": "9,031"
		}, {
			"year": "22",
			"endingBalance": "33,703",
			"beginningBalance": "41,320",
			"interest": "1,413",
			"payment": "9,031"
		}, {
			"year": "23",
			"endingBalance": "25,794",
			"beginningBalance": "33,703",
			"interest": "1,122",
			"payment": "9,031"
		}, {
			"year": "24",
			"endingBalance": "17,583",
			"beginningBalance": "25,794",
			"interest": "820",
			"payment": "9,031"
		}, {
			"year": "25",
			"endingBalance": "9,059",
			"beginningBalance": "17,583",
			"interest": "507",
			"payment": "9,031"
		}, {
			"year": "26",
			"endingBalance": "210",
			"beginningBalance": "9,059",
			"interest": "181",
			"payment": "9,031"
		}, {
			"year": "27",
			"endingBalance": "0",
			"beginningBalance": "210",
			"interest": "0",
			"payment": "695"
		}],
		"responseText": "By paying half of your mortgage every two weeks you will make the equivalent of one extra payment ($695) toward principal over the course of a year or an extra half a payment every six months. This strategy will save you $15,073 in interest and you will own your home in 26.1 years rather than the scheduled 30 years.",
		"chartUrl": "img/defaultBiWeeklyChart.png"

	};
	//plugin to customize chart tooltips
	// Chart.plugins.register({
	// 	beforeRender: function(chart) {
	// 		if (chart.config.options.showAllTooltips) {
	// 			// create an array of tooltips
	// 			// we can't use the chart tooltip because there is only one tooltip per chart
	// 			chart.pluginTooltips = [];
	// 			chart.config.data.datasets.forEach(function(dataset, i) {
	// 				chart.getDatasetMeta(i).data.forEach(function(sector, j) {
	// 					if (dataset.data[j] !== 0) {
	// 						chart.pluginTooltips.push(new Chart.Tooltip({
	// 							_chart: chart.chart,
	// 							_chartInstance: chart,
	// 							_data: chart.data,
	// 							_options: chart.options.tooltips,
	// 							_active: [sector]
	// 						}, chart));
	// 					}
	// 				});

	// 			});
	// 			// turn off normal tooltips
	// 			chart.options.tooltips.enabled = false;
	// 		}
	// 	},
	// 	afterDraw: function(chart, easing) {
	// 		if (chart.config.options.showAllTooltips) {
	// 			// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
	// 			// if (!chart.allTooltipsOnce) {
	// 			// 	if (easing !== 1)
	// 			// 		return;
	// 			// 	chart.allTooltipsOnce = true;
	// 			// }
	// 			// turn on tooltips
	// 			chart.options.tooltips.enabled = true;
	// 			Chart.helpers.each(chart.pluginTooltips, function(tooltip) {

	// 				tooltip.initialize();
	// 				tooltip.update();
	// 				// we don't actually need this since we are not animating tooltips
	// 				tooltip.pivot();
	// 				tooltip.transition(easing).draw();
	// 			});
	// 			chart.options.tooltips.enabled = false;
	// 		}
	// 	}
	// });
	// //Build the INITIAL chart
	// var ctx = $("#mortCalcChart");
	// var chartTitleCustom = mortgageCalcResults.pandiTipmi;
	// // Chart.Tooltip.positioners.myCustomPosition = function(unused, position) {
	// 		// 	return {
	// 		// 		x: position.x,
	// 		// 		y: 230
	// 		// 	}; // HARDCODING VALUES
	// 		// };
	// var mortCalcChart = new Chart(ctx, {
	// 	type: 'doughnut',
	// 	data: {
	// 		labels: ["Principle & Interest", "Taxes", "Insurance", "PMI"],
	// 		datasets: [{
	// 			data: [1432.25, 291.67, 291.67, 130.00],
	// 			backgroundColor: ["#91B7D9", "rgb(250,109,33)", "rgb(154,154,154)", "#2E3A52"],
	// 		}]
	// 	},
	// 	options: {
	// 		rotation: 1.2,
	// 		cutoutPercentage: 70,
	// 		responsive: false,
	// 		maintainAspectRatio: true,
	// 		tooltips: {
	// 			callbacks: {
	// 				label: function(tooltipItem, data) {
	// 					var dataContent = data.datasets[0].data[tooltipItem.index];
	// 					var label = data.labels[tooltipItem.index];
	// 					return dataContent.formatMoney() + ': ' + label;
	// 				}
	// 			},
	// 			position: 'average',
	// 		},

	// 		showAllTooltips: true,
	// 		legend: {
	// 			position: 'bottom',
	// 			display: false,
	// 		},
	// 		title: {
	// 			display: true,
	// 			text: 'Your Total Payment is: ' + chartTitleCustom,
	// 			fontSize: 16,
	// 			padding: 5,
	// 			fontColor: "rgb(250,109,33)",
	// 		},
	// 		animation: {
	// 			animateScale: true,
	// 			animateRotate: true
	// 		}
	// 	},
	// });

	var calcFormModel = {
		"username": "guest",
		"password": "water",
		"responseType": "raw2",
		"returnDataTable": "true",
		"chartLibrary": "image",
		"language": "en",
		"countryCode": "US",
		"version": "1.3",
		"chartTitle": "Loan Balance Comparison",
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
		"interestRate": ".0375",
		"termMonths": "360"
	};
	buildSummary();
	postGraphic();
	buildDataTable();
	//INIT done

	//SETUP VARS



	//INTERACTIVE EVENTS

	// //open advanced form feilds and change button text
	// $("#advancedSimple").click(function() {
	// 	$(this).toggleClass("active");
	// 	if ($(this).text() == 'Advanced') {
	// 		$(this).text('Simple ');
	// 		//set estimateTipmi to N
	// 		//console.log("advanced function");

	// 	}
	// 	else {
	// 		$(this).text('Advanced');
	// 		//console.log("simple function");
	// 		//set estimateTipmi to Y
	// 	}
	// });

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

	//Build the Data Table
	function buildDataTable() {
		var $tbody = $("#resultsTableContainer");
		$tbody.html("");
		var html = '<p>&nbsp</p>' +
			"<div class='table-responsive'>" +
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
	//Build the Data Table

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
			url: 'https://www.calcxml.com/rest/hom07',
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
				//var chartMonthlyInsurance = Number(mortgageCalcResults.monthlyInsurance.replace(/[^0-9\.]+/g, ""));
				//var chartMonthlyPmi = Number(mortgageCalcResults.monthlyPmi.replace(/[^0-9\.]+/g, ""));
				//var chartMonthlyTaxes = Number(mortgageCalcResults.monthlyTaxes.replace(/[^0-9\.]+/g, ""));
				//var chartPandiTipmi = Number(mortgageCalcResults.pandiTipmi.replace(/[^0-9\.]+/g, ""));
				//console.log(chartPandiTipmi);
				//console.log(mortCalcChart.data.datasets[0]);
				// mortCalcChart.data.datasets[0] = {
				// 	data: [chartPandiTipmi, chartMonthlyTaxes, chartMonthlyInsurance, chartMonthlyPmi],
				// 	backgroundColor: ["#91B7D9", "rgb(250,109,33)", "rgb(154,154,154)", "#2E3A52"],
				// };
				// updateChart();
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
		//console.log("updateModelwithFormEntries fired");
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
