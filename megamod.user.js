
// ==UserScript==
// @name          kbin-megamod
// @namespace     https://github.com/aclist/
// @license       MIT
// @version       0.8.2
// @description   megamod pack for kbin
// @author        aclist
// @match         https://kbin.social/*
// @match         https://lab2.kbin.pub/*
// @match         https://lab3.kbin.pub/*
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
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require       https://github.com/Oricul/kbin-scripts/raw/main/kbin-mod-options.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/mail.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/subs.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/label.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/dropdown.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/code-highlighting.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/language-filter.user.js
// @resource      megamod_css https://github.com/aclist/kbin-megamod/raw/main/megamod.css
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/easy-emoticon.user.js
// ==/UserScript==

const version = GM_info.script.version;
const tool = GM_info.script.name;
const repositoryURL = "https://github.com/aclist/kbin-megamod/";
const manifest = repositoryURL + "raw/main/manifest.json"
const versionFile = repositoryURL + "raw/main/VERSION";
const updateURL = repositoryURL + "raw/main/megamod.user.js";
const bugURL = repositoryURL + "issues"
const magURL = "https://kbin.social/m/enhancement"

//object used for interpolation of function names
const funcObj = {
    addMail: addMail,
    initMags: initMags,
    labelOp: labelOp,
    dropdownEntry: dropdownEntry,
    initCodeHighlights: initCodeHighlights,
    languageFilterEntry: languageFilterEntry,
    easyEmoticon: easyEmoticon
};
const sidebarPages = [
    "general",
    "threads",
    "comments",
    "profiles"
]

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
    let parser = new DOMParser();
    let newVersion = response.responseText;

    if (newVersion != version) {
        console.log('New version available: ' + newVersion)
        // Change link to a button for updating
        versionElement.innerText = 'Install update: ' + newVersion;
        versionElement.setAttribute('href', updateURL);
        versionElement.className = 'new';
    } else {
        return
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
var json = await GM.getValue("json");
var css = GM_getResourceText("megamod_css");
GM_addStyle(css);

//instantiate megamod modal
const kbinContainer = document.querySelector(".kbin-container > menu");
const magazinePanel = document.createElement("aside");
const magazinePanelUl = document.createElement("ul");
const title = document.createElement("h3");
magazinePanel.id = "megamod-settings";
magazinePanel.appendChild(title);
kbinContainer.appendChild(magazinePanel);

//add settings button
const settingsButton = document.createElement("div");
settingsButton.id = "megamod-settings-button";
settingsButton.innerHTML = '<i class="fa-solid fa-wrench"></i>';
settingsButton.addEventListener("click", () => {
    showSettingsModal();
});
title.appendChild(settingsButton);
magazinePanel.appendChild(magazinePanelUl);



function showSettingsModal() {
    const settings = getSettings();

    const modal = document.createElement("div");
    modal.className = "megamod-settings-modal";

    const modalContent = document.createElement("div");
    modalContent.className = "megamod-settings-modal-content";

    const header = document.createElement("div");
    header.className = "megamod-settings-modal-header";
    header.innerHTML = `
            <span class="megamod-close"><i class="fa-solid fa-times"></i></span>
            <span class="megamod-dock"><i class="fa-solid fa-arrow-down"></i></span>
            <span class="megamod-version">` + versionElement.outerHTML + `</span>
            `

    const crumbs = document.createElement("div");
    crumbs.className = 'megamod-crumbs';
    crumbs.innerText = 'Megamod Settings'
    header.appendChild(crumbs)
    const headerHr = document.createElement('hr');
    headerHr.className = 'megamod-header-hr'
    header.appendChild(headerHr);

    const sidebar = document.createElement("div");
    sidebar.className = "megamod-settings-modal-sidebar";
    let sidebarUl = document.createElement('ul');


    //TODO: pages.json
    for (let i = 0; i < sidebarPages.length; ++i) {
        let page = sidebarPages[i];
        let pageUpper = sidebarPages[i].charAt(0).toUpperCase() + sidebarPages[i].slice(1);
        let sidebarListItem = document.createElement('li');
        sidebarListItem.innerHTML = `
            <a class="megamod-tab-link" target="_blank">` + pageUpper + `</a></li>`
        sidebarUl.appendChild(sidebarListItem);
    }
    sidebar.appendChild(sidebarUl);

    function openHelpBox(it) {
        const settings = getSettings();
        let author = json[it].author
        let desc = json[it].desc
        let link = json[it].link
        let linkLabel = json[it].linkLabel
        let kbinPrefix = 'https://kbin.social/u/';
        let url = kbinPrefix + author;
        let hBox = document.querySelector('.megamod-settings-modal-helpbox');
        let toggle = '<span class="megamod-toggle"><input type="checkbox" class="tgl megamod-tgl" id="megamod-checkbox" megamod-iter="' +
            it + '"/><label class="tgl-btn" for="megamod-checkbox"></label></span>'

        hBox.style.cssText = 'display: inline; opacity: 1;'
        if (link === "") {
            hBox.innerHTML = toggle + '<p>Author: <a href="' + url + '" target="_blank">' + author + '</a><br>' + desc + '</p>';
        } else {
            hBox.innerHTML = toggle + '<p>Author: <a href="' + url + '" target="_blank">' + author + '</a><br>Link: <a href="' + link + '">' +
                linkLabel + '</a><br>' + desc + '</p>'
        }
        // reset opacity of other helpbox toggles
        let helpboxToggles = document.querySelectorAll('.megamod-option');
        for (let i = 0; i < helpboxToggles.length; ++i) {
            if (i != it) {
                helpboxToggles[i].style.cssText = 'opacity: 0.5;'
            } else {
                helpboxToggles[i].style.cssText = 'opacity: 1;'
            }
        }
        let func = json[it].entrypoint;
        const check = document.querySelector(`.megamod-settings-modal-helpbox [megamod-iter="` + it + `"]`);
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
        // let crumbsRoot = document.querySelector('.megamod-crumbs h2');
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
        let pageLower = tabName.charAt(0).toLowerCase() + tabName.slice(1);
        const tablinks = document.getElementsByClassName("megamod-tab-link");
        for (let i = 0; i < tablinks.length; i++) {
            if (tablinks[i].innerText !== tabName) {
                tablinks[i].style.opacity = 0.5;
            } else {
                tablinks[i].style.opacity = 1;
            }
        }
        event.stopPropagation();
        // Hide all options not in this tab (without this classname)
        const options = document.getElementsByClassName("megamods-list")[0];
        const optionsChildren = options.children;
        const pageToOpen = []
        for (let i = 0; i < optionsChildren.length; i++) {
            if (optionsChildren[i].className.indexOf(pageLower) > -1) {
                optionsChildren[i].style.display = "block";
                pageToOpen.push(i);
            } else {
                optionsChildren[i].style.display = "none";
                let crumbsRoot = document.querySelector('.megamod-crumbs');
                crumbsRoot.innerHTML = '<h2>Megamod Settings <i class="fa-solid fa-chevron-right fa-xs"></i> ' +
                    tabName + '</h2>';
            }
        }
        if (pageToOpen.length > 0) {
            openHelpBox(pageToOpen[0])
        } else {
            let hBox = document.querySelector('.megamod-settings-modal-helpbox');
            hBox.style.opacity = 0;
        }
    }

    const bodyHolder = document.createElement("div");
    bodyHolder.className = "megamod-settings-modal-body";

    const megamodUl = document.createElement("ul")
    megamodUl.className = "megamods-list";

    const helpBox = document.createElement("div");
    helpBox.className = "megamod-settings-modal-helpbox";

    const footer = document.createElement("div");
    footer.className = "megamod-settings-modal-footer";

    const magLink = document.createElement("a");
    magLink.className = "megamod-settings-modal-magazine";
    magLink.innerText = "/m/enhancement";
    magLink.setAttribute('href', magURL);
    footer.appendChild(magLink)

    const bugIcon = document.createElement("span");
    bugIcon.className = "megamod-settings-modal-bug-icon";
    bugIcon.innerHTML = '<i class="fa-solid fa-bug fa-xs"></i>';
    footer.appendChild(bugIcon)

    const bugLink = document.createElement("a");
    bugLink.className = "megamod-settings-modal-bug-link";
    bugLink.innerText = "Report a bug";
    bugLink.setAttribute('href', bugURL);
    footer.appendChild(bugLink)

    //inject modal
    modal.appendChild(modalContent);
    modal.appendChild(footer);
    modalContent.appendChild(header);
    modalContent.appendChild(sidebar);
    modalContent.appendChild(helpBox);
    modalContent.appendChild(bodyHolder);
    bodyHolder.appendChild(megamodUl);
    document.body.appendChild(modal);
    document.querySelector('.megamod-settings-modal-sidebar ul').addEventListener("click", (e) => {
        openTab(e.target.outerText);
    });
    document.querySelector('.megamods-list').addEventListener("click", (e) => {
        openHelpBox(e.target.getAttribute('megamod-iter'));
    });
    document.querySelector('.megamod-settings-modal-helpbox').addEventListener("change", (e) => {
        updateState(e.target);
    });


    const dockIcon = document.querySelector('.megamod-dock i');
    if (settings.dock == 'down') {
        modalContent.style.cssText = 'position:absolute;bottom:0;width:100%';
        footer.style.cssText = 'position:absolute;bottom:0;width:100%';
        dockIcon.className = 'fa-solid fa-arrow-up';
    } else {
        modalContent.style.cssText = 'position:unset;bottom:unset;width:100%';
        footer.style.cssText = 'position:unset;bottom:unset;width:100%';
        dockIcon.className = 'fa-solid fa-arrow-down';
    }
    checkVersion();


    //TODO: extend boilerplate
    function insertListItem(it) {
        let type = json[it].type
        let func = json[it].entrypoint
        let item = json[it].label
        let page = json[it].page
        switch (type) {
            case 'checkbox':
                console.log('toggle type selected');
                break;
            case 'selector':
                console.log('dropdown type selected');
                break;
        }
        const megamodListItem = document.createElement("li");
        megamodListItem.className = page;
        megamodListItem.innerHTML += `<a class="megamod-option" megamod-iter="` + it + `" target="_blank">` + item + `</a>`
        megamodUl.appendChild(megamodListItem);

    }

    for (let i = 0; i < json.length; ++i) {
        insertListItem(i);
    }

    //dock button
    modal.querySelector('.megamod-dock i').addEventListener("click", (e) => {
        const settings = getSettings();
        let cn = e.target.className;
        if (cn == "fa-solid fa-arrow-down") {
            modalContent.style.cssText = 'position:absolute;bottom:0;width:100%';
            footer.style.cssText = 'position:absolute;bottom:0;width:100%';
            e.target.className = 'fa-solid fa-arrow-up';
            settings.dock = 'down';
        } else {
            modalContent.style.cssText = 'position:unset;bottom:unset;width:100%';
            footer.style.cssText = 'position:unset;bottom:unset;width:100%';
            e.target.className = 'fa-solid fa-arrow-down';
            settings.dock = 'up';

        }
        saveSettings(settings);
    });


    //close button
    modal.querySelector(".megamod-settings-modal .megamod-close").addEventListener("click", () => {
        modal.remove();
    });
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    let startPage = sidebarPages[0].charAt(0).toUpperCase() + sidebarPages[0].slice(1);
    openTab(startPage);
}

function updateState(target) {
    const settings = getSettings();
    let state;
    const it = target.getAttribute('megamod-iter');
    if (target.checked) {
        state = true;
    } else {
        state = false;
    }
    let func = json[it].entrypoint;
    settings[func] = state;
    //save and apply checkbox state
    saveSettings(settings);
    applySettings(func);
}

function applySettings(entry) {
    console.log(entry)
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

function getSettings(func) {
    let settings = localStorage.getItem("megamod-settings");
    if (!settings) {
        settings = {};
    } else {
        settings = JSON.parse(settings);
    }
    return settings;
}

function saveSettings(settings) {
    localStorage.setItem("megamod-settings", JSON.stringify(settings));
}

for (let i = 0; i < json.length; ++i) {
    applySettings(json[i].entrypoint);
}
