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
        #middle[class="page-about"] h1,
        #middle[class="page-faq"] h1,
        #middle[class="page-terms"] h1,
        #middle[class="page-privacy-policy"] h1,
        #middle[class="page-magazine-panel page-magazine-moderators"] h1,
        #middle[class="page-federation"] h1 {
            font-size: ${resolveSize(settings["optionAbout"]) * 2.5}rem
        }
        #middle[class="page-about"] #content *,
        #middle[class="page-faq"] #content *,
        #middle[class="page-terms"] #content * ,
        #middle[class="page-privacy-policy"] #content * ,
        #middle[class="page-magazine-panel page-magazine-moderators"] #content *,
        #middle[class="page-stats"] #content *,
        #middle[class="page-federation"] .section:not(table) {
            font-size: ${resolveSize(settings["optionAbout"])}rem
        }
        #middle[class="page-federation"] .section h3 {
            font-size: ${resolveSize(settings["optionAbout"]) * 2}rem
        }
        /* COMMENTS */
        .section.post.subject *, .entry-comment * {
            font-size: ${resolveSize(settings["optionComments"])}rem !important
        }
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
        /* NAVBAR */
        #header :not(.icon) {
            font-size: ${resolveSize(settings["optionNavbar"])}rem
        }
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
        /* MENUBAR OPTIONS */
        .pills menu li,
        #activity menu li,
        aside#options menu li a,
        aside#options menu i,
        aside#options menu button span {
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
        /* MODLOG */
        #middle[class="page-modlog"] .section--small.log,
        #middle[class="page-modlog"] .alert.alert__danger {
            font-size: ${resolveSize(settings["optionModlog"])}rem
        }
        #middle[class="page-modlog"] h1 {
            font-size: ${resolveSize(settings["optionModlog"]) * 2.5}rem
        }
        /* PAGINATION FOOTER */
        .pagination.section {
            font-size: ${resolveSize(settings["optionPagination"])}rem
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
