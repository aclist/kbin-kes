// ==UserScript==
// @name         Federated Instance Names
// @namespace    https://github.com/aclist
// @version      0.1
// @description  Shows instance names next to non-local users and communities.
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

// Get instance url from current page
const localInstance = window.location.href.split('/')[2];

const userInstanceObserver = new MutationObserver(showUserInstances);
const magInstanceObserver = new MutationObserver(showMagInstances);

function userInstanceEntry (toggle) {
    if (toggle) {
        showUserInstances();
        userInstanceObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        hideUserInstances();
        userInstanceObserver.disconnect();
    }
}

function showUserInstances () {
    $('.user-inline').each(function () {
        if (!$(this).hasClass('instance')) {
            $(this).addClass('instance');
            // Get user's instance from their profile link
            var userInstance = $(this).attr('href').split('@')[2];
            // Check if user's link includes an @
            if (userInstance) {
                // Add instance name to user's name
                $(this).html($(this).html() + '<span class="user-instance">@' + userInstance + '</span>');
            }
        }
    });
}

function hideUserInstances () {
    $('.user-inline.instance').each(function () {
        $(this).removeClass('instance');
        $(this).html($(this).html().split('<span class="user-instance">@')[0]);
    });
}
function hideCommunityInstances () {
    $('.magazine-inline.instance').each(function () {
        $(this).removeClass('instance');
        $(this).html($(this).html().split('<span class="mag-instance">@')[0]);
    });
}

function magInstanceEntry (toggle) {
    if (toggle) {
        showMagInstances();
        magInstanceObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        hideCommunityInstances();
        magInstanceObserver.disconnect();
    }
}

function showMagInstances () {
    $('.magazine-inline').each(function () {
        // Check if community is local
        if (!$(this).hasClass('instance')) {
            $(this).addClass('instance');
            // Get community's instance from their profile link
            var magInstance = $(this).attr('href').split('@')[1];
            // Check if community's link includes an @
            if (magInstance) {
                // Add instance name to community's name
                $(this).html($(this).html() + '<span class="mag-instance">@' + magInstance + '</span>');
            }
        }
    });
}
