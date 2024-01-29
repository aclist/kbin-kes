/**
 * This mod aims to make clicking the magazine name in the navbar lead to the All Content
 * view instead of the Threads view, while removing the All Content button itself.
*/
class AlternativeAllContentAccessMod {
    /** @returns {HTMLElement[]} */
    getTitle () {
        return document.querySelectorAll("div.head-title a");
    }

    /** @returns {boolean} */
    getHideButtonSetting () {
        return getModSettings("alt-all-content-access")["hideAllContentButton"];
    }

    /** @returns {HTMLElement[]} */
    getAllContentButton () {
        const allContentQuery = "menu.head-nav__menu > li > a[href^='/*/']";
        const allContentMobileQuery = "div.mobile-nav menu.info a[href^='/*/']";
        return document.querySelectorAll(`${allContentQuery}, ${allContentMobileQuery}`);
    }

    /** @param {boolean} isActive */
    setButtonVisibility (isActive) {
        const hideButton = this.getHideButtonSetting() && isActive;
        this.getAllContentButton().forEach((button) => {
            button.style.display = (hideButton) ? "none" : "";
        });
    }

    setup () {
        const titleList = this.getTitle();
        if (titleList.length == 0) return;
        titleList
            .filter((title) => !title.getAttribute("href").startsWith("/*/"))
            .forEach((title) => title.setAttribute("href", `/*${title.getAttribute("href")}`));
        this.setButtonVisibility(true);
    }

    teardown () {
        const titleList = this.getTitle();
        if (titleList.length == 0) return;
        titleList
            .filter((title) => title.getAttribute("href").startsWith("/*/"))
            .forEach((title) => title.setAttribute("href", title.getAttribute("href").slice(2)));
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