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
    let settings = getModSettings('adjust');
    let sepia = `${settings.sepia * 10}%`;
    let hue = `${settings.hueRotate * 10}deg`;
    let bright = `${(settings.bright * 10) + 100}%`;
    let saturate = `${(settings.saturate * 10) + 100}%`;
    let contrast = `${(settings.contrast * 10) + 100}%`;
    let upvoteCol = getHex(settings.upvote);
    let downvoteCol = getHex(settings.downvote);
    let boostCol = getHex(settings.boost);

    if (adjustStyle && adjustStyle.parentNode) {
        adjustStyle.parentNode.removeChild(adjustStyle);
    }

    adjustStyle = document.createElement('style');
    const css = `
    html {
        filter: sepia(${sepia}) hue-rotate(${hue}) brightness(${bright}) saturate(${saturate}) contrast(${contrast});
    }
    .vote .active.vote__up button {
        color: ${upvoteCol};
        ${settings.border ? `border: 2px solid ${upvoteCol};` : ''}
    }
    .vote .active.vote__down button {
        color: ${downvoteCol};
        ${settings.border ? `border: 2px solid ${downvoteCol};` : ''}
    }
    .entry footer menu > a.active, .entry footer menu > li button.active {
        color: ${boostCol};
        text-decoration: none;
    }
    `;

    adjustStyle.innerText = css;
    document.head.appendChild(adjustStyle);

    
function getHex (value) {
    const firstChar = Array.from(value)[0];
    let realHex;
    if (firstChar === "-") {
        realHex = getComputedStyle(document.documentElement).getPropertyValue(initial);
    } else {
        realHex = value;
    }
    return realHex;
}

}

function adjustSite(toggle) {
    if (toggle) {
        adjustColors();
    } else {
        document.head.removeChild(adjustStyle);
    }
}