var isSFPage = false;
checkPageInfo();

chrome.runtime.sendMessage({
	flag: 'checkresult',
	result: isSFPage
}, checkResponse);

function checkResponse(response) {
	if (!response.success) {
		alert('Oops, something goes wrong, please try again!');
	}
}

function checkPageInfo() {
	var aboutBox = document.getElementById('aboutBox');
	if (aboutBox != null) {
		var aboutBoxHTML = aboutBox.innerHTML;
		if (aboutBoxHTML.indexOf('successfactors') != -1 || aboutBoxHTML.indexOf('SuccessFactors') != -1) {
			isSFPage = true;
		}
	}
}

