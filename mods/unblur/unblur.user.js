function unblurInit (toggle) {

    const unblurCSS = `
    .thumb-subject, .image-filler {
        filter: none !important;
    }
    `;

    if (toggle) {
        safeGM("removeStyle", 'unblurred');
        safeGM("addStyle", unblurCSS, 'unblurred');
    } else {
        safeGM("removeStyle", 'unblurred');
    }
}
