var iCount = 0;
// window.onload = function() {
  // chrome.browserAction.setBadgeText("12");
// }

function updateBadge() {
	if (iCount++ <= 9999) {
		chrome.browserAction.setBadgeText({'text': iCount.toString()});
	}
}

function getTicketInfoByInjectJS() {
	chrome.tabs.executeScript(null, {
		file: 'js/ticketinfo.js'
	});
}

function testListener() {
	chrome.browserAction.getTitle({}, function(result) {
		alert(result);
	});
}

function contextMenuClicked(info, tab) {
	alert('I\'ve been clicked!');
}

function updateContextMenu() {
	chrome.contextMenus.update(contextMenuId, {
		type: 'normal',
		title: 'Create JIRA ticket',
		contexts: ['all'], 
		onclick: function(info, tab) {
			alert('I have been changed by updateContextMenu function!');
			console.log(info);
		}
	});
}

var contextMenuId = chrome.contextMenus.create({
	type: 'normal',
	title: 'Create JIRA ticket',
	contexts: ['all'], 
	onclick: function(info, tab) {
		createTab();
	}
});

function createTab() {
	chrome.tabs.create({
		url: 'create_ticket.html'
	});
}

chrome.browserAction.onClicked.addListener(getTicketInfoByInjectJS);
