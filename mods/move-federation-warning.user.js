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

    if (window.location.href.split('/')[3] !== "m") {
        return; // only run on magazine pages
    }

    let settings = getModSettings("moveFederationWarning");
    
    let alertBox = $(".alert.alert__info");
    let insertAfterQuery = "";

    if(toggle) {
        insertAfterQuery = "#sidebar .magazine .magazine__subscribe";

        if(settings["action"] === "Hide completely") {
            alertBox.hide();
        }
    } else {   
        insertAfterQuery = "#main #options";
        alertBox.show();
    }

    let insertAfter = $(insertAfterQuery);

    if(alertBox !== null && insertAfter !== null) {
        insertAfter.after(alertBox);
    }
}
