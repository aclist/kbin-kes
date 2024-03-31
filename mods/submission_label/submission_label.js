function addPrefix (toggle) { // eslint-disable-line no-unused-vars 

    const settings = getModSettings("submission_label");
    const label = settings["prefix"]
    console.log(label)
    const css = `
    article:not(.entry-cross) .user-inline::before {
        content: " ${label} ";
        font-weight: 400;
    }
    `;

    if (toggle) {
        safeGM("removeStyle", "submission-css")
        safeGM("addStyle", css, "submission-css")
    } else {
        safeGM("removeStyle", "submission-css")
    }
}
