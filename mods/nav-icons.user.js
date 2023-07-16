function navbarIcons (toggle) {
    let settings = getModSettings("nav_icons");
    let search = settings.search
    let post = settings.post
    let subs = settings.subs
    if (toggle) {
        document.styleSheets[0].addRule('header menu li a[aria-label="Search"] i::before', 'content: "' + search + '";');
        document.styleSheets[0].addRule('header menu li a[aria-label="Add"] i::before', 'content: "' + post + '";');
        document.styleSheets[0].addRule('header menu li a[aria-label="Select a channel"] i::before', 'content: "' + subs + '";');
    } else {
        document.styleSheets[0].addRule('header menu li a[aria-label="Search"] i::before', 'content:"\\f002" ;');
        document.styleSheets[0].addRule('header menu li a[aria-label="Add"] i::before', 'content:"\+" ;');
        document.styleSheets[0].addRule('header menu li a[aria-label="Select a channel"] i::before', 'content:"\\f03a" ;');
    }
}
