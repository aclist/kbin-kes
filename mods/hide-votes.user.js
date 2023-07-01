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
        $('form.vote__up').hide();
        upvoteObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        $('form.vote__up').show();
        upvoteObserver.disconnect();
    }
}

function hideDownvotes(toggle) {
    if (toggle) {
        $('form.vote__down').hide();
        downvoteObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        $('form.vote__down').show();
        downvoteObserver.disconnect();
    }
}

function hideReputation(toggle) {
    if (toggle) {
        $('#sidebar > section.section.user-info > ul > li:nth-child(2)').hide();
    } else {
        $('#sidebar > section.section.user-info > ul > li:nth-child(2)').show();
    }
}