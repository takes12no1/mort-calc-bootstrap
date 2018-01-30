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
		"chartTitle": "Total Present Value Cost Comparison",
		"threeD": "0",
		"chartHeight": "300",
		"chartWidth": "300",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"rent": "1200",
		"fees": "0",
		"rentIns": "60",
		"rentIncr": "3",
		"purchase": "200000",
		"growth": "5",
		"realtorFees": "6",
		"loan": "180000",
		"rate": "3.75",
		"term": "30",
		"closingCosts": "0",
		"homeowners": "0",
		"taxes": "0",
		"maint": "0",
		"analysis": "30",
		"taxBracket": "25",
		"beforeTaxReturn": "8",
		"inf": "3.50"
	};
	//prepopulate form when page loaded
	populate('#restRequestForm', JSON.parse(JSON.stringify(formDataDefault)));
	//init default chart results
	var calcResults = {
		"year": [{
			"payments": "$10,003",
			"costPurchase": "$2,300",
			"oppcost": "$1,999",
			"taxsavings": "$2,938",
			"rentFees": "$15,360",
			"yearNumber": "1",
			"homeAppreciation": "$10,000",
			"insuranceMaintenance": "$8,200",
			"principalReduction": "$4,964"
		}, {
			"payments": "10,003",
			"costPurchase": "4,484",
			"oppcost": "2,835",
			"taxsavings": "2,925",
			"rentFees": "15,821",
			"yearNumber": "2",
			"homeAppreciation": "10,500",
			"insuranceMaintenance": "8,510",
			"principalReduction": "3,439"
		}, {
			"payments": "10,003",
			"costPurchase": "5,064",
			"oppcost": "3,710",
			"taxsavings": "2,892",
			"rentFees": "16,295",
			"yearNumber": "3",
			"homeAppreciation": "11,025",
			"insuranceMaintenance": "8,836",
			"principalReduction": "3,568"
		}, {
			"payments": "10,003",
			"costPurchase": "5,672",
			"oppcost": "4,627",
			"taxsavings": "2,857",
			"rentFees": "16,784",
			"yearNumber": "4",
			"homeAppreciation": "11,576",
			"insuranceMaintenance": "9,177",
			"principalReduction": "3,702"
		}, {
			"payments": "10,003",
			"costPurchase": "6,308",
			"oppcost": "5,587",
			"taxsavings": "2,822",
			"rentFees": "17,288",
			"yearNumber": "5",
			"homeAppreciation": "12,155",
			"insuranceMaintenance": "9,536",
			"principalReduction": "3,841"
		}, {
			"payments": "10,003",
			"costPurchase": "6,975",
			"oppcost": "6,592",
			"taxsavings": "2,785",
			"rentFees": "17,806",
			"yearNumber": "6",
			"homeAppreciation": "12,763",
			"insuranceMaintenance": "9,913",
			"principalReduction": "3,985"
		}, {
			"payments": "10,003",
			"costPurchase": "7,674",
			"oppcost": "7,645",
			"taxsavings": "2,747",
			"rentFees": "18,341",
			"yearNumber": "7",
			"homeAppreciation": "13,401",
			"insuranceMaintenance": "10,309",
			"principalReduction": "4,135"
		}, {
			"payments": "10,003",
			"costPurchase": "8,406",
			"oppcost": "8,747",
			"taxsavings": "2,708",
			"rentFees": "18,891",
			"yearNumber": "8",
			"homeAppreciation": "14,071",
			"insuranceMaintenance": "10,724",
			"principalReduction": "4,290"
		}, {
			"payments": "10,003",
			"costPurchase": "9,174",
			"oppcost": "9,902",
			"taxsavings": "2,667",
			"rentFees": "19,458",
			"yearNumber": "9",
			"homeAppreciation": "14,775",
			"insuranceMaintenance": "11,160",
			"principalReduction": "4,450"
		}, {
			"payments": "10,003",
			"costPurchase": "9,978",
			"oppcost": "11,111",
			"taxsavings": "2,624",
			"rentFees": "20,041",
			"yearNumber": "10",
			"homeAppreciation": "15,513",
			"insuranceMaintenance": "11,618",
			"principalReduction": "4,617"
		}, {
			"payments": "10,003",
			"costPurchase": "10,820",
			"oppcost": "12,377",
			"taxsavings": "2,580",
			"rentFees": "20,643",
			"yearNumber": "11",
			"homeAppreciation": "16,289",
			"insuranceMaintenance": "12,099",
			"principalReduction": "4,791"
		}, {
			"payments": "10,003",
			"costPurchase": "11,703",
			"oppcost": "13,703",
			"taxsavings": "2,534",
			"rentFees": "21,262",
			"yearNumber": "12",
			"homeAppreciation": "17,103",
			"insuranceMaintenance": "12,604",
			"principalReduction": "4,970"
		}, {
			"payments": "10,003",
			"costPurchase": "12,628",
			"oppcost": "15,092",
			"taxsavings": "2,486",
			"rentFees": "21,900",
			"yearNumber": "13",
			"homeAppreciation": "17,959",
			"insuranceMaintenance": "13,134",
			"principalReduction": "5,157"
		}, {
			"payments": "10,003",
			"costPurchase": "13,597",
			"oppcost": "16,546",
			"taxsavings": "2,437",
			"rentFees": "22,557",
			"yearNumber": "14",
			"homeAppreciation": "18,856",
			"insuranceMaintenance": "13,691",
			"principalReduction": "5,350"
		}, {
			"payments": "10,003",
			"costPurchase": "14,612",
			"oppcost": "18,069",
			"taxsavings": "2,386",
			"rentFees": "23,233",
			"yearNumber": "15",
			"homeAppreciation": "19,799",
			"insuranceMaintenance": "14,276",
			"principalReduction": "5,551"
		}, {
			"payments": "10,003",
			"costPurchase": "15,677",
			"oppcost": "19,665",
			"taxsavings": "2,333",
			"rentFees": "23,930",
			"yearNumber": "16",
			"homeAppreciation": "20,789",
			"insuranceMaintenance": "14,889",
			"principalReduction": "5,759"
		}, {
			"payments": "10,003",
			"costPurchase": "16,792",
			"oppcost": "21,336",
			"taxsavings": "2,278",
			"rentFees": "24,648",
			"yearNumber": "17",
			"homeAppreciation": "21,829",
			"insuranceMaintenance": "15,534",
			"principalReduction": "5,975"
		}, {
			"payments": "10,003",
			"costPurchase": "17,961",
			"oppcost": "23,087",
			"taxsavings": "2,221",
			"rentFees": "25,388",
			"yearNumber": "18",
			"homeAppreciation": "22,920",
			"insuranceMaintenance": "16,211",
			"principalReduction": "6,199"
		}, {
			"payments": "10,003",
			"costPurchase": "19,186",
			"oppcost": "24,920",
			"taxsavings": "2,161",
			"rentFees": "26,149",
			"yearNumber": "19",
			"homeAppreciation": "24,066",
			"insuranceMaintenance": "16,921",
			"principalReduction": "6,431"
		}, {
			"payments": "10,003",
			"costPurchase": "20,470",
			"oppcost": "26,841",
			"taxsavings": "2,100",
			"rentFees": "26,934",
			"yearNumber": "20",
			"homeAppreciation": "25,270",
			"insuranceMaintenance": "17,667",
			"principalReduction": "6,672"
		}, {
			"payments": "10,003",
			"costPurchase": "21,815",
			"oppcost": "28,853",
			"taxsavings": "2,036",
			"rentFees": "27,742",
			"yearNumber": "21",
			"homeAppreciation": "26,533",
			"insuranceMaintenance": "18,450",
			"principalReduction": "6,922"
		}, {
			"payments": "10,003",
			"costPurchase": "23,225",
			"oppcost": "30,960",
			"taxsavings": "1,970",
			"rentFees": "28,574",
			"yearNumber": "22",
			"homeAppreciation": "27,860",
			"insuranceMaintenance": "19,273",
			"principalReduction": "7,182"
		}, {
			"payments": "10,003",
			"costPurchase": "24,703",
			"oppcost": "33,168",
			"taxsavings": "1,901",
			"rentFees": "29,431",
			"yearNumber": "23",
			"homeAppreciation": "29,253",
			"insuranceMaintenance": "20,137",
			"principalReduction": "7,451"
		}, {
			"payments": "10,003",
			"costPurchase": "26,252",
			"oppcost": "35,481",
			"taxsavings": "1,830",
			"rentFees": "30,314",
			"yearNumber": "24",
			"homeAppreciation": "30,715",
			"insuranceMaintenance": "21,043",
			"principalReduction": "7,731"
		}, {
			"payments": "10,003",
			"costPurchase": "27,875",
			"oppcost": "37,904",
			"taxsavings": "1,756",
			"rentFees": "31,224",
			"yearNumber": "25",
			"homeAppreciation": "32,251",
			"insuranceMaintenance": "21,996",
			"principalReduction": "8,021"
		}, {
			"payments": "10,003",
			"costPurchase": "29,576",
			"oppcost": "40,442",
			"taxsavings": "1,679",
			"rentFees": "32,160",
			"yearNumber": "26",
			"homeAppreciation": "33,864",
			"insuranceMaintenance": "22,995",
			"principalReduction": "8,322"
		}, {
			"payments": "10,003",
			"costPurchase": "31,360",
			"oppcost": "43,101",
			"taxsavings": "1,599",
			"rentFees": "33,125",
			"yearNumber": "27",
			"homeAppreciation": "35,557",
			"insuranceMaintenance": "24,045",
			"principalReduction": "8,634"
		}, {
			"payments": "10,003",
			"costPurchase": "33,229",
			"oppcost": "45,887",
			"taxsavings": "1,517",
			"rentFees": "34,119",
			"yearNumber": "28",
			"homeAppreciation": "37,335",
			"insuranceMaintenance": "25,147",
			"principalReduction": "8,957"
		}, {
			"payments": "10,003",
			"costPurchase": "35,188",
			"oppcost": "48,805",
			"taxsavings": "1,431",
			"rentFees": "35,143",
			"yearNumber": "29",
			"homeAppreciation": "39,201",
			"insuranceMaintenance": "26,305",
			"principalReduction": "9,293"
		}, {
			"payments": "10,003",
			"costPurchase": "37,241",
			"oppcost": "51,863",
			"taxsavings": "1,342",
			"rentFees": "36,197",
			"yearNumber": "30",
			"homeAppreciation": "41,161",
			"insuranceMaintenance": "27,520",
			"principalReduction": "9,642"
		}],
		"responseText": "Based on the assumptions you have input, you would save approximately $133,720 (in today's dollars) by buying a home, rather than renting, over the 30 year timeframe you have entered.",
		"chartUrl": "img/defaultRentBuyChart.png",
		"taxesTotal": "$332,194.24",
		"rentTotal": "$730,758.39",
		"oppcostTotal": "$650,854.70",
		"paymentsTotal": "$300,098.90",
		"totalcostBuy": "$563,808.43",
		"difference": "$133,720.15",
		"totalcostRent": "$730,758.39",
		"insuranceTotal": "$79,726.62",
		"maintenanceTotal": "$60,000.00",
		"principalTotal": "$180,000.00",
		"pvtotalcostRent": "$415,392.11",
		"pvtotalcostBuy": "$281,671.96",
		"closingCostsTotal": "$2,000.00",
		"realtorFeesTotal": "$51,863.31",
		"appreciationTotal": "$664,388.48",
		"taxsavingsTotal": "$68,540.86"
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
		"chartTitle": "Total Present Value Cost Comparison",
		"threeD": "0",
		"chartHeight": "300",
		"chartWidth": "300",
		"barColor1": "EEE3A1",
		"barColor2": "6BD7FF",
		"barColor3": "FF6269",
		"barColor4": "EEE3A1",
		"barColor5": "6BD7FF",
		"barColor6": "FF6269",
		"rent": "1200",
		"fees": "0",
		"rentIns": "60",
		"rentIncr": "3",
		"purchase": "200000",
		"growth": "5",
		"realtorFees": "6",
		"loan": "180000",
		"rate": "3.75",
		"term": "30",
		"closingCosts": "0",
		"homeowners": "0",
		"taxes": "0",
		"maint": "0",
		"analysis": "30",
		"taxBracket": "25",
		"beforeTaxReturn": "8",
		"inf": "3.50"
	};
	//INIT done

	//INTERACTIVE EVENTS
	$(".numericOnly").keypress(function(e) {
		if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
	});

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
		});
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

	function buildSummaryTable() {
		//specify div that houses table
		var $resultsTable = $("#resultsTableContainer");
		//create table
		$resultsTable.html("");
		var html = "<p>&nbsp</p>" +
			"<div class='panel panel-default'>" +
			"<div class='panel-heading'><h3 class='panel-title'>Explanation of Results</h3></div>" +
			"<div class='panel-body'>" +
			"<p class='resultText'>" + calcResults.responseText + "</p>" +
			"</div>" +
			"</div>" +
			"<div class='table-responsive'>" +
			"<table class='table table-bordered'><tbody><tr>" +
			"<th class='section'>Rent vs. Buy Analysis</th>" +
			"<th></th>" +
			"<th scope='col'>Rent</th>" +
			"<th scope='col'>Buy</th>" +
			"</tr><tr>" +
			"<td>Rent and fees</td>" +
			"<td></td>" +
			"<td>" + calcResults.rentTotal.slice(0, -3) + "</td>" +
			"<td></td>" +
			"</tr><tr>" +
			"<td>Mortgage payments</td>" +
			"<td></td>" +
			"<td></td>" +
			"<td>" + calcResults.paymentsTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Closing costs</td>" +
			"<td>+</td>" +
			"<td></td>" +
			"<td>" + calcResults.closingCostsTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Property insurance</td>" +
			"<td>+</td>" +
			"<td></td>" +
			"<td>" + calcResults.insuranceTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Property taxes</td>" +
			"<td>+</td>" +
			"<td></td>" +
			"<td>" + calcResults.taxesTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Maintenance</td>" +
			"<td>+</td>" +
			"<td></td>" +
			"<td>" + calcResults.maintenanceTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Opportunity cost (tied-up equity)</td>" +
			"<td>+</td>" +
			"<td></td>" +
			"<td>" + calcResults.oppcostTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Tax savings (interest/taxes)</td>" +
			"<td>-</td>" +
			"<td></td>" +
			"<td>" + calcResults.taxesTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Appreciation</td>" +
			"<td>-</td>" +
			"<td></td>" +
			"<td>" + calcResults.appreciationTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Principal reduction</td>" +
			"<td>-</td>" +
			"<td></td>" +
			"<td>" + calcResults.principalTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Realtor fees on future sale</td>" +
			"<td>+</td>" +
			"<td></td>" +
			"<td>" + calcResults.realtorFeesTotal.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Total cost</td>" +
			"<td>=</td>" +
			"<td>" + calcResults.totalcostRent.slice(0, -3) + "</td>" +
			"<td>" + calcResults.totalcostBuy.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Present value at inflation</td>" +
			"<td></td>" +
			"<td>" + calcResults.pvtotalcostRent.slice(0, -3) + "</td>" +
			"<td>" + calcResults.pvtotalcostBuy.slice(0, -3) + "</td>" +
			"</tr><tr>" +
			"<td>Difference</td>" +
			"<td></td>" +
			"<td></td>" +
			"<td>" + calcResults.difference.slice(0, -3) + "</td></tr>" +
			"</tbody></table>" +
			"</div>";
		$resultsTable.html(html);
	}

	//SubmitHandler
	$('#restRequestForm').submit(function(e) {

		e.preventDefault();
		updateModelwithFormEntries();
		postData();
		$('html, body').animate({
			scrollTop: $("#resultContainer").offset().top
		}, 1000);

	});

	function postData() {
		var data = JSON.stringify(calcFormModel);
		$.ajax({
			url: 'https://www.calcxml.com/rest/hom06',
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
				//fix calcxml results
				if (typeof calcResults.closingCostsTotal === 'undefined') {
					calcResults.closingCostsTotal = "$.00";
				}
				console.log(calcResults);
				buildSummaryTable();
			}
		});
	}

	function updateModelwithFormEntries() {
		if ($('#rent').val().length !== 0) {
			calcFormModel.rent = $('#rent').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#fees').val().length !== 0) {
			calcFormModel.fees = $('#fees').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#rentIns').val().length !== 0) {
			calcFormModel.rentIns = $('#rentIns').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#rentIncr').val().length !== 0) {
			calcFormModel.rentIncr = formPercentageToFloatAsString($('#rentIncr').val());
		}
		if ($('#purchase').val().length !== 0) {
			calcFormModel.purchase = $('#purchase').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#growth').val().length !== 0) {
			calcFormModel.growth = formPercentageToFloatAsString($('#growth').val());
		}
		if ($('#realtorFees').val().length !== 0) {
			calcFormModel.realtorFees = formPercentageToFloatAsString($('#realtorFees').val());
		}
		if ($('#loan').val().length !== 0) {
			calcFormModel.loan = $('#loan').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#rate').val().length !== 0) {
			calcFormModel.rate = formPercentageToFloatAsString($('#rate').val());
		}
		if ($('#term').val().length !== 0) {
			calcFormModel.term = $('#term').val();
		}
		if ($('#closingCosts').val().length !== 0) {
			calcFormModel.closingCosts = $('#closingCosts').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#homeowners').val().length !== 0) {
			calcFormModel.homeowners = $('#homeowners').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#taxes').val().length !== 0) {
			calcFormModel.taxes = $('#taxes').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#maint').val().length !== 0) {
			calcFormModel.maint = $('#maint').val().replace(/[^0-9\.]+/g, "");
		}
		if ($('#analysis').val().length !== 0) {
			calcFormModel.analysis = $('#analysis').val();
		}
		if ($('#taxBracket').val().length !== 0) {
			calcFormModel.taxBracket = formPercentageToFloatAsString($('#taxBracket').val());
		}
		if ($('#beforeTaxReturn').val().length !== 0) {
			calcFormModel.beforeTaxReturn = formPercentageToFloatAsString($('#beforeTaxReturn').val());
		}
		if ($('#inf').val().length !== 0) {
			calcFormModel.inf = formPercentageToFloatAsString($('#inf').val());
		}
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
