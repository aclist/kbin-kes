function textResize (toggle) { // eslint-disable-line no-unused-vars

    function resolveSize (value) {
        //const rem = (value - (value*0.785)*(0.935))
        //midpoint of 5 = 0.85rem, default
        //header is 5 rem by default
        //threads are 4
        const rem = 1 + ( (value - 5) * 0.15)
        return rem
    }

    function resizeText () {
        const settings = getModSettings('resize');
        const css = `
        /* MESSAGES */
        .page-messages * {
            font-size: ${resolveSize(settings["optionMessages"])}rem
        }
        .page-messages > .kbin-container > #main > h1 {
            font-size: ${resolveSize(settings["optionMessages"]) * 2.5}rem
        }
        .page-messages > .mbin-container > #main > h1 {
            font-size: ${resolveSize(settings["optionMessages"]) * 2.5}rem
        }
        /* SIDEBAR */
        .sidebar-subscriptions *,  #sidebar * {
            font-size: ${resolveSize(settings["optionHomeSidebar"])}rem !important
        }
        /* POST COMMENT */
        #comment-add * {
            font-size: ${resolveSize(settings["optionPostComment"])}rem
        }
        /* ABOUT PAGES */
        #main[data-controller="lightbox timeago confirmation"] h1 {
            font-size: ${resolveSize(settings["optionAbout"]) * 2.5}rem
        }
        #main[data-controller="lightbox timeago confirmation"] #content {
            font-size: ${resolveSize(settings["optionAbout"])}rem
        }
        /* COMMENTS */
        .section.post.subject *, .entry-comment * {
            font-size: ${resolveSize(settings["optionComments"])}rem !important
        }
        /* USER META POPOVER */
        #popover * {
            font-size: ${resolveSize(settings["optionPopover"])}rem !important
        }
        /* PROFILE PAGES */
        .user-main > div > .user__actions * {
            font-size: ${resolveSize(settings["optionProfile"])}rem
        }
        .user-box * {
            font-size: ${resolveSize(settings["optionProfile"])}rem
        }
        .section.user-info > ul > li a {
            font-size: ${resolveSize(settings["optionProfile"])}rem !important
        }
        .section.user-info > h3 {
            font-size: ${resolveSize(settings["optionProfile"])}rem !important
        }
        .section.user-info > ul > li {
            font-size: ${resolveSize(settings["optionProfile"])}rem
        }
        #content > h2 {
            font-size: ${resolveSize(settings["optionProfile"]) * 2}rem
        }
        /* ============= */
        /* POST CREATION PAGES */
        form[name="magazine"] * {
            font-size: ${resolveSize(settings["optionCreate"])}rem
        }
        .entry-create > div > #entry_link_title_max_length {
            font-size: ${resolveSize(settings["optionCreate"])}rem
        }
        .entry-create > div > div > .ts-control > * {
            font-size: ${resolveSize(settings["optionCreate"])}rem
        }
        .options.options--top.options-activity * {
            font-size: ${resolveSize(settings["optionCreate"])}rem !important
        }
        .entry-create * {
            font-size: ${resolveSize(settings["optionCreate"])}rem
        }
        /* ============= */
        /* NAVBAR */
        #header :not(.icon) {
            font-size: ${resolveSize(settings["optionNavbar"])}rem
        }
        /* ============= */
        /* SETTINGS */
        form[name="user_settings"] * {
            font-size: ${resolveSize(settings["optionUserSettings"])}rem;
        }
        form[name="user_settings"] .ts-control * {
            font-size: ${resolveSize(settings["optionUserSettings"])}rem;
        }
        .page-settings h2 {
            font-size: ${resolveSize(settings["optionUserSettings"]) * 2.5}rem
        }
        /* ============= */
        /* MENUBAR OPTIONS */
        .pills menu li, #activity menu li, aside#options menu li a, aside#options menu i, aside#options menu button span {
            font-size: ${resolveSize(settings["optionMenubar"])}rem
        }
        /* INBOX NOTIFICATIONS */
        .page-notifications > .kbin-container > main > * {
            font-size: ${resolveSize(settings["optionNotifs"])}rem
        }
        .page-notifications > .kbin-container > main > .pills > menu > form > button {
            font-size: ${resolveSize(settings["optionNotifs"]) * 0.85}rem
        }
        .page-notifications > .kbin-container > main > h1 {
            font-size: ${resolveSize(settings["optionNotifs"]) * 2.5}rem !important
        }
        .page-notifications > .mbin-container > main > * {
            font-size: ${resolveSize(settings["optionNotifs"])}rem
        }
        .page-notifications > .mbin-container > main > .pills > menu > form > button {
            font-size: ${resolveSize(settings["optionNotifs"]) * 0.85}rem
        }
        .page-notifications > .mbin-container > main > h1 {
            font-size: ${resolveSize(settings["optionNotifs"]) * 2.5}rem !important
        }
        /* ============= */
        /* THREADS */
        article.entry > header > h2 a {
            font-size: ${resolveSize(settings["optionThreads"]) * 1.295}rem
        }
        article.entry > .content * {
            font-size: ${resolveSize(settings["optionThreads"])}rem
        }
        article.entry * {
            font-size: ${resolveSize(settings["optionThreads"])}rem
        }
        /* TABLES */
        .table-responsive {
            font-size: ${resolveSize(settings["optionTables"])}rem
        }
        table * {
            font-size: ${resolveSize(settings["optionTables"])}rem
        }
        table .action {
            font-size: ${resolveSize(settings["optionTables"]) * 0.85}rem
        }
        `;
        safeGM("addStyle", css, "resize-css")
    }

    if (toggle) {
        safeGM("removeStyle", "resize-css")
        resizeText();
    } else {
        safeGM("removeStyle", "resize-css")
        return
    }
}
