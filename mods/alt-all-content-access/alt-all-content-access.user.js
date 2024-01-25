/**
 * This mod aims to make clicking the magazine name in the navbar lead to the All Content
 * view instead of the Threads view, while removing the All Content button itself.
 * 
 * @todo Need to test it properly and set up unit tests
*/
class AlternativeAllContentAccessMod {
    getTitle () {
        return document.querySelector("div.head-title a");
    }

    /** @returns {boolean} */
    getHideButtonSetting () {
        return getModSettings("alt-all-content-access")["hideAllContentButton"];
    }

    /** @returns {HTMLElement} */
    getAllContentButton () {
        const allContentQuery = "menu.head-nav__menu a[href^='/*/']";
        return [...document.querySelectorAll(allContentQuery)]
            .find((element) => !element.isSameNode(this.getTitle()));
    }

    /** @param {boolean} isActive */
    setButtonVisibility (isActive) {
        const hideButton = this.getHideButtonSetting() && isActive;
        this.getAllContentButton().style.display = (hideButton) ? "none" : "";
    }

    setup () {
        const title = this.getTitle();
        if (!title.getAttribute("href").startsWith("/*/")) {
            title.setAttribute("href", `/*${title.getAttribute("href")}`);
        }
        this.setButtonVisibility(true);
    }

    teardown () {
        const title = this.getTitle();
        if (title.getAttribute("href").startsWith("/*/")) {
            title.setAttribute("href", title.getAttribute("href").slice(2));
        }
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