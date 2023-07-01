// ==UserScript==
// @name         kbin Vote Hider
// @namespace    https://github.com/aclist
// @version      0.2
// @description  Hide upvotes, downvotes, and karma
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==
const upvoteObserver = new MutationObserver(hideUpvotes);
const downvoteObserver = new MutationObserver(hideDownvotes);

function hideUpvotes(toggle) {
    if (toggle) {
        $('.vote__up').hide();
        upvoteObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        $('.vote__up').show();
        upvoteObserver.disconnect();
    }
}

function hideDownvotes(toggle) {
    if (toggle) {
        $('.vote__down').hide();
        downvoteObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        $('.vote_down').show();
        downvoteObserver.disconnect();
    }
}