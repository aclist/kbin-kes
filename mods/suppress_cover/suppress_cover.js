function suppressCoverInit (toggle) { //eslint-disable-line no-unused-vars
    const pt = getPageType();
    switch (pt) {
        case Mbin.Thread.COMMENTS:
        case Mbin.Thread.FAVORITES:
        case Mbin.Thread.BOOSTS:
        case Mbin.MAGAZINE:
            break;
        default:
            return
    }

    const cover = document.querySelector('#sidebar .magazine.section figure');
    if (!cover) return

    if (toggle) {
        cover.style.display = "none"
    } else {
        cover.style.removeProperty("display");
    }
}
