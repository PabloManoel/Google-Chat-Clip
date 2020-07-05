chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.sync.set({ json: null }, function () {});

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: { hostEquals: 'chat.google.com' },
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});