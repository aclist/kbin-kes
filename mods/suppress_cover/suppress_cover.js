function suppressCoverInit (toggle) { //eslint-disable-line no-unused-vars
    const pt = getPageType();
    switch (pt) {
        case Mbin.Thread.Comments:
        case Mbin.Thread.Favorites:
        case Mbin.Thread.Boosts:
        case Mbin.Magazine:
            break;
        default:
            return
    }

    const cover = document.querySelector('#sidebar .magazine.section figure');

    if (toggle) {
        cover.style.display = "none"
    } else {
        cover.style.display = "block"
    }
}
