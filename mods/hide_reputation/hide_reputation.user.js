function hideReputation (toggle) { //eslint-disable-line no-unused-vars
    // ==UserScript==
    // @name         kbin Vote Hider
    // @namespace    https://github.com/aclist
    // @version      0.3
    // @description  Hide upvotes, downvotes, and karma
    // @author       artillect
    // @match        https://kbin.social/*
    // @license      MIT
    // ==/UserScript==
    const itemSelector = 'li:has(a[href$="/reputation/threads"])'
    if (toggle) {
        $(`#sidebar > section.section.user-info > ul > ${itemSelector}`).hide()
        document.styleSheets[0].addRule(`.user-popover ul ${itemSelector}`,'display:none')
    } else {
        $(`#sidebar > section.section.user-info > ul > ${itemSelector}`).show()
        document.styleSheets[0].addRule(`.user-popover ul ${itemSelector}`,'display:initial')
    }
}
