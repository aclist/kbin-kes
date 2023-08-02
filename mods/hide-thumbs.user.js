// ==UserScript==
// @name         kbin-hide-thumbs
// @namespace    https://github.com/aclist
// @version      0.2
// @description  Hide thumbnails
// @author       shazbot
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hideThumbs (toggle) {
    settings = getModSettings('hidethumbs')
    const index = 'kes-index-thumbs'
    const inline = 'kes-inline-thumbs'
    const thumbsCSS = `
    .entry.section.subject figure, .no-image-placeholder {
        display: none
    }
    `
    const inlineCSS = `
    .thumbs {
        display:none
    }
    `
    function apply(sheet, name){
            unset(name)
            safeGM("applyStyle", sheet, name)
    }
    function unset(name){
            safeGM("removeStyle", name)
    }
    if (toggle) {
        if (settings["index"]) {
            apply(thumbsCSS, index);
        } else {
            unset(index)
        }
        if (settings["inline"]) {
            apply(inlineCSS, inline)
        } else {
            unset(inline)
        }
    } else {
        unset(index)
        unset(inline)
    }
}
