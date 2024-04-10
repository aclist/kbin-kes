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
        // 1. get a list of sort options on the current page
        const sortOptions = getSortOptions();
        // 2. abort the mod if the list is empty
        if (sortOptions.length == 0) return;
        // 3. determine the default sort
        const defaultSort = determineDefaultSort();
        // 4. abort the mod if there is no default sort specified for the current page
        if (defaultSort == null) return;
        // 5. Click the correct sort option
        const option = sortOptions.find((option) => option.textContent.trim() == defaultSort);
        // if the default sort option doesn't exist in the option array, abort the mod
        if (option == undefined) return;
        // ensure the option links to the correct page
        const hrefTokens = option.pathname.split('/');
        if (hrefTokens[hrefTokens.length-1] != option.textContent.trim()) {
            option.href = `${option.href}/${option.textContent.trim()}`;
        }
        option.click();
        
    }

    function teardown () {
        for (var option of getSortOptions()) {
            if (option.dataset.defaultSort_pathNameBeforeEdit == undefined) continue;
            option.pathname = option.dataset.defaultSort_pathNameBeforeEdit;
            delete option.dataset.defaultSort_pathNameBeforeEdit;
        }
    }

    /**
     * Retrieves the available sort options from the current page.
     * 
     * @returns {HTMLAnchorElement[]}
     */
    function getSortOptions () {
        const pathTokens = getPathTokens();
        if (pathTokens.length == 2 && pathTokens[0] == "u") {
            return Array.from(
                document.querySelectorAll("aside.options--top > menu.options__main a")
            );
        } else {
            return Array.from(
                document.querySelectorAll("aside:not(#activity) > menu.options__main a")
            );
        }
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
        if (pathTokens[pathTokens.length-1] == "microblog") {
            // any microblog page
            return defaultSort(SupportedPages.MICROBLOG);
        }
        if (pathTokens[pathTokens.length-1] == "*") {
            // All Content page of collections
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens[0] == "*") {
            // All Content page of magazines and frontpage
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length == 1 && pathTokens[0] == "magazines") {
            // list of magazines
            return defaultSort(SupportedPages.MAGAZINE);
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
        if (pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "boosts") {
            return defaultSort(SupportedPages.PROFILE);
        }
        if (pathTokens.length == 3 && pathTokens[0] == "u" && pathTokens[2] == "overview") {
            return defaultSort(SupportedPages.PROFILE);
        }
        if (pathTokens.length == 2 && (pathTokens[0] == "m" || pathTokens[0] == "c")) {
            return defaultSort(SupportedPages.THREAD);
        }
        if (pathTokens.length >= 4 && pathTokens[0] == "m" && pathTokens[2] == "t") {
            // when a thread is accessed via just its id
            if (pathTokens.length == 4) return defaultSort(SupportedPages.COMMENT);
            // when a thread is accessed via a - or its name after the id
            if (pathTokens.length == 5) return defaultSort(SupportedPages.COMMENT);
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
}