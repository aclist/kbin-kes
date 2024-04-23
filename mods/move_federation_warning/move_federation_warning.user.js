function moveFederationWarningEntry (toggle) { //eslint-disable-line no-unused-vars
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

    const loc = window.location.href.split('/')
    // only run on magazine, profile, and "all content" pages
    if ((loc[3] !== "m") && (loc[3] !== "u") && (loc[3] !== "*")) return;
    if ((loc[3] === "*") && (loc[4] !== "m")) return;

    let settings = getModSettings("moveFederationWarning");
    let alertBox = $(".alert.alert__info");
    let insertAfterQuery = "";

    if(toggle) {
        if ((loc[3] === "m") || (loc[3] === "*")) {
            insertAfterQuery = "#sidebar .magazine .magazine__subscribe";
        } else {
            insertAfterQuery = "#sidebar .section.user-info";
        }

        if(settings["action"] === "Hide completely") {
            alertBox.hide();
        } else {
            alertBox.show();
        }
    } else {
        const options = document.querySelectorAll('#main #options')
        insertAfterQuery = options[options.length-1]
        alertBox.show();
    }

    let insertAfter = $(insertAfterQuery);

    if(alertBox !== null && insertAfter !== null) {
        insertAfter.after(alertBox);
    }
}
