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

function hideDownvotes (toggle) {
    if (toggle) {
        $('form.vote__down').hide();
    } else {
        $('form.vote__down').show();
    }
}

function hideReputation (toggle) {
    if (toggle) {
        $('#sidebar > section.section.user-info > ul > li:nth-child(2)').hide();
        document.styleSheets[0].addRule('.user-popover ul li:nth-of-type(2)','display:none')
    } else {
        $('#sidebar > section.section.user-info > ul > li:nth-child(2)').show();
        document.styleSheets[0].addRule('.user-popover ul li:nth-of-type(2)','display:initial')
    }
}
