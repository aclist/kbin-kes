//logs the calling function, timestamp, and string to the console
function log(string){
    const date = new Date()
    const iso = date.toISOString()
    const caller = (new Error()).stack?.split("\n")[1].split("@")[0]
    const line = `[KES:${caller}] [${iso}] ${string}`
    console.log(line)
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
function getHex (value) {
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
function genericXMLRequest (url, callback) {
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
function getComputedFontSize (string) {
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

//returns whether the page is a thread inside a magazine
function isThread () {
    const url = new URL(window.location).href.split('/')
    if (url.includes("t")) {
        return true
    }
    return false
}

//returns whether the user is currently logged in
function is_logged_in () {
    const login = document.querySelector('.login .user-name')
    if (login) {
        return true
    }
    return false
}

//returns whether the page is a user profile page
function isProfile () {
    const url = new URL(window.location).href.split('/')
    if (url.includes("u")) {
        return true
    }
    return false
}

//sets the type of GM API being used (dot or underscore notation) based on scripthandler metadata
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

//maps incoming arguments to wrapper functions depending on *monkey extension variant being used
//provides seamless support for switching between new and old GM API
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
