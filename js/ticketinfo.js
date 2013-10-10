var aboutBox = document.getElementById('aboutBox');
console.log(aboutBox);
var innerbds = aboutBox.getElementsByClassName('innerbd');
var innerbd = null;
if (innerbds.length == 1) {
	innerbd = innerbds[0];
}
console.log(innerbd);
var nodeArray = innerbd.childNodes;
var ticketInfo = new Object();
ticketInfo.release = nodeArray[8].data;
ticketInfo.server = nodeArray[12].data;
ticketInfo.timestamp = nodeArray[16].data;
ticketInfo.companyID = nodeArray[20].data;
ticketInfo.uiVersion = nodeArray[24].data;
ticketInfo.edition = nodeArray[28].data;
ticketInfo.adminVersion = nodeArray[32].data;
console.log(ticketInfo);
