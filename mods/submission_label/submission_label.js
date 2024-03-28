function addPrefix (toggle){
    function addPrefix(prefix){
        const css = `
            .article:not(.entry-cross) > .entry__meta .user-inline::before {
                content: " ${prefix} "
                font-weight: 400;
            }
        `;
    }

    const settings = getModSettings("prefix");
    const label = settings["label"]

    if (toggle) {
        safeGM("addStyle", css, "submission-css")
        addPrefix(label);
    } else {
        safeGM("removeStyle", "submission-css")
        $('.kes-mail-link').remove();
    }
}
