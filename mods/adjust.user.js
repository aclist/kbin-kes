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
    let upvoteCol = settings.upvote;
    let downvoteCol = settings.downvote;
    let boostCol = settings.boost;

    if (adjustStyle && adjustStyle.parentNode) {
        adjustStyle.parentNode.removeChild(adjustStyle);
    }

    adjustStyle = document.createElement('style');
    const css = `
    :root {
        chosen-upvote-color: ${upvoteCol}
        chosen-downvote-color: ${downvoteCol}
        chosen-boost-color: ${boostCol}
    }

    html {
        filter: sepia(${sepia}) hue-rotate(${hue}) brightness(${bright}) saturate(${saturate}) contrast(${contrast});
    }

    .vote .active.vote__up button {
        color: var(--chosen-upvote-color);
        ${settings.border ? `border: 2px solid var(--chosen-upvote-color);` : ''}
    }

    .vote .active.vote__down button {
        color: var(--chosen-downvote-color);
        ${settings.border ? `border: 2px solid var(--chosen-downvote-color);` : ''}
    }

    .entry footer menu > a.active, .entry footer menu > li button.active {
        color: var(--chosen-boost-color);
        text-decoration: none;
    }
    `;

    adjustStyle.innerText = css;
    document.head.appendChild(adjustStyle);

}

function adjustSite(toggle) {
    if (toggle) {
        adjustColors();
    } else {
        document.head.removeChild(adjustStyle);
    }
}