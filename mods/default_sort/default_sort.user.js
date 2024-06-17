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
    /** The attribute used to mark which sort option has been modified. */
    const markerAttribute = "defaultSort_originalPath";
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
        const optionsToHandle = determineInstanceDefault(options, pageType.options);
        if (optionsToHandle == null) return; // all the options are already explicit
        makeOptionExplicit(optionsToHandle.element, optionsToHandle.target);

        if (!isUrlExplicitlySorted(window.location.pathname, pageType.options)) {
            const userDefault = getChosenDefault(pageType);
            var buttonToClick = optionsToHandle.element;
            if (!(userDefault == "default")) {
                buttonToClick = findOptionByName(options, userDefault);
            }
            buttonToClick.click();
        }
    }

    /**
     * This function is responsible for reversing the changes made by the setup() function.  
     * In this case, that would be to make the native default option link to the implicitly sorted
     * page again.
     */
    function teardown () {
        /** @type {HTMLElement} */
        const markedOption = document.querySelector(`[data-${markerAttribute}]`);
        if (markedOption == null) return; // already torn down
        const attrValue = markedOption.getAttribute(`data-${markerAttribute}`);
        markedOption.setAttribute('href', attrValue);
        markedOption.removeAttribute(`data-${markerAttribute}`);
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
     * Change a menu item so it points to a desired explicitly sorted page. The element provided
     * is expected to not already have an explicitly sorted url, otherwise the result of this 
     * function will be erroneous.
     * @param optionElement {HTMLElement} Which element to change the link on
     * @param optionTarget {string} Which sort endpoint to use
     */
    function makeOptionExplicit (optionElement, optionTarget) {
        optionElement.setAttribute(`data-${markerAttribute}`, optionElement.getAttribute('href'));
        var currentLink = optionElement.getAttribute('href').replace('#comments', '');
        const parameters = currentLink.match(urlParameterRegex)?.[0];
        if (parameters != undefined) currentLink = currentLink.replace(urlParameterRegex, '');

        const newLink = currentLink + (currentLink == '/' ? '' : '/') + optionTarget + parameters;
        optionElement.setAttribute('href', newLink);
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
     * On any sortable page, there is one sort option that's the default used if no option
     * is explicitly specified. This default may get changed by instances or in newer versions
     * of kbin/mbin, so to future-proof this mod, this function figures out which option is the
     * default one and returns both the menu item and url endpoint corresponding to it.
     * @param actualOptions {HTMLElement[]} The options present on the page
     * @param expectedOptions {string[]} The options that should be available on the page
    */
    function determineInstanceDefault (actualOptions, expectedOptions) {
        // create copies as we'll modify the array later
        var expectedOptions2 = Array.from(expectedOptions);
        var actualOptions2 = Array.from(actualOptions);

        for (var i = 0; i < actualOptions2.length; i++) {
            const actual = actualOptions2[i];

            const url = actual.getAttribute('href').replace(urlParameterRegex, '');
            const found = expectedOptions2.find((option) => {
                return url.endsWith(`/${option}`) || url.includes(`/${option}/`);
            });

            if (found) {
                expectedOptions2 = expectedOptions2.filter((value) => value != found);
                actualOptions2 = actualOptions2.filter((value) => value != actual);
                i--;
            }
        }

        if (actualOptions2.length == 0 || expectedOptions2.length == 0) return null;
        return { element: actualOptions2[0], target: expectedOptions2[0] };
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