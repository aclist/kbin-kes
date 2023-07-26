// ==UserScript==
// @name         Color adjustments
// @namespace    https://github.com/aclist
// @version      0.2
// @description  Adjust appearance of site
// @author       minnieo
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

let adjustStyle;

function adjustColors() {
    let settings = getModSettings("adjust");
    let sepia = `${settings.sepia * 10}%`;
    let hue = `${settings.hueRotate * 10}deg`;
    let bright = `${settings.bright * 10}%`;
    let saturate = `${settings.saturate * 10}%`;
    let contrast = `${settings.contrast * 10}%`;

    if (adjustStyle && adjustStyle.parentNode) {
        adjustStyle.parentNode.removeChild(adjustStyle);
    }


    adjustStyle = document.createElement('style');
    const css = `html {filter: sepia(${sepia}) hue-rotate(${hue}) brightness(${bright}) saturate(${saturate}) contrast(${contrast});}`;
    style2.innerText = css;
    document.head.appendChild(adjustStyle);

}

function adjustSite(toggle) {
    if (toggle) {
        adjustColors();
    } else {
        document.head.removeChild(adjustStyle);
    }
}