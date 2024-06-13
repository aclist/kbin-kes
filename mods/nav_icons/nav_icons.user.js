function navbarIcons (toggle) { // eslint-disable-line no-unused-vars
    let settings = getModSettings("nav_icons");
    let search = settings.search
    let post = settings.post
    let subs = settings.subs
    let font = "var(--kbin-body-font-family)"
    let weight = settings.fontWeight
    let searchText = document.querySelector('header menu li a[aria-label="Search"] i')
    let postText = document.querySelector('header menu li a[aria-label="Add"] i')
    let subsText = document.querySelector('header menu li a[aria-label="Select a channel"] i')
    const css = `header menu li a[aria-label="Search"] i::before {
        content: "${search}";
        font-family: ${font};
        font-weight: ${weight * 100};
    }
    header menu li a[aria-label="Add"] i::before {
        content: "${post}";
        font-family: ${font};
        font-weight: ${weight * 100};
    }
    header menu li a[aria-label="Select a channel"] i::before {
        content: "${subs}";
        font-family: ${font};
        font-weight: ${weight * 100};
    }
    `;
    if (toggle) {
        safeGM("removeStyle", "navbar-icons-css")
        safeGM("addStyle", css, "navbar-icons-css")
        searchText.innerText = "" ;
        postText.innerText = "" ;
        subsText.innerText = "" ;
    } else {
        safeGM("removeStyle", "navbar-icons-css")
    }
}
