// ==UserScript==
// @name         Kbin: Move federation alert
// @match        https://kbin.social/*
// @match        https://lab2.kbin.pub/*
// @match        https://lab3.kbin.pub/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @match        https://kbin.cafe/*
// @version      1.0
// @description  Moves the magazine federation warning to the sidebar's magazine info panel
// @author       PrinzKasper
// @namespace    https://github.com/jansteffen
// @icon         https://kbin.social/favicon.svg
// @license      MIT
// ==/UserScript==

function moveFederationWarningEntry (toggle) {
    
    let alertBox = document.querySelector(".alert.alert__info");

    let instertAfterQuery = "";

    if(toggle) {
        instertAfterQuery = "#sidebar .magazine .magazine__subscribe";
    } else {   
        instertAfterQuery = "#main #options";
    }

    let insertAfter = document.querySelector(instertAfterQuery);

    if(alertBox !== null && insertAfter !== null) {
        insertAfter.insertAdjacentElement('afterend', alertBox);
    }
}
