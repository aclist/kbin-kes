/**
 * Allows users to customize the default sort option selected when the url doesn"t 
 * specify one already. This can be configured separately for the different types of pages
 * that have sort options.
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
*/
function defaultSort (isActive) {  // eslint-disable-line no-unused-vars
    /**
     * The different page types for which users can choose their own default.
     * Each object contains the id used to access the chosen default option from the KES settings,
     * and a list of available options on that page type.
     */
    const pageTypes = {
        THREAD: { id: "Thread", options: ["top", "hot", "newest", "active", "commented"] },
        COMMENTS: { id: "Comment", options: ["top", "hot", "active", "newest", "oldest"] },
        MICROBLOG: { id: "Post", options: ["top", "hot", "newest", "active", "commented"] },
        MAGAZINES: { id: "Magazine", options: ["newest", "hot", "active", "abandoned"] }
    };
    /** Regex pattern used to remove or extract the url parameters from a URL. */
    const urlParameterRegex = /\?.+/;

    if (isActive) setup();
    else teardown();

    /**
     * When users access a page like '/m/kbinmeta', they get the default sort option applied as
     * defined by the instance. Instead, '/m/kbinmeta/top' applies a specific sort option.  
     * 
     * This mod (and thus this main function) has two goals:  
     * 1\. redirect users from implicitly sorted pages (like /m/kbinmeta) to the explicitly sorted
     * page of their choice (like /m/kbinmeta/top).  
     * 2. change the native default option from linking to the implicitly sorted page to the
     * explicitly sorted equivalent (to actually make that sort option accessible without getting
     * redirected away from it).
     */
    function setup () {
        const options = getOptionsFromPage();
        if (options.length == 0) return; // this isn't a sortable page

        const pageType = determinePageType();
        if (getChosenDefault(pageType) == 'default') return;

        if (!isUrlExplicitlySorted(window.location.pathname, pageType.options)) {
            const userDefault = getChosenDefault(pageType);
            var buttonToClick = findOptionByName(options, userDefault);
            buttonToClick.click();
        }
    }

    /**
     * This function is responsible for reversing the changes made by the setup() function.  
     * In this case, that would be to make the native default option link to the implicitly sorted
     * page again.
     */
    function teardown () {
    }

    /**
     * Checks whether a URL is explicitly sorted. That means the sort option used is 
     * mentioned in the url.
     * @param validOptions {string[]} The options the url should be tested for
     * @param url {string} The url to check
     */
    function isUrlExplicitlySorted (url, validOptions) {
        url = url.replace(urlParameterRegex, '');
        return validOptions.some(
            (option) => url.endsWith(`/${option}`) || url.includes(`/${option}/`)
        );
    }

    /**
     * Retrieve the user's chosen default option from the KES settings.  
     * The value 'default' may be returned to indicate that the user does not want to change
     * from whatever the native default is.
     * @param pageType {{id: string; options: string[]}} What type of page to get the user's chosen
     * default for
     * @returns {string}
     */
    function getChosenDefault (pageType) {
        return getModSettings("default-sort")[`default${pageType.id}Sort`];
    }

    /**
     * Finds the option on the page which explicitly links to the specified target sort option.
     * @param options {HTMLElement[]} The list of links to look through
     * @param target {string} The target url endpoint to look for
     */
    function findOptionByName (options, target) {
        return Array.from(options).find((option) => {
            const url = option.getAttribute('href').replace(urlParameterRegex, '');
            return url.endsWith(`/${target}`) || url.includes(`/${target}/`);
        });
    }

    /**
     * Figures out which page we're currently on.  
     * Will always return THREAD by default if no other page type is found to apply.
     */
    function determinePageType () {
        const path = window.location.pathname.replace(urlParameterRegex, '');
        if (path.includes('/microblog/') || path.endsWith('/microblog')) return pageTypes.MICROBLOG;
        if (path.startsWith('/magazines')) return pageTypes.MAGAZINES;
        if (path.startsWith('/d/') && (path.endsWith('/comments') || path.includes('/comments/')))
            return pageTypes.COMMENTS;
        if (path.startsWith('/m/') && path.includes('/t/')) return pageTypes.COMMENTS;
        // else:
        return pageTypes.THREAD;
    }

    /**
     * Retrieves the options actually present on the current page.
     */
    function getOptionsFromPage () {
        const excludeRelatedTags = ":not([href='#'])";
        const excludePeoplePage = ":not([href$='/people'])";
        const excludeSettings = ":not([href^='/settings/'])";
        const excludeProfiles = ":not([href^='/u/'])";
        const excludeActivityElements = ":not(#activity)";

        const kbinQuery = `${excludeActivityElements} > .options__main > li > a`
            + excludeRelatedTags + excludePeoplePage + excludeSettings + excludeProfiles;

        const mbinQuery = ".dropdown:has(i.fa-sort) .dropdown__menu > li > a";

        return Array.from(document.querySelectorAll(`${kbinQuery}, ${mbinQuery}`));
    }
}
