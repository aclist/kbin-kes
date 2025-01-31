function userInstanceEntry (toggle) { // eslint-disable-line no-unused-vars

    function showUserInstances (selector) {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
            if (el.getAttribute("data-instance") !== "true") {
                const userInstance = el.getAttribute("href").split("@")[2];
                if (userInstance) {
                    el.innerText = el.innerText + "@" + userInstance;
                    el.setAttribute("data-instance", "true")
                }
            }
        });
    }

    function hideUserInstances (selector) {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
            if (el.getAttribute("data-instance") === "true") {
                el.setAttribute("data-instance", "false");
                el.innerText = el.innerText.split("@")[0]
            }
        });
    }

    function setSelector () {
        const page = getPageType() //eslint-disable-line no-undef
        let el
        switch (page) {
            case "Mbin.Thread.Favorites":
            case "Mbin.User.Followers":
            case "Mbin.User.Following":
                el = ".users-columns .stretched-link"
                break;
            default:
                el = ".user-inline"
                break;
        }
        return el
    }

    const selector = setSelector();

    if (toggle) {
        showUserInstances(selector);
    } else {
        hideUserInstances(selector);
        return
    }
}
