let changeColor = document.getElementById('changeColor');
let okid = document.getElementById('okid');
// chrome.storage.sync.get('color', function (data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

changeColor.onclick = function () {
	var bkg = chrome.extension.getBackgroundPage();

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{
				code: `
				// pega lista de datas e box de mensagens referentes aquela data, lista unica de 1 nivel
				dialogTag = document.getElementsByClassName("SvOPqd")[0].childNodes;

				var currentHeader = '';
				var response = {};
				var boxId = 0;

				for (let dialogIndex = 0; dialogIndex < dialogTag.length; dialogIndex++) {

					// classes [A2BXPe n5uYMe pYTmjf mCOR5e] determinam o cabeçalho do dia
					let headerNode = 'A2BXPe n5uYMe pYTmjf mCOR5e';

					if (dialogTag[dialogIndex].classList.toString() === headerNode){
						let headerContent = dialogTag[dialogIndex].textContent;

						currentHeader = headerContent;
						response[headerContent] = {};
						
					} else {
						let currentHeaderNode = response[currentHeader];
						currentHeaderNode[boxId] = "boxContent";
						boxId++;
					}					
				}

				console.log(response);
			`});
	});
};






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