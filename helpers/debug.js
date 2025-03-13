function debugBar (json) {

    const debugCSS = `
    @media (max-width: 1367px) {
        #mes-debugbar-container {
            display: none
        }
    }
    #mes-debugbar-grid {
        height: 100%;
        width: 100%;
        background-color: var(--kbin-options-bg);
        margin-top: 5px;
        display: grid;
        padding: 10px;
        grid-gap: 10px;
        grid-template-columns: max-content max-content max-content \
            max-content max-content max-content max-content \
            max-content max-content max-content;
        }
    #mes-debugbar-version {
        color: var(--kbin-link-color)
        opacity: 0.8;
        cursor: pointer;
    }
    #mes-debugbar-version:hover {
        color: var(--kbin-section-link-hover-color)
    }
    #mes-debugbar-version,
    #mes-debugbar-loadingline {
        padding: 15px;
    }
    #mes-debugbar-anonymize,
    #mes-debugbar-anonymize-span {
        margin-top: 15px;
        padding-left: 2px;
    }
    #mes-debugbar-version:hover {
        opacity: 1.0;
    }
    .mes-debugbar-row-text {
        margin: 5px 0px 5px 10px;
        font-size: 0.85rem;
    }
    .mes-debugbar-row-error,
    .mes-debugbar-row-warn,
    .mes-debugbar-row-default {
        border-bottom: 1px solid var(--kbin-button-secondary-text-color);
        color: var(--kbin-vote-text-hover-color);
    }
    #mes-debugbar-expand-button {
        margin-right: 15px;
    }
    #mes-debugbar-apply-changes-button,
    #mes-debugbar-enable-all-button,
    #mes-debugbar-disable-all-button,
    #mes-debugbar-expand-button,
    #mes-debugbar-block-button,
    #mes-debugbar-open-mes {
        border: 0px;
    }
    #mes-debugbar-expanded {
        height: 100%;
        width: 100%;
        background-color: var(--kbin-header-bg);
        display: grid;
        max-height: 400px;
        overflow-y: scroll
    }
    #mes-debugbar-debugline {
        justify-self: end;
        position: absolute;
        display: grid;
        grid-template-columns: max-content max-content;
        grid-gap: 10px;
    }
    .mes-debugbar-warn-count {
        color: var(--kbin-alert-info-text-color);
    }
    .mes-debugbar-error-count {
        color: var(--kbin-alert-danger-text-color);
    }
    #mes-debugbar-debugline-icons {
        margin: 15px;
    }
    #mes-debugbar-debugline-icons i,
    #mes-debugbar-debugline-icons span {
        margin: 0px 15px 0px 0px;
    }
    `
    const panelCSSSolarizedDark = `
    .mes-debugbar-row-error,
    .mes-debugbar-row-warn,
    .mes-debugbar-row-default {
        border-bottom: 1px solid var(--kbin-button-secondary-text-color);
        color: var(--kbin-vote-text-hover-color);
    }
    .mes-debugbar-row-error {
        background-color: var(--kbin-alert-danger-bg);
    }
    .mes-debugbar-row-warn {
        background-color: var(--kbin-alert-info-link-color);
    }
    .mes-debugbar-row-default {
        background-color: var(--kbin-sidebar-settings-switch-on-bg);
    }
    `;
    const panelCSSKbin = `
    .mes-debugbar-row-error,
    .mes-debugbar-row-warn,
    .mes-debugbar-row-default {
        border-bottom: 1px solid var(--kbin-body-bg);
    }
    .mes-debugbar-row-error {
        background-color: var(--kbin-alert-danger-bg);
    }
    .mes-debugbar-row-warn {
        background-color: var(--kbin-alert-info-link-color);
    }
    .mes-debugbar-row-default {
        background-color: var(--kbin-sidebar-settings-switch-off-color);
    }
    `;
    const panelCSSDark = `
    .mes-debugbar-row-error {
        border-bottom: 1px solid var(--kbin-alert-danger-link-color);
        background-color: var(--kbin-alert-danger-bg);
    }
    .mes-debugbar-row-warn {
        border-bottom: 1px solid var(--kbin-alert-info-link-color);
        background-color: var(--kbin-alert-info-bg);
    }
    `;
    const panelCSSNight = `
    .mes-debugbar-info-count {
        color: var(--kbin-options-link-color)
    }
    .mes-debugbar-warn-count {
        color: var(--kbin-alert-info-bg)
    }
    .mes-debugbar-row-error,
    .mes-debugbar-row-warn,
    .mes-debugbar-row-default {
        border-bottom: 1px solid var(--kbin-alert-info-text-color);
        color: var(--kbin-bg);
    }
    .mes-debugbar-row-error {
        background-color: var(--kbin-alert-danger-link-color);
    }
    .mes-debugbar-row-warn {
        background-color: var(--kbin-alert-info-bg);
    }
    .mes-debugbar-row-default {
        background-color: var(--kbin-options-link-color);
    }
    `;
    const panelCSSLight = `
    .mes-debugbar-row-text {
        color: var(--kbin-body-bg);
    }
    .mes-debugbar-row-error,
    .mes-debugbar-row-warn,
    .mes-debugbar-row-default {
        border-bottom: 1px solid var(--kbin-alert-info-text-color);
        color: var(--kbin-bg);
    }
    .mes-debugbar-row-default {
        background-color: var(--kbin-sidebar-header-text-color);
    }
    .mes-debugbar-row-error {
        background-color: var(--kbin-alert-danger-link-color);
    }
    .mes-debugbar-row-warn {
        background-color: var(--kbin-alert-info-link-color);
    }
    `;
    const gridElements = {
        mes: {
            el: "button",
            id: "mes-debugbar-open-mes",
            text: "MES",
            tooltip: "Opens the MES main menu"
        },
        version: {
            el: "a",
            id: "mes-debugbar-version",
            text: `${version}`, //eslint-disable-line no-undef
            tooltip: "File a bug report against the current version"
        },
        block: {
            el: "button",
            id: "mes-debugbar-block-button",
            text: "Block mod",
            tooltip: "Block the currently selected mod"
        },
        enable: {
            el: "button",
            id: "mes-debugbar-enable-all-button",
            text: "Block all",
            tooltip: "Block all mods"
        },
        disable: {
            el: "button",
            id: "mes-debugbar-disable-all-button",
            text: "Unblock all",
            tooltip: "Unblock all mods"
        },
        apply: {
            el: "button",
            id: "mes-debugbar-apply-changes-button",
            text: "Apply changes",
            tooltip: "Reloads the page"
        },
        anonymize: {
            el: "input",
            id: "mes-debugbar-anonymize",
            text: "",
            tooltip: "Anonymize page"
        },
        debugline: {
            el: "div",
            id: "mes-debugbar-debugline",
            text: "",
            tooltip: ""
        },
        caret: {
            el: "button",
            id: "mes-debugbar-expand-button",
            text: "",
            tooltip: "Expand the debug console"
        }
    }
    safeGM("removeStyle", "mes-debugbar-css")
    safeGM("addStyle", debugCSS, "mes-debugbar-css")
    const theme = getTheme()
    const panelCssID = "mes-debugbar-panel-css"
    safeGM("removeStyle", panelCssID)
    let style
    switch (theme) {
        case Theme.TOKYO_NIGHT:
            style = panelCSSNight
            break;
        case Theme.SOLARIZED_DARK:
            console.log("MATCH HERE")
            style = panelCSSSolarizedDark
            break;
        case Theme.KBIN:
            style = panelCSSKbin
            break;
        case Theme.LIGHT:
        case Theme.SOLARIZED_LIGHT:
            style = panelCSSLight
            break;
        case Theme.DARK:
            style = panelCSSDark
            break;
    }
    safeGM("addStyle", style, panelCssID)


    //outer grid
    const container = document.createElement("div")
    const grid = document.createElement("div");
    container.id = "mes-debugbar-container"
    grid.id = "mes-debugbar-grid"
    container.appendChild(grid)

    //walk through grid els
    for (let i in Object.keys(gridElements)) {
        const key = Object.keys(gridElements)[i]
        const obj = gridElements[key]
        const el = document.createElement(obj.el)
        el.id = obj.id
        el.innerText = obj.text
        el.title = obj.tooltip
        if (obj.el === "button") {
            el.classList.add("btn", "btn__primary");
            addCustomListener(el);
        }
        grid.appendChild(el)
    }

    //some elements have custom logic added after grid creation
    const combo = comboBox(json);
    grid.querySelector("#mes-debugbar-block-button").insertAdjacentElement("beforebegin", combo)
    //emit signal to update block button
    combo.dispatchEvent(new Event("input"))

    //load time profiling
    const loadingLine = loading();
    grid.querySelector("#mes-debugbar-debugline").insertAdjacentElement("beforebegin", loadingLine)
    const debugPanel = panel();
    container.insertAdjacentElement("afterend", debugPanel);

    //
    const anon = grid.querySelector("#mes-debugbar-anonymize")
    anon.type = "checkbox"
    const anonSpan = document.createElement("span")
    anon.insertAdjacentElement("afterend", anonSpan)
    anonSpan.id = "mes-debugbar-anonymize-span"
    anonSpan.innerText = "Anonymize"
    anon.addEventListener("click", (e) => {
        (e.target.checked) ? anonymize() : window.location.reload();
    });
    //set up expand icons
    const caret = grid.querySelector("#mes-debugbar-expand-button")
    const caretIcon = document.createElement("i")
    caret.appendChild(caretIcon)
    caretIcon.classList.add("fa-solid", "fa-caret-down")
    caret.toggle = function () {
        if (caretIcon.classList.contains("fa-caret-down")) {
            caretIcon.classList.remove("fa-caret-down")
            caretIcon.classList.add("fa-caret-up")
        } else {
            caretIcon.classList.remove("fa-caret-remove")
            caretIcon.classList.add("fa-caret-down")
        }
        debugPanel.toggle()
    }
    caret.enable = function () {
        caret.disabled = false
    }
    caret.disable = function () {
        caret.disabled = true
    }

    //version URL
    const slug = "https://github.com/aclist/kbin-kes/issues/new?"
    const url = `labels=bug&template=bug_report.yml&version=${version}` //eslint-disable-line no-undef
    const bugURL = slug + url
    const debugVersion = grid.querySelector("#mes-debugbar-version")
    debugVersion.setAttribute("href", bugURL)
    debugVersion.setAttribute("target", "_blank")

    //status line
    const line = container.querySelector("#mes-debugbar-debugline")
    const exp = container.querySelector("#mes-debugbar-expand-button")
    const iconHolder = document.createElement("span")
    iconHolder.id = "mes-debugbar-debugline-icons"
    line.appendChild(iconHolder)
    line.appendChild(exp)
    //start disabled until notifications arrive
    caret.disable();

    const logIcons = {
        "info": "circle-info",
        "warn": "triangle-exclamation",
        "error": "circle-exclamation"
    }
    for (let i in Object.keys(logIcons)) {
        const key = Object.keys(logIcons)[i]
        const name = logIcons[key]
        const icon = document.createElement("i")
        icon.classList.add(`mes-debugbar-${key}-count`, "fa-solid", `fa-${name}`)
        const sp = document.createElement("span")
        sp.id = `mes-debugbar-${key}-count-value`
        iconHolder.appendChild(icon)
        iconHolder.appendChild(sp)
        sp.innerText = 0
    }

    function openToModPage () {
        const combo = document.querySelector("#mes-debugbar-mod-dropdown")
        const mod = combo.options[combo.selectedIndex].innerText
        let label
        let page
        for (let i in json) {
            if (json[i].entrypoint === mod) {
                label = json[i].label
                page = json[i].page
                break;
            }
        }
        page = page.charAt(0).toUpperCase() + page.slice(1)
        document.querySelector("#kes-settings").click();
        document.querySelectorAll(".kes-tab-link").forEach((tab) => {
            if (tab.innerText === page) tab.click();
        })
        document.querySelectorAll(".kes-option").forEach((option) => {
            if (option.innerText === label) option.click();
        })
    }

    function anonymize () {
        const pref = "MES-"
        const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        const phrases = [
            "Company announces plans to do something",
            "A picture of something that looks cool",
            "Discussion about my favorite food",
            "Experts publish report about interesting finding",
            "What is your opinion on this thing?",
            "Amazing footage of music concert by famous celebrity",
            "Pictures of everyone's favorite cute animal",
            "What should I wear to my friend's wedding?",
            "I need technical support to fix my broken device",
            "Does anyone remember that show that used to be on TV?",
            "Timelapse footage of me learning how to play an instrument",
            "Something I'm excited to share with you",
            "Interesting astronomical photos of celestial bodies",
            "Tell me about your favorite hobby in 100 words or less",
            "Best clothing to wear for outdoor activities"
        ]
        function _rand () {
            return Math.floor(1000 + Math.random() * 9000);
        }
        function _randPhrase () {
            return phrases[Math.floor(Math.random() * phrases.length)];
        }

        function splitInstance (el) {
            const str = el.innerText.split("@")
            let delim
            let suffix
            if (str[1]) {
                delim = "@"
                suffix = str[1]
            } else {
                delim = ""
                suffix = ""
            }
            return `${_rand()}${delim}${suffix}`

        }

        document.querySelectorAll(".magazine-inline, .magazine__name").forEach((magazine) => {
            magazine.innerText = `${pref}magazine-${splitInstance(magazine)}`
        });
        document.querySelectorAll(".user-inline, .user__name, .users-columns .stretched-link, .user-main h1, .user-main small").forEach((user) => {
            user.innerText = `${pref}user-${splitInstance(user)}`
        });
        document.querySelectorAll(".entry.section.subject h2,.entry.section.subject h1").forEach((thread) => {
            thread.innerText = _randPhrase();
        });
        document.querySelectorAll("img").forEach((img) => {
            img.src = "https://raw.githubusercontent.com/MbinOrg/mbin/refs/heads/main/assets/images/sources/mbin-notext.svg"
        });
        document.querySelectorAll(".short-desc, .entry__body, .comment .content, .magazine__description, .post .content").forEach((thread) => {
            thread.innerText = lorem
        });
        document.querySelectorAll(".user-name").forEach((user) => {
            user.innerText = pref + "user-" + _rand()
        });
    }
    function toggleAll (state) {
        const mods = []
        for (let i in json) mods.push(json[i].entrypoint)
        updateBlockState(mods, state)
    }

    function getBlockState (mod) {
        const settings = JSON.parse(localStorage.getItem("mes-debugbar"))
        return settings["mods"][mod]
    }

    function reinsertCombo (mod) {
        const combo = document.querySelector("#mes-debugbar-mod-dropdown")
        combo.remove()
        const newCombo = comboBox(json);
        newCombo.insert();
        newCombo.openOnMod(mod)
        newCombo.dispatchEvent(new Event("input"))
    }

    function highlightChanges () {
        const button = document.querySelector("#mes-debugbar-apply-changes-button")
        button.style.border = "2px solid var(--kbin-alert-info-link-color)"
    }

    function updateBlockState (mods, state) {
        for (let i in mods) {
            const settings = JSON.parse(localStorage.getItem("mes-debugbar"))
            settings["mods"][mods[i]] = state
            localStorage.setItem("mes-debugbar", JSON.stringify(settings))
        }
    }

    function addCustomListener (el) {
        let func
        switch (el.id) {
            case "mes-debugbar-open-mes":
                func = openToModPage
                break;
            case "mes-debugbar-expand-button":
                func = function () {
                    const caret = document.querySelector("#mes-debugbar-expand-button")
                    caret.toggle();
                }
                break;
            case "mes-debugbar-enable-all-button":
                func = function () {
                    toggleAll(true)
                    reinsertCombo()
                    highlightChanges();
                }
                break;
            case "mes-debugbar-disable-all-button":
                func = function () {
                    toggleAll(false)
                    reinsertCombo()
                    highlightChanges();
                }
                break;
            case "mes-debugbar-block-button":
                func = function (e) {
                    //TODO: abstract this
                    let state
                    const mods = []
                    const combo = document.querySelector("#mes-debugbar-mod-dropdown")
                    const mod = combo.selectedMod();
                    mods.push(mod)
                    state = combo.selectedState();
                    if (state) e.target.innerText = "Block mod"
                    if (!state) e.target.innerText = "Unblock mod"
                    state = !state
                    updateBlockState(mods, state)
                    reinsertCombo(mod);
                    highlightChanges();
                }
                break;
            case "mes-debugbar-apply-changes-button":
                func = function () {
                    window.location.reload();
                }
                break;
            default:
                break;
        }
        el.addEventListener("click", (e) => {
            func(e);
        })
    }

    function loading () {
        let str
        let suffix
        const line = document.createElement("span")
        line.id = "mes-debugbar-loadingline"
        line.innerText = ""
        line.push = function (loaded, skipped, time) {
            if (loaded === 0) {
                str = "No mods loaded."
            } else {
                (loaded !== 1) ? suffix = "s" : suffix = ""
                str = `Loaded ${loaded} mod${suffix} in ${time}ms`
            }
            if (skipped > 0) {
                str = str + ` (${skipped} skipped)`
            }
            line.innerText = str
        }
        return line
    }

    function comboBox (json) {
        const unblocked = []
        const blocked = []
        for (let i in json) {
            const mod = json[i].entrypoint
            const state = getBlockState(mod)
            if (state) {
                blocked.push(mod)
                blocked.sort()
            } else {
                unblocked.push(mod)
                unblocked.sort()
            }
        }

        const combo = document.createElement("select")
        combo.id = "mes-debugbar-mod-dropdown"

        const unblockedSep = document.createElement("option")
        unblockedSep.disabled = true
        unblockedSep.innerText = `----Unblocked (${unblocked.length})----`

        const blockedSep = document.createElement("option")
        blockedSep.disabled = true
        blockedSep.innerText = `----Blocked (${blocked.length})----`

        combo.appendChild(blockedSep)
        for (let i in blocked) {
            const opt = document.createElement("option")
            opt.value = true
            opt.innerText = blocked[i]
            combo.appendChild(opt)
        }

        combo.appendChild(unblockedSep)
        for (let i in unblocked) {
            const opt = document.createElement("option")
            opt.value = false
            opt.innerText = unblocked[i]
            combo.appendChild(opt)
        }

        combo.addEventListener("input", (e) => {
            let str
            const ind = combo.selectedIndex
            combo.options[ind].value === "true" ? str = "Unblock" : str = "Block"
            const button = e.target.nextElementSibling
            button.innerText = `${str} mod`
        })

        combo.openOnMod = function (mod) {
            const opts = combo.options
            Array.from(opts).forEach((option) => {
                if (option.innerText === mod) {
                    combo.selectedIndex = option.index
                }
            });
        }

        combo.selectedState = function () {
            const ind = combo.selectedIndex
            return (combo.options[ind].value === "true") ? true : false
        }

        combo.selectedMod = function () {
            const ind = combo.selectedIndex
            return combo.options[ind].innerText
        }

        combo.insert = function () {
            const block = document.querySelector("#mes-debugbar-block-button")
            block.insertAdjacentElement("beforebegin", combo)
        }
        return combo
    }

    function panel () {
        const panel = document.createElement("div")
        container.appendChild(panel);
        panel.id = "mes-debugbar-expanded"
        panel.style.display = "none"

        panel.toggle = function () {
            if (panel.style.display === "none") {
                panel.style.removeProperty("display")
            } else {
                panel.style.display = "none"
            }
        }

        panel.update = function () {
            const d = panel.querySelectorAll(".mes-debugbar-row-default").length
            const e = panel.querySelectorAll(".mes-debugbar-row-error").length
            const w = panel.querySelectorAll(".mes-debugbar-row-warn").length
            container.querySelector("#mes-debugbar-info-count-value").innerText = d
            container.querySelector("#mes-debugbar-warn-count-value").innerText = e
            container.querySelector("#mes-debugbar-error-count-value").innerText = w
            const caret = container.querySelector("#mes-debugbar-expand-button")
            if (d === 0 && e === 0 && w === 0) {
                caret.disable();
            } else {
                caret.enable();
            }
        }

        panel.push = function (level, str) {
            const pref = "mes-debugbar-row"
            const sep = document.createElement("div")
            const row = document.createElement("p")

            let cl
            if (level === Log.Log) cl = `${pref}-default`
            if (level === Log.Warn) cl = `${pref}-warn`
            if (level === Log.Error) cl = `${pref}-error`
            sep.className = cl

            row.innerText = str
            row.className = "mes-debugbar-row-text"
            sep.appendChild(row)
            panel.appendChild(sep)
            panel.update();
        }
        return panel
    }
    return container
}

function isDebugBarEnabled () {
    const settings = localStorage.getItem("mes-debugbar")
    if (!settings) return false
    return JSON.parse(localStorage.getItem("mes-debugbar"))["enabled"]
}

function toggleDebug (json) {
    const settings = JSON.parse(localStorage.getItem("mes-debugbar"))
    if (!settings) {
        const obj = {
            enabled: true,
            mods: {}
        }
        for (let i in json) {
            obj.mods[json[i].entrypoint] = false
        }
        localStorage.setItem("mes-debugbar", JSON.stringify(obj))
        window.location.reload();
    }
    if (settings && settings["enabled"]) {
        settings["enabled"] = false
        localStorage.setItem("mes-debugbar", JSON.stringify(settings))
        window.location.reload();
    } else {
        settings["enabled"] = true
        localStorage.setItem("mes-debugbar", JSON.stringify(settings))
        window.location.reload();
    }
}

//FIXME: loaded count is off by 1 if loading all
