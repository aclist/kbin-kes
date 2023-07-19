function navbarIcons (toggle) {
    let settings = getModSettings("nav_icons");
    let search = settings.search
    let post = settings.post
    let subs = settings.subs
    let font = "sans-serif"
    let weight = settings.fontWeight
    let searchText = document.querySelector('header menu li a[aria-label="Search"] i')
    let postText = document.querySelector('header menu li a[aria-label="Add"] i')
    let subsText = document.querySelector('header menu li a[aria-label="Select a channel"] i')
    if (toggle) {
        document.styleSheets[0].addRule('header menu li a[aria-label="Search"] i::before', `content: '${search}'; font-family: '${font}'; font-weight: ${weight * 100};`);
        document.styleSheets[0].addRule('header menu li a[aria-label="Add"] i::before', `content: '${post}'; font-family: '${font}'; font-weight: ${weight * 100};`);
        document.styleSheets[0].addRule('header menu li a[aria-label="Select a channel"] i::before', `content: '${subs}'; font-family: '${font}'; font-weight: ${weight * 100};`);
        searchText.innerText = "" ;
        postText.innerText = "" ;
        subsText.innerText = "" ;
    } else {
        document.styleSheets[0].addRule('header menu li a[aria-label="Search"] i::before', 'content:"\\f002" ; font-family: "initial"; font-weight: initial;');
        document.styleSheets[0].addRule('header menu li a[aria-label="Add"] i::before', 'content:"\+" ; font-family: "initial"; font-weight: initial;');
        document.styleSheets[0].addRule('header menu li a[aria-label="Select a channel"] i::before', 'content:"\\f03a" ; font-family: "initial"; font-weight: initial;');
    }
}
