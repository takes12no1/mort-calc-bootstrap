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
		"chartTitle": "Custom Chart Title",
		"threeD": "0",
		"chartHeight": "300",
		"chartWidth": "300",
		"barColor1": "ddeeaa",
		"barColor2": "00ffff",
		"barColor3": "ffeb00",
		"barColor4": "aabbcc",
		"barColor5": "ff00ff",
		"barColor6": "bbaa00",
		"loanAmount": "300,000",
		"interestRate": "3.75",
		"termMonths": "360",
		"amortization": "2",
		"propertyValue": "350,000",
		"estimateTipmi": "Y",
		"propertyTaxes": "3,500",
		"hazardInsurance": "1,050",
		"pmi": "130"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var mortgageCalcResults = {
		"year": [{
			"endingBalance": "$294,484",
			"principal": "$5,516",
			"beginningBalance": "$300,000",
			"interest": "$11,156",
			"period": "1",
			"payment": "$16,672"
		}, {
			"endingBalance": "288,757",
			"principal": "5,727",
			"beginningBalance": "294,484",
			"interest": "10,945",
			"period": "2",
			"payment": "16,672"
		}, {
			"endingBalance": "282,812",
			"principal": "5,945",
			"beginningBalance": "288,757",
			"interest": "10,727",
			"period": "3",
			"payment": "16,672"
		}, {
			"endingBalance": "276,640",
			"principal": "6,172",
			"beginningBalance": "282,812",
			"interest": "10,500",
			"period": "4",
			"payment": "16,672"
		}, {
			"endingBalance": "270,232",
			"principal": "6,408",
			"beginningBalance": "276,640",
			"interest": "10,265",
			"period": "5",
			"payment": "16,672"
		}, {
			"endingBalance": "263,580",
			"principal": "6,652",
			"beginningBalance": "270,232",
			"interest": "10,020",
			"period": "6",
			"payment": "16,672"
		}, {
			"endingBalance": "256,674",
			"principal": "6,906",
			"beginningBalance": "263,580",
			"interest": "9,766",
			"period": "7",
			"payment": "16,672"
		}, {
			"endingBalance": "249,505",
			"principal": "7,169",
			"beginningBalance": "256,674",
			"interest": "9,503",
			"period": "8",
			"payment": "16,672"
		}, {
			"endingBalance": "242,062",
			"principal": "7,443",
			"beginningBalance": "249,505",
			"interest": "9,229",
			"period": "9",
			"payment": "16,672"
		}, {
			"endingBalance": "234,335",
			"principal": "7,727",
			"beginningBalance": "242,062",
			"interest": "8,945",
			"period": "10",
			"payment": "16,672"
		}, {
			"endingBalance": "226,314",
			"principal": "8,022",
			"beginningBalance": "234,335",
			"interest": "8,651",
			"period": "11",
			"payment": "16,672"
		}, {
			"endingBalance": "217,986",
			"principal": "8,328",
			"beginningBalance": "226,314",
			"interest": "8,345",
			"period": "12",
			"payment": "16,672"
		}, {
			"endingBalance": "209,341",
			"principal": "8,645",
			"beginningBalance": "217,986",
			"interest": "8,027",
			"period": "13",
			"payment": "16,672"
		}, {
			"endingBalance": "200,366",
			"principal": "8,975",
			"beginningBalance": "209,341",
			"interest": "7,697",
			"period": "14",
			"payment": "16,672"
		}, {
			"endingBalance": "191,048",
			"principal": "9,318",
			"beginningBalance": "200,366",
			"interest": "7,355",
			"period": "15",
			"payment": "16,672"
		}, {
			"endingBalance": "181,375",
			"principal": "9,673",
			"beginningBalance": "191,048",
			"interest": "6,999",
			"period": "16",
			"payment": "16,672"
		}, {
			"endingBalance": "171,333",
			"principal": "10,042",
			"beginningBalance": "181,375",
			"interest": "6,630",
			"period": "17",
			"payment": "16,672"
		}, {
			"endingBalance": "160,908",
			"principal": "10,425",
			"beginningBalance": "171,333",
			"interest": "6,247",
			"period": "18",
			"payment": "16,672"
		}, {
			"endingBalance": "150,085",
			"principal": "10,823",
			"beginningBalance": "160,908",
			"interest": "5,849",
			"period": "19",
			"payment": "16,672"
		}, {
			"endingBalance": "138,850",
			"principal": "11,236",
			"beginningBalance": "150,085",
			"interest": "5,436",
			"period": "20",
			"payment": "16,672"
		}, {
			"endingBalance": "127,185",
			"principal": "11,664",
			"beginningBalance": "138,850",
			"interest": "5,008",
			"period": "21",
			"payment": "16,672"
		}, {
			"endingBalance": "115,076",
			"principal": "12,109",
			"beginningBalance": "127,185",
			"interest": "4,563",
			"period": "22",
			"payment": "16,672"
		}, {
			"endingBalance": "102,504",
			"principal": "12,571",
			"beginningBalance": "115,076",
			"interest": "4,101",
			"period": "23",
			"payment": "16,672"
		}, {
			"endingBalance": "89,453",
			"principal": "13,051",
			"beginningBalance": "102,504",
			"interest": "3,621",
			"period": "24",
			"payment": "16,672"
		}, {
			"endingBalance": "75,904",
			"principal": "13,549",
			"beginningBalance": "89,453",
			"interest": "3,123",
			"period": "25",
			"payment": "16,672"
		}, {
			"endingBalance": "61,838",
			"principal": "14,066",
			"beginningBalance": "75,904",
			"interest": "2,606",
			"period": "26",
			"payment": "16,672"
		}, {
			"endingBalance": "47,236",
			"principal": "14,603",
			"beginningBalance": "61,838",
			"interest": "2,070",
			"period": "27",
			"payment": "16,672"
		}, {
			"endingBalance": "32,076",
			"principal": "15,160",
			"beginningBalance": "47,236",
			"interest": "1,513",
			"period": "28",
			"payment": "16,672"
		}, {
			"endingBalance": "16,338",
			"principal": "15,738",
			"beginningBalance": "32,076",
			"interest": "934",
			"period": "29",
			"payment": "16,672"
		}, {
			"endingBalance": "0",
			"principal": "16,338",
			"beginningBalance": "16,338",
			"interest": "334",
			"period": "30",
			"payment": "16,672"
		}],
		"monthlyInsurance": "$87.50",
		"responseText": "Your estimated monthly payments are $1,898.51 (including taxes, insurance, and PMI if applicable), and you will pay $200,165 in interest over the life of the loan.",
		"chartUrl": "img/defaultAmmortChart.png",
		"pandi": "$1,389.35",
		"monthlyTaxes": "$291.67",
		"monthlyPmi": "$130.00",
		"pandiTipmi": "$1,898.51"
	};
	//plugin to customize chart tooltips
	Chart.plugins.register({
		beforeRender: function(chart) {
			if (chart.config.options.showAllTooltips) {
				// create an array of tooltips
				// we can't use the chart tooltip because there is only one tooltip per chart
				chart.pluginTooltips = [];
				chart.config.data.datasets.forEach(function(dataset, i) {
					chart.getDatasetMeta(i).data.forEach(function(sector, j) {
						if (dataset.data[j] !== 0) {
							chart.pluginTooltips.push(new Chart.Tooltip({
								_chart: chart.chart,
								_chartInstance: chart,
								_data: chart.data,
								_options: chart.options.tooltips,
								_active: [sector]
							}, chart));
						}
					});

				});
				// turn off normal tooltips
				chart.options.tooltips.enabled = false;
			}
		},
		afterDraw: function(chart, easing) {
			if (chart.config.options.showAllTooltips) {
				// we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
				// if (!chart.allTooltipsOnce) {
				// 	if (easing !== 1)
				// 		return;
				// 	chart.allTooltipsOnce = true;
				// }
				// turn on tooltips
				chart.options.tooltips.enabled = true;
				Chart.helpers.each(chart.pluginTooltips, function(tooltip) {

					tooltip.initialize();
					tooltip.update();
					// we don't actually need this since we are not animating tooltips
					tooltip.pivot();
					tooltip.transition(easing).draw();
				});
				chart.options.tooltips.enabled = false;
			}
		}
	});
	//Build the INITIAL chart
	var ctx = $("#mortCalcChart");
	var chartTitleCustom = mortgageCalcResults.pandiTipmi;
	//Build the chart
	var mortCalcChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ["", "", "", ""],
			datasets: [{
				data: [1389.35, 291.67, 87.50, 130.00],
				backgroundColor: ["#099FD6", "#107E7D", "#23395B", "#BFD7EA"],
				borderColor: ["#099FD6", "#107E7D", "#23395B", "#BFD7EA"]
			}]
		},
		options: {
			rotation: -1.5,
			cutoutPercentage: 40,
			responsive: false,
			maintainAspectRatio: true,
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						var dataContent = data.datasets[0].data[tooltipItem.index];
						var label = data.labels[tooltipItem.index];
						return dataContent.formatMoney() + ': ' + label;
					}
				},
				position: 'average',
			},

			showAllTooltips: false,
			legend: {
				position: 'bottom',
				display: false,
			},
			title: {
				display: false,
				text: 'Your Total Payment is: ' + chartTitleCustom,
				fontSize: 16,
				padding: 5,
				fontColor: "rgb(250,109,33)",
			},
			animation: {
				animateScale: true,
				animateRotate: true
			}
		},
	});

	//Build the schedule
	buildPaymentSchedule();
	//INIT done

	//SETUP VARS
	var mortgageCalcFormModel = {
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
		"barColor1": "ddeeaa",
		"barColor2": "00ffff",
		"barColor3": "ffeb00",
		"barColor4": "aabbcc",
		"barColor5": "ff00ff",
		"barColor6": "bbaa00",
		"loanAmount": "300000",
		"interestRate": "0.0375",
		"termMonths": "360",
		"amortization": "2",
		"propertyValue": "350000",
		"estimateTipmi": "Y",
		"propertyTaxes": "3500",
		"hazardInsurance": "1050",
		"pmi": "130"
	};


	//INTERACTIVE EVENTS
	//push ammort image to tab contianer
	// $("#ammortLink").click(function() {
	// 	postAmmortGraphic();
	// });

	//open advanced form feilds and change button text
	$("#advancedSimple").click(function() {
		//$(this).toggleClass("active");
		if ($(this).html() == 'Advanced <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>') {
			$(this).html('Simple <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>');
			//set estimateTipmi to N
			mortgageCalcFormModel.estimateTipmi = "N";
			//console.log("Estimate? " + mortgageCalcFormModel.estimateTipmi);

		}
		else {
			$(this).html('Advanced <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>');
			//console.log("simple function");
			//set estimateTipmi to Y
			mortgageCalcFormModel.estimateTipmi = "Y";
			//console.log("Estimate? " + mortgageCalcFormModel.estimateTipmi);
		}
	});

	//Tabs for results
	$('#summary a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})
	$('#ammortGraphic a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})
	$('#schedTab a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	})


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
			postData();
			buildPaymentSchedule();
			postAmmortGraphic();
		});
	});

	//Change when moving between fields
	var formChanged = false;
	$(':input').on('input propertychange paste', function() {
		return formChanged = true;
	});
	$(':input').blur(function() {
		if (formChanged == true) {
			//console.log(formChanged);
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
				maxlength: 9
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
			"propertyValue": {
				required: true,
				number: true,
				minlength: 4,
				maxlength: 9
			},
			"propertyTaxes": {
				required: true,
				number: true,
				maxlength: 6
			},
			"hazardInsurance": {
				required: true,
				number: true,
				maxlength: 5
			},
			"pmi": {
				required: true,
				digits: true,
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
	function postAmmortGraphic() {
		//change the graphic source to https
		var httpsChartURL = mortgageCalcResults.chartUrl.replace(/^http:\/\//i, 'https://');
		//look to see if the div exists
		var exists = $('#ammortizationSchedule');
		//if it doesn't draw it
		if (!exists.length) {
			$('#ammortGraphic').prepend('<img id="ammortizationSchedule" src="' + httpsChartURL + '"/>');
		}
		//if it does erase the old and paint the new
		else {
			$('#ammortGraphic').html("");
			$('#ammortGraphic').prepend('<img id="ammortizationSchedule" src="' + httpsChartURL + '"/>');
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
	function buildPaymentSchedule() {
		var $tbody = $("#paymentScheduleTbody");
		$tbody.html("");
		var html = "<tr>" +
			"<th>Year</th>" +
			"<th>Beginning Balance</th>" +
			"<th>Principal</th>" +
			"<th>Interest</th>" +
			"<th>Payment</th>" +
			"<th>Ending Balance</th>" +
			"</tr>";
		$.each(mortgageCalcResults.year, function(i, item) {
			html += "<tr>" +
				"<td>" + mortgageCalcResults.year[i].period + "</td>" +
				"<td>" + mortgageCalcResults.year[i].beginningBalance + "</td>" +
				"<td>" + mortgageCalcResults.year[i].principal + "</td>" +
				"<td>" + mortgageCalcResults.year[i].interest + "</td>" +
				"<td>" + mortgageCalcResults.year[i].payment + "</td>" +
				"<td>" + mortgageCalcResults.year[i].endingBalance + "</td></tr>";
		});
		$tbody.html(html);
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
		var data = JSON.stringify(mortgageCalcFormModel);
		//console.log(data2);
		$.ajax({
			url: 'https://www.calcxml.com/rest/hom03',
			type: 'post',
			data: data,
			headers: {
				'accept': 'application/json',
				'Content-Type': 'application/json',
				'charset': 'utf-8'
			},
			dataType: 'json',
			success: function(data) {
				mortgageCalcResults = data;
				//console.log(mortgageCalcResults.pandiTipmi);
				var chartMonthlyInsurance = Number(mortgageCalcResults.monthlyInsurance.replace(/[^0-9\.]+/g, ""));
				var chartMonthlyPmi = Number(mortgageCalcResults.monthlyPmi.replace(/[^0-9\.]+/g, ""));
				var chartMonthlyTaxes = Number(mortgageCalcResults.monthlyTaxes.replace(/[^0-9\.]+/g, ""));
				var chartPandiTipmi = Number(mortgageCalcResults.pandiTipmi.replace(/[^0-9\.]+/g, ""));
				var titlePandiTipmi = mortgageCalcResults.pandiTipmi;
				var chartPandi = Number(mortgageCalcResults.pandi.replace(/[^0-9\.]+/g, ""));
				//console.log(titlePandiTipmi);
				//console.log(mortCalcChart.data.datasets[0]);
				mortCalcChart.data.datasets[0] = {
					data: [chartPandi, chartMonthlyTaxes, chartMonthlyInsurance, chartMonthlyPmi],
					backgroundColor: ["#099FD6", "#107E7D", "#23395B", "#BFD7EA"],
					borderColor: ["#099FD6", "#107E7D", "#23395B", "#BFD7EA"]
				};
				mortCalcChart.options.title.text = 'Your Total Payment is: ' + titlePandiTipmi;
				updateChart();
				postAmmortGraphic();
				buildPaymentSchedule();
			}
		});
	}

	function updateModelwithFormEntries() {
		mortgageCalcFormModel.loanAmount = $('#loanAmount').val().replace(/\,/g, '');
		mortgageCalcFormModel.interestRate = formPercentageToFloatAsString($('#interestRate').val());
		mortgageCalcFormModel.amortization = $('input[name=amortization]:checked').val();
		mortgageCalcFormModel.propertyValue = $('#propertyValue').val().replace(/\,/g, '');
		//mortgageCalcFormModel.estimateTipmi = $('input[name=estimateTipmi]:checked').val();
		mortgageCalcFormModel.propertyTaxes = $('#propertyTaxes').val().replace(/\,/g, '');
		mortgageCalcFormModel.hazardInsurance = $('#hazardInsurance').val().replace(/\,/g, '');
		mortgageCalcFormModel.pmi = $('#pmi').val();
		//console.log("updateModelwithFormEntries fired");
		//console.log(mortgageCalcFormModel);
	}

	var onlyNumbers = function(event) {
		var keys = {
			'up': 38,
			'right': 39,
			'down': 40,
			'left': 37,
			'escape': 27,
			'backspace': 8,
			'tab': 9,
			'enter': 13,
			'del': 46,
			'0': 48,
			'1': 49,
			'2': 50,
			'3': 51,
			'4': 52,
			'5': 53,
			'6': 54,
			'7': 55,
			'8': 56,
			'9': 57
		};
		for (var index in keys) {
			if (!keys.hasOwnProperty(index)) continue;
			if (event.charCode == keys[index] || event.keyCode == keys[index]) {
				return; //default event
			}
		}
		event.preventDefault();
	};



	function updateChart() {
		mortCalcChart.update();

		// var ctx = $("#mortCalcChart");
		// var chartTitleCustom = mortgageCalcResults.pandiTipmi;
		// var mortCalcChart = new Chart(ctx, {
		// 	type: 'doughnut',
		// 	data: {
		// 		labels: ["Principle & Interest", "Taxes", "Insurance", "PMI"],
		// 		datasets: [{
		// 			data: [mortgageCalcResults.monthlyInsurance, mortgageCalcResults.monthlyPmi, mortgageCalcResults.monthlyTaxes, mortgageCalcResults.pandiTipmi],
		// 			backgroundColor: ["#91B7D9", "rgb(250,109,33)", "rgb(154,154,154)", "#2E3A52"],
		// 		}]
		// 	},
		// 	options: {
		// 		rotation: 1.2,
		// 		cutoutPercentage: 70,
		// 		responsive: true,
		// 		maintainAspectRatio: false,
		// 		tooltips: {
		// 			callbacks: {
		// 				label: function(tooltipItem, data) {
		// 					var dataContent = data.datasets[0].data[tooltipItem.index];
		// 					var label = data.labels[tooltipItem.index];
		// 					return dataContent + ': ' + label;
		// 				}
		// 			}
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

	// function changeResultsLocationOnMobile() {
	// 	$('#resultContainer').insertBefore('#formContainer');
	// }

	// function changeResultsLocationOnTabletOrDesktop() {
	// 	$('#formContainer').insertBefore('#resultsContainer');
	// }

	// if ($(window).width() <= 1024) {
	// 	changeResultsLocationOnMobile();
	// }

	//$(window).resize(function() {
	//		if( $(this).width() > width ) {
	//			// code
	//}
	//});



	// Todo
	// set estimate on simple and turn off on advanced.
	// Display percentages as wholenumbers instead of .0x
	// binding blank when chracter count exceeded


});
