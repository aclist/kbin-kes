function userInstanceEntry (toggle) { // eslint-disable-line no-unused-vars

    function showUserInstances (selector) {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
            if (el.getAttribute("data-instance") !== "true") {
                if (el.classList.contains("user-hidden-instance")) return
                const arr = el.getAttribute("href").split("@");
                const name = arr[1];
                const remote = arr[2];
                if (name) {
                    const clone = el.cloneNode(false);
                    clone.innerText = name + "@" + remote;
                    clone.setAttribute("data-instance", "true");
                    el.classList.add("user-hidden-instance");
                    el.style.display = "none";
                    el.insertAdjacentElement("afterend", clone);
                }
            }
        });
    }

    function hideUserInstances (selector) {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
            if (el.getAttribute("data-instance") === "true") {
                el.remove();
            }
        });
        document.querySelectorAll(".user-hidden-instance").forEach((el) => {
            el.style.removeProperty("display");
            el.classList.remove("user-hidden-instance");
        })
    }

    function setSelector () {
        const page = getPageType() //eslint-disable-line no-undef
        let el
        switch (page) {
            case Mbin.Thread.Favorites:
            case Mbin.User.Followers:
            case Mbin.User.Following:
                el = ".users-columns .stretched-link"
                break;
            case Mbin.User.Default:
                el = ".user-inline"
                break;
            default:
                el = ".user-inline"
                break;
        }
        return el
    }

    const selector = setSelector();
    if (toggle) showUserInstances(selector);
    if (!toggle) hideUserInstances(selector);
}
