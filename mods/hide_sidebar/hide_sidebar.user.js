function hideSidebar (toggle) { // eslint-disable-line no-unused-vars

    const obj = {
        sidebar: '#sidebar',
        mags: '#sidebar > .related-magazines',
        users: '#sidebar > .active-users',
        posts: '#sidebar > .posts',
        threads: '#sidebar > .entries',
        instance: '#sidebar > .kbin-promo',
        intro: '.sidebar-options > .intro',
        subs: '#sidebar > .sidebar-subscriptions',
        about: '#sidebar > .about'
    }

    const settings = getModSettings('hide-sidebar');

    const keys = Object.keys(obj);

    if (toggle) {
        for (let i = 0; i< keys.length; i++) {
            let key = keys[i]
            if (settings[key]) {
                $(obj[key]).hide();
            } else {
                $(obj[key]).show();
            }
        }
        // expand the content to cover the space freed up by hiding the sidebar
        const main = document.querySelector('.mbin-container > #main');
        if (settings["sidebar"] && settings["expand"]) {
            main.style.gridColumn = "span 2";
        } else {
            if (main.style.gridColumn == "span 2") {
                main.style.gridColumn = '';
            }
        }
    } else {
        for (let i = 0; i< keys.length; i++) {
            let key = keys[i]
            $(obj[key]).show();
        }
        const main = document.querySelector('.mbin-container > #main');
        if (main.style.gridColumn == "span 2") {
            main.style.gridColumn = '';
        }
    }
}
