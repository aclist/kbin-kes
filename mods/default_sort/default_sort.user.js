/**
 * Allows users to customize the default sort option selected when the url doesn"t 
 * specify one already. This can be configured separately for the different types of views
 * that have sort options.
 * 
 * @todo Add entrypoint to the json
 * @todo Test in KES context (important for the setting)
 * @todo Add comments
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
*/
function defaultSort (isActive) {  // eslint-disable-line no-unused-vars
    const pageTypes = {
        THREAD: { id: "Thread", options: ["top", "hot", "newest", "active", "commented"] },
        COMMENTS: { id: "Comment", options: ["top", "hot", "active", "newest", "oldest"] },
        MICROBLOG: { id: "Post", options: ["top", "hot", "newest", "active", "commented"] },
        MAGAZINES: { id: "Magazine", options: ["newest", "hot", "active", "abandoned"] }
    };
    const markerAttribute = "defaultSort_originalPath";

    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {
        const options = getOptionsFromPage();
        if (options.length == 0) return; // this isn't a sortable page

        const pageType = determinePageType();
        const optionsToHandle = determineInstanceDefault(options, pageType.options);
        if (optionsToHandle == null) return; // all the options are already explicit
        makeOptionExplicit(optionsToHandle.button, optionsToHandle.target);

        if (!isCurrentPageExplicitlySorted(pageType.options)) {
            const userDefault = getChosenDefault(pageType);
            var buttonToClick = optionsToHandle.button;
            if (!(userDefault == "default")) {
                buttonToClick = findOptionByName(options, userDefault);
            }
            buttonToClick.click();
        }
    }

    function teardown () {
        /** @type {HTMLElement} */
        const markedOption = document.querySelector(`[data-${markerAttribute}]`);
        if (markedOption == null) return; // already torn down
        const attrValue = markedOption.getAttribute(`data-${markerAttribute}`);
        markedOption.setAttribute('href', attrValue);
        markedOption.removeAttribute(`data-${markerAttribute}`);
    }

    /** @param optionsByPage {string[]} What options should be available for this page */
    function isCurrentPageExplicitlySorted (optionsByPage) {
        const url = window.location.pathname;
        return optionsByPage.some(
            (option) => url.endsWith(`/${option}`) || url.includes(`/${option}/`)
        );
    }

    /**
     * @param optionButton {HTMLElement}
     * @param optionTarget {string}
     */
    function makeOptionExplicit (optionButton, optionTarget) {
        optionButton.setAttribute(`data-${markerAttribute}`, optionButton.getAttribute('href'));
        const currentLink = optionButton.getAttribute('href').replace('#comments', '');
        const newLink = currentLink + (currentLink == '/' ? '' : '/') + optionTarget;
        optionButton.setAttribute('href', newLink);
    }

    /** @param pageType {{id: string; options: string[]}} */
    function getChosenDefault (pageType) {
        return getModSettings("default-sort")[`default${pageType.id}Sort`];
    }

    /** 
     * @param actualOptions {NodeListOf<HTMLElement>}
     * @param expectedOptions {string[]}
    */
    function determineInstanceDefault (actualOptions, expectedOptions) {
        var expectedOptions2 = Array.from(expectedOptions);
        var actualOptions2 = Array.from(actualOptions);

        for (var i = 0; i < actualOptions2.length; i++) {
            const actual = actualOptions2[i];

            const url = actual.getAttribute('href');
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
        return { button: actualOptions2[0], target: expectedOptions2[0] };
    }

    /**
     * @param options {HTMLElement[]}
     * @param target {string}
     */
    function findOptionByName (options, target) {
        return Array.from(options).find((option) => {
            const url = option.getAttribute('href');
            return url.endsWith(`/${target}`) || url.includes(`/${target}/`);
        });
    }

    function determinePageType () {
        const path = window.location.pathname;
        if (path.includes('/microblog/') || path.endsWith('/microblog')) return pageTypes.MICROBLOG;
        if (path.startsWith('/magazines')) return pageTypes.MAGAZINES;
        if (path.startsWith('/d/') && (path.endsWith('/comments') || path.includes('/comments/')))
            return pageTypes.COMMENTS;
        if (path.startsWith('/m/') && path.includes('/t/')) return pageTypes.COMMENTS;
        // else:
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

        const mbinQuery = ".dropdown:has(i.fa-sort) .dropdown__menu > li > a";

        return document.querySelectorAll(`${kbinQuery}, ${mbinQuery}`);
    }
}