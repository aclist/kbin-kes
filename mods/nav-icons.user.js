function navbarIcons(toggle){
    let settings = getModSettings("nav_icons");
    let search = settings.search
    let post = settings.post
    let subs = settings.subs
    if (toggle) {
        document.styleSheets[0].addRule('header menu li:nth-of-type(1) .icon ::before','content: "' + search + '";');
        document.styleSheets[0].addRule('header menu li:nth-of-type(2) .icon ::before','content: "' + post + '";');
        document.styleSheets[0].addRule('header menu li:nth-of-type(3) .icon ::before','content: "' + subs + '";');
	addLink();
    } else {
        document.styleSheets[0].addRule('header menu li:nth-of-type(1) .icon ::before','content:"\\f002" ;');
	    document.styleSheets[0].addRule('header menu li:nth-of-type(2) .icon ::before','content:"\+" ;');
	    document.styleSheets[0].addRule('header menu li:nth-of-type(3) .icon ::before','content:"\\f03a" ;');
    }
}
