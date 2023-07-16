let gmPrefix
let dotPrefix = "GM."
let underPrefix = "GM_"
try {
    if (GM_info) {
        let scriptHandler = GM_info.scriptHandler;
        switch (scriptHandler) {
            case "Greasemonkey":
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
function addCustomCSS (css) {
    var style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
};
function genericXMLRequest (url, callback) {
    safeGM("xmlhttpRequest", {
        method: 'GET',
        url: url,
        onload: callback,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },

    });
};

window.safeGM = function (func,...args){
    let use
    let underscore = {
        setValue(...args) { return GM_setValue(...args) },
        getValue(...args) { return GM_getValue(...args) },
        addStyle(...args) { return GM_addStyle(...args)},
        xmlhttpRequest(...args) { return GM_xmlhttpRequest(...args)},
        setClipboard(...args) { return GM_setClipboard(...args)},
        getResourceText(...args) { return GM_getResourceText(...args)},
        info() { return GM_info }
    }
        let dot = {
        setValue(...args) { return GM.setValue(...args) },
        getValue(...args) { return GM.getValue(...args) },
        addStyle(...args) { return addCustomCSS(...args)},
        xmlhttpRequest(...args) { return GM.xmlHttpRequest(...args)},
        setClipboard(...args) { return GM.setClipboard(...args)},
        info() { return GM_info }
    }

    if (gmPrefix === "GM_") {
        use = underscore
    } else {
        use = dot
    }
    return use[func](...args);
}
