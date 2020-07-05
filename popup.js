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

});

generateJsonButton.onclick = function () {

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: "getMessages.js" },
			onExecuted
		);
	});
};

function onExecuted(result) {
	globalResult = JSON.stringify(result[0]);

	setResultToGlobalVariable(globalResult);

	setResultToInputResult(globalResult);
}

function setResultToGlobalVariable(globalResult) {
	chrome.storage.local.set({ json: globalResult }, function () {
		bkg.console.log('globalResult = ' + globalResult);
	});
}

function setResultToInputResult(result){
	document.getElementById("inputResultId").value = result;	
}


function updateCopyButtonToClickedText(){
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




// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

// 	chrome.tabs.executeScript(
// 		tabs[0].id,
// 		{ code: "document.body.getElementsByClassName(\"QQodff\")" },
// 		function (result) {
// 			bkg.console.log(result);
// 			// chrome.storage.sync.set({ targetChat: result }, function () {
// 			// 	bkg.console.log(result);
// 			// })
// 			// for (let resultItem of result) {
// 			// 	bkg.console.log(resultItem);					
// 			// }
// 		});
// });