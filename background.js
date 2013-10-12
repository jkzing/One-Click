var iCount = 0;
var serverInfo = new Object();
// window.onload = function() {
  // chrome.browserAction.setBadgeText("12");
// }

function updateBadge() {
	if (iCount++ <= 9999) {
		chrome.browserAction.setBadgeText({'text': iCount.toString()});
	}
}

function getTicketInfoByInjectJS(sourceFile) {
	chrome.tabs.executeScript(null, {
		file: sourceFile 
	});
}

function contextMenuOnClick(info, tab) {
	getTicketInfoByInjectJS('js/ticket_info.js');
	initFormTab();
}

var contextMenuId = chrome.contextMenus.create({
	type: 'normal',
	title: 'Create JIRA ticket',
	contexts: ['all'], 
	onclick: contextMenuOnClick
});

function checkResponse(response) {
	if (!response.success) {
		alert('Oops, something goes wrong, please try again!');
	}
}

function initFormTab() {
	chrome.tabs.create({
		url: 'create_ticket.html'
	}, function(tab) {
		chrome.tabs.sendMessage(tab.id, {
			flag: 'serverinfo',
			info: serverInfo
		});
	});
}

function messageListener(request, sender, sendResponse) {
	if(request.flag == 'serverinfo') {
		sendResponse({success: true});
		serverInfo = request.info;
	}
}

chrome.browserAction.onClicked.addListener(getTicketInfoByInjectJS);

chrome.runtime.onMessage.addListener(messageListener);