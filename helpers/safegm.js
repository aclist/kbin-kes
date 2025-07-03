function testMode (func, ...args) {
    let dict
    (getGMPrefix() == Scripthandler.TAMPER) ? dict = tamperGM : dict = nativeGM
    return dict[func](...args);
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

