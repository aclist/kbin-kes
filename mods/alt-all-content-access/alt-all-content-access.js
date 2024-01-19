/**
 * This mod aims to make clicking the magazine name in the navbar lead to the All Content
 * view instead of the Threads view, while removing the All Content button itself.
 * 
 * @todo Need to test it properly and set up unit tests
*/
class AlternativeAllContentAccessMod {
    constructor () {
        this.titleQuery = "div.head-title a";
        this.allContentQuery = "menu.head-nav__menu a[href^='/*/']";

        this.title = document.querySelector(this.titleQuery);
        this.currentUrl = this.title.getAttribute("href");
    }

    /** @returns {boolean} */
    getHideButtonSetting () {
        return getModSettings("alt-all-content-access")["hideAllContentButton"];
    }

    /** @param {boolean} isActive */
    setButtonVisibility (isActive) {
        /** @type {HTMLElement} */
        const allContentButton = [...document.querySelectorAll(this.allContentQuery)]
            .find((element) => !element.isSameNode(this.title));
        allContentButton.style.display = (isActive) ? "none" : "";
    }

    setup () {
        if (!this.currentUrl.startsWith("/*/")) {
            this.title.setAttribute("href", `/*${this.currentUrl}`);
        }
        if (this.getHideButtonSetting()) this.setButtonVisibility(true);
    }

    teardown () {
        if (this.currentUrl.startsWith("/*/")) {
            this.title.setAttribute("href", `/*${this.currentUrl.slice(2)}`);
        }
        if (this.getHideButtonSetting()) this.setButtonVisibility(false);
    }
}

function altAllContentAccess (isActive) {  // eslint-disable-line no-unused-vars
    if (isActive) {
        new AlternativeAllContentAccessMod().setup();
    } else {
        new AlternativeAllContentAccessMod().teardown();
    }
}