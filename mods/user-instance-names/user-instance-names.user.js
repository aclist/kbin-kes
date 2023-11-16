// ==UserScript==
// @name         User Instance Names
// @namespace    https://github.com/aclist
// @version      0.1
// @description  Shows instance names next to non-local users and communities.
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function userInstanceEntry (toggle) {
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
    const localInstance = window.location.href.split('/')[2];
    if (toggle) {
        showUserInstances();
    } else {
        hideUserInstances();
    }
}
