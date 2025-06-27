function log (string, level) { // eslint-disable-line no-unused-vars
    const date = new Date()
    const iso = date.toISOString()
    const caller = (new Error()).stack?.split("\n")[1].split("@")[0]
    const line = `[KES:${caller}] [${iso}] ${string}`
    const debug = document.querySelector("#mes-debugbar-expanded")
    if (debug) debug.push(level, line)
    switch (level) {
        case Log.LOG:
            console.log(line)
            break;
        case Log.WARN:
            console.warn(line)
            break;
        case Log.ERROR:
            console.error(line)
            break;
        default:
            break;
    }
}

//returns a generic loading prompt with spinner
function makeLoader (id, text) { // eslint-disable-line no-unused-vars
    const modalCSS = `
    #${id}-filter-modal-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 90;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5) !important;
    }

    #${id}-filter-modal {
        background-color: var(--kbin-section-bg);
        width: 500px;
        height: 100px;
        display: grid;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
    #${id}-filter-text {
        color: var(--kbin-section-text-color);
        margin: 20px
    }
    .hourglass,
    .hourglass:after {
      box-sizing: border-box;
    }
    .hourglass {
      display: inline-flex;
      position: relative;
      width: 10px;
      height: 10px;
    }
    .hourglass:after {
      content: " ";
      display: block;
      border-radius: 50%;
      width: 0;
      height: 0;
      margin: 8px;
      box-sizing: border-box;
      border: 10px solid currentColor;
      border-color: currentColor transparent currentColor transparent;
      animation: hourglass 1.2s infinite;
    }
    @keyframes hourglass {
      0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
      50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      100% {
        transform: rotate(1800deg);
      }
    }

    `;
    const modal_bg = document.createElement("div");
    const modal = document.createElement("div");
    const span = document.createElement("span");
    const msg = document.createElement("p");
    modal_bg.id = `${id}-filter-modal-bg`;
    modal.id = `${id}-filter-modal`;
    msg.id = `${id}-filter-text`;
    msg.innerText = `MES: ${text}`;
    modal_bg.appendChild(modal);
    span.appendChild(msg);
    const spinner = document.createElement("div");
    spinner.className = "hourglass";
    msg.appendChild(spinner);
    modal.appendChild(span);
    const cssID = "mes-loader-css";
    safeGM.removeStyle(cssID);
    safeGM.addStyle(modalCSS, cssID);
    log(`Added the sheet '${cssID}' to the document head`, Log.LOG);
    return modal_bg
}

//removes a loading dialog created with makeLoader()
function clearLoader (id) { // eslint-disable-line no-unused-vars
    document.querySelector(`#${id}-filter-modal-bg`)?.remove();
    safeGM.removeStyle("mes-loader-css");
}

//adds custom CSS to the document head by named ID
function addCustomCSS (css, id) {
    if (document.head.querySelector(`style[id="${id}"]`)) {
        log(`CSS with id '${id}' already exists, skipping`, Log.WARN)
        return
    }
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
    safeGM.xmlHttpRequest({
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
            return Mbin.TOP
        case "search":
            return Mbin.SEARCH
        case "magazines":
            return Mbin.MAGAZINES
        case "people":
            return Mbin.PEOPLE
        case "bookmark-lists":
            return Mbin.BOOKMARKS
        case "modlog":
            return Mbin.MODLOG
        case "tag":
            return Mbin.TAG
        case "microblog":
            return Mbin.MICROBLOG
        case "profile":
            if ((url[4] === "messages") && (url.length === 6)) return Mbin.Messages.THREAD
            return Mbin.Messages.INBOX
        case "settings":
            if ((url[4]) === "notifications") return Mbin.Messages.NOTIFICATIONS
            return Mbin.SETTINGS
        case "new":
            if ((url[4]) === undefined) return Mbin.New.LINK
            if ((url[4]) === "article") return Mbin.New.THREAD
            if ((url[4]) === "photo") return Mbin.New.PHOTO
            if ((url[4]) === "newMagazine") return Mbin.New.MAGAZINE
            break;
        case "u":
            if (url[5] === undefined) return Mbin.User.DEFAULT
            if (url[5] === "message") return Mbin.User.DIRECTMESSAGE
            if (window.location.href.includes("/subscriptions")) return Mbin.User.SUBSCRIPTIONS
            if (window.location.href.includes("/threads")) return Mbin.User.THREADS
            if (window.location.href.includes("/comments")) return Mbin.User.COMMENTS
            if (window.location.href.includes("/posts")) return Mbin.User.POSTS
            if (window.location.href.includes("/replies")) return Mbin.User.REPLIES
            if (window.location.href.includes("/boosts")) return Mbin.User.BOOSTS
            if (window.location.href.includes("/following")) return Mbin.User.FOLLOWING
            if (window.location.href.includes("/followers")) return Mbin.User.FOLLOWERS
            if (window.location.href.includes("/reputation")) return Mbin.User.REPUTATION
            return Mbin.User.DEFAULT
        case "d":
            if ((url.length === 6) && (window.location.href.includes("/comments"))) {
                return Mbin.Domain.COMMENTS
            }
            return Mbin.Domain.DEFAULT
        case "m":
            if (url[5] === undefined) return Mbin.MAGAZINE
            if (window.location.href.includes("/threads")) return Mbin.MAGAZINE
            if (url[5] === "microblog") return Mbin.MICROBLOG
            if ((url[5] === "t") && (window.location.href.includes("/favourites"))) {
                return Mbin.Thread.FAVORITES
            }
            if ((url[5] === "t") && (window.location.href.includes("/up"))) {
                return Mbin.Thread.BOOSTS
            }
            return Mbin.Thread.COMMENTS
        default:
            break;
    }
    if (url[3].includes("?type=")) return Mbin.TOP
    if (url[3].includes("magazines?")) return Mbin.MAGAZINES
    return "Unknown"
}

/**
 * Loads the current user's subscriptions.
 * @param {function(string[],boolean):void} callback
 * @param {string} ns
 * @param {boolean} useCache
 */
async function loadMags (callback, ns, useCache=false) {
    // make sure the user is logged in
    const username = document.querySelector('.login .user-name')?.textContent;
    if (!username) return;

    // set up the cancellation logic, for the case where the mod is turned off while this function
    // is still running
    const hostname = window.location.hostname;
    const cancelKey = `loadMags-${hostname}-${username}-${ns}`;
    safeGM.setValue(cancelKey, false);

    async function runCallback (mags, isFinalCall) {
        if (safeGM("getValue", cancelKey)) return;
        safeGM.setValue(`user-mags-${hostname}-${username}`, mags);
        callback(mags, isFinalCall);
    }

    if (useCache) {
        const cachedValue = safeGM.getValue(`user-mags-${hostname}-${username}`);
        if (cachedValue && cachedValue.length > 0) {
            runCallback(cachedValue, true);
            return;
        }
    }

    let loadedMags = [];
    async function loadFromPage (username, page, mags = []) {
        const url = `https://${hostname}/u/${username}/subscriptions?p=${page}`;
        genericXMLRequest(url, (response) => {
            const dom = new DOMParser().parseFromString(response.responseText, "text/html");
            // get the magazines from this page
            mags.push(
                ...Array.from(dom.querySelectorAll('#content .stretched-link'))
                    .map((link) => link.getAttribute('href').split('/')[2])
            );
            // load more pages if there are
            const nextPage = dom.querySelector('#content .pagination__item--next-page');
            if (nextPage?.hasAttribute('href') && nextPage.href != window.location.href) {
                loadFromPage(username, nextPage.getAttribute('href').split('=')[1], mags);
            } else {
                // finished loading all pages
                runCallback(mags, true);
            }
        });
    }
    async function loadFromSidebar () {
        const magList = [...document.querySelectorAll('.subscription')];
        if (magList.length == 0) {
            runCallback([], true);
            return;
        }
        const containsShowMore = magList[magList.length-1].querySelector('button') != undefined;
        loadedMags = (containsShowMore ? magList.slice(0,-1) : magList)
            .map((mag) => mag.querySelector('a').getAttribute('href').split('/')[2]);
        runCallback(loadedMags, !containsShowMore);
        if (containsShowMore) {
            loadFromPage(username, 1);
        }
    }

    if (document.querySelector('.subscription-list') != undefined) {
        loadFromSidebar();
    } else {
        loadFromPage(username, 1);
    }
}

/**
 * Cancels {@link loadMags} after running it.
 * @param {string} ns
 */
loadMags.cancel = function (ns) {
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;
    if (!username) return;
    safeGM.setValue(`loadMags-${hostname}-${username}-${ns}`, true);
}

/**
 * Clears the cached list of subscriptions from the {@link loadMags} function.
 */
function clearCachedMags () { // eslint-disable-line no-unused-vars
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;
    if (!username) return;
    safeGM.setValue(`user-mags-${hostname}-${username}`, []);
}

function isIndex () { // eslint-disable-line no-unused-vars
    const pt = getPageType();
    switch (pt) {
        case Mbin.Domain.DEFAULT:
        case Mbin.Domain.COMMENTS:
        case Mbin.TOP:
            return true
        default:
            return false
    }
}

function isThread () { // eslint-disable-line no-unused-vars
    const pt = getPageType();
    switch (pt) {
        case Mbin.Thread.COMMENTS:
        case Mbin.Thread.FAVORITES:
        case Mbin.Thread.BOOSTS:
            return true
        default:
            return false
    }
}

function getTheme () { // eslint-disable-line no-unused-vars
    let theme = undefined
    document.querySelector("body").classList.forEach((c) => {
        if (c.includes("theme--")) {
            theme = c.split("--")[1]
        }
    })
    switch (theme) {
        case "kbin":
            return Theme.KBIN
        case "dark":
            return Theme.DARK
        case "light":
            return Theme.LIGHT
        case "solarized-light":
            return Theme.SOLARIZED_LIGHT
        case "solarized-dark":
            return Theme.SOLARIZED_DARK
        case "tokyo-night":
            return Theme.TOKYO_NIGHT
    }
}


//sets the type of GM API being used (dot or underscore notation) based on scripthandler metadata
function getGMPrefix () {
    let prefix
    if (GM.info) {
        let scriptHandler = GM.info.scriptHandler;
        switch (scriptHandler) {
            case "Greasemonkey":
            case "FireMonkey":
            case "Userscripts":
                prefix = Scripthandler.NATIVE
                break;
            case "Tampermonkey":
                prefix = Scripthandler.TAMPER
                break;
            default:
                prefix = Scripthandler.TAMPER
                break;
        }
    } else {
        prefix = Scripthandler.TAMPER
    }
    return prefix
}

function testMode (func, ...args) {
    let dict
    (getGMPrefix() == Scripthandler.TAMPER) ? dict = tamperGM : dict = nativeGM
    //GM.info is a simple object
    if (func == "info") return dict[func](...args)
    dict[func](...args);
}

const nativeGM = {
    setValue (...args) { return GM.setValue(...args) },
    getValue (...args) { return GM.getValue(...args) },
    xmlHttpRequest (...args) { return GM.xmlHttpRequest(...args)},
    addStyle (...args) { return addCustomCSS(...args)},
    removeStyle (...args) { return removeCustomCSS (...args) },
    info(...args) { return GM.info }
}

const tamperGM = {
    setValue (...args) { return GM_setValue(...args) },
    getValue (...args) { return GM_getValue(...args) },
    xmlHttpRequest (...args) { return GM_xmlhttpRequest(...args)},
    addStyle (...args) { return addCustomCSS(...args)},
    removeStyle (...args) { return removeCustomCSS (...args) },
    getResourceText (...args) { return GM_getResourceText(...args)},
    info(...args) { return GM_info }
}

//maps incoming arguments to wrapper functions depending on *monkey extension variant being used
//provides seamless support for switching between new and old GM API
const safeGM = {
    setValue: function (...args) {
        return testMode("setValue", ...args)
    },
    getValue: function (...args) {
        return testMode("getValue", ...args)
    },
    addStyle: function (...args) {
        return testMode("addStyle", ...args)
    },
    removeStyle: function (...args) {
        return testMode("removeStyle", ...args)
    },
    xmlHttpRequest: function (...args) {
        return testMode("xmlHttpRequest", ...args)
    },
    getResourceText: function (...args) {
        return testMode("getResourceText", ...args)
    },
    info: function (...args) {
        return testMode("info", ...args)
    }
}

