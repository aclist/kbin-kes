function unblurInit (toggle) { // eslint-disable-line no-unused-vars

    const unblurCSS = `
    .thumb-subject, .image-filler {
        filter: none !important;
    }
    .image-adult {
        filter: none !important
    }
    `;

    if (toggle) {
        safeGM("removeStyle", 'unblurred');
        safeGM("addStyle", unblurCSS, 'unblurred');
    } else {
        safeGM("removeStyle", 'unblurred');
    }
}
