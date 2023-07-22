function moreInit(toggle){
    const more = document.querySelectorAll('.entry__body > .more')
    if (toggle) {
        more.forEach((item) => {
            item.click();
            $(item).hide();
        });
    } else {
        more.forEach((item) => {
            $(item).show();
        });

    }
}
