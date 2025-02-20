const Log = Object.freeze({ //eslint-disable-line no-unused-vars
    Log: 1,
    Warn: 2,
    Error: 3,
})

function log (string, level) { // eslint-disable-line no-unused-vars
    const date = new Date()
    const iso = date.toISOString()
    const caller = (new Error()).stack?.split("\n")[1].split("@")[0]
    const line = `[KES:${caller}] [${iso}] ${string}`
    switch (level) {
        case Log.Log:
            console.log(line)
            break;
        case Log.Warn:
            console.warn(line)
            break;
        case Log.Error:
            console.error(line)
            break;
        default:
            break;
    }
}

//adds custom CSS to the document head by named ID
function addCustomCSS (css, id) {
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = css;
    document.head.appendChild(style);
}

//removes CSS from the document head by named ID
function removeCustomCSS (id) {
    const toRemove = document.getElementById(id);
    if (toRemove) {
        document.head.removeChild(toRemove);
    } else {
        return
    }
}

//returns the real hex color value of internal theme colors
function getHex (value) { //eslint-disable-line no-unused-vars
    let realHex;
    const firstChar = Array.from(value)[0];
    const theme = document.querySelector('body');
    if (firstChar === "-") {
        realHex = getComputedStyle(theme).getPropertyValue(value);
    } else {
        realHex = value;
    }
    return realHex;
}

//helper function to simplify pushing the results of a GET request to a callback
function genericXMLRequest (url, callback) { //eslint-disable-line no-unused-vars
    safeGM("xmlhttpRequest", {
        method: 'GET',
        url: url,
        onload: callback,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        }
    });
}

//returns the relative onscreen point size of an element after styling is applied
function getComputedFontSize (string) { // eslint-disable-line no-unused-vars
    if (typeof string === 'number') return string
    if (isNaN(parseFloat(string)) === false) {
        return parseFloat(string)
    }
    const el = document.querySelector(string)
    if (!el) {
        return null
    }
    const fontsize = document.defaultView.getComputedStyle(el).fontSize
    let px = fontsize.split('px')[0]
    px = parseFloat(px)
    return px
}

//returns whether the user is currently logged in
function isLoggedIn () { //eslint-disable-line no-unused-vars
    const login = document.querySelector('.login .user-name')
    if (login) {
        return true
    }
    return false
}

function getPageType () { //eslint-disable-line no-unused-vars
    const url = window.location.href.split("/")
    switch (url[3]) {
        case "":
        case "sub":
        case "all":
        case "threads":
            return Mbin.Top
        case "search":
            return Mbin.Search
        case "magazines":
            return Mbin.Magazines
        case "people":
            return Mbin.People
        case "bookmark-lists":
            return Mbin.Bookmarks
        case "tag":
            return Mbin.Tag
        case "microblog":
            return Mbin.Microblog
        case "profile":
            if ((url[4] === "messages") && (url.length === 6)) return "Mbin.Messages.Thread"
            return Mbin.Messages.Inbox
        case "settings":
            if ((url[4]) === "notifications") return "Mbin.Messages.Notifications"
            return Mbin.Settings
        case "u":
            if (url[5] === undefined) return Mbin.User.Default
            if (url[5] === "message") return Mbin.User.DirectMessage
            if (url[5].includes("subscriptions")) return Mbin.User.Subscriptions
            if (url[5].includes("threads")) return Mbin.User.Threads
            if (url[5].includes("comments")) return Mbin.User.Comments
            if (url[5].includes("posts")) return Mbin.User.Posts
            if (url[5].includes("replies")) return Mbin.User.Replies
            if (url[5].includes("boosts")) return Mbin.User.Boosts
            if (url[5].includes("following")) return Mbin.User.Following
            if (url[5].includes("followers")) return Mbin.User.Followers
            return Mbin.User.Default
        case "d":
            if ((url.length === 6) && (url[5].includes("comments"))) return Mbin.Domain.Comments
            return Mbin.Domain.Default
        case "m":
            if (url[5] === undefined) return Mbin.Magazine
            if (url[5] === "microblog") return Mbin.Microblog
            if ((url[5] === "t") && (url[url.length-1].includes("favourites"))) return Mbin.Thread.Favorites
            if ((url[5] === "t") && (url[url.length-1].includes("up"))) return Mbin.Thread.Boosts
            return Mbin.Thread.Comments
        default:
            break;
    }
    if (url[3].includes("?type=")) return Mbin.Top
    if (url[3].includes("magazines?")) return Mbin.Magazines
    return "Unknown"
}

function loadMags (callback) {
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;
    if (!username) return;

    const cachedValue = safeGM("getValue",`user-mags-${hostname}-${username}`);
    if (cachedValue) {
        callback(cachedValue);
        return;
    }

    let loadedMags = [];
    function loadFromPage (username, page, mags = []) {
        const url = `https://${hostname}/u/${username}/subscriptions?p=${page}`;
        genericXMLRequest(url, (response) => {
            const dom = new DOMParser().parseFromString(response.responseText, "text/html");
            // get the magazines from this page
            mags.push(...(
                Array.from(dom.querySelectorAll('#content .stretched-link'))
                    .map((link) => link.getAttribute('href').split('/')[2])
            ));
            // load more pages if there are
            const nextPage = dom.querySelector('#content .pagination__item--next-page');
            if (nextPage.hasAttribute('href') && nextPage.href != window.location.href) {
                loadFromPage(username, nextPage.getAttribute('href').split('=')[1], mags);
            } else {
                // finished loading all pages
                loadedMags = mags;
                callback(loadedMags);
            }
        });
    }
    // do the sidebar first
    if (document.querySelector('.subscription-list') != undefined) {
        const magList = [...document.querySelectorAll('.subscription')];
        const containsShowMore = magList[magList.length-1].querySelector('button') != undefined;
        loadedMags = (containsShowMore ? magList.slice(0,-1) : magList)
            .map((mag) => mag.querySelector('a').getAttribute('href').split('/')[2]);
        callback(loadedMags);
        if (containsShowMore) {
            loadFromPage(username, 1);
        }
    } else {
        loadFromPage(username, 1);
    }
    safeGM("setValue",`user-mags-${hostname}-${username}`, loadedMags);
}

function clearMags () {
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;
    if (!username) return;
    safeGM("setValue",`user-mags-${hostname}-${username}`, []);
}

window.safeGM = function (func,...args) {
    let use
    const underscore = {
        setValue (...args) { return GM_setValue(...args) },
        getValue (...args) { return GM_getValue(...args) },
        addStyle (...args) { return addCustomCSS(...args)},
        removeStyle (...args) { return removeCustomCSS (...args) },
        xmlhttpRequest (...args) { return GM_xmlhttpRequest(...args)},
        setClipboard (...args) { return GM_setClipboard(...args)},
        getResourceText (...args) { return GM_getResourceText(...args)},
        info () { return GM_info }
    }
    const dot = {
        setValue (...args) { return GM.setValue(...args) },
        getValue (...args) { return GM.getValue(...args) },
        addStyle (...args) { return addCustomCSS(...args)},
        removeStyle (...args) { return removeCustomCSS (...args) },
        xmlhttpRequest (...args) { return GM.xmlHttpRequest(...args)},
        setClipboard (...args) { return GM.setClipboard(...args)},
        info () { return GM_info }
    }

    if (gmPrefix === "GM_") {
        use = underscore
    } else {
        use = dot
    }
    return use[func](...args);
}
