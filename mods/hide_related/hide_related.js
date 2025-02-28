function toggleLogo (toggle) { // eslint-disable-line no-unused-vars

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
