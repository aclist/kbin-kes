// ==UserScript==
// @name         Color adjustments
// @namespace    https://github.com/aclist
// @version      0.2
// @description  Adjust appearance of site
// @author       minnieo
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function adjustSite (toggle) {
    const sheetName = "#custom-kes-colors"

    if (toggle) {
        adjustColors(sheetName);
    } else {
        safeGM("removeStyle", sheetName);
    }

    function adjustColors (sheetName) {
        safeGM("removeStyle", sheetName)
        let settings = getModSettings('adjust');
        let sepia = `${settings.sepia * 10}%`;
        let hue = `${settings.hueRotate * 10}deg`;
        let bright = `${(settings.bright * 10) + 100}%`;
        let saturate = `${(settings.saturate * 10) + 100}%`;
        let contrast = `${(settings.contrast * 10) + 100}%`;
        let upvoteCol = getHex(settings.upvote);
        let downvoteCol = getHex(settings.downvote);
        let boostCol = getHex(settings.boost);


        const customCSS = `
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
        safeGM("addStyle", customCSS, sheetName)
    }
}
