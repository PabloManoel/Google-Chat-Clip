var copyToClipBoardButton = document.getElementById('copyToClipBoardId');
var generateJsonButton = document.getElementById('generateJsonId');
var inputResult = document.getElementById('inputResultId');
var inputName = document.getElementById('inputNameId');

var okid = document.getElementById('okid');
var bkg = chrome.extension.getBackgroundPage();


inputName.addEventListener('input', (event) => {
	copyToClipBoardButton.textContent = "Copiar";
	copyToClipBoardButton.classList.add('btn-outline-primary');
	copyToClipBoardButton.classList.remove('btn-outline-success');
	inputResult.value = '';

	setNameInputToGlobalVariable(inputName.value);
});

generateJsonButton.onclick = function () {

	chrome.storage.sync.get('name', function (data) {
		console.log("####" + data.name);
		userName = data;
	});

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: "getMessages.js" },
			() => {
				new Promise(resolve => {
					chrome.runtime.onMessage.addListener(function listener(response) {
						chrome.runtime.onMessage.removeListener(listener);
						bkg.console.log("eventListener")
						resolve(response.data)
					});
				}).then(data => {
					bkg.console.log("data received from script: " + data);
					setResultToInputResult(data);
				})
			}
		);
	});
};

function setNameInputToGlobalVariable(nameInput) {
	chrome.storage.sync.set({ name: nameInput });
}

function setResultToInputResult(result) {
	document.getElementById("inputResultId").value = result;
}

function updateCopyButtonToClickedText() {
	copyToClipBoardButton.classList.add('btn-outline-success');
	copyToClipBoardButton.classList.remove('btn-outline-primary');
	copyToClipBoardButton.innerText = "Copiado!"
}

copyToClipBoardButton.onclick = function setResultToClipBoard() {
	inputResult.select();
	document.execCommand('copy');

	updateCopyButtonToClickedText();
}

function onError(error) {
	bkg.console.log('>>>>>> onError');
	console.log(error)
}