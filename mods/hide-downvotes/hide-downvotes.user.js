// ==UserScript==
// @name         kbin Vote Hider
// @namespace    https://github.com/aclist
// @version      0.2
// @description  Hide upvotes, downvotes, and karma
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hideDownvotes (toggle) {
    if (toggle) {
        $('form.vote__down').hide();
    } else {
        $('form.vote__down').show();
    }
}
