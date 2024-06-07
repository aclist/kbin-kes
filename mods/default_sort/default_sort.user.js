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
    /**
     * The page types which are supported by this mod.
     */
    const SupportedPages = Object.freeze({
        THREAD: { name: "Thread", options: ["hot", "top", "newest", "active", "commented"] },
        COMMENT: { name: "Comment", options: ["hot", "top", "newest", "active", "oldest"] },
        MICROBLOG: { name: "Post", options: ["hot", "top", "newest", "active", "commented"] },
        PROFILE: { name: "Profile", options: ["hot", "top", "newest", "active", "commented"] },
        MAGAZINE: { name: "Magazine", options: ["hot", "newest", "active", "abandoned"] },
    });

    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {
        // get a list of sort options on the current page
        const sortOptions = getSortOptions();
        // abort the mod if the list is empty
        if (sortOptions.length == 0) return;
        
        // abort the mod if the current page is already an explicitly sorted one
        if (isCurrentPageExplicitlySorted(sortOptions)) {
            makeOptionsExplicit(sortOptions);
            return;
        }

        const defaultSort = determineDefaultSort();
        if (defaultSort == null) return;

        makeOptionsExplicit(sortOptions);
        const option = sortOptions.find((option) => option.pathname.endsWith(defaultSort));
        // if the default sort option doesn"t exist in the option array, abort the mod
        if (option == undefined) return;
        // ensure the option links to the correct page
        option.click();
    }

    function teardown () {
        for (var option of getSortOptions()) {
            if (option.dataset.defaultSort_pathNameBeforeEdit != undefined) {
                option.pathname = option.dataset.defaultSort_pathNameBeforeEdit;
                delete option.dataset.defaultSort_pathNameBeforeEdit;
            }
        }
    }

    /**
     * The kbin-default sort option always links to the non-explicitly sorted page. This mod 
     * redirects people on that page to the mod-default sorted one. This means, effectly, 
     * there"s no way to switch to the kbin-default sort anymore. 
     * This function takes a list of option elements and makes sure they actually point to 
     * the explicitly sorted page.
     * 
     * @param {HTMLAnchorElement[]} options
     */
    function makeOptionsExplicit (options) {
        // The boosts page does sorting a bit differently and is sorted from the start, so this
        // function has nothing to do there.
        if (isBoostsPage()) return;
        // figure out if this is the comments page, which also needs some special handling
        const pathTokens = getPathTokens();
        var isCommentsPage = false;
        if (pathTokens[0] == "m" && pathTokens[2] == "t") {
            if (pathTokens.length == 4) isCommentsPage = true;
            if (pathTokens.length == 6 && pathTokens[4] == "-") isCommentsPage = true;
        }
        
        const optionsWithTokens = options.map((option) => {
            const tokens = option.pathname.split("/");
            return { tokens: tokens, count: tokens.length, option: option };
        });
        // determine the option with the lowest amount of tokens
        const kbin_default_option = optionsWithTokens.reduce((min, obj) => {
            (obj.count < min.count ? obj : min), optionsWithTokens[0]
        });

        // save the current path so we can restore it on teardown
        kbin_default_option.dataset.defaultSort_pathNameBeforeEdit = kbin_default_option.pathname;

        // get the list of options that should be available on the current page
        const allOptions = 

        /* Goal:
            - Of the available sort options, the kbin-default one points to the non-explicitly
            sorted page instead. Since this mod redirects people on that page, it"s impossible
            to reach the kbin-default sort option now. As such, the mod needs to make the
            kbin-default option use an explicit link instead.
           Issue:
            - The label on the option might be translated to another language, so how do we
            determine which the kbin-default is?
           Possible Solution:
            - Create an enum containing the available sort options and an array of which
            pages they're available on.
            - Get the list of options for the current page, ensure it matches the actual option list
            in count.
            - Iterate through the explicit options and remove their endpoint from the list.
            - There should be only one option remaining, use that.
        */
        

        // actually make the changes
        /*for (var option of options) {
            if (hrefTokens[hrefTokens.length-1] != option.textContent.toLowerCase().trim()) {
                option.dataset.defaultSort_pathNameBeforeEdit = option.pathname;
                if (isCommentsPage) {
                    option.pathname += `/-/${option.textContent.toLowerCase().trim()}`;
                } else if (getInstanceType() == "mbin" && option.pathname == "/") {
                    option.pathname = `/home/${option.textContent.toLowerCase().trim()}`;
                } else {
                    option.pathname += option.pathname.endsWith("/") ? "" : "/";
                    option.pathname += option.textContent.toLowerCase().trim();
                }
            }
        }*/
    }

    /**
     * Identifies if the current page is the boosts page on the profile.
     * 
     * @returns {boolean}
     */
    function isBoostsPage () {
        const pathTokens = getPathTokens();
        return pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "boosts";
    }

    /**
     * Retrieves the available sort options from the current page.
     * 
     * @returns {HTMLAnchorElement[]}
     */
    function getSortOptions () {
        // kbin
        var results = Array.from(document.querySelectorAll(
            "aside.options:has(menu.options__filters) > menu.options__main a"
        ));
        if (results.length == 0) results = Array.from(document.querySelectorAll(
            "aside.options:has(menu.options__layout) > menu.options__main a"
        ));
        // mbin
        if (results.length == 0) results = Array.from(document.querySelectorAll(
            "li.dropdown:has(button[aria-label='Sort by']) a" // TODO: this won"t work
        ));
        if (results.length == 0) results = Array.from(document.querySelectorAll(
            "aside.options:has(menu.options__view) > menu.options__main a"
        ));
        return results;
    }

    /**
     * Splits the current page"s pathname into individual tokens.
     * 
     * @returns {string[]}
     */
    function getPathTokens () {
        return window.location.pathname.split("/").filter((token) => token != "");
    }

    /**
     * Determines if the currently open page is already explicitly sorted. In that case going
     * through all of {@link determineDefaultSort} should be avoided.
     * 
     * @param {HTMLAnchorElement[]} sortOptions
     * @returns {boolean}
     */
    function isCurrentPageExplicitlySorted (sortOptions) {
        // The boosts page on the profile has its own way of sorting
        if (isBoostsPage() && window.location.search != "") return true;
        const allowedRoutes = sortOptions.map((option) => option.textContent.toLowerCase().trim());
        const currentRoute = window.location.pathname;
        for (var route of allowedRoutes) {
            if (currentRoute.endsWith(`/${route}`)) return true;
        }
        return false;
    }

    /**
     * Determines the default sort option for the current page.
     * 
     * @returns {string|null}
     */
    function determineDefaultSort () {
        const pathTokens = getPathTokens();
        if (pathTokens.length == 0) {
            // logged-out frontpage
            return defaultSort(SupportedPages.THREAD);
        }
        if (getInstanceType() != "mbin" && pathTokens[pathTokens.length-1] == "microblog") {
            // any microblog page
            return defaultSort(SupportedPages.MICROBLOG);
        }
        if (pathTokens[pathTokens.length-1] == "*") {
            // All Content page of collections
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 1 && pathTokens[0] == "magazines") {
            // list of magazines
            return defaultSort(SupportedPages.MAGAZINE);
        }
        if (pathTokens.length == 1 && pathTokens[0] == "home") {
            // mbin"s `/` route
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 1 && (pathTokens[0] == "sub" || pathTokens[0] == "all")) {
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 2 && pathTokens[0] == "u") {
            // profile overview
            return defaultSort(SupportedPages.PROFILE);
        }
        if (pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "threads") {
            return defaultSort(SupportedPages.PROFILE);
        }
        if (pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "comments") {
            return defaultSort(SupportedPages.PROFILE);
        }
        if (pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "posts") {
            return defaultSort(SupportedPages.PROFILE);
        }
        if (isBoostsPage()) {
            return defaultSort(SupportedPages.PROFILE);
        } 
        if (pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "overview") {
            return defaultSort(SupportedPages.PROFILE);
        }
        if (pathTokens.length == 2 && (pathTokens[0] == "m" || pathTokens[0] == "c")) {
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 4 && pathTokens[0] == "u" && pathTokens[2] == "c") {
            // Some collections seem to be accessible like this instead of directly via /c/
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length >= 4 && pathTokens[0] == "m" && pathTokens[2] == "t") {
            // when a thread is accessed via just its id
            if (pathTokens.length == 4) return defaultSort(SupportedPages.COMMENT);
            // when a thread is accessed via a - or its name after the id
            if (pathTokens.length == 5) return defaultSort(SupportedPages.COMMENT);
        }
        if (pathTokens.length == 2 && pathTokens[0] == "*") {
            // All Content page of /sub and /all
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 3 && pathTokens[0] == "*" && pathTokens[1] == "m") {
            // All Content page of magazines
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 2 && pathTokens[0] == "d") {
            // Domain threads page
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 3 && pathTokens[0] == "d" && pathTokens[2] == "comments") {
            // Domain comments page
            return defaultSort(SupportedPages.COMMENT);
        }
        if (pathTokens.length == 2 && pathTokens[0] == "tag") {
            // Tag page
            return defaultSort(SupportedPages.MICROBLOG);
        }
        return null;
    }

    /**
     * Retrieves the selected default sort from the KES settings.
     * 
     * @param {string} pageType Which page to get the default sort for.
     * @see {@link SupportedPages}
     * @returns {string}
     */
    function defaultSort (pageType) {
        return getModSettings("default-sort")[`default${pageType.name}Sort`];
    }
}