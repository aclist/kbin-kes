function hideSidebar (toggle) {

    const obj = {
        sidebar: '#sidebar',
        mags: '#sidebar > .related-magazines',
        users: '#sidebar > .active-users',
        posts: '#sidebar > .posts',
        threads: '#sidebar > .entries',
        instance: '#sidebar > .kbin-promo'
        intro: '#sidebar > .intro'
    }

    const settings = getModSettings('hide-sidebar')

    const keys = Object.keys(obj)

    if (toggle) {
        for (let i = 0; i< keys.length; i++) {
            let key = keys[i]
            if (settings[key]) {
                $(obj[key]).hide();
            } else {
                $(obj[key]).show();
            }
        }
    } else {
        for (let i = 0; i< keys.length; i++) {
            let key = keys[i]
            $(obj[key]).show();
        }
    }
}
