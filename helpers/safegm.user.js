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

function getInstanceType() {
    const links = document.querySelectorAll('.kbin-promo .stretched-link');

    for (var i = 0, l = links.length; i < l; i++) {
        const link = links[i];
        if (link.href.indexOf("MbinOrg") !== -1) {
            return "mbin"
        }
    }
    return "kbin"
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

function isThread () {
    const url = new URL(window.location).href.split('/')
    if (url.includes("t")) {
        return true
    }
    return false
}

function is_logged_in () {
    const login = document.querySelector('.login .user-name')
    if (login) {
        return true
    }
    return false
}

function isProfile () {
    const url = new URL(window.location).href.split('/')
    if (url.includes("u")) {
        return true
    }
    return false
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
