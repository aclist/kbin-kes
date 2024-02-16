/**
 * This mod aims to make clicking the magazine name in the navbar lead to the All Content
 * view instead of the Threads view, while removing the All Content button itself.
 * 
 * @todo ensure this doesn't have unforeseen issues on mbin
 * @todo remark in the description that this addon is useless on mbin
*/
class AlternativeAllContentAccessMod {
    /** @returns {HTMLElement[]} */
    getTitle () {
        return Array.from(document.querySelectorAll("div.head-title a"));
    }

    /** @returns {boolean} */
    getHideButtonSetting () {
        return getModSettings("alt-all-content-access")["hideAllContentButton"];
    }

    /** @returns {HTMLElement[]} */
    getAllContentButton () {
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

    /** @param {boolean} isActive */
    setButtonVisibility (isActive) {
        const hideButton = this.getHideButtonSetting() && isActive;
        this.getAllContentButton().forEach((button) => {
            button.parentNode.style.display = (hideButton) ? "none" : "";
        });
    }

    isCurrentViewCollection () {
        return this.getAllContentButton()[0].getAttribute("href").endsWith("/*");
    }

    setup () {
        const titleList = this.getTitle();
        if (titleList.length == 0) return;
        const currentViewIsCollection = this.isCurrentViewCollection();
        titleList.forEach((title) => {
            const href = title.getAttribute("href");
            if (!currentViewIsCollection && !href.startsWith("/*/")) {
                title.setAttribute("href", `/*${href}`);
            } else if (currentViewIsCollection && !href.endsWith("/*")) {
                title.setAttribute("href", `${href}/*`);
            }
        });
        this.setButtonVisibility(true);
    }

    teardown () {
        const titleList = this.getTitle();
        if (titleList.length == 0) return;
        titleList.forEach((title) => {
            const href = title.getAttribute("href");
            if (href.startsWith("/*/")) title.setAttribute("href", href.slice(2));
            else if (href.endsWith("/*")) title.setAttribute("href", href.slice(0, href.length-2));
        });
        this.setButtonVisibility(false);
    }
}

function altAllContentAccess (isActive) {  // eslint-disable-line no-unused-vars
    if (isActive) {
        new AlternativeAllContentAccessMod().setup();
    } else {
        new AlternativeAllContentAccessMod().teardown();
    }
}
