let changeColor = document.getElementById('changeColor');
let okid = document.getElementById('okid');
var bkg = chrome.extension.getBackgroundPage();
// chrome.storage.sync.get('color', function (data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

changeColor.onclick = function () {

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ file: "getMessages.js" },
			onExecuted
		);
	});
};

function onExecuted(result) {

	setResultToClipBoard(result[0]);

}

function setResultToClipBoard(content) {

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{
				code:
					
					' console.log(\'COPIADO!\'); ' /* + 
					' var textarea = document.createElement("textarea"); ' +
					' textarea.value = JSON.stringify(${content}); '+ 
					' textarea.select(); ' +
					' document.execCommand(\'copy\'); ' */
			}
		);
	});



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