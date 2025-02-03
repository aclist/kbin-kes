let gmPrefix
const dotPrefix = "GM."
const underPrefix = "GM_"
try {
    if (GM_info) {
        let scriptHandler = GM_info.scriptHandler;
        switch (scriptHandler) {
            case "Greasemonkey":
                gmPrefix = dotPrefix;
                break;
            case "FireMonkey":
                gmPrefix = dotPrefix;
                break;
            case "Userscripts":
                gmPrefix = dotPrefix;
                break;
            default:
                gmPrefix = underPrefix;
                break;
        }
    }
} catch (error) {
    console.log(error);
}

function log (string) { // eslint-disable-line no-unused-vars
    const date = new Date()
    const iso = date.toISOString()
    const caller = (new Error()).stack?.split("\n")[1].split("@")[0]
    const line = `[KES:${caller}] [${iso}] ${string}`
    console.log(line)
}

function addCustomCSS (css, id) {
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = css;
    document.head.appendChild(style);
}

function removeCustomCSS (id) {
    const toRemove = document.getElementById(id);
    if (toRemove) {
        document.head.removeChild(toRemove);
    } else {
        return
    }
}

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

function isLoggedIn () { //eslint-disable-line no-unused-vars
    const login = document.querySelector('.login .user-name')
    if (login) {
        return true
    }
    return false
}

function getPageType () { //eslint-disable-line no-unused-vars
    const url = window.location.href.split('/')
    if ((url.length === 4) && (url[3] === "")) {
        return "Mbin.Top"
    }
    if ((url[3] === "settings") && (url[4] === "notifications")) {
        return "Mbin.Messages.Notifications"
    }
    if ((url[3] === "profile") && (url[4] === "messages") && (url.length === 6)) {
        return "Mbin.Messages.Thread"
    }
    if ((url[3] === "profile") && (url[4] === "messages")) {
        return "Mbin.Messages.Inbox"
    }
    if (url[3] === "search") {
        return "Mbin.Search"
    }
    if (url[3] === "settings") {
        return "Mbin.Settings"
    }
    if (url[3] === "magazines") {
        return "Mbin.Magazines"
    }
    if (url[3] === "people") {
        return "Mbin.People"
    }
    if (url[3] === "microblog") {
        return "Mbin.Microblog"
    }
    if (url[3] === "tag") {
        return "Mbin.Tag"
    }
    //user pages
    if ((url[3] === "u") && (url[5].includes("subscriptions"))) {
        return "Mbin.User.Subscriptions"
    }
    if ((url[3] === "u") && (url[5] === "message")) {
        return "Mbin.User.Direct_Message"
    }
    if ((url[3] === "u") && (url[5].includes("threads"))) {
        return "Mbin.User.Threads"
    }
    if ((url[3] === "u") && (url[5].includes("comments"))) {
        return "Mbin.User.Comments"
    }
    if ((url[3] === "u") && (url[5].includes("posts"))) {
        return "Mbin.User.Posts"
    }
    if ((url[3] === "u") && (url[5].includes("replies"))) {
        return "Mbin.User.Replies"
    }
    if ((url[3] === "u") && (url[5].includes("boosts"))) {
        return "Mbin.User.Boosts"
    }
    if ((url[3] === "u") && (url[5].includes("following"))) {
        return "Mbin.User.Following"
    }
    if ((url[3] === "u") && (url[5].includes("followers"))) {
        return "Mbin.User.Followers"
    }
    if (url[3] === "u") {
        return "Mbin.User"
    }
    //domain pages
    if ((url[3] === "d") && (url[5].includes("comments"))) {
        return "Mbin.Domain.Comments"
    }
    if (url[3] === "d") {
        return "Mbin.Domain"
    }
    //threads
    if ((url[3] === "m") && (url[5] === "t")) {
        if (url[(url.length-1)].includes("favourites")) {
            return "Mbin.Thread.Favorites"
        }
        else if (url[(url.length-1)].includes("up")) {
            return "Mbin.Thread.Favorites"
        }
        else {
            return "Mbin.Thread.Comments"
        }
    }
    return "Unknown"
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
