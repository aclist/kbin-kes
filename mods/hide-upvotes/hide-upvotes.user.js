// ==UserScript==
// @name         kbin Vote Hider
// @namespace    https://github.com/aclist
// @version      0.2
// @description  Hide upvotes, downvotes, and karma
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hideUpvotes (toggle) {
    if (toggle) {
        $('form.vote__up').hide();
    } else {
        $('form.vote__up').show();
    }
}
