var serverInfo = new Object();
getInfoFromDOM();
console.log(serverInfo);

chrome.runtime.sendMessage({
	flag: 'serverinfo',
	data: serverInfo
}, checkResponse);

function checkResponse(response) {
	if (!response.success) {
		alert('Oops, something goes wrong, please try again!');
	}
}

function getInfoFromDOM() {
	var aboutBox = document.getElementById('aboutBox');
	var innerbds = aboutBox.getElementsByClassName('innerbd');
	var innerbd = null;
	if (innerbds.length == 1) {
		innerbd = innerbds[0];
	}
	var nodeArray = innerbd.childNodes;
	serverInfo.release = nodeArray[8].data;
	serverInfo.server = nodeArray[12].data;
	serverInfo.timestamp = nodeArray[16].data;
	serverInfo.companyID = nodeArray[20].data;
	serverInfo.uiVersion = nodeArray[24].data;
	serverInfo.edition = nodeArray[28].data;
	serverInfo.adminVersion = nodeArray[32].data;
}