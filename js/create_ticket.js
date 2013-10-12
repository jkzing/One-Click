var serverInfo = new Object();

function messageListener(request, sender, sendResponse) {
	if (request.flag == 'serverinfo') {
		sendResponse({success: true});
		serverInfo = request.info;
		writeValue();
	}
}

function writeValue() {
	$('#customfield_10005').val(serverInfo.companyID);
	$('#summary').val('please download server.log');
	$('#description').val('Release:' + serverInfo.release + '\nServer:' + serverInfo.server
							+ '\nTimestamp:' + serverInfo.timestamp + '\nCompanyID:' + serverInfo.companyID
							+ '\nUI version:' + serverInfo.uiVersion + '\nEdition:' + serverInfo.edition
							+ '\nAdmin version:' + serverInfo.adminVersion);
}

chrome.runtime.onMessage.addListener(messageListener);

$('#create-issue-submit').click(function() {
	console.log(serverInfo);
	var ticketInfoJson = {
		'project-field': $('#project-field').val(),
		'issuetype-field': $('#issuetype-field').val(),
		'customfield_10005': $('#customfield_10005').val(),
		'customfield_10841': $('#customfield_10841').val(),
		'customfield_10842': $('#customfield_10842').val(),
		'customfield_10843': $('#customfield_10843').val(),
		'customfield_10844': $('#customfield_10844').val(),
		'summary': $('#summary').val(),
		'description': $('#description').val(),
		'customfield_10002': $('#customfield_10002').val(),
		'customfield_10846': $('#customfield_10846').val(),
		'customfield_10847': $('#customfield_10847').val()
	}
	console.log(ticketInfoJson);
	return false;
});
