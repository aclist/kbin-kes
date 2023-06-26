// ==UserScript==
// @name          kbin-megamod
// @namespace     https://github.com/aclist/
// @license       MIT
// @version       0.4.0
// @description   megamod pack for kbin
// @author        aclist
// @match         https://kbin.social/*
// @grant         GM_addStyle
// @grant         GM_getResourceText
// @grant         GM_xmlhttpRequest
// @grant         GM_info
// @grant         GM.getValue
// @grant         GM.setValue
// @connect       raw.githubusercontent.com
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/mail.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/subs.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/label.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/dropdown.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/code-highlighting.user.js
// @require       https://github.com/aclist/kbin-megamod/raw/main/mods/language-filter.user.js
// @resource      css   https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-10.css
// @require       https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// ==/UserScript==

    const version = GM_info.script.version;
    const tool = GM_info.script.name;
    const manifest = "https://raw.githubusercontent.com/artillect/kbin-megamod/modal-ui/manifest.json";

      /*object used for interpolation of function names*/
      const funcObj = {
       addMail: addMail,
        initMags: initMags,
        labelOp: labelOp,
        dropdownEntry: dropdownEntry,
        codeHighlighting: initCodeHighlights,
        languageFilterEntry: languageFilterEntry
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

function makeArr(response) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(response.responseText, "text/html");
    var content = response.responseText
     const jarr = JSON.parse(content)
     /*TODO: wait on promise and set warning string if unreachable*/
     GM.setValue("json", jarr);
};

fetchManifest();
var json = await GM.getValue("json");

        GM_addStyle(`
        #megamod-settings-button {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0.5rem;
            padding: 0.5rem;
            color: var(--kbin-section-text-color);
            font-size: 0.5em;
            cursor: pointer;
        }

        #megamod-settings-button:hover {
            color: var(--kbin-sidebar-header-text-color);
        }


        .megamod-settings-modal {
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
        }

        .megamod-settings-modal-content {
            background-color: var(--kbin-section-bg);
            height:100%
            width: 100%;
            padding: 2rem;
            display: grid;
            grid-template-areas: "header header" "sidebar body";
            grid-template-columns: 1fr 2fr;
        }

        .megamod-settings-modal-content {
            border: var(--kbin-options-border);
        }
        .megamod-settings-modal-header {
            grid-area: header;
        }

        .megamod-dock{
            padding-left: 0.5rem;
        }
        .megamod-dock:hover {
            opacity: 0.5;
        }

        .megamod-version {
            float: right;
            margin-right: 0.5rem;
            padding-top: 0.1rem;
         }
        .megamod-settings-modal-content .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            cursor: pointer;
        }
        .megamod-settings-modal-content .close:hover{
          opacity: 0.5;
          }

        .megamod-settings-modal-content ul {
            list-style: none;
            padding-inline: 0;
        }
        .megamod-settings-modal-content ul li label {
            display: block;
            margin-bottom: 0.5rem;
        }

        .megamod-settings-modal-content ul li .description {
            font-size: 0.8em;
            padding-left: 20px;
            text-align: justify;
            color: #b9b9b9;
        }

        .megamod-settings-modal-content ul li input[type="checkbox"] {
            margin-right: 0.5rem;
        }

        .megamod-settings-modal-content h2 {
            margin-top: 0;
            font-size: 1rem;
        }

        .megamod-settings-modal-body {
            grid-area: body;
        }

        .megamod-settings-modal-body label .description {
            transition: opacity 0.15s ease-in-out;
            opacity: 0;
        }

        .megamod-settings-modal-body label:hover .description {
            opacity: 1;
        }

        .mod-author {
            float: right;
        }
        .megamod-tab-link {
             border-radius: 0px;
             color: var(--kbin-header-text-color);
            border: none;
        }
        .megamod-tab-link:hover{
            opacity: 0.65;
        }
        `);

        /*instantiate megamod modal*/
        const kbinContainer = document.querySelector(".kbin-container > menu");
        const magazinePanel = document.createElement("aside");
        const magazinePanelUl = document.createElement("ul");
        const title = document.createElement("h3");
        magazinePanel.id = "megamod-settings";
        magazinePanel.appendChild(title);
        kbinContainer.appendChild(magazinePanel);

        /*add settings button*/
        const settingsButton = document.createElement("div");
        settingsButton.id = "megamod-settings-button";
        settingsButton.innerHTML = '<i class="fa-solid fa-bug"></i>';
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
	/*TODO: check for new remote version at startup and insert link*/
        header.innerHTML = `
            <span class="close">
            <i class="fa-solid fa-times"></i>
            </span>
            <span class="megamod-version">` + tool + ' ' + version + `</span>
            <span class="megamod-dock"><i class="fa-solid fa-arrow-down"></i></span>
            <hr style="border: 1px solid gray">
            <h2>Megamod Settings</h2>
        `
        const sidebar = document.createElement("div");
        sidebar.className = "megamod-settings-modal-sidebar";

        sidebar.innerHTML = `
        <ul>
        <li><a class="megamod-tab-link" onclick="openTab(event, 'general')">General</a></li>
        <li><a class="megamod-tab-link" onclick="openTab(event, 'threads')">Threads</a></li>
        <li><a class="megamod-tab-link" onclick="openTab(event, 'comments')">Comments</a></li>
        <li><a class="megamod-tab-link" onclick="openTab(event, 'profiles')">Profiles</a></li>
        <ul>`

        // Add script tag with opentab function
        const script = document.createElement("script");
        script.innerHTML = `
        
        function openTab(event, tabName) {
            event.stopPropagation();
            // Hide all options not in this tab (without this classname)
            const options = document.getElementsByClassName("megamods-list")[0];
            const optionsChildren = options.children;
    
            for (let i = 0; i < optionsChildren.length; i++) {
                if (optionsChildren[i].className.indexOf(tabName) > -1) {
                    optionsChildren[i].style.display = "block";
                } else {
                    optionsChildren[i].style.display = "none";
                }
            }
        }
        `;
        document.body.appendChild(script);

        const bodyHolder = document.createElement("div");
             bodyHolder.className = "megamod-settings-modal-body";

        const megamodUl = document.createElement("ul")
              megamodUl.className = "megamods-list";

        megamodUl.innerHTML = `
        <li class="general"><h2>General</h2></li>
        <li class="threads"><h2>Threads</h2></li>
        <li class="comments"><h2>Comments</h2></li>
        <li class="profiles"><h2>Profiles</h2></li>
        `;

        /*inject modal*/
        modal.appendChild(modalContent);
        modalContent.appendChild(header);
        modalContent.appendChild(sidebar);
        modalContent.appendChild(bodyHolder);
        bodyHolder.appendChild(megamodUl);
       document.body.appendChild(modal);

    /*populate modal identifiers*/
    function insertListItem(func, item, desc,author,type,page){
            switch(type) {
                case 'checkbox': console.log('toggle type selected');
                break;
                case 'selector': console.log('dropdown type selected');
                break;
            }
       const megamodListItem = document.createElement("li");
       megamodListItem.className = page;
       megamodListItem.innerHTML+=`<label><input type="checkbox" id="megamod-option" megamod-entry="` + func + `"/input>` + item + `<span class="description">` + desc + ` <span class="mod-author">(<a href="https://kbin.social/u/` + author + '">' + author + `</a>)</span></span></label>`
        megamodUl.appendChild(megamodListItem);
    }

    for (let i = 0; i < json.length; ++i) {
                insertListItem(json[i].entrypoint, json[i].label, json[i].desc, json[i].author, json[i].type, json[i].page);
        let func = json[i].entrypoint;
     const check = document.querySelector(`[megamod-entry="` + func + `"]`);
            if (settings[func] == true) {
              check.checked = true;
            } else {
    check.checked = false;
            }
         }

        /*dock button*/
        modal.querySelector('.megamod-dock i').addEventListener("click", (e) =>{
            console.log('click');
            let cn = e.target.className;
            console.log(cn);
            if (cn == "fa-solid fa-arrow-down") {
                modalContent.style.cssText = 'position:absolute;bottom:0;width:100%';
                e.target.className = 'fa-solid fa-arrow-up';
            } else
            {
                modalContent.style.cssText = 'position:unset;bottom:unset;width:100%';
                e.target.className = 'fa-solid fa-arrow-down';
            }
        });

        /*close button*/
        modal.querySelector(".megamod-settings-modal .close").addEventListener("click", () => {
            modal.remove();
         });
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

         /*interpolate function names*/
        document.querySelector('.megamods-list').onchange = function(e) {
        const settings = getSettings();
        var state
        var eventTarget = e.target;
        var func = eventTarget.getAttribute('megamod-entry');
        if(e.target.checked) {
          state = true;
       } else {
          state = false;
       }
      settings[func] = state;
       /*save and apply checkbox state*/
      saveSettings(settings);
      applySettings(func);
       }
       openTab(event, 'general');
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

    function getSettings(func) {
        let settings = localStorage.getItem("megamod-settings" );
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

