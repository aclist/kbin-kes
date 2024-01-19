/*
 * This mod aims to make clicking the magazine name in the navbar lead to the All Content
 * view instead of the Threads view, while removing the All Content button itself.
*/

function alternativeAllContentAccess (toggle) {
    const titleQuery = "div.head-title a";
    const allContentQuery = "menu.head-nav__menu a[href^='/*/']";

    const title = document.querySelector(titleQuery);
    const currentUrl = title.getAttribute("href");
    if (toggle && !currentUrl.startsWith("/*/")) title.setAttribute("href", `/*${currentUrl}`);
    if (!toggle && currentUrl.startsWith("/*/")) title.setAttribute("href", currentUrl.slice(2));
    
    if (getModSettings("alternative-all-content-access")["hideAllContentButton"]) {
        /** @type {HTMLElement} */
        const allContentButton = [...document.querySelectorAll(allContentQuery)]
            .find((element) => !element.isSameNode(title));
        allContentButton.style.display = (toggle) ? "none" : "";
    }
}