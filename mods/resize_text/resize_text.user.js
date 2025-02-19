function textResize (toggle) { // eslint-disable-line no-unused-vars
    const modalContent = ".kes-settings-modal-content"
    const modalContainer = ".kes-settings-modal-container"

    function kesModalOpen () {
        const kesModalContent = document.querySelector(modalContent);
        if (kesModalContent) {
            return true
        } else {
            return false
        }
    }

    function modSelected () {
        let state
        document.querySelectorAll('.kes-option').forEach((mod) => {
            if ((mod.style.opacity === "1") && mod.innerText === "Change font size") {
                state = true
            }
        })
        return state
    }

    function setOpacity (value) {
        const kesModalContent = document.querySelector(modalContent);
        const kesModalContainer = document.querySelector(modalContainer);
        kesModalContent.style.opacity = value;
        kesModalContainer.style.opacity = value;
    }

    function resizeText () {
        const settings = getModSettings('resize');
        let oldID = sessionStorage.getItem('modalFade');
        clearTimeout(oldID)

        if (kesModalOpen()) {
            if (modSelected()) setOpacity(0.2)
        }
        const css = `
        /* MESSAGES */
        .page-messages * {
            font-size: ${settings["optionMessages"]}px
        }
        .page-messages > .kbin-container > #main > h1 {
            font-size: ${settings["optionMessages"] * 2.5}px
        }
        .page-messages > .mbin-container > #main > h1 {
            font-size: ${settings["optionMessages"] * 2.5}px
        }
        /* SIDEBAR */
        .sidebar-subscriptions *,  #sidebar * {
            font-size: ${settings["optionHomeSidebar"]}px !important
        }
        /* COMMENTS */
        .entry-comment * {
            font-size: ${settings["optionComments"]}px
        }
        /* ============= */
        /* PROFILE PAGES */
        .user-main > div > .user__actions * {
            font-size: ${settings["optionProfile"]}px
        }
        .user-box * {
            font-size: ${settings["optionProfile"]}px
        }
        .section.user-info > ul > li a {
            font-size: ${settings["optionProfile"]}px !important
        }
        .section.user-info > h3 {
            font-size: ${settings["optionProfile"]}px !important
        }
        .section.user-info > ul > li {
            font-size: ${settings["optionProfile"]}px
        }
        /* ============= */
        /* POST CREATION PAGES */
        /*TODO: this line is not applying */
        form[name="magazine"] * {
            font-size: ${settings["optionCreate"]}px
        }
        .entry-create > div > #entry_link_title_max_length {
            font-size: ${settings["optionCreate"]}px
        }
        .entry-create > div > div > .ts-control > * {
            font-size: ${settings["optionCreate"]}px
        }
        .options.options--top.options-activity * {
            font-size: ${settings["optionCreate"]}px !important
        }
        .entry-create * {
            font-size: ${settings["optionCreate"]}px
        }
        /* ============= */
        /* HEADERS */
        #header :not(.icon) {
            font-size: ${settings["optionHeader"]}px
        }
        /* ============= */
        /* SETTINGS */
        .page-settings * {
            font-size: ${settings["optionUserSettings"]}px
        }
        .page-settings h2 {
            font-size: ${settings["optionUserSettings"] * 2.5}px
        }
        /* ============= */
        /* SORT OPTIONS */
        aside#options menu li a, aside#options menu i, aside#options menu button span {
            font-size: ${settings["optionSortBy"]}px
        }
        /* INBOX NOTIFICATIONS */
        .page-notifications > .kbin-container > main > * {
            font-size: ${settings["optionNotifs"]}px
        }
        .page-notifications > .kbin-container > main > .pills > menu > form > button {
            font-size: ${settings["optionNotifs"] * 0.85}px
        }
        .page-notifications > .kbin-container > main > h1 {
            font-size: ${settings["optionNotifs"] * 2.5}px !important
        }
        .page-notifications > .mbin-container > main > * {
            font-size: ${settings["optionNotifs"]}px
        }
        .page-notifications > .mbin-container > main > .pills > menu > form > button {
            font-size: ${settings["optionNotifs"] * 0.85}px
        }
        .page-notifications > .mbin-container > main > h1 {
            font-size: ${settings["optionNotifs"] * 2.5}px !important
        }
        /* ============= */
        /* THREADS */
        article.entry > header > h2 a {
            font-size: ${settings["optionThreads"] * 1.295}px
        }
        article.entry > .content * {
            font-size: ${settings["optionThreads"]}px
        }
        article.entry * {
            font-size: ${settings["optionThreads"]}px
        }
        `;
        safeGM("removeStyle", "resize-css")
        safeGM("addStyle", css, "resize-css")

        if (kesModalOpen()) {
            let timerID = setTimeout(setOpacity ,1000, 1.0);
            sessionStorage.setItem('modalFade', timerID);
        }
    }

    if (toggle) {
        resizeText();
    } else {
        safeGM("removeStyle", "resize-css")
        return
    }
}
