// ==UserScript==
// @name         Resize Comment Text
// @namespace    https://github.com/aclist
// @version      0.1
// @description  Change the size of comment text.
// @author       minnieo
// @match        https://kbin.social/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @match        https://www.kbin.cafe/*
// @match        https://karab.in/*
// @match        https://readit.buzz/*
// @match        https://forum.fail/*
// @match        https://fedi196.gay/*
// @match        https://feddit.online/*
// @match        https://kbin.run/*
// @match        https://nadajnik.org/*
// @match        https://kbin.cafe/*
// @match        https://kbin.lol/*
// @match        https://nerdbin.social/*
// @match        https://kbin.lgbt/*
// @match        https://kbin.place/*
// @match        https://kopnij.in/*
// @match        https://kbin.sh/*
// @match        https://kayb.ee/*
// @match        https://wiku.hu/*
// @match        https://kbin.chat/*
// @match        https://fediverse.boo/*
// @match        https://tuna.cat/*
// @match        https://kbin.dk/*
// @match        https://kbin.projectsegau.lt/*
// @match        https://bin.pol.social/*
// @match        https://kbin.fedi.cr/*
// @match        https://baguette.pub/*
// @match        https://kbin.tech/*
// @icon         https://kbin.social/favicon.svg
// @grant        none
// ==/UserScript==

function iterateComments(param, size) {
    param.forEach(comment => {
        comment.style.fontSize = `${size}`;
    });
}

function resizeText() {
    const comment = document.querySelectorAll('blockquote.comment div')

    if (settings["size"] == "Small") {
        iterateComments(comment, ".8rem");
    } else if (settings["size"] == "Normal") {
        iterateComments(comment, ".9rem");
    } else if (settings["size"] == "Large") {
        iterateComments(comment, "1rem");
    } else if (settings["size"] == "Extra Large") {
        iterateComments(comment, "1.1rem");
    } else if (settings["size"] == "Extra Extra Large") {
        iterateComments(comment, "1.3rem");
    }

}

let reloadFlag = false;

function textResize(toggle) {
    if (toggle) {
        resizeText();
    } else {
    }
}
