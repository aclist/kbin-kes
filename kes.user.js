// ==UserScript==
// @name          KES
// @namespace     https://github.com/aclist/
// @license       MIT
// @version       1.2.0
// @description   Kbin Enhancement Suite
// @author        aclist
// @match         https://kbin.social/*
// @match         https://lab2.kbin.pub/*
// @match         https://lab3.kbin.pub/*
// @match         https://fedia.io/*
// @match         https://karab.in/*
// @grant         GM_addStyle
// @grant         GM_getResourceText
// @grant         GM_xmlhttpRequest
// @grant         GM_info
// @grant         GM.getValue
// @grant         GM.setValue
// @grant         GM_getResourceText
// @grant         GM_setClipboard
// @connect       raw.githubusercontent.com
// @connect       github.com
// @icon          https://kbin.social/favicon.svg
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/kbin-mod-options.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/mail.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/subs.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/hide-sidebar.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/label.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/dropdown.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/code-highlighting.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/easy-emoticon.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/instance-names.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/hide-votes.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/nav-icons.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/timestamp.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/improved-collapsible-comments.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/hide-logo.user.js
// @require       https://github.com/aclist/kbin-kes/raw/testing/mods/hide-thumbs.user.js
// @resource      kes_css https://github.com/aclist/kbin-kes/raw/testing/kes.css
// @resource      kes_layout https://github.com/aclist/kbin-kes/raw/testing/ui.json
// @downloadURL    https://github.com/aclist/kbin-scripts/raw/testing/kes.user.js
// @updateURL      https://github.com/aclist/kbin-scripts/raw/testing/kes.user.js
// ==/UserScript==
const version = GM_info.script.version;
const tool = GM_info.script.name;
const repositoryURL = "https://github.com/aclist/kbin-kes/";
const branch = repositoryURL + "raw/testing/"
const manifest = branch + "manifest.json"
const ui = branch + "ui.json"
const versionFile = branch + "VERSION";
const updateURL = branch + "kes.user.js";
const bugURL = repositoryURL + "issues"
const magURL = "https://kbin.social/m/enhancement"

//object used for interpolation of function names
const funcObj = {
    addMail: addMail,
    initMags: initMags,
    labelOp: labelOp,
    dropdownEntry: dropdownEntry,
    initCodeHighlights: initCodeHighlights,
    initCollapsibleComments: initCollapsibleComments,
    easyEmoticon: easyEmoticon,
    hideUpvotes: hideUpvotes,
    hideDownvotes: hideDownvotes,
    hideReputation: hideReputation,
    userInstanceEntry: userInstanceEntry,
    magInstanceEntry: magInstanceEntry,
    updateTime: updateTime,
    toggleLogo: toggleLogo,
    hideThumbs: hideThumbs,
    navbarIcons: navbarIcons,
    hideSidebar: hideSidebar
};

function fetchManifest() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: manifest,
        onload: makeArr,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
    });
};


const versionElement = document.createElement('a');
versionElement.innerText = tool + ' ' + version;
versionElement.setAttribute('href', repositoryURL);

let newVersion = null;

function checkVersion() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: versionFile,
        onload: checkUpdates,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },

    });
};

async function checkUpdates(response) {
    newVersion = response.responseText.trim();

    if (newVersion && newVersion != version) {
        // Change version link into a button for updating

        versionElement.innerText = 'Install update: ' + newVersion;
        versionElement.setAttribute('href', updateURL);
        versionElement.className = 'new';
    }
}

function makeArr(response) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(response.responseText, "text/html");
    var content = response.responseText
    const jarr = JSON.parse(content)
    //TODO: wait on promise and set warning string if unreachable
    GM.setValue("json", jarr);
};

fetchManifest();
checkVersion();
var json = await GM.getValue("json");
var css = GM_getResourceText("kes_css");
GM_addStyle(css);

var kes_layout = GM_getResourceText("kes_layout");
const layoutArr = JSON.parse(kes_layout);
const sidebarPages = layoutArr.pages;
const headerTitle = layoutArr.header.title

//instantiate kes modal
const kbinContainer = document.querySelector(".kbin-container > menu");
const kesPanel = document.createElement("aside");
const kesPanelUl = document.createElement("ul");
const title = document.createElement("h3");
kesPanel.id = "kes-settings";
kesPanel.appendChild(title);
kbinContainer.appendChild(kesPanel);

//add settings button
const settingsButton = document.createElement("div");
settingsButton.id = "kes-settings-button";
settingsButton.innerHTML = '<i class="' + layoutArr.header.open + '"></i>';
settingsButton.addEventListener("click", () => {
    showSettingsModal();
});
title.appendChild(settingsButton);
kesPanel.appendChild(kesPanelUl);

var keyPressed = {};
document.addEventListener('keydown', function(e) {

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

document.addEventListener('keyup', function(e) {
    keyPressed[e.key + e.location] = false;

    keyPressed = {};
}, false);

function showSettingsModal() {
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


    //TODO: pages.json
    for (let i = 0; i < sidebarPages.length; ++i) {
        let page = sidebarPages[i];
        let pageUpper = sidebarPages[i].charAt(0).toUpperCase() + sidebarPages[i].slice(1);
        let sidebarListItem = document.createElement('li');
        sidebarListItem.innerHTML = `
            <a class="kes-tab-link">` + pageUpper + `</a></li>`
        sidebarUl.appendChild(sidebarListItem);
    }
    sidebar.appendChild(sidebarUl);

    function openHelpBox(it) {
        const settings = getSettings();
        settings.lastPage = it
        saveSettings(settings);
        let author = json[it].author;
        let desc = json[it].desc;
        let link = json[it].link;
        let linkLabel = json[it].link_label;
        let kbinPrefix = 'https://kbin.social/u/';
        let url = kbinPrefix + author;
        let login = json[it].login;
        let loginHR
        if (login) {
            loginHR = "yes";
        } else {
            loginHR = "no";
        }
        let ns = json[it].namespace;

        //populate static fields
        let hBox = document.querySelector('.kes-settings-modal-helpbox');
        let toggle = '<span class="kes-toggle"><input type="checkbox" class="tgl kes-tgl" id="kes-checkbox" kes-iter="' +
            it + '" kes-key="state"/><label class="tgl-btn" for="kes-checkbox"></label></span>'
        hBox.style.cssText = 'display: inline; opacity: 1;'
        if (link) {
            hBox.innerHTML = toggle +
                '<p>Author: <a href="' + url + '">' + author + '</a><br>' +
                'Link: <a href="' + link + '">' + linkLabel + '</a><br>' +
                'Login required: ' + loginHR + '<br><br>' +
                desc + '</p>'
        } else {
            hBox.innerHTML = toggle +
                '<p>Author: <a href="' + url + '">' + author + '</a><br>' +
                'Login required: ' + loginHR + '<br><br>' +
                desc + '</p>';
        }
        const br = document.createElement('br');
        //populate dynamic fields
        if (json[it].fields) {
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
                };
                switch (fieldType) {
                    case "select":
                        const field = document.createElement('select');
                        field.setAttribute('name', ns);
                        field.setAttribute("kes-iter", it);
                        field.setAttribute("kes-key", key);
                        for (let j = 0; j < json[it].fields[i].values.length; ++j) {
                            let opt = document.createElement('option');
                            opt.setAttribute('value', json[it].fields[i].values[j]);
                            opt.innerText = json[it].fields[i].values[j];
                            if (modSettings[key] == json[it].fields[i].values[j]) {
                                opt.selected = 'selected';
                            } else if (json[it].fields[i].values[j] == json[it].fields[i].initial) {
                                opt.selected = 'selected'
                            }
                            field.appendChild(opt);
                        }
                        hBox.appendChild(field);
                        hBox.appendChild(br);
                        break;
                    case "radio":
                        const radioDiv = document.createElement('div');
                        for (let j = 0; j < json[it].fields[i].values.length; ++j) {
                            const field = document.createElement('input');
                            field.setAttribute("type", fieldType);
                            field.setAttribute('name', ns);
                            field.setAttribute('id', "kes-radio-" + j);
                            field.setAttribute("kes-iter", it);
                            field.setAttribute("kes-key", key);
                            field.setAttribute("value", json[it].fields[i].values[j]);
                            if (modSettings[key] == json[it].fields[i].values[j]) {
                                field.checked = true;
                            } else if (json[it].fields[i].values[j] == json[it].fields[i].initial) {
                                field.checked = true;
                            }
                            let radioLabel = document.createElement('label');
                            radioLabel.setAttribute('for', "kes-radio-" + j);
                            radioLabel.className = ("kes-radio-label");
                            radioLabel.innerText = json[it].fields[i].values[j];
                            radioDiv.appendChild(field);
                            radioDiv.appendChild(radioLabel);
                            let br = document.createElement('br');
                            radioDiv.appendChild(br);
                        }
                        hBox.appendChild(radioDiv);
                        hBox.appendChild(br);
                        break;
                    case "checkbox":
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
        // add to crumbs
        // let activeChild = document.querySelector('.crumbChild')
        // if (activeChild) {
        //  activeChild.remove();
        // }
        // let crumbsRoot = document.querySelector('.kes-crumbs h2');
        // let span = document.createElement('span');
        // span.className = "crumbChild"
        // let pad = document.createElement('text');
        // pad.innerText = ' ';
        // let chev = document.createElement('i')
        // chev.className = 'fa-solid fa-chevron-right fa-xs';
        // let activeMod = document.createElement('text');
        // activeMod.innerText = ' ' + event.target.innerText;
        // span.appendChild(pad)
        // span.appendChild(chev)
        // span.appendChild(activeMod)
        // crumbsRoot.appendChild(span)

    };

    // Add script tag with opentab function
    function openTab(tabName) {
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
        event.stopPropagation();
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
            }
        }
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

    const bugLink = document.createElement("a");
    bugLink.className = "kes-settings-modal-bug-link";
    bugLink.innerText = "Report a bug";
    bugLink.setAttribute('href', bugURL);
    footer.appendChild(bugLink)

    const bugIcon = document.createElement("span");
    bugIcon.className = "kes-settings-modal-bug-icon";
    bugIcon.innerHTML = '<i class="' + layoutArr.header.bug + '"></i>';
    bugLink.appendChild(bugIcon)

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


    function insertListItem(it) {
        let type = json[it].type
        let func = json[it].entrypoint
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

function updateState(target) {
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
    //necessarily reload the page when verbose timestamps are toggled off
    //otherwise, triggers a loop of mutations because reverting timeago mutates the watched node
    if ((func === "updateTime") && (state === false)) {
        window.location.reload();
    } else {
        applySettings(func);
    }
}

function applySettings(entry) {
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

function getModSettings(namespace) {
    let settings = localStorage.getItem(namespace)
    if (!settings) {
        settings = {};
    } else {
        settings = JSON.parse(settings);
    }
    return settings;
}

function getSettings(func) {
    let settings = localStorage.getItem("kes-settings");
    if (!settings) {
        settings = {};
    } else {
        settings = JSON.parse(settings);
    }
    return settings;
}

function saveModSettings(settings, namespace) {
    localStorage.setItem(namespace, JSON.stringify(settings));
}

function saveSettings(settings) {
    localStorage.setItem("kes-settings", JSON.stringify(settings));
}

function init() {
    for (let i = 0; i < json.length; ++i) {
        applySettings(json[i].entrypoint);
    }
}

function initmut(list) {
    for (const mutation of list) {
        //workaround for timeago ticks changing timestamp textContent
        //reapply verbose timestamp
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
obs.observe(watchedNode, { subtree: true, childList: true, attributes: false});
obs.observe(watchedNode2, { subtree: false, childList: true, attributes: false});
