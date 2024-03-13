/**
 * This mod aims to make clicking the magazine name in the navbar lead to the All Content
 * view instead of the Threads view, while removing the All Content button itself.
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
*/
function altAllContentAccess (isActive) {  // eslint-disable-line no-unused-vars
    const titleList = getTitle();

    if (titleList.length == 0) return;
    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {
        const currentViewIsCollection = isCurrentViewCollection();
        titleList.forEach((title) => {
            const href = title.getAttribute("href");
            if (!currentViewIsCollection && !href.startsWith("/*/")) {
                title.setAttribute("href", `/*${href}`);
            } else if (currentViewIsCollection && !href.endsWith("/*")) {
                title.setAttribute("href", `${href}/*`);
            }
        });
        setButtonVisibility(true);
    }

    function teardown () {
        titleList.forEach((title) => {
            const href = title.getAttribute("href");
            if (href.startsWith("/*/")) title.setAttribute("href", href.slice(2));
            else if (href.endsWith("/*")) title.setAttribute("href", href.slice(0, href.length-2));
        });
        setButtonVisibility(false);
    }

    /**
     * Checks whether the existing All Content button should be hidden.
     * 
     * @returns {Boolean}
     */
    function doHideButton () {
        return true;
        //return getModSettings("alt-all-content-access")["hideAllContentButton"];
    }

    /**
     * Retrieves both the regular and the mobile button.
     * @returns {HTMLElement[]}
     */
    function getAllContentButton () {
        const threadsAttributePattern = "[href^='/*']";
        const collectionsAttributePattern = "[href$='/*']";
        const allContentQuery = "menu.head-nav__menu > li > a";
        const allContentMobileQuery = "div.mobile-nav menu.info a";
        return Array.from(
            document.querySelectorAll(`
                ${allContentQuery}${threadsAttributePattern}, 
                ${allContentMobileQuery}${threadsAttributePattern},
                ${allContentQuery}${collectionsAttributePattern}, 
                ${allContentMobileQuery}${collectionsAttributePattern}
            `)
        );
    }

    /**
     * Retrieves the clickable magazine name title, both the regular one and the mobile one..
     * @returns {HTMLElement[]}
     */
    function getTitle () {
        return Array.from(document.querySelectorAll("div.head-title a"));
    }

    /**
     * Makes the buttons appear or disappear depending on the setting in KES and whether the mod
     * is turned on or off.
     */
    function setButtonVisibility () {
        getAllContentButton().forEach((button) => {
            /** @type {HTMLElement} */
            const parent = button.parentNode;
            if (doHideButton() && isActive) parent.style.display = "none";
            else parent.style.removeProperty("display");
        });
    }

    /**
     * The All Content URL of collections works differently.
     * @returns {Boolean}
     */
    function  isCurrentViewCollection () {
        return getAllContentButton()[0].getAttribute("href").endsWith("/*");
    }
}