
// ==UserScript==
// @name          kbin-megamod
// @namespace     https://github.com/aclist/
// @license       MIT
// @version       0.2.0
// @description   megamod pack for kbin
// @author        aclist
// @match         https://kbin.social/*
// @grant         GM_addStyle
// @grant         GM_getResourceText
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

(function () {

    const version = '0.2.0'
    const tool = 'kbin-megamod'

    /*human readable mod label*/
     const mmLabels = [
            "Add mail icon",
            "Add subs to navbar",
            "Label OP",
            "Profile dropdown",
            "Code syntax highlighting",
            "Language filter"
        ];

    /*human readable mod desc*/
    const mmDescs = [
            "Add mail link to usernames if on kbin.social",
            "Add magazine subscriptions to navbar",
            "Add 'OP' label to thread author",
            "Convert profile page links to dropdown [BETA]",
            "Adds syntax highlighting for code blocks [BETA]",
            "Filter posts by language"
            ];

    /*function identifier, can be same as function name*/
    const mmFuncs = [
        "addMail",
        "initMags",
        "labelOp",
        "dropdownEntry",
        "codeHighlighting",
        "languageFilterEntry"
        ];

      /*object used for interpolation of function names*/
    /*key MUST be same as mmFuncs array*/
    /*value MUST be literal entry point in the target script, will be passed boolean*/
    /*literal func name need not be identical to key*/
      const funcObj = {
       addMail: addMail,
        initMags: initMags,
        labelOp: labelOp,
        dropdownEntry: dropdownEntry,
        codeHighlighting: initCodeHighlights,
        languageFilterEntry: languageFilterEntry
       };

    'use strict';

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
        }

        .megamod-settings-modal-content {
            border: var(--kbin-options-border);
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
        }

        .megamod-settings-modal-content ul li input[type="checkbox"] {
            margin-right: 0.5rem;
        }

        .megamod-settings-modal-content h2 {
            margin-top: 0;
            font-size: 1rem;
        }
        .megamod-tab-link {
             border-radius: 0px;
             color: var(--kbin-header-text-color);
            background-color: var(--kbin-primary-color);
            border: none;
            padding: 8px 16px;
        }
        .megamod-tab-link:hover{
            opacity: 0.65;
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
        header.innerHTML = `
          <div class="megamod-settings-modal-header">
           </span><span class="close">
             <i class="fa-solid fa-times"></i>
             </span>
             <span class="megamod-version">` + tool + ' ' + version +
             `</span><button class="megamod-tab-link" onclick="openTab(event, 'homePage')">Home page</button>
             <button class="megamod-tab-link" onclick="openTab(event, 'inbox')">Inbox</button>
             <button class="megamod-tab-link" onclick="openTab(event, 'subs')">Subscriptions</button>
             <button class="megamod-tab-link" onclick="openTab(event, 'lookAndFeel')">Look and feel</button>
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
    function insertListItem(func, item, desc){
        const megamodListItem = document.createElement("li");
        megamodListItem.innerHTML+=`<label><input type="checkbox" id="megamod-option" megamod-iter="` + func + `"/input>` + item + `<span class="description">` + desc + `</span></label>`
        megamodUl.appendChild(megamodListItem);
    }

        for (let i = 0; i < mmLabels.length; ++i) {
                insertListItem(mmFuncs[i], mmLabels[i], mmDescs[i]);
             const check = document.querySelector(`[megamod-iter="` + mmFuncs[i] + `"]`);
            if (settings[mmFuncs[i]] == true) {
              check.checked = true;
            } else {
    check.checked = false;
            }
         }

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
        var func = eventTarget.getAttribute('megamod-iter');
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

    function applySettings(method) {
        const settings = getSettings();
        try {
            if (settings[method] == true) {
                funcObj[method](true);
            } else {
                funcObj[method](false);
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

    for (let i = 0; i < mmFuncs.length; ++i) {
        applySettings(mmFuncs[i]);
    }
})()
