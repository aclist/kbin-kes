/**
 * Allows users to customize the default sort option selected when the url doesn't 
 * specify one already. This can be configured separately for the different types of views
 * that have sort options.
 * 
 * @todo Make it work on kbin.run (mbin)
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
*/
function defaultSort (isActive) {  // eslint-disable-line no-unused-vars
    /**
     * The page types which are supported by this mod.
     */
    const SupportedPages = Object.freeze({
        THREAD: 'Thread',
        COMMENT: 'Comment',
        MICROBLOG: 'Post',
        PROFILE: 'Profile',
        MAGAZINE: 'Magazine'
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

        const option = sortOptions.find(
            (option) => option.textContent.toLowerCase().trim() == defaultSort
        );
        // if the default sort option doesn't exist in the option array, abort the mod
        if (option == undefined) return;
        // ensure the option links to the correct page
        makeOptionsExplicit([option])
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
     * there's no way to switch to the kbin-default sort anymore. 
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
        if (pathTokens[0] == 'm' && pathTokens[2] == 't') {
            if (pathTokens.length == 4) isCommentsPage = true;
            if (pathTokens.length == 6 && pathTokens[4] == '-') isCommentsPage = true;
        }
        // actually make the changes
        for (var option of options) {
            const hrefTokens = option.pathname.split('/');
            if (hrefTokens[hrefTokens.length-1] != option.textContent.toLowerCase().trim()) {
                option.dataset.defaultSort_pathNameBeforeEdit = option.pathname;
                if (isCommentsPage) {
                    option.pathname += `/-/${option.textContent.toLowerCase().trim()}`;
                } else if (getInstanceType() == "mbin" && option.pathname == "/") {
                    option.pathname = `/home/${option.textContent.toLowerCase().trim()}`;
                } else {
                    option.pathname += option.pathname.endsWith('/') ? '' : '/';
                    option.pathname += option.textContent.toLowerCase().trim();
                }
            }
        }
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
            "li.dropdown:has(button[aria-label='Sort by']) a" // TODO: this won't work
        ));
        if (results.length == 0) results = Array.from(document.querySelectorAll(
            "aside.options:has(menu.options__view) > menu.options__main a"
        ));
        return results;
    }

    /**
     * Splits the current page's pathname into individual tokens.
     * 
     * @returns {string[]}
     */
    function getPathTokens () {
        return window.location.pathname.split('/').filter((token) => token != '');
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
        if (isBoostsPage() && window.location.search != '') return true;
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
            // mbin's `/` route
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
        return getModSettings("default-sort")[`default${pageType}Sort`];
    }

    /**
     * Mocked for testing
     * @todo Remove before finalizing pull request
     */
    function getInstanceType () {
        return "mbin";
    }

    /**
     * Mocked for testing
     * @todo Remove before finalizing pull request
     */
    function getModSettings (someStr) {
        return {
            'defaultThreadSort': 'hot',
            'defaultCommentSort': 'hot',
            'defaultPostSort': 'hot',
            'defaultProfileSort': 'newest',
            'defaultMagazineSort': 'hot'
        };
    }
}