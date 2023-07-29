function unblurInit (toggle) {

    const unblurCSS = `
    .thumb-subject {
    filter: none !important;
    }
    `;

    if (toggle) {
        safeGM("addStyle", unblurCSS, 'unblurred');
    } else {
        safeGM("removeStyle", 'unblurred');
    }
}
