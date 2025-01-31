// ==UserScript==
// @name         KES
// @namespace    https://github.com/aclist
// @license      MIT
// @version      4.3.0-beta.11
// @description  Kbin Enhancement Suite
// @author       aclist
// @match        https://kbin.social/*
// @match        https://kbin.earth/*
// @match        https://lab2.kbin.pub/*
// @match        https://lab3.kbin.pub/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @match        https://kbin.cafe/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceText
// @grant        GM_setClipboard
// @grant        GM.addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM.info
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.setClipboard
// @icon         https://kbin.social/favicon.svg
// @connect      raw.githubusercontent.com
// @connect      github.com
// @require      https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/safegm.user.js
// @require      https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/funcs.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @resource     kes_layout https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/ui.json
// @resource     kes_json https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/manifest.json
// @resource     kes_css https://raw.githubusercontent.com/aclist/kbin-kes/testing/helpers/kes.css
// @downloadURL  https://raw.githubusercontent.com/aclist/kbin-kes/testing/kes.user.js
// @updateURL    https://raw.githubusercontent.com/aclist/kbin-kes/testing/kes.user.js
// ==/UserScript==

//START AUTO MASTHEAD
const version = safeGM("info").script.version;
const tool = safeGM("info").script.name;
const repositoryURL = "https://github.com/aclist/kbin-kes/";
const rawURL = "https://raw.githubusercontent.com/aclist/kbin-kes/"
const branch = "testing"
const helpersPath = "helpers/"
const branchPath = rawURL + branch + "/"
const versionFile = branchPath + "VERSION";
const updateURL = branchPath + "kes.user.js";
const bugURL = repositoryURL + "issues"
const sponsorURL = "https://github.com/sponsors/aclist"
const changelogURL = repositoryURL + "blob/" + branch + "/CHANGELOG.md"

//resource URLs used by legacy GM. API
const manifest = branchPath + helpersPath + "manifest.json"
const cssURL = branchPath + helpersPath + "kes.css"
const layoutURL = branchPath + helpersPath + "ui.json"
//END AUTO MASTHEAD

async function checkUpdates (response) {
    const newVersion = await response.responseText.trim();

    if (newVersion && newVersion != version) {
        // Change version link into a button for updating
        versionElement.innerText = 'Install update: ' + newVersion;
        versionElement.setAttribute('href', updateURL);
        versionElement.className = 'new';
        await safeGM("setValue", "isnew", "yes");
    } else {
        await safeGM("setValue", "isnew", "no");
    }
    preparePayloads();
}

async function makeArr (response) {
    const resp = await response.response;
    await safeGM("setValue", "json", resp);
}

async function setRemoteCSS (response) {
    const resp = await response.responseText.trim();
    await safeGM("setValue", "kes-css", resp)
}
async function setRemoteUI (response) {
    const resp = await response.response;
    await safeGM("setValue", "layout", resp)
    await safeGM("getValue", "json")

}
async function preparePayloads () {
    let json
    let css
    let kes_layout
    let isNew
    if (gmPrefix === "GM_") {
        json = safeGM("getResourceText", "kes_json");
        css = safeGM("getResourceText", "kes_css");
        kes_layout = safeGM("getResourceText", "kes_layout");
        isNew = safeGM("getValue", "isnew")
        validateData(css, json, kes_layout, isNew)
    } else {

        genericXMLRequest(layoutURL, setRemoteUI);
        genericXMLRequest(manifest, makeArr);
        genericXMLRequest(cssURL, setRemoteCSS);

        unwrapPayloads()
    }
}
async function unwrapPayloads () {
    const storedJSON = safeGM("getValue", "json")
    const storedCSS = safeGM("getValue", "kes-css")
    const storedUI = safeGM("getValue", "layout")
    const storedNew = safeGM("getValue", "isnew")
    let payload = Promise.all([storedCSS, storedJSON, storedUI, storedNew]);
    payload.then((items) => {
        let p0 = items[0]
        let p1 = items[1]
        let p2 = items[2]
        let p3 = items[3]
        validateData(p0, p1, p2, p3)
    });
}

function validateData (rawCSS, rawJSON, rawLayout, isNew) {
    if (![rawCSS, rawJSON, rawLayout].every(Boolean)) {
        //if any of the remote resources are missing, block execution of the
        //rest of the script and print warning header; style data must be hardcoded here
        //as an emergency logic
        const warning = document.createElement('p')
        warning.style.cssText = "top:0;left:0;position:absolute;z-index: 9999;text-align: center;color: white;" +
            "font-size: 12px; height: 20px;background-color:#5e0909;width: 100%";
        warning.innerText = "[kbin Enhancement Suite] Failed to fetch the remote resources. Reload or try again later."
        document.body.insertAdjacentHTML("beforebegin", warning.outerHTML);
    } else {
        safeGM("addStyle", rawCSS);
        const j = JSON.parse(rawJSON);
        const json = j.sort( function ( a, b ) {
            a = a.label.toLowerCase();
            b = b.label.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        const layoutArr = JSON.parse(rawLayout);

        constructMenu(json, layoutArr, isNew);
    }
}


function constructMenu (json, layoutArr, isNew) {
    //instantiate kes modal and button
    const sidebarPages = layoutArr.pages;
    const headerTitle = layoutArr.header.title;
    function injectSettingsButton (layoutArr, isNew) {
        if (document.querySelector('#kes-settings')) {
            return
        }
        let kbinContainer
        if (window.innerWidth > 576) {
            kbinContainer = document.querySelector('.kbin-container > menu')
                ?? document.querySelector('.mbin-container > menu');
        } else {
            kbinContainer = document.querySelector('.sidebar-options > .section > menu > ul')
        }
        const kesPanel = document.createElement('li');
        kesPanel.id = 'kes-settings';
        kesPanel.title = layoutArr.header.open.tooltip;
        kbinContainer.appendChild(kesPanel);
        const wrenchOuter = document.createElement('a')
        const settingsButton = document.createElement('i');
        wrenchOuter.appendChild(settingsButton)
        settingsButton.id = 'kes-settings-button';
        settingsButton.classList = layoutArr.header.open.icon;
        settingsButton.style.verticalAlign = 'middle';
        if (isNew === "yes") {
            const stackSpan = document.createElement('span');
            stackSpan.classList = 'kes-update';
            let stackStrong = document.createElement('i');
            stackStrong.classList = 'fa-solid fa-circle-up fa-sm kes-update-available';
            stackSpan.appendChild(stackStrong);
            settingsButton.appendChild(stackSpan);
        }
        kesPanel.addEventListener('click', () => {
            showSettingsModal();
        });
        kesPanel.appendChild(wrenchOuter);
        return kesPanel
    }

    injectSettingsButton(layoutArr, isNew)

    var keyPressed = {};
    document.addEventListener('keydown', function (e) {

        let modal = document.querySelector('.kes-settings-modal')
        keyPressed[e.key] = true;

        if (keyPressed.Shift == true && keyPressed.Control == true && keyPressed["?"] == true) {
            e.preventDefault();
            if (!modal) {
                showSettingsModal();
            } else {
                modal.remove();
            }
            keyPressed = {};
        }
        if (keyPressed.Escape == true) {
            if (modal) {
                modal.remove();
            }
            keyPressed = {};
        }

    }, false);

    document.addEventListener('keyup', function (e) {
        keyPressed[e.key + e.location] = false;

        keyPressed = {};
    }, false);

    function cleanNamespaces () {
        const kesSettings = "kes-settings"
        for (let i = 0; i < json.length; ++i) {
            let foundNs = json[i].namespace;
            if (foundNs) {
                localStorage.removeItem(foundNs);
            }
        }
        localStorage.removeItem(kesSettings);
    }

    function resetAll () {
        const deleteMsg = "This will delete and reset all KES settings to the default and toggle off all options. Really proceed?";
        const deleteConfirm = confirm(deleteMsg);
        if (deleteConfirm) {
            cleanNamespaces();
            window.location.reload();
        }
    }
    function transparentMode (modal) {
        modal.remove();
        const transparentModal = document.createElement("div");
        transparentModal.className = "kes-transparent-mode-modal";
        document.body.appendChild(transparentModal);
        transparentModal.addEventListener('click', ()=> {
            transparentModal.remove();
            showSettingsModal();
        });
    }
    function activeModCount () {
        const set = JSON.parse(localStorage["kes-settings"])
        const totalMods = Object.keys(funcObj).length
        let activeMods = 0
        let c
        let key
        for (key in set) {
            c = set[key]
            if (c === true) {
                ++activeMods
            }
        }
        let modsHR = " (" + activeMods + "/" + totalMods + ")"
        return modsHR
    }
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

    function showSettingsModal () {
        const settings = getSettings();

        const modal = document.createElement("div");
        modal.className = "kes-settings-modal";

        const modalContent = document.createElement("div");
        modalContent.className = "kes-settings-modal-content";

        const header = document.createElement("div");
        header.className = "kes-settings-modal-header";

        const crumbs = document.createElement("div");
        crumbs.className = 'kes-crumbs';
        crumbs.innerText = 'Settings'

        const headerCloseButton = document.createElement('span')
        headerCloseButton.className = 'kes-close'
        const headerCloseIcon = document.createElement('i');
        headerCloseIcon.className = layoutArr.header.close.icon;
        headerCloseIcon.title = layoutArr.header.close.tooltip;
        headerCloseButton.appendChild(headerCloseIcon);

        const headerDockButton = document.createElement('span')
        headerDockButton.className = 'kes-dock'
        const headerDockIcon = document.createElement('i')
        headerDockIcon.className = layoutArr.header.dock_down.icon;
        headerDockIcon.title = layoutArr.header.dock_down.tooltip;
        headerDockButton.appendChild(headerDockIcon)

        const headerEyeButton = document.createElement('span')
        headerEyeButton.className = 'kes-transparent-mode'
        const headerEyeIcon = document.createElement('i')
        headerEyeIcon.className = layoutArr.header.transparent.icon
        headerEyeIcon.title = layoutArr.header.transparent.tooltip
        headerEyeButton.appendChild(headerEyeIcon)

        const headerChangelogButton = document.createElement('span')
        headerChangelogButton.className = 'kes-changelog'
        const headerChangelogIcon = document.createElement('i')
        const headerChangelogLink = document.createElement('a')
        headerChangelogLink.href = changelogURL
        headerChangelogLink.setAttribute('target', '_blank')
        headerChangelogLink.appendChild(headerChangelogIcon)
        headerChangelogIcon.className = layoutArr.header.changelog.icon
        headerChangelogIcon.title = layoutArr.header.changelog.tooltip
        headerChangelogButton.appendChild(headerChangelogLink)

        const headerSearchButton = document.createElement('span')
        headerSearchButton.className = 'kes-changelog'
        const headerSearchIcon = document.createElement('i')
        headerSearchIcon.className = layoutArr.header.search.icon
        headerSearchIcon.title = layoutArr.header.search.tooltip
        headerSearchButton.appendChild(headerSearchIcon)
        headerSearchButton.addEventListener('click', () => {
            const searchDialog = document.querySelector('#kes-search-dialog');
            searchDialog.showModal();
            document.querySelector('.kes-search-field').focus();
        });


        const headerVersionButton = document.createElement('span');
        headerVersionButton.className = 'kes-version'
        headerVersionButton.appendChild(versionElement);

        const headerHr = document.createElement('hr');
        headerHr.className = 'kes-header-hr'

        header.appendChild(headerCloseButton)
        header.appendChild(headerDockButton)
        header.appendChild(headerEyeButton)
        header.appendChild(headerChangelogButton)
        header.appendChild(headerSearchButton)

        if (window.innerWidth > 576) {
            header.appendChild(headerVersionButton);
            header.appendChild(crumbs)
            header.appendChild(headerHr);
        } else {
            header.appendChild(crumbs)
            header.appendChild(headerHr);
            header.appendChild(headerVersionButton);
        }

        const sidebar = document.createElement("div");
        sidebar.className = "kes-settings-modal-sidebar";
        let sidebarUl = document.createElement('ul');

        for (let i = 0; i < sidebarPages.length; ++i) {
            let pageUpper = sidebarPages[i].charAt(0).toUpperCase() + sidebarPages[i].slice(1);
            let sidebarListItem = document.createElement('li');
            sidebarListItem.innerHTML = `
            <a class="kes-tab-link">` + pageUpper + `</a></li>`
            sidebarUl.appendChild(sidebarListItem);
        }
        sidebar.appendChild(sidebarUl);

        function kesFormatAuthorUrl (author) {
            if (author.includes('@')) {
                if (window.location.hostname === author.split('@')[2]) {
                    return 'https://' + window.location.hostname + '/u/' + author.split('@')[1];
                } else {
                    return 'https://' + window.location.hostname + '/u/' + author;
                }
            } else {
                if (window.location.hostname === 'kbin.social') {
                    return 'https://' + window.location.hostname + '/u/' + author;
                } else {
                    return 'https://' + window.location.hostname + '/u/@' + author + '@kbin.social';
                }
            }
        }

        function openHelpBox (it) {
            const settings = getSettings();
            settings.lastPage = it;
            saveSettings(settings);
            const modInfo = document.createElement('p');
            const authorP = document.createElement('p');
            if (Array.isArray(json[it].author)) {
                const authorLabel = document.createElement('span');
                authorLabel.style.fontWeight = 'bold';
                authorLabel.innerText = 'Authors: ';
                authorP.appendChild(authorLabel);
                json[it].author.forEach((modAuthor) => {
                    const authorA = document.createElement('a');
                    authorA.setAttribute('href', kesFormatAuthorUrl(modAuthor));
                    if (modAuthor.includes('@')) {
                        authorA.innerText = modAuthor.split('@')[1];
                    } else {
                        authorA.innerText = modAuthor;
                    }
                    authorP.appendChild(authorA);
                    if (typeof(json[it].author[json[it].author.indexOf(modAuthor) + 1]) !== 'undefined') {
                        authorP.innerHTML += ', ';
                    }
                });
            } else {
                const authorLabel = document.createElement('span');
                authorLabel.style.fontWeight = 'bold';
                authorLabel.innerText = 'Author: ';
                authorP.appendChild(authorLabel);
                let author = json[it].author;
                const authorA = document.createElement('a');
                authorA.setAttribute('href', kesFormatAuthorUrl(author));
                if (author.includes('@')) {
                    authorA.innerText = author.split('@')[1];
                } else {
                    authorA.innerText = author;
                }
                authorP.appendChild(authorA);
            }
            let desc = json[it].desc;
            let link = json[it].link;
            let linkLabel = json[it].link_label;
            let login = json[it].login;
            let loginHR;
            if (login) {
                loginHR = "yes";
            } else {
                loginHR = "no";
            }
            let ns = json[it].namespace;

            //populate static fields
            let hBox = document.querySelector('.kes-settings-modal-helpbox');
            hBox.style.cssText = 'display: inline; opacity: 1;'
            const toggleSpan = document.createElement('span');
            toggleSpan.classList = 'kes-toggle';
            const toggleInput = document.createElement('input');
            toggleInput.setAttribute('type', 'checkbox');
            toggleInput.classList = 'tgl kes-tgl';
            toggleInput.id = 'kes-checkbox';
            toggleInput.setAttribute('kes-iter', it);
            toggleInput.setAttribute('kes-key', 'state');
            toggleSpan.appendChild(toggleInput);
            const toggleLabel = document.createElement('label');
            toggleLabel.classList = 'tgl-btn';
            toggleLabel.setAttribute('for', 'kes-checkbox');
            toggleSpan.appendChild(toggleLabel);
            modInfo.appendChild(toggleSpan);
            modInfo.appendChild(authorP);
            if (link) {
                const linkSpan = document.createElement('span');
                const linkSpanLabel = document.createElement('span');
                linkSpanLabel.style.fontWeight = 'bold';
                linkSpanLabel.innerText = 'Link: ';
                linkSpan.appendChild(linkSpanLabel);
                const linkA = document.createElement('a');
                linkA.setAttribute('href', link);
                if (typeof(linkLabel) !== 'undefined') {
                    linkA.innerText = linkLabel;
                } else {
                    linkA.innerText = link;
                }
                linkSpan.appendChild(linkA);
                modInfo.appendChild(linkSpan);
                modInfo.appendChild(document.createElement('br'));
            }
            const loginReqSpan = document.createElement('span');
            const loginReqSpanLabel = document.createElement('span');
            loginReqSpanLabel.style.fontWeight = 'bold';
            loginReqSpanLabel.innerText = 'Login required: ';
            loginReqSpan.appendChild(loginReqSpanLabel);
            loginReqSpan.innerHTML += loginHR;
            modInfo.appendChild(loginReqSpan);
            modInfo.appendChild(document.createElement('br'));
            modInfo.appendChild(document.createElement('br'));
            const descLabel = document.createElement('span');
            descLabel.style.fontWeight = 'bold';
            descLabel.innerText = 'Description';
            modInfo.appendChild(descLabel);
            modInfo.appendChild(document.createElement('br'));
            const descSpan = document.createElement('span');
            descSpan.innerText = desc;
            modInfo.appendChild(descSpan);
            modInfo.appendChild(document.createElement('br'));
            hBox.replaceChildren(modInfo);
            const br = document.createElement('br');
            //populate dynamic fields
            if (json[it].fields) {
                const settingsLabel = document.createElement('span');
                settingsLabel.style.fontWeight = 'bold';
                settingsLabel.innerText = 'Settings';
                hBox.appendChild(settingsLabel);
                const modSettings = getModSettings(ns)
                for (let i = 0; i < json[it].fields.length; ++i) {
                    let fieldType = json[it].fields[i].type;
                    let initial = json[it].fields[i].initial;
                    let key = json[it].fields[i].key;
                    let ns = json[it].namespace;
                    if (json[it].fields[i].label) {
                        let label = document.createElement('p');
                        label.className = "kes-field-label";
                        label.innerText = json[it].fields[i].label;
                        hBox.appendChild(label);
                    }
                    if (modSettings[key] === undefined) {
                        modSettings[key] = initial;
                        saveModSettings(modSettings, ns);
                    }
                    switch (fieldType) {
                        case "range": {
                            const range = document.createElement('input');
                            range.setAttribute("type", fieldType);
                            if (modSettings[key] === undefined) {
                                range.setAttribute("value", initial);
                            } else {
                                range.setAttribute("value", modSettings[key])
                            }
                            range.setAttribute("kes-iter", it);
                            range.setAttribute("kes-key", key);
                            range.setAttribute('min', json[it].fields[i].min);
                            range.setAttribute('max', json[it].fields[i].max);
                            if (json[it].fields[i].step) {
                                range.setAttribute('step', json[it].fields[i].step);
                            }
                            if (json[it].fields[i].show_value) {
                                //TODO: value should always be visible
                                const rangeDiv = document.createElement('div');
                                range.setAttribute('oninput', key + '.innerText = this.value');
                                range.style.verticalAlign = 'middle';
                                rangeDiv.appendChild(range);
                                const rangeValue = document.createElement('label');
                                rangeValue.setAttribute('style', 'display: inline-block; vertical-align: middle; margin-left: 1em;');
                                rangeValue.id = key;
                                rangeValue.for = key;
                                if (modSettings[key] === undefined) {
                                    rangeValue.innerText = initial;
                                } else {
                                    rangeValue.innerText = modSettings[key];
                                }
                                rangeDiv.appendChild(rangeValue);
                                hBox.appendChild(rangeDiv);
                            } else {
                                hBox.appendChild(range);
                            }
                            hBox.appendChild(br);
                            break;
                        }
                        case "reset": {
                            const resetField = document.createElement('input');
                            resetField.setAttribute("type",fieldType);
                            resetField.addEventListener('click', ()=> {
                                for (let j = 0; j < json[it].catch_reset.length; ++j) {
                                    let fieldToReset = json[it].catch_reset[j];
                                    let resetClassName = `.kes-settings-modal-helpbox input[kes-key="${fieldToReset}"]`
                                    let found = document.querySelector(resetClassName)
                                    let matchKey = found.getAttribute("kes-key")
                                    for (let k = 0 ; k < json[it].fields.length; ++k) {
                                        if(json[it].fields[k].key === matchKey) {
                                            let initial = json[it].fields[k].initial
                                            if (json[it].fields[k].type === "color") {
                                                initial = getHex(initial);
                                            } else if (json[it].fields[k].type === "number") {
                                                initial = getComputedFontSize(initial)
                                                if (!initial) {
                                                    initial = 14
                                                }
                                            }
                                            found.setAttribute("value",initial);
                                            found.value = initial;
                                        }
                                    }
                                    updateState(found);
                                }
                            });
                            hBox.appendChild(resetField)
                            hBox.appendChild(br)
                            break;
                        }
                        case "color": {
                            const colorField = document.createElement('input');
                            let realHex
                            if (modSettings[key] === undefined) {
                                realHex = getHex(initial);
                            } else {
                                realHex = getHex(modSettings[key])
                            }
                            colorField.setAttribute("value", realHex);
                            colorField.setAttribute("type", fieldType);
                            colorField.setAttribute("kes-iter", it);
                            colorField.setAttribute("kes-key", key);
                            //#220: explicit handling for labelOp mod (child inherits 75% opacity of author header)
                            if (json[it].entrypoint == "labelOp") {
                                colorField.className = "kes-dimmed-colorpicker";
                            }
                            hBox.appendChild(colorField);
                            hBox.appendChild(br);
                            break;
                        }
                        case "number": {
                            const numberField = document.createElement('input');
                            numberField.setAttribute("type", fieldType);

                            let val
                            let size
                            if ((modSettings[key] === undefined) || (modSettings[key] === "")) {
                                size = getComputedFontSize(initial)
                                if (!size) {
                                    val = 14
                                } else {
                                    val = size
                                }
                            } else {
                                size = getComputedFontSize(modSettings[key])
                                if (!size) {
                                    val = 14
                                } else {
                                    val = size
                                }
                            }
                            numberField.setAttribute("value", val)

                            numberField.setAttribute("kes-iter", it);
                            numberField.setAttribute("kes-key", key);
                            numberField.setAttribute('min', json[it].fields[i].min);
                            numberField.setAttribute('max', json[it].fields[i].max);
                            if (json[it].fields[i].step) {
                                numberField.setAttribute('step', json[it].fields[i].step);
                            }
                            numberField.addEventListener('change', (e)=> {
                                let numTarg = e.target
                                numTarg.setAttribute("value",numTarg.value)
                            });
                            hBox.appendChild(numberField);
                            hBox.appendChild(br);
                            break;
                        }
                        case "select": {
                            const selectField = document.createElement('select');
                            selectField.setAttribute('name', ns);
                            selectField.setAttribute("kes-iter", it);
                            selectField.setAttribute("kes-key", key);
                            for (let j = 0; j < json[it].fields[i].values.length; ++j) {
                                let opt = document.createElement('option');
                                opt.setAttribute('value', json[it].fields[i].values[j]);
                                opt.innerText = json[it].fields[i].values[j];
                                if (modSettings[key] == json[it].fields[i].values[j]) {
                                    opt.selected = 'selected';
                                } else if (json[it].fields[i].values[j] == json[it].fields[i].initial) {
                                    opt.selected = 'selected'
                                }
                                selectField.appendChild(opt);
                            }
                            hBox.appendChild(selectField);
                            hBox.appendChild(br);
                            break;
                        }
                        case "radio": {
                            const radioDiv = document.createElement('div');
                            for (let j = 0; j < json[it].fields[i].values.length; ++j) {
                                const radioField = document.createElement('input');
                                radioField.setAttribute("type", fieldType);
                                radioField.setAttribute('name', ns);
                                radioField.setAttribute('id', "kes-radio-" + j);
                                radioField.setAttribute("kes-iter", it);
                                radioField.setAttribute("kes-key", key);
                                radioField.setAttribute("value", json[it].fields[i].values[j]);
                                radioField.className = "kes-default-radio";
                                if (modSettings[key] == json[it].fields[i].values[j]) {
                                    radioField.checked = true;
                                } else if (json[it].fields[i].values[j] == json[it].fields[i].initial) {
                                    radioField.checked = true;
                                }
                                let radioLabel = document.createElement('label');
                                radioLabel.setAttribute('for', "kes-radio-" + j);
                                radioLabel.className = ("kes-radio-label");
                                radioLabel.innerText = json[it].fields[i].values[j];
                                radioDiv.appendChild(radioField);
                                radioDiv.appendChild(radioLabel);
                                let br = document.createElement('br');
                                radioDiv.appendChild(br);
                            }
                            hBox.appendChild(radioDiv);
                            hBox.appendChild(br);
                            break;
                        }
                        case "checkbox": {
                            const checkboxLabel = document.createElement('label');
                            const cfield = document.createElement('input');
                            cfield.setAttribute("type", fieldType);
                            if (modSettings[key] === undefined) {
                                cfield.checked = initial
                            } else {
                                cfield.checked = modSettings[key]
                            }
                            cfield.setAttribute("kes-iter", it);
                            cfield.setAttribute("kes-key", key);
                            cfield.className = "kes-default-checkbox";
                            checkboxLabel.appendChild(cfield);
                            let ctext = document.createElement('text')
                            ctext.innerText = json[it].fields[i].checkbox_label;
                            checkboxLabel.appendChild(ctext)
                            hBox.appendChild(checkboxLabel);
                            break;
                        }
                        default: {
                            const field = document.createElement('input');
                            field.setAttribute("type", fieldType);
                            if (modSettings[key] === undefined) {
                                field.setAttribute("value", initial);
                            } else {
                                field.setAttribute("value", modSettings[key])
                            }
                            field.setAttribute("kes-iter", it);
                            field.setAttribute("kes-key", key);
                            hBox.appendChild(field);
                            hBox.appendChild(br);
                        }
                    }
                }
            }
            // reset opacity of other helpbox toggles
            let helpboxToggles = document.querySelectorAll('.kes-option');
            for (let i = 0; i < helpboxToggles.length; ++i) {
                if (i != it) {
                    helpboxToggles[i].style.cssText = 'opacity: 0.5;'
                } else {
                    helpboxToggles[i].style.cssText = 'opacity: 1;'
                }
            }
            let func = json[it].entrypoint;
            const check = document.querySelector(`.kes-settings-modal-helpbox [kes-iter="` + it + `"]`);
            if (settings[func] == true) {
                check.checked = true;
            } else {
                check.checked = false;
            }
        }

        // Add script tag with opentab function
        function openTab (tabName) {
            const settings = getSettings();
            if (settings.lastTab != tabName) {
                settings.lastPage = null;
            }
            settings.lastTab = tabName
            saveSettings(settings);
            let pageLower = tabName.charAt(0).toLowerCase() + tabName.slice(1);
            const tablinks = document.getElementsByClassName("kes-tab-link");
            for (let i = 0; i < tablinks.length; i++) {
                if (tablinks[i].innerText !== tabName) {
                    tablinks[i].style.opacity = 0.5;
                } else {
                    tablinks[i].style.opacity = 1;
                }
            }
            //TODO: fails on GM
            //event.stopPropagation();
            // Hide all options not in this tab (without this classname)
            const options = document.getElementsByClassName("kes-list")[0];
            const optionsChildren = options.children;
            const pageToOpen = []
            for (let i = 0; i < optionsChildren.length; i++) {
                if (optionsChildren[i].className.indexOf(pageLower) > -1) {
                    optionsChildren[i].style.display = "block";
                    pageToOpen.push(i);
                } else {
                    optionsChildren[i].style.display = "none";
                    let crumbsRoot = document.querySelector('.kes-crumbs');
                    crumbsRoot.innerHTML = '<h2>' + headerTitle + ' ' +
                        '<i class="' + layoutArr.header.separator.icon + '"></i> ' +
                        tabName + '</h2>';
                    let crumbsChild = crumbsRoot.children[0]
                    let modCounter = document.createElement('text');
                    crumbsChild.appendChild(modCounter);
                    modCounter.className = "kes-mod-count"
                }
            }

            updateCrumbs();

            if (pageToOpen.length > 0) {
                let lp = settings["lastPage"];
                if (lp) {
                    openHelpBox(lp)
                } else {
                    openHelpBox(pageToOpen[0])
                }
            } else {
                let hBox = document.querySelector('.kes-settings-modal-helpbox');
                hBox.style.opacity = 0;
            }
        }

        const bodyHolder = document.createElement("div");
        bodyHolder.className = "kes-settings-modal-body";

        const kesUl = document.createElement("ul")
        kesUl.className = "kes-list";

        const helpBox = document.createElement("div");
        helpBox.className = "kes-settings-modal-helpbox";

        const footer = document.createElement("div");
        footer.className = "kes-settings-modal-footer";

        const backupButton = document.createElement('button');
        backupButton.innerText = "SETTINGS";
        backupButton.className = "kes-backup-button";
        footer.appendChild(backupButton);
        backupButton.addEventListener('click', () => {
            const backupDialog = document.querySelector('#kes-backup-dialog');
            backupDialog.showModal();
        });

        function parseNamespaces () {
            var names = [];
            for(let i = 0 ; i < json.length ; ++i) {
                if(json[i].namespace) {
                    names.push(json[i].namespace);
                }
            }
            return names;
        }
        function parseLocalStorage () {
            const names = parseNamespaces();
            const toExport = {};
            const keys = Object.keys(localStorage);
            const values = Object.values(localStorage);
            for(let i = 0 ; i < keys.length ; ++i) {
                if(keys[i] === "kes-settings" || names.includes(keys[i])) {
                    let key = keys[i];
                    let value = JSON.parse(values[i]);
                    toExport[key] = value;
                }
            }
            return toExport
        }
        function parseImportedFile (contents) {
            const names = parseNamespaces();
            const keys = Object.keys(contents);
            cleanNamespaces();
            for(let i = 0 ; i < keys.length ; ++i) {
                if(keys[i] === "kes-settings" || names.includes(keys[i])) {
                    let namespace = keys[i];
                    let settings = contents[namespace];
                    saveModSettings(settings, namespace)
                }
            }
        }
        function exportSettings () {
            const exportButton = document.createElement('a')
            const rawSettings = parseLocalStorage();
            const pretty = JSON.stringify(rawSettings,null,2);
            const textBlob = new Blob([pretty], { type: 'application/json' });
            const saveDate = new Date().toLocaleString('sv').replace(' ','-').replaceAll(':','')
            const filename = `KES-backup-${saveDate}.json`
            exportButton.setAttribute('href',URL.createObjectURL(textBlob));
            exportButton.setAttribute('download', filename);
            exportButton.style = 'display:none';
            document.body.appendChild(exportButton);
            exportButton.click();
            alert(`Saved KES settings to ${filename}`)
        }

        function fileImportError () {
            alert('File import error. The file may be corrupted. If you believe the file is correct, please attach it alongside a bug report.')
        }
        const dialogTrigger = document.createElement('input')
        footer.appendChild(dialogTrigger)
        dialogTrigger.id = 'kes-import-dialog'
        dialogTrigger.style = 'display: none'
        dialogTrigger.type = 'file';
        dialogTrigger.addEventListener('change', (e) => {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0]);
            reader.onerror = function () {
                fileImportError();
            };
            reader.onload = function () {
                try {
                    let payload = JSON.parse(reader.result)
                    parseImportedFile(payload)
                    window.location.reload();
                } catch (e) {
                    fileImportError();
                }
            };

        });

        const resultsNativeModal = document.createElement('dialog');
        resultsNativeModal.id = 'kes-results-dialog';
        resultsNativeModal.innerHTML = `
        <form method="dialog">
        </form>
        `
        const searchNativeModal = document.createElement('dialog');
        searchNativeModal.id = 'kes-search-dialog';
        searchNativeModal.innerHTML = `
        <form method="dialog">
        <menu class="kes-search-menu">
            <input class="kes-search-hidden" type="submit" value="submit" hidden>
            <button class="kes-search-new" type="submit" value="list-new">Show add-ons new to v${getMajorMinor(version)}</button>
            <input type="text" class="kes-search-field">
            <span class="kes-search-text">Type enter to submit search</span>
            <button class="kes-search-closebutton" type="submit" value="close">Close</button>
        </menu>
      </form>
      `

        const nativeModal = document.createElement('dialog');
        nativeModal.id = 'kes-backup-dialog';
        nativeModal.innerHTML = `
        <form method="dialog">
        <menu class="kes-backup-menu">
          <button type="submit" value="export">Export</button>Export to file<br>
          <button type="submit" value="import">Import</button>Import from file<br>
          <button type="submit" value="reset">Reset</button>Reset all KES settings<br>
          <button type="submit" value="close">Close</button>Close this dialog
        </menu>
      </form>
      `
        nativeModal.addEventListener('close', () => {
            let upload
            const dialog = document.querySelector('#kes-backup-dialog');
            switch (dialog.returnValue) {
                case "import":
                    upload = document.getElementById("kes-import-dialog");
                    upload.click();
                    break;
                case "export":
                    exportSettings();
                    break;
                case "reset":
                    resetAll();
                    break;
                case "close":
                    break;
            }
        });

        resultsNativeModal.addEventListener('close', () => {
            const dialog = document.querySelector('#kes-results-dialog');
            const ret = dialog.returnValue
            if (ret === "close") {
                return
            }
            let page = ret.split('@')[0]
            const helpString = ret.split('@')[1]
            const pageCaps = page.charAt(0).toUpperCase() + page.slice(1);
            openTab(pageCaps);
            const opts = document.querySelectorAll('.kes-option');
            opts.forEach((opt)=>{
                if (opt.innerHTML.trim() === helpString) {
                    const ind = opt.getAttribute("kes-iter");
                    openHelpBox(ind);
                    return
                }
            });
        });

        function getMajorMinor (version) {
            const d = version.split('.')
            const major = d[0]
            const minor = d[1]
            return `${major}.${minor}`
        }
        function generateSearchResults (resultsMenu, record, label) {
            const page = record.page
            const br = document.createElement('br')
            const r = document.createElement('button')
            r.type = "submit";
            r.className = "kes-results-fullbutton";
            r.value = page + "@" + label;
            r.innerText = label;
            resultsMenu.appendChild(r);
            resultsMenu.appendChild(br);
        }
        searchNativeModal.addEventListener('submit', (e) => {
            const rval = e.submitter.value
            let query
            if (rval === "close") {
                return
            }
            if (rval === "list-new") {
                query = ":new"
            }
            if (rval === "submit") {
                const innerDialog = document.querySelector('.kes-search-field')
                query = innerDialog.value
                innerDialog.value = ""
                if (query === "") return
            }
            const resultsDialog = document.querySelector('#kes-results-dialog');
            const oldMenu = document.querySelector('.kes-results-menu')
            if (oldMenu) {
                oldMenu.remove();
            }
            const resultsMenu = document.createElement('menu');
            resultsMenu.className = 'kes-results-menu';
            const resultsDialogForm = resultsDialog.querySelector('form');
            resultsDialogForm.appendChild(resultsMenu);

            let label
            for (let i = 0; i < json.length; ++i) {
                const origLabel = json[i].label
                const labelLower = origLabel.toLowerCase();
                const queryLower = query.toLowerCase();
                if (query === ":recurs") {
                    if (!json[i].recurs) continue
                    label = json[i].label;
                    generateSearchResults(resultsMenu, json[i], label)
                } else if (query === ":new") {
                    if (json[i].new_since === getMajorMinor(version)) {
                        label = json[i].label;
                        generateSearchResults(resultsMenu, json[i], label)
                    }
                } else if (query === ":login") {
                    if (!json[i].login) continue
                    label = json[i].label;
                    generateSearchResults(resultsMenu, json[i], label)
                } else if(labelLower.includes(queryLower)) {
                    label = json[i].label;
                    generateSearchResults(resultsMenu, json[i], label)
                }
            }
            if (label === undefined) {
                return
            }
            const closeButton = document.createElement('button')
            closeButton.type = "submit"
            closeButton.value = "close"
            closeButton.className = "kes-results-closebutton"
            closeButton.innerText = "Close"
            resultsMenu.appendChild(closeButton)
            resultsDialog.showModal();
        });

        modal.appendChild(nativeModal);
        modal.appendChild(searchNativeModal);
        modal.appendChild(resultsNativeModal);

        const bugLink = document.createElement("a");
        bugLink.className = "kes-settings-modal-bug-link";
        bugLink.innerText = "Report a bug";
        bugLink.setAttribute('href', bugURL);
        bugLink.setAttribute('target', '_blank');
        footer.appendChild(bugLink)

        const bugIcon = document.createElement("span");
        bugIcon.className = "kes-settings-modal-bug-icon";
        bugIcon.innerHTML = '<i class="' + layoutArr.header.bug.icon + '"></i>';
        bugLink.appendChild(bugIcon)

        const debugClip = document.createElement("i");
        const clipClass = "kes-debug-clipboard"
        debugClip.className = clipClass + " " + layoutArr.header.clipboard.icon;
        debugClip.title = layoutArr.header.clipboard.tooltip;
        footer.appendChild(debugClip)
        debugClip.addEventListener('click', ()=> {
            const userPlatform = navigator.platform;
            const userAgent = navigator.userAgent;
            const handler = safeGM("info").scriptHandler;
            const incog = safeGM("info").isIncognito;
            const kesUserSettings = localStorage["kes-settings"];
            const toPaste = `OS: ${userPlatform}\nAgent: ${userAgent}\nKES version: ${version}\nHandler: ${handler}\nIncog: ${incog}\nSettings: ${kesUserSettings}`
            navigator.clipboard.writeText(toPaste);
            debugClip.className = clipClass + " " + layoutArr.header.check.icon;
            function revertIcon () {
                debugClip.className = "kes-debug-clipboard " + layoutArr.header.clipboard.icon
            }
            window.setTimeout(revertIcon,600);
        });

        const sponsorButton = document.createElement('span')
        const sponsorIcon = document.createElement('i')
        const sponsorLink = document.createElement("a");
        sponsorButton.className = "kes-settings-modal-sponsor-link";
        sponsorIcon.className = layoutArr.header.sponsor.icon
        sponsorLink.setAttribute('href', sponsorURL);
        sponsorLink.setAttribute('target', '_blank');
        sponsorLink.title = layoutArr.header.sponsor.tooltip
        sponsorIcon.style.color = "red"
        sponsorLink.appendChild(sponsorIcon)
        sponsorButton.appendChild(sponsorLink)
        footer.appendChild(sponsorButton)

        const container = document.createElement("div");
        container.className = "kes-settings-modal-container";

        //inject modal
        modal.appendChild(container);
        container.appendChild(modalContent);
        container.appendChild(footer);
        modalContent.appendChild(header);
        modalContent.appendChild(sidebar);
        modalContent.appendChild(helpBox);
        modalContent.appendChild(bodyHolder);
        bodyHolder.appendChild(kesUl);
        document.body.appendChild(modal);
        document.querySelector('.kes-settings-modal-sidebar ul').addEventListener("click", (e) => {
            if (e.target.className != "kes-tab-link") return
            openTab(e.target.outerText);
        });
        document.querySelector('.kes-list').addEventListener("click", (e) => {
            if (e.target.className != "kes-option") return
            openHelpBox(e.target.getAttribute('kes-iter'));
        });
        document.querySelector('.kes-settings-modal-helpbox').addEventListener("input", (e) => {
            updateState(e.target);
        });



        const dockIcon = document.querySelector('.kes-dock i');
        if (settings.dock == 'down') {
            container.classList.add('kes-docked');
            dockIcon.className = layoutArr.header.dock_up.icon;
            dockIcon.title = layoutArr.header.dock_up.tooltip;
        } else {
            dockIcon.className = layoutArr.header.dock_down.icon;
            dockIcon.title = layoutArr.header.dock_down.tooltip;
        }


        function insertListItem (it) {
            let item = json[it].label
            let page = json[it].page
            const kesListItem = document.createElement("li");
            kesListItem.className = page;
            kesListItem.innerHTML += `<a class="kes-option" kes-iter="` + it + `">` + item + `</a>`
            kesUl.appendChild(kesListItem);

        }

        for (let i = 0; i < json.length; ++i) {
            insertListItem(i);
        }

        //dock button
        modal.querySelector('.kes-dock i').addEventListener("click", (e) => {
            const settings = getSettings();
            let cn = e.target.className;
            if (cn == layoutArr.header.dock_down.icon) {
                container.classList.add('kes-docked');
                e.target.className = layoutArr.header.dock_up.icon;
                e.target.title = layoutArr.header.dock_up.tooltip;
                settings.dock = 'down';
            } else {
                container.classList.remove('kes-docked');
                e.target.className = layoutArr.header.dock_down.icon;
                e.target.title = layoutArr.header.dock_down.tooltip;
                settings.dock = 'up';

            }
            saveSettings(settings);
        });

        //close button
        modal.querySelector(".kes-settings-modal .kes-close").addEventListener("click", () => {
            modal.remove();
        });
        modal.querySelector(".kes-transparent-mode").addEventListener("click", () => {
            transparentMode(modal);
        });
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        let pageSettings = getSettings();
        let lp = pageSettings["lastTab"]
        let startPage
        if (lp) {
            startPage = lp
        } else {
            startPage = sidebarPages[0].charAt(0).toUpperCase() + sidebarPages[0].slice(1);
        }
        openTab(startPage);
    }
    function updateCrumbs () {
        const myMods = activeModCount();
        let modCount = document.querySelector('.kes-mod-count')
        modCount.innerText = myMods
    }

    function updateState (target) {
        //get master settings
        const settings = getSettings();
        const it = target.getAttribute('kes-iter');
        const check = document.querySelector(`.kes-settings-modal-helpbox [kes-iter="` + it + `"]`);

        //get mod settings
        let modValue
        let ns = json[it].namespace;
        let key = target.getAttribute('kes-key');
        if (target.type === "checkbox") {
            modValue = target.checked
        } else {
            modValue = target.value
        }
        const modSettings = getModSettings(ns);

        let state;
        if (check.checked) {
            state = true;
        } else {
            state = false;
        }

        //update master and mod settings
        let func = json[it].entrypoint;
        modSettings[key] = modValue;
        settings[func] = state;

        //save and apply checkbox state
        saveSettings(settings);
        saveModSettings(modSettings, ns);

        updateCrumbs();
        //necessarily reload the page when verbose timestamps are toggled off
        //otherwise, triggers a loop of mutations because reverting timeago mutates watched node
        if ((func === "timestamp") && (state === false)) {
            window.location.reload();
        } else {
            toggleSettings(func);
        }
    }

    function toggleDependencies (entry, state) {
        let object
        let depends
        let entrypoint

        for (let i = 0; i < json.length; ++i) {
            if(json[i].entrypoint === entry) {
                object = json[i]
            }
        }
        if (!object.depends_on && !object.depends_off) return
        if (state == true && !object.depends_on) return
        if (state == false && !object.depends_off) return

        if (state === true) {
            depends = object.depends_on
        } else {
            depends = object.depends_off
        }

        const settings = getSettings();
        for (let i = 0; i < depends.length; ++i) {
            entrypoint = depends[i]
            settings[entrypoint] = state
            saveSettings(settings);
            funcObj[entrypoint](state);
        }
    }
    function toggleSettings (entry) {
        const settings = getSettings()
        try {
            if (settings[entry] == true) {
                toggleDependencies(entry, true)
                funcObj[entry](true);
            } else {
                toggleDependencies(entry, false)
                funcObj[entry](false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function legacyMigration (entry) {
        const settings = getSettings();
        const legacyEntrypoints = {
            "mail": "addMail",
            "subs": "initMags",
            "adjust": "adjustSite",
            "alpha_sort_subs": "alphaSortInit",
            "alt_all_content_access": "altAllContentAccess",
            "always_more": "moreInit",
            "clarify_recipient": "clarifyRecipientInit",
            "improved_collapsible_comments": "initCollapsibleComments",
            "resize_text": "textResize",
            "dropdown": "dropdownEntry",
            "expand_posts": "expandPostsInit",
            "fix_codeblocks": "fixLemmyCodeblocks",
            "hide_downvotes": "hideDownvotes",
            "hide_reputation": "hideReputation",
            "hide_upvotes": "hideUpvotes",
            "hide_sidebar": "hideSidebar",
            "hide_thumbs": "hideThumbs",
            "hover_indicator": "hoverIndicator",
            "easy_emoticon": "easyEmoticon",
            "label": "labelOp",
            "mag_instance_names": "magInstanceEntry",
            "mobile_cleanup": "mobileHideInit",
            "move_federation_warning": "moveFederationWarningEntry",
            "nav_icons": "navbarIcons",
            "notifications_panel": "notificationsPanel",
            "hide_posts": "hidePostsInit",
            "rearrange": "rearrangeInit",
            "thread_delta": "threadDeltaInit",
            "softblock": "softBlockInit",
            "report_bug": "bugReportInit",
            "omni": "omniInit",
            "thread_checkmarks": "checksInit",
            "hide_logo": "toggleLogo",
            "unblur": "unblurInit",
            "user_instance_names": "userInstanceEntry",
            "timestamp": "updateTime",
            "code_highlighting": "initCodeHighlights",
            "kbin_federation_awareness": "initKFA"
        }
        const legacyMapping = legacyEntrypoints[entry]
        try {
            if (settings[legacyMapping] == true) {
                settings[entry] = true;
                delete settings[legacyMapping];
                saveSettings(settings);
            }
        } catch (error) {
            console.log(error)
        }

    }
    function applySettings (entry, mutation) {
        legacyMigration(entry);
        const settings = getSettings();
        try {
            if (settings[entry] == true) {
                toggleDependencies(entry, true)
                funcObj[entry](true, mutation);
            }
        } catch (error) {
            console.log(error);
        }
    }

    window.getModSettings = function (namespace) {
        let settings = localStorage.getItem(namespace)
        if (!settings) {
            settings = {};
        } else {
            settings = JSON.parse(settings);
        }
        return settings;
    }

    function getSettings () {
        let settings = localStorage.getItem("kes-settings");
        if (!settings) {
            settings = {};
        } else {
            settings = JSON.parse(settings);
        }
        return settings;
    }

    function saveModSettings (settings, namespace) {
        localStorage.setItem(namespace, JSON.stringify(settings));
    }

    function saveSettings (settings) {
        localStorage.setItem("kes-settings", JSON.stringify(settings));
    }

    function init () {
        for (let i = 0; i < json.length; ++i) {
            if ((json[i].login) && (!is_logged_in())) { // eslint-disable-line no-undef

                continue
            }
            applySettings(json[i].entrypoint);
        }
    }

    function initmut (list) {
        for (const mutation of list) {
            if (mutation.target.nodeName == "HTML") {
                //implies that turbo mode reloaded the entire DOM tree
                //the KES modal is itself running in the background,
                //but when the entire DOM is reloaded in place the settings icon should be
                //reinjected into the kbin navbar
                injectSettingsButton(layoutArr, isNew)
                for (let i = 0; i < json.length; ++i) {
                    applySettings(json[i].entrypoint, mutation);
                }
                return
            }
            if (mutation.target.className === 'timeago') {
                //workaround for timeago ticks changing timestamp textContent
                //implies that the active 60s timestamp is updating
                //reapplies verbose timestamps
                //see also updateState()
                if (mutation.target.textContent.indexOf("ago") >= 0) {
                    applySettings("timestamp");
                }
                //triggering on the first mutation is sufficient to apply to all timestamps
                return
            } else if ((mutation.target.getAttribute("data-controller") == "subject-list") || (mutation.target.id == "comments")) {
                //implies that a recurring/infinite scroll event like new threads or comment creation occurred
                for (let i = 0; i < json.length; ++i) {
                    if (json[i].recurs) {
                        applySettings(json[i].entrypoint, mutation);
                        obs.takeRecords();
                    }
                }
                return
            }
        }
    }

    const watchedNode = document.querySelector('html');
    const obs = new MutationObserver(initmut);
    init();
    if (watchedNode) {
        obs.observe(watchedNode, {
            subtree: true,
            childList: true,
            attributes: false
        });
    }
}

const versionElement = document.createElement('a');
versionElement.innerText = tool + ' ' + version;
versionElement.setAttribute('href', repositoryURL);
genericXMLRequest(versionFile,checkUpdates);
