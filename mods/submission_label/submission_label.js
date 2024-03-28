function addPrefix (toggle){
    const css = `
        .article:not(.entry-cross) > .entry__meta .user-inline::before {
            content: " ${prefix} "
            font-weight: 400;
        }
    `;

    const settings = getModSettings("submission_label");
    const label = settings["label"]

    if (toggle) {
        safeGM("addStyle", css, "submission-css")
    } else {
        safeGM("removeStyle", "submission-css")
    }
}
