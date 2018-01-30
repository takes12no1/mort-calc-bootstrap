$(function() {
	'use strict';

	//SETUP VARS
	var reviewResults = {};


	var formModel = {
		"partnerId": "RD-BTRXMNZ",
		"companyName": "PrimeLending,%20A%20PlainsCapital%20Company",
		"nmlsId": "13649"
	};

	postData();

	//Build the schedule
	function buildReview() {
		var $tbody = $("#resultContainer");
		$tbody.html("");
		var html = "<tr>" +
			"<th>Program</th>" +
			"<th>Loan Type</th>" +
			"<th>Loan Purpose</th>" +
			"<th>Rating</th>" +
			"<th>Title</th>" +
			"<th>Content</th>" +
			"</tr>";
		$.each(reviewResults.reviews, function(i, item) {
			html += "<tr>" +
				"<td>" + reviewResults.reviews[i].loanProgram + "</td>" +
				"<td>" + reviewResults.reviews[i].loanType + "</td>" +
				"<td>" + reviewResults.reviews[i].loanPurpose + "</td>" +
				"<td>" + reviewResults.reviews[i].rating + "</td>" +
				"<td>" + reviewResults.reviews[i].title + "</td>" +
				"<td>" + reviewResults.reviews[i].content + "</td></tr>";
		});
		$tbody.html(html);
	}

	//SubmitHandler
	$('#restRequestForm').submit(function(e) {

		e.preventDefault();
		postData();

	});

	function postData() {
		// var data = JSON.stringify(eval(mortgageCalcFormModel));
		// console.log(data);
		var data = JSON.stringify(formModel);
		console.log(data);
		$.get("https://mortgageapi.zillow.com/zillowLenderReviews?partnerId=RD-BTRXMNZ&companyName=PrimeLending,%20A%20PlainsCapital%20Company&nmlsId=13649", {
				reviewLimit: 5
			},
			function(data) {
				reviewResults = data;
				console.log(data);
				buildReview();
			});

	}

});
