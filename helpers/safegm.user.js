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

function log(string){
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

function loadMags (callback) {
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;

    const cachedValue = safeGM("getValue",`user-mags-${hostname}-${username}`);
    if (cachedValue) {
        callback(cachedValue);
        return;
    }

    if (!username) return;
    const loadedMags = [];
    function loadFromPage (username, page) {
        const url = `https://${hostname}/u/${username}/subscriptions?p=${page}`;
        genericXMLRequest(url, (response) => {
            const dom = new DOMParser().parseFromString(response.responseText, "text/html");
            // get the magazines from this page
            const mags = Array.from(dom.querySelectorAll('#content .stretched-link'))
                .map((link) => link.getAttribute('href').split('/')[2]);
            loadedMags.push(...mags);
            // load more pages if there are
            const nextPage = dom.querySelector('#content .pagination__item--next-page');
            if (nextPage.hasAttribute('href') && nextPage.href != window.location.href) {
                loadFromPage(username, nextPage.getAttribute('href').split('=')[1]);
            } else {
                // finished loading all pages
                safeGM("setValue",`user-mags-${hostname}-${username}`, loadedMags);
                callback(loadedMags);
            }
        });
    }
    loadFromPage(username, 1);
}

function clearMags () {
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;
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
