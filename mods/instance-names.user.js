// ==UserScript==
// @name         Federated Instance Names
// @namespace    https://github.com/aclist
// @version      0.1
// @description  Shows instance names next to non-local users and communities.
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

const userInstanceObserver = new MutationObserver(showUserInstances);
const communityInstanceObserver = new MutationObserver(showCommunityInstances);

function userInstanceEntry(toggle) {
    if (toggle) {
        showUserInstances();
        userInstanceObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        hideUserInstances();
        userInstanceObserver.disconnect();
    }
}

function showUserInstances() {
    // Get instance url from current page
    var instance = window.location.href.split('/')[2];
    console.log(instance);
    $('.user-inline').each(function() {
        if (!$(this).hasClass('instance')) {
            $(this).addClass('instance');
            // Check if user's instance matches current instance
        }
    });
}

function hideUserInstances() {
}