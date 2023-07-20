// ==UserScript==
// @name         KES
// @namespace    https://github.com/aclist
// @license      MIT
// @version      2.0.6-beta.1
// @description  Kbin Enhancement Suite
// @author       aclist
// @match        https://kbin.social/*
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
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/helpers/safegm.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/code-highlighting.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/dropdown.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/easy-emoticon.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/hide-logo.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/hide-sidebar.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/hide-thumbs.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/hide-votes.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/improved-collapsible-comments.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/instance-names.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/kbin-federation-awareness.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/kbin-mod-options.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/label.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/mail.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/nav-icons.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/notifications-panel.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/report-bug.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/subs.user.js
// @require      https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/mods/timestamp.user.js
// @resource     kes_layout https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/helpers/ui.json
// @resource     kes_json https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/helpers/manifest.json
// @resource     kes_css https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/helpers/kes.css
// @downloadURL  https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/kes.user.js
// @updateURL    https://github.com/aclist/kbin-kes/raw/patch-hamburger-hotfix/kes.user.js
// ==/UserScript==

//START AUTO MASTHEAD
/* global addMail, bugReportInit, dropdownEntry, easyEmoticon, hideDownvotes, hideReputation, hideSidebar, hideThumbs, hideUpvotes, initCodeHighlights, initCollapsibleComments, initKFA, initMags, labelOp, magInstanceEntry, navbarIcons, notificationsPanel, toggleLogo, updateTime, userInstanceEntry */

const version = safeGM("info").script.version;
const tool = safeGM("info").script.name;
const repositoryURL = "https://github.com/aclist/kbin-kes/";
const branch = "patch-hamburger-hotfix"
const helpersPath = "helpers/"
const branchPath = repositoryURL + "raw/" + branch + "/"
const versionFile = branchPath + "VERSION";
const updateURL = branchPath + "kes.user.js";
const bugURL = repositoryURL + "issues"
const changelogURL = repositoryURL + "blob/" + branch + "/CHANGELOG.md"
const magURL = "https://kbin.social/m/enhancement"

//resource URLs used by legacy GM. API
const manifest = branchPath + helpersPath + "manifest.json"
const cssURL = branchPath + helpersPath + "kes.css"
const layoutURL = branchPath + helpersPath + "ui.json"

const funcObj = {
    addMail: addMail,
    bugReportInit: bugReportInit,
    dropdownEntry: dropdownEntry,
    easyEmoticon: easyEmoticon,
    hideDownvotes: hideDownvotes,
    hideReputation: hideReputation,
    hideSidebar: hideSidebar,
    hideThumbs: hideThumbs,
    hideUpvotes: hideUpvotes,
    initCodeHighlights: initCodeHighlights,
    initCollapsibleComments: initCollapsibleComments,
    initKFA: initKFA,
    initMags: initMags,
    labelOp: labelOp,
    magInstanceEntry: magInstanceEntry,
    navbarIcons: navbarIcons,
    notificationsPanel: notificationsPanel,
    toggleLogo: toggleLogo,
    updateTime: updateTime,
    userInstanceEntry: userInstanceEntry
};
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
        const json = JSON.parse(rawJSON);
        const layoutArr = JSON.parse(rawLayout);

        constructMenu(json, layoutArr, isNew);
    }
}

function constructMenu (json, layoutArr, isNew) {
    //instantiate kes modal and button
    let kbinContainer
    const sidebarPages = layoutArr.pages;
    const headerTitle = layoutArr.header.title;
    const kesPanel = document.createElement('li');
    kesPanel.id = 'kes-settings';
    if (window.innerWidth > 512) {
        kbinContainer = document.querySelector('.kbin-container > menu');
    } else {
        kbinContainer = document.querySelector('.sidebar-options > .section')
        kesPanel.className = "kes-panel-mobile"
    }
    kbinContainer.appendChild(kesPanel);
    const settingsButton = document.createElement('i');
    settingsButton.id = 'kes-settings-button';
    settingsButton.classList = layoutArr.header.open;
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
    kesPanel.appendChild(settingsButton);

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
        const totalMods = Object.keys(set).length
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

    function showSettingsModal () {
        const settings = getSettings();

        const modal = document.createElement("div");
        modal.className = "kes-settings-modal";

        const modalContent = document.createElement("div");
        modalContent.className = "kes-settings-modal-content";

        const header = document.createElement("div");
        header.className = "kes-settings-modal-header";
        header.innerHTML = `
            <span class="kes-close"><i class="` + layoutArr.header.close + `"></i></span>
            <span class="kes-dock"><i class="` + layoutArr.header.dock_down + `"></i></span>
            <span class="kes-transparent-mode"><i class ="` + layoutArr.header.transparent + `"></i></span>
            <span class="kes-changelog"><a href="` + changelogURL + `"><i class="` + layoutArr.header.changelog + `"></i></a></span>
            <span class="kes-version">` + versionElement.outerHTML + `</span>
            `

        const crumbs = document.createElement("div");
        crumbs.className = 'kes-crumbs';
        crumbs.innerText = 'Settings'
        header.appendChild(crumbs)
        const headerHr = document.createElement('hr');
        headerHr.className = 'kes-header-hr'
        header.appendChild(headerHr);

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
                    let label = document.createElement('p');
                    label.className = "kes-field-label";
                    label.innerText = json[it].fields[i].label;
                    hBox.appendChild(label);
                    if (!modSettings[key]) {
                        modSettings[key] = initial;
                        saveModSettings(modSettings, ns);
                    }
                    switch (fieldType) {
                    case "range": {
                        const range = document.createElement('input');
                        range.setAttribute("type", fieldType);
                        if (!modSettings[key]) {
                            range.setAttribute("value", initial);
                        } else {
                            range.setAttribute("value", modSettings[key])
                        }
                        range.setAttribute("kes-iter", it);
                        range.setAttribute("kes-key", key);
                        range.setAttribute('min', json[it].fields[i].min);
                        range.setAttribute('max', json[it].fields[i].max);
                        if (json[it].fields[i].show_value) {
                            const rangeDiv = document.createElement('div');
                            range.setAttribute('oninput', key + '.innerText = this.value');
                            range.style.verticalAlign = 'middle';
                            rangeDiv.appendChild(range);
                            const rangeValue = document.createElement('label');
                            rangeValue.setAttribute('style', 'display: inline-block; vertical-align: middle; margin-left: 1em;');
                            rangeValue.id = key;
                            rangeValue.for = key;
                            if (!modSettings[key]) {
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
                                        found.setAttribute("value",initial)
                                        found.value = initial
                                    }
                                }
                                updateState(found);
                            }
                        });
                        hBox.appendChild(resetField)
                        hBox.appendChild(br)
                        break;
                    }
                    case "number": {
                        const numberField = document.createElement('input');
                        numberField.setAttribute("type", fieldType);
                        if (!modSettings[key]) {
                            numberField.setAttribute("value", initial);
                        } else {
                            numberField.setAttribute("value", modSettings[key])
                        }
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
                        if (!modSettings[key]) {
                            cfield.checked = initial
                        } else {
                            cfield.checked = modSettings[key]
                        }
                        cfield.setAttribute("kes-iter", it);
                        cfield.setAttribute("kes-key", key);
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
                        if (!modSettings[key]) {
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
            const options = document.getElementsByClassName("kess-list")[0];
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
                        '<i class="' + layoutArr.header.separator + '"></i> ' +
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
        kesUl.className = "kess-list";

        const helpBox = document.createElement("div");
        helpBox.className = "kes-settings-modal-helpbox";

        const footer = document.createElement("div");
        footer.className = "kes-settings-modal-footer";

        const magLink = document.createElement("a");
        magLink.className = "kes-settings-modal-magazine";
        magLink.innerText = "/m/enhancement";
        magLink.setAttribute('href', magURL);
        footer.appendChild(magLink)


        //reset all localStorage related to KES
        const resetButton = document.createElement('button')
        resetButton.innerText = "RESET"
        resetButton.className = "kes-reset-button"
        footer.appendChild(resetButton)
        resetButton.addEventListener('click', () => {
            resetAll();
        });

        const bugLink = document.createElement("a");
        bugLink.className = "kes-settings-modal-bug-link";
        bugLink.innerText = "Report a bug";
        bugLink.setAttribute('href', bugURL);
        footer.appendChild(bugLink)

        const bugIcon = document.createElement("span");
        bugIcon.className = "kes-settings-modal-bug-icon";
        bugIcon.innerHTML = '<i class="' + layoutArr.header.bug + '"></i>';
        bugLink.appendChild(bugIcon)

        const debugClip = document.createElement("i");
        const clipClass = "kes-debug-clipboard"
        debugClip.className = clipClass + " " + layoutArr.header.clipboard;
        footer.appendChild(debugClip)
        debugClip.addEventListener('click', ()=> {
            const userPlatform = navigator.platform;
            const userAgent = navigator.userAgent;
            const handler = safeGM("info").scriptHandler;
            const incog = safeGM("info").isIncognito;
            const kesUserSettings = localStorage["kes-settings"];
            const toPaste = `OS: ${userPlatform}\nAgent: ${userAgent}\nKES version: ${version}\nHandler: ${handler}\nIncog: ${incog}\nSettings: ${kesUserSettings}`
            navigator.clipboard.writeText(toPaste);
            debugClip.className = clipClass + " " + layoutArr.header.check;
            function revertIcon () {
                debugClip.className = "kes-debug-clipboard " + layoutArr.header.clipboard
            }
            window.setTimeout(revertIcon,600);
        });

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
            openTab(e.target.outerText);
        });
        document.querySelector('.kess-list').addEventListener("click", (e) => {
            openHelpBox(e.target.getAttribute('kes-iter'));
        });
        document.querySelector('.kes-settings-modal-helpbox').addEventListener("input", (e) => {
            updateState(e.target);
        });



        const dockIcon = document.querySelector('.kes-dock i');
        if (settings.dock == 'down') {
            container.classList.add('kes-docked');
            dockIcon.className = layoutArr.header.dock_up;
        } else {
            dockIcon.className = layoutArr.header.dock_down;
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
            if (cn == layoutArr.header.dock_down) {
                container.classList.add('kes-docked');
                e.target.className = layoutArr.header.dock_up;
                settings.dock = 'down';
            } else {
                container.classList.remove('kes-docked');
                e.target.className = layoutArr.header.dock_down;
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
        //otherwise, triggers a loop of mutations because reverting timeago mutates the watched node
        if ((func === "updateTime") && (state === false)) {
            window.location.reload();
        } else {
            applySettings(func);
        }
    }

    function applySettings (entry) {
        const settings = getSettings();
        try {
            if (settings[entry] == true) {
                funcObj[entry](true);
            } else {
                funcObj[entry](false);
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
            applySettings(json[i].entrypoint);
        }
    }

    function initmut (list) {
        for (const mutation of list) {
            //workaround for timeago ticks changing timestamp textContent
            //reapply verbose timestamp
            //see also updateState()
            if (mutation.target.className === 'timeago') {
                if (mutation.target.textContent.indexOf("ago") >= 0) {
                    applySettings("updateTime");
                }
                //triggering on the first mutation is sufficient
                return
            } else {
                //normal mutation (lazy load etc.), apply all recurring mods
                for (let i = 0; i < json.length; ++i) {
                    if (json[i].recurs) {
                        applySettings(json[i].entrypoint);
                        obs.takeRecords();
                    }
                }
                return
            }
        }
    }

    const watchedNode = document.querySelector('[data-controller="subject-list"]');
    const watchedNode2 = document.querySelector('#comments');
    const obs = new MutationObserver(initmut);
    init();
    obs.observe(watchedNode, {
        subtree: true,
        childList: true,
        attributes: false
    });
    obs.observe(watchedNode2, {
        subtree: false,
        childList: true,
        attributes: false
    });
}

const versionElement = document.createElement('a');
versionElement.innerText = tool + ' ' + version;
versionElement.setAttribute('href', repositoryURL);
genericXMLRequest(versionFile,checkUpdates);
