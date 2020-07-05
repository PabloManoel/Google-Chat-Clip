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

	bkg.console.log('>>>>>> onExecute');
	bkg.console.log(JSON.stringify(result[0]));
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