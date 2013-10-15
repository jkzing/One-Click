var iCount = 0;
var serverInfo = new Object();

function injectJSToCurrentPage(sourceFile) {
	chrome.tabs.executeScript(null, {
		file: sourceFile 
	});
}

function contextMenuOnClick(info, tab) {
	injectJSToCurrentPage('js/parse_serverinfo.js');
}

var contextMenuId = chrome.contextMenus.create({
	type: 'normal',
	title: 'Create JIRA Ticket',
	contexts: ['all'], 
	onclick: contextMenuOnClick
});

function checkResponse(response) {
	if (!response.success) {
		alert('Oops, something goes wrong, please try again!');
	}
}

function initFormTab() {
	var tabId = null;
	chrome.tabs.create({
		url: 'create_ticket.html'
	}, function(tab) {
	});
	var sleep = setTimeout('sendTicketInfoMessage()', 100);
	
}

function sendTicketInfoMessage() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log(tabs[0].id);
		chrome.tabs.sendMessage(tabs[0].id, {
			flag: 'ticketinfo',
			data: serverInfo
		});
	});
}

function checkPage() {
	injectJSToCurrentPage('js/check_page.js');
}

function messageListener(request, sender, sendResponse) {
	switch (request.flag) {
		case 'serverinfo': {
			sendResponse({success: true});
			serverInfo = request.data;
			initFormTab();
			break;
		}
		case 'checkresult': {
			break;
		}
	}
}

chrome.browserAction.onClicked.addListener(injectJSToCurrentPage);
// cchrome.tabs.onActivated.addListener(checkPage);
chrome.runtime.onMessage.addListener(messageListener);