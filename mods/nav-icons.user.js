function navbarIcons (toggle) {
    let settings = getModSettings("nav_icons");
    let search = settings.search
    let post = settings.post
    let subs = settings.subs
    let font = settings.font
    let weight = settings.fontWeight
    if (toggle) {
        document.styleSheets[0].addRule('header menu li a[aria-label="Search"] i::before', `content: '${search}'; font-family: '${font}'; font-weight: ${weight * 100};`);
        document.styleSheets[0].addRule('header menu li a[aria-label="Add"] i::before', `content: '${post}'; font-family: '${font}'; font-weight: ${weight * 100};`);
        document.styleSheets[0].addRule('header menu li a[aria-label="Select a channel"] i::before', `content: '${subs}'; font-family: '${font}'; font-weight: ${weight * 100};`);
    } else {
        document.styleSheets[0].addRule('header menu li a[aria-label="Search"] i::before', 'content:"\\f002" ; font-family: "Font Awesome 6 Free"; font-weight: initial;');
        document.styleSheets[0].addRule('header menu li a[aria-label="Add"] i::before', 'content:"\+" ; font-family: "Font Awesome 6 Free"; font-weight: initial;');
        document.styleSheets[0].addRule('header menu li a[aria-label="Select a channel"] i::before', 'content:"\\f03a" ; font-family: "Font Awesome 6 Free"; font-weight: initial;');
    }
}
