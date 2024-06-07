/**
 * Allows users to customize the default sort option selected when the url doesn"t 
 * specify one already. This can be configured separately for the different types of views
 * that have sort options.
 * 
 * @todo Add entrypoint to the json
 * @todo rewrite
 * - setup()
 *  - change the default option to an explicit one
 *      1. get all options on the page
 *      2. find the non-explicit one — if there's none, abort
 *      3. determine the current page
 *      4. get the options that should be on the current page
 *      5. make the non-explicit option link to the first option that should be on the page, which isn't
 *  - when on the base site, redirect to the correctly sorted page
 *      1. get all options on the page
 *      2. get the user-defined default for the current page type
 *      3. click the correct option (to make use of turbo mode)
 * - teardown()
 *  - change the added explicit sorting back via a data attribute
 * // make sure to take into account:
 * // - kbin + kbin mobile
 * // - fedia + fedia mobile
 * // - kbin.run + kbin.run mobile
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
*/
function defaultSort (isActive) {  // eslint-disable-line no-unused-vars
    const pageTypes = {
        THREAD: { id: "Thread", options: ["top", "hot", "newest", "active", "commented"] },
        COMMENTS: { id: "Comment", options: ["top", "hot", "active", "newest", "oldest"] },
        MICROBLOG: { id: "Post", options: ["top", "hot", "newest", "active", "commented"] },
        MAGAZINES: { id: "Magazine", options: ["newest", "hot", "active", "abandoned"] },
    };

    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {
        const options = getOptionsFromPage();
        if (options.length == 0) return;
        const pageType = determinePageType();
    }

    function determinePageType () {
        const path = window.location.pathname;
        if (path.includes('/microblog/') || path.endsWith('/microblog')) return pageTypes.MICROBLOG;
        if (path.startsWith('/magazines')) return pageTypes.MAGAZINES;
        if (path.startsWith('/d/') && (path.endsWith('/comments') || path.includes('/comments/')))
            return pageTypes.COMMENTS;
        if (path.startsWith('/m/') && path.includes('/t/')) return pageTypes.COMMENTS;
        return pageTypes.THREAD;
    }

    function getOptionsFromPage () {
        const excludeRelatedTags = ":not([href='#'])";
        const excludePeoplePage = ":not([href$='/people'])";
        const excludeSettings = ":not([href^='/settings/'])";
        const excludeProfiles = ":not([href^='/u/'])";
        const excludeActivityElements = ":not(#activity)";

        const kbinQuery = `${excludeActivityElements} > .options__main > li > a`
            + excludeRelatedTags + excludePeoplePage + excludeSettings + excludeProfiles;

        const mbinQuery = ".dropdown:has(i.fa-sort) .dropdown__menu > li";

        return document.querySelectorAll(`${kbinQuery}, ${mbinQuery}`);
    }
}