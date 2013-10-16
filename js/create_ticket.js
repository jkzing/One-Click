var serverInfo = null;

String.prototype.leftTrim = function() { 
   return this.replace(/(^\s*)/g, ""); 
}

function messageListener(request, sender, sendResponse) {
	if (request.flag == 'serverinfo') {
		console.log('listened serverinfo request');
	} else if (request.flag == 'ticketinfo') {
		if (request.data != null) {
			sendResponse({success: true});
			serverInfo = request.data;
			writeValue();
			console.log('listened');
		} else {
			sendResponse({success: false});
		}
	}
}

function writeValue() {
	$('#customfield_10005').val(serverInfo.companyID.leftTrim());
	$('#summary').val('please download server.log');
	$('#description').val('Release:' + serverInfo.release + '\nServer:' + serverInfo.server
							+ '\nTimestamp:' + serverInfo.timestamp + '\nCompanyID:' + serverInfo.companyID
							+ '\nUI version:' + serverInfo.uiVersion + '\nEdition:' + serverInfo.edition
							+ '\nAdmin version:' + serverInfo.adminVersion);
}

chrome.runtime.onMessage.addListener(messageListener);

$(document).ready(function() {
	var checkJob = setTimeout('checkInfo()', 500);
})

function checkInfo() {
	if (serverInfo == null) {
		alert('Oops, information parsing failed! \n\nClick "OK" to close this tab.');
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.remove(tabs[0].id);
		})
	}
}

$('#create-issue-submit').click(function() {
	if ($('#success-alert-info').css('visibility') == 'visible') {
		alert('Already create one ticket!');
		return false;
	}
	console.log(serverInfo);
	var ticketInfoJson = {
		'fields': {
			'project': {
				'key': 'CO',
				'name': 'CO Cloud operations'
			},
			'issuetype': {
				'name': 'Log Requests'
			},
			'customfield_10005': $('#customfield_10005').val(),
			'customfield_10844': $('#customfield_10844').val(),
			'customfield_10843': {
				'value': $('#customfield_10843').children('[selected="selected"]').text(),
				'id': $('#customfield_10843').val()
			},
			'customfield_10841': {
				'value': $('#customfield_10841').children('[selected="selected"]').text(),
				'id': $('#customfield_10841').val()
			},
			'customfield_10842': {
				'value': $('#customfield_10842').children('[selected="selected"]').text(),
				'id': $('#customfield_10842').val()
			},
			'customfield_10847': {
				'value': $('#customfield_10847').children('[selected="selected"]').text(),
				'id': $('#customfield_10847').val()
			},
			'customfield_10846': {
				'value': $('#customfield_10846').children('[selected="selected"]').text(),
				'id': $('#customfield_10846').val()
			},
			'customfield_10002': {
				'value': $('#customfield_10002').children('[selected="selected"]').text(),
				'id': $('#customfield_10002').val()
			},
			'description': $('#description').val(),
			'summary': $('#summary').val()
		}
	}
	$.ajax({
		url: 'http://jira.successfactors.com/rest/api/2/issue',
		type: 'Post',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(ticketInfoJson),
		success: function(data) {
		$('#success-alert-info').append('<a href="http://jira.successfactors.com/browse/'+ data.key +'">' + data.key + '</a>');
		$('#success-alert-info').css({'visibility': 'visible'});
			chrome.tabs.create({url: 'http://jira.successfactors.com/browse/' + data.key});
		},
		error: function() {
			alert('failed');
		},
		username: 'xxu',
		password: 'Welcomexx!'
	});
	console.log(ticketInfoJson);
	return false;
});
