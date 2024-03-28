function addPrefix (toggle){

    const settings = getModSettings("submission_label");
    const label = settings["label"]
    const css = `
        .article:not(.entry-cross) > .entry__meta .user-inline::before {
            content: " ${label} "
            font-weight: 400;
        }
    `;

    if (toggle) {
        safeGM("addStyle", css, "submission-css")
    } else {
        safeGM("removeStyle", "submission-css")
    }
}
