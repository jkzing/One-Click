var iCount = 0;
// window.onload = function() {
  // chrome.browserAction.setBadgeText("12");
// }

function updateBadge() {
	if (iCount++ <= 9999) {

		chrome.browserAction.setBadgeText({'text': iCount.toString()});
	}
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
		'type': 'normal',
		'title': 'CLICK ME CLICK ME',
		'contexts': ['all'], 
		'onclick': function(info, tab) {
			alert('I have been changed by updateContextMenu function!');
			console.log(info);
		}
	});
}

var contextMenuId = chrome.contextMenus.create({
	'type': 'normal',
	'title': 'CLICK ME CLICK ME',
	'contexts': ['all'], 
	'onclick': function(info, tab) {
		alert('I\'ve been clicked!');
		console.log(info);
	}
});

chrome.browserAction.onClicked.addListener(updateContextMenu);
