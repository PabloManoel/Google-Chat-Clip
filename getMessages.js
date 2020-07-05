var globalUserName = null;

function executeScript(userName) {

    globalUserName = userName;

    // pega lista de datas e box de mensagens referentes aquela data, lista unica de 1 nivel
    let chatElement = document.getElementsByClassName("SvOPqd")[0];
    let chatChildElements = chatElement.childNodes;

    var response = filterUserActivity(chatChildElements);
    return response;

}

function filterUserActivity(chatChildElements) {

    let currentDateSeparator = '';
    let responseIndex = 1;
    let response = {}

    chatChildElements.forEach(childElement => {

        if (isSeparatorElement(childElement)) { // is separatorElement
            currentDateSeparator = childElement.textContent;

        } else { // is chatBox

            let usersElement = getUsersElementFromChatBox(childElement);
            let userMessagesGroup = FilterUsersMessages(usersElement);
            let headerKey = responseIndex.toString().concat('- ').concat(currentDateSeparator);

            if (!objectIsEmpty(userMessagesGroup)) {
                response[headerKey] = userMessagesGroup;
                responseIndex++;
            }
        }
    });

    return response;
}

function getUsersElementFromChatBox(chatBox) {
    return Array.from(chatBox.getElementsByClassName('oGsu4'));
}

function isSeparatorElement(element) {
    let dateSeparatorClasses = 'A2BXPe n5uYMe pYTmjf mCOR5e';
    return element.classList.toString() === dateSeparatorClasses
}

function FilterUsersMessages(usersElement) {
    let messageGroup = {}

    usersElement.forEach(userElement => {

        let nameAndHour = userElement.childNodes[0].textContent;
        let time = getTimeFromNameAndHour(nameAndHour);
        let message = userElement.childNodes[1].textContent;

        if (nameAndHour.includes(globalUserName)) {
            messageGroup[time] = message;
        }
    });

    return messageGroup;
}

function objectIsEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getTimeFromNameAndHour(nameAndHour) {
    return (nameAndHour.includes('minuto') || nameAndHour.includes('hora')) ?
        "Há".concat(nameAndHour.split(',')[1]) :
        nameAndHour.split(' ').filter(splitItem => splitItem.includes(':'))[0].replace(',', '');
}

var scriptAsPromise = new Promise(function (resolve) {
    console.log("Promise Block");

    chrome.storage.sync.get(['name'], function (data) {
        console.log("sync get Block");
        let result = executeScript(data.name);
        resolve(JSON.stringify(result))
    });
});

scriptAsPromise.then(function (response) {
    console.log("then Block");
    chrome.runtime.sendMessage({ data: response })
});


