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
    const indexThumbs = '.entry.section.subject figure'
    const inlineThumbs = '.thumb, .no-image-placeholder'
    if (toggle) {
        if (settings["index"]) {
            $(indexThumbs).hide();
        } else {
            $(indexThumbs).show();
        }
        if (settings["inline"]) {
            $(inlineThumbs).hide();
        } else {
            $(inlineThumbs).show();
        }
    } else {
        $(indexThumbs).show();
        $(inlineThumbs).show();
    }
}
