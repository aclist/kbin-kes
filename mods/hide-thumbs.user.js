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
    let cl = '.entry.section.subject figure, .thumb, .no-image-placeholder'
    if (toggle) {
        $(cl).hide();
    } else {
        $(cl).show();
    }
}
