// pega lista de datas e box de mensagens referentes aquela data, lista unica de 1 nivel
dialogTag = document.getElementsByClassName("SvOPqd")[0].childNodes;

var currentHeader = '';
var responseIndex = 0;
var response = {};
var boxId = 0;

for (let dialogIndex = 0; dialogIndex < dialogTag.length; dialogIndex++) {

    // classes [A2BXPe n5uYMe pYTmjf mCOR5e] determinam o cabeçalho do dia
    let headerNode = 'A2BXPe n5uYMe pYTmjf mCOR5e';

    if (dialogTag[dialogIndex].classList.toString() === headerNode) {
        let headerContent = dialogTag[dialogIndex].textContent;

        currentHeader = headerContent;

    } else {
        let boxContent = getBoxContent(dialogTag[dialogIndex]);
        let headerKey = responseIndex.toString().concat(' - ').concat(currentHeader);

        if (!objectIsEmpty(boxContent)) {
            response[headerKey] = boxContent;
            responseIndex++;
        }
    }
}

function getBoxContent(box) {
    // [NAO ALTERAR]: pega a lista de mensagens dentro do box
    // console.log(box.children[1].children[1].children.length);

    let profileBoxes = box.getElementsByClassName('oGsu4');

    let boxContent = {}
    for (let index = 0; index < profileBoxes.length; index++) {
        // nome e hora: profileBoxes[index].childNodes[0]
        // mensagem: profileBoxes[index].childNodes[1]

        let nameAndHour = profileBoxes[index].childNodes[0].textContent;

        let hour = nameAndHour.split(' ').filter(splitItem => splitItem.includes(':'))[0].replace(',', '');
        let message = profileBoxes[index].childNodes[1].textContent;

        if (nameAndHour.includes("Mauricio Santos")) {
            boxContent[hour] = message;
        }
    }
    return boxContent;
}

function objectIsEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// console.log(response);
    response;