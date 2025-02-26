function toggleLogo (toggle) { // eslint-disable-line no-unused-vars

    function isIndex () {
        const pt = getPageType();
        switch (pt) {
            case Mbin.Domain.Default:
            case Mbin.Domain.Comments:
            case Mbin.Top:
                return true
            default:
                return false
        }
    }
    function isThread () {
        const pt = getPageType();
        switch (pt) {
            case Mbin.Thread.Comments:
            case Mbin.Thread.Favorites:
            case Mbin.Thread.Boosts:
                return true
            default:
                return false
        }
    }

    function hideRelated () {
        restoreRelated();
        const settings = getModSettings("hide_related");
        if ((settings["index"]) && (isIndex())) {
            document.querySelectorAll(".entry-cross").forEach((entry) => {
                entry.style.display = "none"
            })
        }
        if ((settings["thread"]) && (isThread())) {
            document.querySelectorAll(".entries-cross").forEach((entry) => {
                entry.style.display = "none"
            });
        }
    }

    function restoreRelated () {
        document.querySelectorAll(".entry-cross").forEach((entry) => {
            entry.style.removeProperty("display");
        })
        document.querySelectorAll(".entries-cross").forEach((entry) => {
            entry.style.removeProperty("display");
        })
    }

    if (toggle) hideRelated();
    if (!toggle) restoreRelated();
}
