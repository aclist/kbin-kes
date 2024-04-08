function magInstanceEntry (toggle) { // eslint-disable-line no-unused-vars
    // ==UserScript==
    // @name         Magazine Instance Names
    // @namespace    https://github.com/aclist
    // @version      0.1
    // @description  Shows instance names next to non-local magazines
    // @author       artillect
    // @match        https://kbin.social/*
    // @license      MIT
    // ==/UserScript==
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
    function hideCommunityInstances () {
        $('.magazine-inline.instance').each(function () {
            $(this).removeClass('instance');
            $(this).html($(this).html().split('<span class="mag-instance">@')[0]);
        });
    }
    //const localInstance = window.location.href.split('/')[2];
    if (toggle) {
        showMagInstances();
    } else {
        hideCommunityInstances();
    }
}
