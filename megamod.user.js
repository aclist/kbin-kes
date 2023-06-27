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
// @require       https://github.com/artillect/kbin-megamod/raw/collapsible-comments/mods/improved-collapsible-comments.user.js
// @resource      css   https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/windows-10.css
// @require       https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @resource      megamod_css https://github.com/aclist/kbin-megamod/raw/main/megamod.css
// ==/UserScript==

    const version = GM_info.script.version;
    const tool = GM_info.script.name;
    const manifest = "https://raw.githubusercontent.com/aclist/kbin-megamod/main/manifest.json";
    const repositoryURL = "https://github.com/aclist/kbin-megamod/";

      /*object used for interpolation of function names*/
      const funcObj = {
       addMail: addMail,
        initMags: initMags,
        labelOp: labelOp,
        dropdownEntry: dropdownEntry,
        codeHighlighting: initCodeHighlights,
        languageFilterEntry: languageFilterEntry,
        initCollapsibleComments: initCollapsibleComments,
        initCollapsibleCommentsListeners: initCollapsibleCommentsListeners
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
var css = GM_getResourceText("megamod_css");
GM_addStyle(css);
	
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
	/*TODO: check for new remote version at startup and insert link*/
        header.innerHTML = `
          <div class="megamod-settings-modal-header">
           <span class="close">
             <i class="fa-solid fa-times"></i>
             </span>
             <span class="megamod-version">` + '<a href="' + repositoryURL + '">' + tool + ' ' + version + '</a>' +
             `</span><button class="megamod-tab-link" onclick="openTab(event, 'homePage')">Home page</button>
             <button class="megamod-tab-link" onclick="openTab(event, 'inbox')">Inbox</button>
             <button class="megamod-tab-link" onclick="openTab(event, 'subs')">Subscriptions</button>
             <button class="megamod-tab-link" onclick="openTab(event, 'lookAndFeel')">Look and feel</button>
             <span class="megamod-dock"><i class="fa-solid fa-arrow-down"></i></span>
             </div>
          </div>
             <hr style="border: 1px solid gray">
             <h2>Megamod Settings</h2>
          </div>
        `
        const bodyHolder = document.createElement("div");
             bodyHolder.className = "megamod-settings-modal-body";

        const megamodUl = document.createElement("ul")
              megamodUl.className = "megamods-list";

        /*inject modal*/
        modal.appendChild(modalContent);
        modalContent.appendChild(header)
        modalContent.appendChild(bodyHolder);
        bodyHolder.appendChild(megamodUl);
       document.body.appendChild(modal);

    /*populate modal identifiers*/
    function insertListItem(func, item, desc,author,type){
            switch(type) {
                case 'checkbox': console.log('toggle type selected');
                break;
                case 'selector': console.log('dropdown type selected');
                break;
            }
       const megamodListItem = document.createElement("li");
       megamodListItem.innerHTML+=`<label><input type="checkbox" id="megamod-option" megamod-entry="` + func + `"/input>` + item + `<span class="description">` + desc + ` (` + author + `)</span></label>`
        megamodUl.appendChild(megamodListItem);
    }

    for (let i = 0; i < json.length; ++i) {
                insertListItem(json[i].entrypoint, json[i].label, json[i].desc, json[i].author, json[i].type);
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
