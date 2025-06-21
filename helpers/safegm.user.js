function log (string, level) { // eslint-disable-line no-unused-vars
    const date = new Date()
    const iso = date.toISOString()
    const caller = (new Error()).stack?.split("\n")[1].split("@")[0]
    const line = `[KES:${caller}] [${iso}] ${string}`
    const debug = document.querySelector("#mes-debugbar-expanded")
    if (debug) debug.push(level, line)
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
    safeGM("removeStyle", cssID);
    safeGM("addStyle", modalCSS, cssID);
    log(`Added the sheet '${cssID}' to the document head`, Log.Log);
    return modal_bg
}

//removes a loading dialog created with makeLoader()
function clearLoader (id) { // eslint-disable-line no-unused-vars
    document.querySelector(`#${id}-filter-modal-bg`)?.remove();
    safeGM("removeStyle", "mes-loader-css");
}

//adds custom CSS to the document head by named ID
function addCustomCSS (css, id) {
    if (document.head.querySelector(`style[id="${id}"]`)) {
        log(`CSS with id '${id}' already exists, skipping`, Log.Warn)
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
        case "modlog":
            return Mbin.Modlog
        case "people":
            return Mbin.People
        case "tag":
            return Mbin.Tag
        case "microblog":
            return Mbin.Microblog
        case "profile":
            if ((url[4] === "messages") && (url.length === 6)) return Mbin.Messages.Thread
            return Mbin.Messages.Inbox
        case "settings":
            if ((url[4]) === "notifications") return Mbin.Messages.Notifications
            return Mbin.Settings
        case "new":
            if ((url[4]) === undefined) return Mbin.New.LINK
            if ((url[4]) === "article") return Mbin.New.THREAD
            if ((url[4]) === "photo") return Mbin.New.PHOTO
            if ((url[4]) === "newMagazine") return Mbin.New.MAGAZINE
        case "u":
            if (url[5] === undefined) return Mbin.User.Default
            if (url[5] === "message") return Mbin.User.DirectMessage
            if (window.location.href.includes("/subscriptions")) return Mbin.User.Subscriptions
            if (window.location.href.includes("/threads")) return Mbin.User.Threads
            if (window.location.href.includes("/comments")) return Mbin.User.Comments
            if (window.location.href.includes("/posts")) return Mbin.User.Posts
            if (window.location.href.includes("/replies")) return Mbin.User.Replies
            if (window.location.href.includes("/boosts")) return Mbin.User.Boosts
            if (window.location.href.includes("/following")) return Mbin.User.Following
            if (window.location.href.includes("/followers")) return Mbin.User.Followers
            if (window.location.href.includes("/reputation")) return Mbin.User.Reputation
            return Mbin.User.Default
        case "d":
            if ((url.length === 6) && (window.location.href.includes("/comments"))) return Mbin.Domain.Comments
            return Mbin.Domain.Default
        case "m":
            if (url[5] === undefined) return Mbin.Magazine
            if (window.location.href.includes("/threads")) return Mbin.Magazine
            if (url[5] === "microblog") return Mbin.Microblog
            if ((url[5] === "t") && (window.location.href.includes("/favourites"))) return Mbin.Thread.Favorites
            if ((url[5] === "t") && (window.location.href.includes("/up"))) return Mbin.Thread.Boosts
            return Mbin.Thread.Comments
        default:
            break;
    }
    if (url[3].includes("?type=")) return Mbin.Top
    if (url[3].includes("magazines?")) return Mbin.Magazines
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
    safeGM("setValue", cancelKey, false);

    async function runCallback (mags, isFinalCall) {
        if (safeGM("getValue", cancelKey)) return;
        safeGM("setValue",`user-mags-${hostname}-${username}`, mags);
        callback(mags, isFinalCall);
    }

    if (useCache) {
        const cachedValue = safeGM("getValue",`user-mags-${hostname}-${username}`);
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
    safeGM("setValue", `loadMags-${hostname}-${username}-${ns}`, true);
}

/**
 * Clears the cached list of subscriptions from the {@link loadMags} function.
 */
function clearCachedMags () { // eslint-disable-line no-unused-vars
    const hostname = window.location.hostname;
    const username = document.querySelector('.login .user-name')?.textContent;
    if (!username) return;
    safeGM("setValue",`user-mags-${hostname}-${username}`, []);
}

function isIndex () { // eslint-disable-line no-unused-vars
    const pt = getPageType();
    switch (pt) {
        case Mbin.Domain.Default:
        case Mbin.Domain.Comments:
        case Mbin.Top:
            return true
        default:
            return false
    }
}

function isThread () { // eslint-disable-line no-unused-vars
    const pt = getPageType();
    switch (pt) {
        case Mbin.Thread.Comments:
        case Mbin.Thread.Favorites:
        case Mbin.Thread.Boosts:
            return true
        default:
            return false
    }
}

function getTheme () {
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
        getResourceText (...args) { return GM_getResourceText(...args)},
        info () { return GM_info }
    }
    const dot = {
        setValue (...args) { return GM.setValue(...args) },
        getValue (...args) { return GM.getValue(...args) },
        addStyle (...args) { return addCustomCSS(...args)},
        removeStyle (...args) { return removeCustomCSS (...args) },
        xmlhttpRequest (...args) { return GM.xmlHttpRequest(...args)},
        info () { return GM_info }
    }

    if (gmPrefix === "GM_") {
        use = underscore
    } else {
        use = dot
    }
    return use[func](...args);
}
