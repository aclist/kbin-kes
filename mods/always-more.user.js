function moreInit (toggle) {
    const more = document.querySelectorAll('.entry__body > .more')
    if (toggle) {
        more.forEach((item) => {
            const arrow = item.firstChild.className
            if (arrow === 'fa-solid fa-angles-down') {
                item.click();
            }
        });
    } else {
        more.forEach((item) => {
            const arrow = item.firstChild.className
            if (arrow === 'fa-solid fa-angles-up') {
                item.click();
            }
        });

    }
}
