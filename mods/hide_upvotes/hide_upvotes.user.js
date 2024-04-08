function hideUpvotes (toggle) { //eslint-disable-line no-unused-vars
    // ==UserScript==
    // @name         kbin Vote Hider
    // @namespace    https://github.com/aclist
    // @version      0.2
    // @description  Hide upvotes, downvotes, and karma
    // @author       artillect
    // @match        https://kbin.social/*
    // @license      MIT
    // ==/UserScript==
    if (toggle) {
        $('form.vote__up').hide();
    } else {
        $('form.vote__up').show();
    }
}
