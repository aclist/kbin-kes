const funcObj = {

    always_more:

    function moreInit (toggle) { // eslint-disable-line no-unused-vars 
        const more = document.querySelectorAll('.entry__body > .more')
        if (toggle) {
            more.forEach((item) => {
                const arrow = item.firstChild.className
                if (arrow === 'fa-solid fa-angles-down') {
                    item.click();
                }
            });
        } else {
            more.forEach((item) => {
                const arrow = item.firstChild.className
                if (arrow === 'fa-solid fa-angles-up') {
                    item.click();
                }
            });

        }
    }
,

    improved_collapsible_comments:

    function initCollapsibleComments (toggle, mutation) { // eslint-disable-line no-unused-vars
        function applyCommentStyles () {
            var style = `
            .entry-comment {
            grid-column-gap: 2px;
            padding: 2px 0 0 0 !important;
            }

            .subject .more {
                bottom: 0px;
            }

            .entry-comment header {
                margin-bottom: 0;
            }

            .comment-level--1 {
                padding-right: 4px !important;
                padding-bottom: 4px !important;
            }

            .comments div {
                border-left: none !important;
            }
            .entry-comment .kes-collapse-children {
                gap: 8px;
            }
            .kes-collapse-children .entry-comment {
                border-top: 1px solid var(--kbin-bg) !important;
            }

            .comment-level--1 {
                margin-bottom: 8px;
            }

            .collapsed-comment .kes-collapse-children, .collapsed-comment .content, .collapsed-comment footer, .collapsed-comment .vote, .collapsed-comment .more {
                display: none !important;
            }

            .entry-comment .kes-collapse-children, .entry-comment .content, .entry-comment footer, .entry-comment .vote {
                opacity: 1;
                transition: opacity 0.2s ease;
            }

            .collapsed-comment {
                grid-template-areas:"expando-icon avatar header"!important;
                grid-template-columns: 20px 20px auto!important;
                grid-template-rows: min-content!important;
                grid-row-gap: 0!important;
            }

            .entry-comment figure, .entry-comment header {
                transition: margin-left 0.2s ease;
            }

            /*.collapsed-comment figure, .collapsed-comment header {
                margin-left: 24px !important;
            }*/

            .expando {
                cursor: pointer;
                grid-area: expando !important;
            }

            i.expando-icon {
                margin: auto;
                cursor: pointer;
            }

            .expando i:before {
                margin: auto;
            }

            .threadLine {
                background-color: #4a4a4a;
                transition: background-color 0.2s ease;
                border-radius: 2px;
                width: 2px;
                height: 100%;
                margin: auto;
            }

            .collapsed-comment .threadLine {
                display: none;
            }

            .comment-level--1 .threadLine {
                background-color: var(--kbin-meta-link-color);
            }
            .comment-level--2 .threadLine {
                background-color: #71ac53;
            }
            .comment-level--3 .threadLine {
                background-color: #ffa500;
            }
            .comment-level--4 .threadLine {
                background-color: #538eac;
            }
            .comment-level--5 .threadLine {
                background-color: #6253ac;
            }
            .comment-level--6 .threadLine {
                background-color: #ac53ac;
            }
            .comment-level--7 .threadLine {
                background-color: #ac5353;
            }
            .comment-level--8 .threadLine {
                background-color: #2b7070;
            }
            .comment-level--9 .threadLine {
                background-color: #b9ab52;
            }
            .comment-level--10 .threadLine {
                background-color: grey;
            }

            .expando-icon {
                grid-area: expando-icon !important;
            }

            .expando i:before {
                color:#4a4a4a;
                transition: background-color 0.2s ease;
            }

            .expando:hover i:before {
                color:#d7dadc;
            }
            .expando:hover .threadLine {
                background-color: var(--kbin-meta-link-hover-color);
            }

            .entry-comment > figure {
                width: 20px;
            }

            .entry-comment > figure > a > img, .entry-comment > figure > a > .no-avatar {
                max-width: 20px!important;
                max-height: 20px!important;
                border: 0px transparent !important;
            }
            @media (max-width: 992px) {
                .entry-comment.nested {
                    padding: 2px 0 0 2px !important;
                    grid-column-gap: 0px;
                    grid-template-columns: 14px min-content auto auto;
                    border: 0px;
                }
                .comment-level--1 {
                    padding-bottom: 4px !important;
                }

                .expando {
                    width: 12px;
                }

                .threadLine {
                    width: 2px;
                }
                .entry-comment figure a img {
                    height: 16px;
                    width: 16px;
                }
            }

            @media (max-width: 600px) {
                .entry-comment.nested {
                    padding: 1px !important;
                    grid-column-gap: 1px;
                    grid-row-gap: 0px;
                    grid-template-columns: 14px min-content auto min-content;
                }
                .entry-comment {
                    border-bottom: 0px;
                }
            }

            @media (max-width: 1px) {
                .entry-comment {
                    margin-left: 0 !important;
                    color: red;
                }
            }
            .entry-comment {
                border-color: transparent !important;
                grid-template-columns: 20px 20px auto min-content;
                grid-template-rows: min-content auto auto;
                display: grid;
                margin-left: 0 !important;
            }
            .kes-collapse-children .entry-comment {
                margin-left: 0 !important;
            }

            .entry-comment > .entry-comment {
                display: block;
            }

            .entry-comment .kes-collapse-children {
                grid-area: kes-collapse-children;
                display: flex;
                flex-direction: column;
            }

            .entry-comment .js-container {
                margin-bottom: 0 !important;
                display: block;
                margin-top: 0 !important;
            }
            `;
            for (let i = 1; i < 10; i++) {
                style += `
                blockquote.comment-level--${i} {
                    margin-left: 0 !important;
                }
                `;
            }
            const kbinStyle = `
            .entry-comment {
                grid-template-areas:
                "expando-icon avatar header vote"
                "expando body body body"
                "expando footer footer footer"
                "expando kes-collapse-children kes-collapse-children kes-collapse-children";
            }
            `;
            const mbinStyle = `
            .entry-comment {
                grid-template-areas:
                "expando-icon avatar header aside"
                "expando body body body"
                "expando footer footer footer"
                "expando kes-collapse-children kes-collapse-children kes-collapse-children";
            }
            .comment-collapse {
                display: none !important;
            }
            `;
            const hideDefaults = `
            .comment-wrap {
                display: none;
            }
            `;
            safeGM("addStyle", hideDefaults, "hide-defaults");
            safeGM("addStyle", style, "threaded-comments");
            // eslint-disable-next-line no-undef
            if (getInstanceType() === "kbin") safeGM("addStyle", kbinStyle, "kbin-kes-comments-style")
            // eslint-disable-next-line no-undef
            if (getInstanceType() === "mbin") safeGM("addStyle", mbinStyle, "mbin-kes-comments-style")
        }
        function applyToNewPosts () {
            let comments = document.querySelectorAll(".entry-comment:not(.nested)");
            let levels = [];
            for (let i = 0; i < comments.length; i++) {
                let level = comments[i].className.match(/comment-level--(\d+)/)[1];
                levels.push(level);
            }
            nestComments(comments,levels);
        }
        function nestComments (comments,levels) {
            // Go through comments in reverse order
            for (let i = comments.length-1; i >= 0; i--) {
                comments[i].classList.add('nested');
                // Add expando to comment
                let expando = document.createElement('div');
                expando.className = 'expando';
                // Add line to expando
                let line = document.createElement('div');
                line.className = 'threadLine';
                expando.appendChild(line);
                comments[i].appendChild(expando);

                // Add + icon to expando
                let icon = document.createElement('i');
                icon.className = 'expando-icon fas fa-minus';
                comments[i].appendChild(icon);

                // Check if the previous element is the parent
                let previousElement = comments[i].previousElementSibling;
                if (previousElement && previousElement.className.match(/nested/)) {
                    // Get previous element's children div if it exists
                    let previousChildren = previousElement.querySelector(".kes-collapse-children");
                    if (!previousChildren) {
                        previousChildren = document.createElement('div');
                        previousChildren.className = 'kes-collapse-children';
                        previousElement.appendChild(previousChildren);
                    }

                    // insert comment into children
                    previousChildren.appendChild(comments[i]);
                    break;
                }
                for (let j = i-1; j >= 0; j--) {
                    let comment = comments[i];
                    let level = levels[i];
                    let previousComment = comments[j];
                    let previousLevel = levels[j];
                    // If previous comment is the parent
                    if (previousLevel == level-1) {
                        // Insert this comment into the parent
                        // Check if parent has a children container
                        let children = previousComment.querySelector('.kes-collapse-children');
                        if (!children) {
                            // If not, create one
                            children = document.createElement('div');
                            children.className = 'kes-collapse-children';
                            previousComment.appendChild(children);
                        }
                        // Insert comment into children container
                        children.prepend(comment);
                        break;
                    }
                }
            }
        }
        function sleep (ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        function clearMores () {
            let id
            let mores
            //duplicate '.more' elements get created when DOM is manipulated
            //must wait for them to propagate, then iterate and remove
            sleep(20).then(() => {
                const comments = document.querySelectorAll('.entry-comment')
                comments.forEach((comment) => {
                    id = comment.id
                    mores = comment.querySelectorAll(`#${id} > .more`)
                    if (mores.length <= 1) return
                    for ( let i = 0; i < mores.length; ++i ) {
                        if (i === 0) continue
                        mores[i].remove()
                    }
                });
            });

        }
        function enterMain () {
            applyToNewPosts();
            applyCommentStyles();
            initCollapsibleCommentsListeners();
            clearMores();
        }
        function initCollapsibleCommentsListeners () {
            let comments = document.querySelectorAll('.entry-comment:not(.listened)');

            for (let i = 0; i < comments.length; i++) {
                comments[i].classList.add('listened');

                let expandos = comments[i].querySelectorAll('.expando');
                let expando = expandos[expandos.length-1];
                let icons = comments[i].querySelectorAll('.expando-icon');
                let icon = icons[icons.length-1];

                expando.addEventListener('click', function () {toggleReplies(event,comments[i])});
                icon.addEventListener('click', function () {toggleReplies(event, comments[i])});
            }
        }
        function toggleReplies (event, comment) {
            var senderElement = event.target
            var parent = event.target.parentElement;
            let state

            // Prevent collapsing when text is selected
            const cellText = document.getSelection();
            if (cellText.type === 'Range') return;

            const ignoredParentNodes = [
                "BUTTON",
                "MARKDOWN_TOOLBAR",
                "FORM"
            ]
            const ignoredSenderNodes = [
                "A",
                "BUTTON",
                "TEXTAREA",
                "SELECT",
                "OPTION"
            ]
            if (ignoredParentNodes.includes(parent.nodeName)) return
            if (parent.nodeName.match(/MD/)) return
            if (ignoredSenderNodes.includes(senderElement.nodeName)) return
            if (senderElement.className.match(/fa-arrow/)) return
            if (senderElement.className === "more" || parent.className === "more") return

            if (comment.className.match(/collapsed-comment/)) {
                state = true
            } else {
                state = false
            }
            updateHeader(state, comment);
        }
        function toggleIcon (bool, comment) {
            const icons = comment.querySelectorAll('.expando-icon');
            const icon = icons[icons.length-1];
            let type
            if (bool) {
                type = 'expando-icon fas fa-minus';
            } else {
                type = 'expando-icon fas fa-plus';
            }
            icon.className = type
        }
        function updateHeader (bool, comment) {
            const header = comment.querySelector('header');
            const numChildrenSpan = header.querySelector('.numChildren');
            let suffix

            if (bool) {
                comment.classList.remove('collapsed-comment');
                header.removeChild(numChildrenSpan);
                toggleIcon(true, comment)
            } else {
                comment.classList.add('collapsed-comment');
                let children = comment.querySelectorAll('.entry-comment');
                let numChildren = children.length;
                let header = comment.querySelector('header');
                let numChildrenSpan = document.createElement('span');
                numChildrenSpan.className = 'numChildren';
                if (numChildren == 1) {
                    suffix = "reply"
                } else {
                    suffix = "replies"
                }
                numChildrenSpan.innerHTML = `(${numChildren} ${suffix})`;
                header.appendChild(numChildrenSpan);
                toggleIcon(false, comment)
            }

        }
        function removeDangling () {
            const danglingChildren = document.querySelectorAll('.kes-collapse-children')
            for (let i = 0; i < danglingChildren.length; ++i) {
                danglingChildren[i].remove()
            }
        }
        function restoreTree (className, item) {
            switch (className) {
                case ".nested":
                //if parent has children container, reinsert children adjacent to parent
                //then remove children class
                    item.classList.remove('nested')
                    if (item.parentElement && item.parentElement.className === "kes-collapse-children") {
                        const par = item.parentElement.parentElement
                        par.insertAdjacentElement("afterend", item)
                    }
                    break
                case ".listened":
                    item.classList.remove('listened')
                    break
                default:
                    item.remove();
            }
        }
        function teardown () {
            //order is deterministic; process listened elements first
            const els = [
                ".listened",
                ".expando",
                ".expando-icon",
                ".nested",
                ".numChildren"
            ]
            for (let i = 0; i < els.length; ++i) {
                document.querySelectorAll(els[i]).forEach((item) => {
                    restoreTree(els[i], item)
                });
            }
            removeDangling();
            clearMores();
            safeGM("removeStyle", "hide-defaults");
            safeGM("removeStyle", "threaded-comments");
            safeGM("removeStyle", "kbin-kes-comments-style")
            safeGM("removeStyle", "mbin-kes-comments-style")
        }
        if (!toggle) {
            teardown()
            return
        }
        if (mutation && mutation.addedNodes[0].className.indexOf('nested') === -1) {
            enterMain();
        } else if (document.querySelector('.entry-comment.nested') || !document.querySelector('.comments')) {
            return;
        } else {
            enterMain();
        }
    }
,

    omni:

    function omniInit (toggle) { // eslint-disable-line no-unused-vars

        const kesActive = 'kes-subs-active'
        const omniCSS = `
        @media (max-width: 576px) {
            #kes-omni-list {
                width: 100% !important;
            }
            #kes-omni-scroller {
                max-height: unset !important;
            }
        }
        #kes-omni-counter {
            background: transparent;
            color: var(--kbin-text-color);
            text-align: right;
        }
        #kes-omni-scroller {
            height: auto;
            max-height: 100%;
            overflow-y: scroll;
        }
        #kes-omni-warning {
            background-color: var(--kbin-alert-danger-text-color);
            color: var(--kbin-input-bg);
            text-align: center;
        }
        .kes-omni-modal {
            display: flex;
            justify-content: center;
            position: fixed;
            z-index: 999999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }
        #kes-omni {
            margin-top: 20%;
            height: 80%;
        }
        #kes-omni-list {
            height: 80%;
            list-style-type: none;
            padding: 50px;
            margin: 0;
            width: 30rem;
        }
        #kes-omni-list li{
            border-bottom: 1px solid var(--kbin-vote-text-color);
            border-top: 1px solid var(--kbin-vote-text-color);
            margin-top: -1px; /* Prevent double borders */
            background-color: var(--kbin-section-bg);
            color: var(--kbin-text-color);
            padding: 5px;
            text-decoration: none;
            font-size: 18px;
            border: 1px solid var(--kbin-button-primary-bg);
            display: block;
        }
        .kes-subs-active {
            background-color: var(--kbin-primary-color) !important;
        }
        #kes-omni-search:focus {
            outline: none
        }
        #kes-omni-search {
            width: 100%;
            background-color: var(--kbin-vote-text-color);
            color: var(--kbin-bg);
            padding: 5px;
        }
        `
        const keyCodes = {
            "Backtick": "`",
            "Backslash": "\\",
            "Minus": "-",
            "Equals": "=",
            "Left bracket": "[",
            "Right bracket": "]"
        }

        const settings = getModSettings('omni');
        const meta = settings["meta"]
        const code = keyCodes[meta]
        const mobile = settings["mobile"]
        const user = document.querySelector('.login');
        const username = user.href.split('/')[4];
        const hostname = window.location.hostname
        const fetchedMags = []

        const tapBar = document.querySelector('#kes-omni-tapbar')
        if (tapBar) {
            tapBar.remove();
        }
        const q = document.querySelector('.kes-omni-modal')
        if (q) {
            q.remove();
        }

        function createOmni () {

            safeGM("removeStyle", "omni-css")
            safeGM("addStyle", omniCSS, "omni-css")

            let str
            if (username) {
                str = 'user'
                loadMags(str, username)
            } else {
                str = 'default'
                loadMags(str)
            }

            async function loadMags (mode, username) {
                const dataStr = setMagString(mode);
                const loaded = await safeGM("getValue", dataStr)
                if ((!loaded) || (loaded.length < 1)) {
                    fetchMags(username, 1);
                } else {
                    omni(loaded);
                }
            }
            function setMagString (mode) {
                let mags;
                switch (mode) {
                    case 'default':
                        mags = `omni-default-mags-${hostname}`
                        break;
                    case 'user':
                        mags = `omni-user-mags-${hostname}-${username}`
                        break;
                }
                return mags;
            }
            async function saveMags (mode, mags) {
                const dataStr = setMagString(mode);
                await safeGM("setValue", dataStr, mags)
                omni(mags);
            }

            function fetchMags (username, page) {
                let url
                if (username) {
                    url = `https://${hostname}/u/${username}/subscriptions?p=${page}`
                } else {
                    url = `https://${hostname}/magazines`
                }
                genericXMLRequest(url, parseMags)
            }
            function parseMags (response) {
                let links
                let mags
                let parser = new DOMParser();
                let notificationsXML = parser.parseFromString(response.responseText, "text/html");
                if (notificationsXML.title.indexOf('Magazines - ') > -1) {
                    const defaultFetched = []
                    mags = notificationsXML.querySelector('.magazines.table-responsive')
                    links = mags.querySelectorAll('.stretched-link')
                    defaultFetched.push(links)
                    alphaSort(defaultFetched);
                } else {
                    let page
                    mags = notificationsXML.querySelector('.magazines-columns');
                    links = mags.querySelectorAll('.stretched-link');
                    const username = notificationsXML.querySelector('.login').getAttribute("href").split('/')[2];
                    const paginator = notificationsXML.querySelector('.pagination__item.pagination__item--next-page');
                    if (paginator) {
                        const tip = paginator.getAttribute("href")
                        if (tip) {
                            page = tip.split('=')[1]
                        }
                    }
                    fetchedMags.push(links);
                    if (links.length < 48) {
                        alphaSort(fetchedMags)
                    } else {
                        const url = `https://${hostname}/u/${username}/subscriptions?p=${page}`
                        genericXMLRequest(url, parseMags)
                    }
                }
            }
            function alphaSort (links) {
                const clean = []
                for (let i = 0; i < links.length; ++i) {
                    links[i].forEach((link) => {
                        clean.push(link.href.split('/')[4])
                        clean.sort().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                    });
                }
                saveMags(str, clean)
            }
            function updateVisible () {
                let pos
                const vis = []
                $("#kes-omni li:visible").each(function () {
                    vis.push($(this)[0])
                })
                for (let j = 0; j < vis.length; ++j) {
                    if (vis[j].className === kesActive) {
                        pos = j
                    }
                }
                makeInactive(vis[pos]);
                return [vis, pos]
            }
            function makeInactive (name) {
                const c = kesActive;
                name.classList.remove(c);
            }
            function makeActive (name) {
                const c = kesActive;
                name.classList.add(c);
            }
            function scrollList (direction, el) {
                const active = '.kes-subs-active'
                const scroll = '#kes-omni-scroller'
                const activeEl = document.querySelector(active)
                const scrollEl = document.querySelector(scroll)
                let currentElGeom;
                let scrollerGeom;

                if (direction === 'down') {
                    currentElGeom = activeEl.getBoundingClientRect().bottom
                    scrollerGeom = scrollEl.getBoundingClientRect().bottom
                    if ((currentElGeom > scrollerGeom) || (currentElGeom < 0)) {
                        el.scrollIntoView();
                    }
                } else {
                    currentElGeom = activeEl.getBoundingClientRect().top;
                    const currentElGeomBot = activeEl.getBoundingClientRect().bottom;
                    scrollerGeom = scrollEl.getBoundingClientRect().top;
                    const scrollerGeomBot = scrollEl.getBoundingClientRect().bottom;
                    if ((currentElGeom < scrollerGeom) || (currentElGeomBot > scrollerGeomBot)) {
                        el.scrollIntoView();
                    }
                }
            }
            function kickoffListener (e) {
                if (e.key !== code) return
                e.preventDefault();
                const exists = document.querySelector('.kes-omni-modal')
                if (exists) {
                    if ($(exists).is(":visible")) {
                        $(exists).hide();
                    } else {
                        $(exists).show();
                        if (!mobile) {
                            document.querySelector("#kes-omni-search").focus();
                        }
                    }
                }
            }
            function updateCounter (el, found, total) {
                el.innerText = found + '/' + total
            }
            function omni (subs) {
                const kesModal = document.createElement('div')
                kesModal.className = "kes-omni-modal"
                kesModal.addEventListener('click', (e) =>{
                    if ((e.target.tagName === "UL") || (e.target.tagName === "DIV")) {
                        const torem = document.querySelector('.kes-omni-modal')
                        $(torem).hide();
                    }
                });
                const entryholder = document.createElement('ul')
                const search = document.createElement('input')
                search.type = "search"
                search.id = "kes-omni-search"
                search.setAttribute
                search.addEventListener("keydown", (e) => {
                    switch (e.key) {
                        case code: {
                            kickoffListener(e)
                            break;
                        }
                        case "ArrowDown": {
                            e.preventDefault();
                            let packed = updateVisible();
                            let vis = packed[0]
                            let pos = packed[1]
                            pos = ++pos
                            if (pos >= vis.length) {
                                pos = 0
                            }
                            makeActive(vis[pos]);
                            scrollList('down', vis[pos]);
                            break;
                        }
                        case "ArrowUp": {
                            e.preventDefault();
                            let packed = updateVisible();
                            let vis = packed[0]
                            let pos = packed[1]
                            pos = --pos
                            if (pos < 0) {
                                pos = (vis.length - 1)
                            }
                            makeActive(vis[pos]);
                            scrollList('up', vis[pos]);
                            break;
                        }
                    }
                });
                search.addEventListener("keyup", (e) => {
                    switch (e.key) {
                        case "Enter": {
                            const act = document.querySelector("#kes-omni-list li.kes-subs-active")
                            const dest = act.textContent
                            window.location = `https://${hostname}/m/${dest}`
                            break;
                        }
                        case "ArrowUp": {
                            e.preventDefault();
                            break;
                        }
                        case "ArrowDown": {
                            break;
                        }
                        case code: {
                            break;
                        }
                        default: {
                            const visi = []
                            const filter = e.target.value
                            const parEl = e.target.parentElement
                            const visiEl = parEl.querySelectorAll('li')
                            for (let i = 0; i < visiEl.length; i++) {
                                let t = visiEl[i].textContent
                                if (t.toLowerCase().indexOf(filter) > -1) {
                                    visi.push(visiEl[i])
                                    visiEl[i].style.display = "";
                                } else {
                                    visiEl[i].style.display= "none";
                                    makeInactive(visiEl[i])
                                }
                            }
                            for (let k = 0; k < visi.length; ++k) {
                                if (k === 0) {
                                    makeActive(visi[k])
                                } else {
                                    makeInactive(visi[k])
                                }
                            }
                            const el = document.querySelector('#kes-omni-counter')
                            if (filter === "") {
                                updateCounter(el,0,visiEl.length)
                            } else {
                                updateCounter(el, visi.length, visiEl.length);
                            }
                        }
                    }
                });

                entryholder.id = 'kes-omni-list'
                const innerholder = document.createElement('div')
                innerholder.id = 'kes-omni'
                const headerCounter = document.createElement('div')
                headerCounter.id = 'kes-omni-counter'
                innerholder.appendChild(headerCounter)

                const user = document.querySelector('.login');
                const username = user.href.split('/')[4];
                if (!username) {
                    const label = document.createElement('div')
                    label.innerText = 'not logged in'
                    label.id = 'kes-omni-warning'
                    innerholder.appendChild(label);
                }

                innerholder.appendChild(search);
                const scroller = document.createElement('div');
                scroller.id = 'kes-omni-scroller';
                for (let i = 0; i <subs.length; ++i) {
                    let outerA = document.createElement('a')
                    let entry = document.createElement('li');
                    if (i === 0) {
                        entry.className = kesActive
                    }
                    entry.innerText = subs[i];
                    outerA.appendChild(entry)
                    outerA.href = `https://${hostname}/m/${subs[i]}`
                    scroller.appendChild(outerA);
                }
                updateCounter(headerCounter, 0, subs.length)
                innerholder.appendChild(scroller)
                entryholder.appendChild(innerholder)
                kesModal.appendChild(entryholder)
                innerholder.addEventListener('mouseover', (e) => {
                    const o = e.target.parentNode.parentNode
                    const old = o.querySelector('.' + kesActive)
                    if (e.target.tagName === "LI") {
                        makeInactive(old)
                        makeActive(e.target)
                    }
                });

                if (mobile) {
                    const top = document.querySelector('body');
                    const mobileBar = document.createElement('div');
                    mobileBar.id = 'kes-omni-tapbar';
                    mobileBar.style.cssText = 'background-color: var(--kbin-alert-info-link-color); height: 15px'
                    top.insertBefore(mobileBar, top.children[0])

                    mobileBar.addEventListener('click', () => {
                        const toShow = document.querySelector('.kes-omni-modal')
                        if ($(toShow).is(":visible")) {
                            $(toShow).hide();
                        } else {
                            $(toShow).show();
                        }
                    });

                }

                kesModal.style.display = 'none';
                document.body.appendChild(kesModal)

                function keyTrap (e) {
                    if (e.target.tagName === "INPUT") return
                    if ((e.target.tagName === "TEXTAREA") && (e.target.id !== 'kes-omni-search')) return
                    const kt = document.querySelector('#kes-omni-keytrap')
                    kt.focus()
                }

                const pageHolder = document.querySelector('.kbin-container')
                const kth = document.createElement('div');
                kth.style.cssText = 'height: 0px; width: 0px'
                const ktb = document.createElement('button')
                ktb.style.cssText = 'opacity:0;width:0'
                ktb.id = 'kes-omni-keytrap'
                kth.appendChild(ktb)
                pageHolder.insertBefore(kth, pageHolder.children[0])
                ktb.addEventListener('keyup',kickoffListener)
                const globalKeyInsert = document.querySelector('[data-controller="kbin notifications"]')
                globalKeyInsert.addEventListener('keydown',keyTrap)


            }
        }
        if (toggle) {
            createOmni();
        } else {
            const e = []
            safeGM("setValue",`omni-user-mags-${hostname}-${username}`, e)
            safeGM("setValue",`omni-default-mags-${hostname}`, e)
            const kt = document.querySelector('#kes-omni-keytrap')
            const q = document.querySelector('.kes-omni-modal')
            if (kt) {
                kt.remove();
            }
            if (q) {
                q.remove();
            }
        }
    }
,

    clarify_recipient:

    function clarifyRecipientInit (toggle) { // eslint-disable-line no-unused-vars
        function rewrite (title) {
            const self = document.querySelector('.dropdown .login').getAttribute("href").split('/')[2]
            const loc = window.location.href.split('/')[3]
            let recipientName
            if (loc === "profile") {
                const recipient = document.querySelector('.user-inline:not([href="/u/' + self + '"])')
                recipientName = recipient.href.split('/')[4]
            } else {
                recipientName = window.location.href.split('/')[4]
            }

            title.innerText = "Sending message to " + recipientName
        }
        function reset (title) {
            title.innerText = "Body"
        }

        const ar = window.location.href.split('/')
        if ((ar[3] != "profile") && (ar[4] != "messages") && (ar[3] != "u")) return
        const title = document.querySelector('form[name="message"] .required')
        if (!title) return
        if (toggle) {
            rewrite(title);
        } else {
            reset(title);
        }
    }
,

    label:

    function labelOp (toggle) { // eslint-disable-line no-unused-vars
        if (getInstanceType() === "mbin") return // eslint-disable-line no-undef
        if (toggle) {
            let settings = getModSettings("labelcolors");
            let fg = settings["fgcolor"];
            let bg = settings["bgcolor"];
            const labelCSS = `
                    blockquote.author > header > a.user-inline::after {
                    content: 'OP';
                    font-weight: bold;
                    color: ${fg};
                    background-color: ${bg};
                    margin-left: 4px;
                    padding: 0px 5px 0px 5px;
                }
                body.rounded-edges blockquote.author a.user-inline::after {
                    border-radius: var(--kbin-rounded-edges-radius);
                }
            `;
            safeGM("addStyle", labelCSS, "labelop-css")
        } else {
            safeGM("removeStyle", "labelop-css")
        }
    }
,

    hide_reputation:

    function hideReputation (toggle) { //eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         kbin Vote Hider
        // @namespace    https://github.com/aclist
        // @version      0.2
        // @description  Hide upvotes, downvotes, and karma
        // @author       artillect
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        if (toggle) {
            $('#sidebar > section.section.user-info > ul > li:nth-child(2)').hide();
            document.styleSheets[0].addRule('.user-popover ul li:nth-of-type(2)','display:none')
        } else {
            $('#sidebar > section.section.user-info > ul > li:nth-child(2)').show();
            document.styleSheets[0].addRule('.user-popover ul li:nth-of-type(2)','display:initial')
        }
    }
,

    unsanitize_css:

    /**
     * Kbin currently wrongly sanitizes its custom CSS (as defined by magazines and users),
     * causing some characters to be replaced by HTML escape codes. This breaks CSS rules involving,
     * for example, the direct descendant selector (>) or nested CSS using the & character.
     * 
     * This mod aims to fix that issue until kbin does.
     * 
     * @param {Boolean} isActive Whether the mod has been turned on
     */
    function fixWronglySanitizedCss (isActive) { // eslint-disable-line no-unused-vars
        if (isActive) {
            setup();
        } else {
            teardown();
        }

        function setup () {
            var dummy = document.createElement("div");
            document.querySelectorAll("style:not([id])").forEach((style) => {
                dummy.innerHTML = style.textContent;
                if (dummy.innerHTML != dummy.textContent) {
                    style.textContent = dummy.textContent;
                    markAsUnsanitized(style);
                }
            });
            dummy.remove();
        }

        function teardown () {
            var dummy = document.createElement("div");
            Array.from(document.querySelectorAll("style:not([id])"))
                .filter((style) => isUnsanitized(style))
                .forEach((style) => {
                    dummy.textContent = style.textContent;
                    style.textContent = dummy.innerHTML;
                    markAsSanitized(style);
                });
            dummy.remove();
        }

        /** @param {HTMLElement} elem @returns {Boolean} */
        function isUnsanitized (elem) {
            return elem.dataset.unsanitized;
        } 
        /** @param {HTMLElement} elem */
        function markAsUnsanitized (elem) {
            elem.dataset.unsanitized = true;
        }
        /** @param {HTMLElement} elem */
        function markAsSanitized (elem) {
            delete elem.dataset.unsanitized;
        }
    }
,

    notifications_panel:

    function notificationsPanel (toggle) { // eslint-disable-line no-unused-vars
        const spinnerCSS = `
        @keyframes spinner {
            0% {
                transform: translate3d(-50%, -50%, 0) rotate(0deg);
            }
            100% {
                transform: translate3d(-50%, -50%, 0) rotate(360deg);
            }
        }
        .loadingmsg::before {
            animation: 1.5s linear infinite spinner;
            animation-play-state: inherit;
            border: solid 5px #cfd0d1;
            border-bottom-color: #1c87c9;
            border-radius: 50%;
            content: "";
            height: 40px;
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            will-change: transform;
        }
        `;
        const iframeCSS = `
        position: absolute;
        z-index: 9999;
        top:100%;
        right: 0;
        left: auto;
        transform: rotateX(0)translateX(-20%);
        resize: vertical;
        min-height: 360px;
        height: 360px;
        user-select: none;
        opacity: 1;
        visibility: visible;
        `;
        const customPanelCSS = `
        #header .notification-button .badge {
            font-size:.8em;padding:.1em .4em
        }
        #header menu li a:has(~.notification-counter:hover){
            border-bottom:var(--kbin-header-hover-border)
        }
        .notifications-iframe::-webkit-scrollbar {
            width: 8px;
        }
        .notifications-iframe::-webkit-scrollbar-thumb {
            background: gray;
            border-radius: 5px;
            border: 2px solid transparent;
        }
        #header .notification-button .notification-counter {
            border: 0 !important;
            padding: 4.5px;
            display: inline;
            position: absolute;
            top: .5em;
            margin-left: -0.5em;
            text-align: center;
        }
        .notifications-iframe {
            width: 300px;
        }
        .notification-button,.notification-counter {
            cursor: pointer;
        }
        .noti-panel-message-holder {
            overflow-y: scroll;
            height: 90%;
        }
        .noti-panel-sender,
        .noti-panel-snippet {
            padding: 0 !important;
        }
        .noti-panel-snippet {
            display: block !important;
            margin-top: .5rem;
        }
        .noti-panel-sender {
            width: fit-content !important;
            display: inline !important;
        }
        .noti-panel-message {
            padding: .8rem;
            border: var(--kbin-section-border);
            border-top: 0;
            border-left: 0;
            border-right: 0;
        }
        .noti-panel-message:hover {
            background: var(--kbin-bg);
        }
        .noti-panel-time {
            display: inline-block;
            opacity: .5;
        }
        .noti-panel-time:before {
            content: "·";
            margin: 0 5px;
        }
        .noti-panel-header {
            background: var(--kbin-button-primary-bg);
            display: flex;
            padding: 5px;
        }
        .noti-arrow-holder {
            margin-left: auto
        }
        .noti-read, .noti-purge {
            background: var(--kbin-button-secondary-hover-bg);
            margin-left: 7px;
        }
        .noti-read,.noti-purge,.noti-back,.noti-forward {
            padding: 5px;
            cursor: pointer;
        }
        .noti-read:hover,.noti-purge:hover {
            opacity: var(--noti-button-opacity);
        }
        .noti-back:hover,.noti-forward:hover{
            opacity: 0.7;
        }
        .noti-no-messages {
            font-size: 1rem;
            position: absolute;
            top: 30%;
            margin-left: 91.5px;
        }
        `;

        const clickModalCSS = `
        position: fixed;
        z-index: 98;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        `
        const forceDropdownCSS = `
        .notifications-iframe.dropdown__menu a, .notifications-iframe.dropdown__menu button {
            display: initial !important;
            padding: initial !important;
        }
        #header .dropdown__menu {
            display: block !important
        }
        `
        const resetDropdownCSS = `
        .notifications-iframe.dropdown__menu a, .notifications-iframe.dropdown__menu button {
            display: block !important;
            padding: .5rem 1rem !important;
        }
        `
        const notificationsURL = 'https://' + window.location.hostname + '/settings/notifications'

        function readAndReset () {
            const counter = document.querySelector('.notification-counter');
            if (counter) {
                counter.remove();
            }
            genericXMLRequest(notificationsURL + '?p=1', insertMsgs);
        }

        function genericPOSTRequest (url, callback, data) {
            safeGM("xmlhttpRequest", {
                method: 'POST',
                onload: callback,
                data: 'token=' + data,
                url: url,
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "text/xml",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        }

        function clearPanel () {
            $('.noti-panel-header').remove();
            $('.noti-panel-message-holder').remove();
            let oldPanel = document.querySelector('.notifications-iframe.dropdown__menu')
            let loading = document.createElement('div')
            loading.className = "loadingmsg"
            loading.style.cssText = spinnerCSS
            oldPanel.appendChild(loading)
        }

        async function insertMsgs (response) {
            const noMsgs = document.createElement('text');
            noMsgs.className = 'noti-no-messages';
            noMsgs.innerText = 'No new notifications!';
            let loadingSpinner = document.querySelector('.loadingmsg')
            let iff = document.querySelector('.notifications-iframe');
            let parser = new DOMParser();
            let notificationsXML = parser.parseFromString(response.responseText, "text/html");
            const readTokenEl = notificationsXML.querySelector('.pills menu form[action="/settings/notifications/read"] input')
            const readToken = readTokenEl.value
            const purgeTokenEl = notificationsXML.querySelector('.pills menu form[action="/settings/notifications/clear"] input')
            const purgeToken = purgeTokenEl.value
            let currentPage = notificationsXML.all[6].content.split('=')[1]
            let currentPageInt = parseInt(currentPage)
            let sects = notificationsXML.querySelectorAll('.notification');
            if (sects.length === 0) {
                loadingSpinner.remove();
                iff.appendChild(noMsgs);
                return;
            }
            const links = []
            const names = []
            const times = []
            const msgs = []
            const read = []

            sects.forEach((item) => {
                let readStatus = item.className
                if (readStatus.indexOf('opacity-50') > -1) {
                    read.push("read")
                } else {
                    read.push("unread")
                }
                let rawName = item.querySelector('a:nth-of-type(1)').href
                let hrName = rawName.split('/')[4]
                let remoteMsg = item.querySelector('a:nth-of-type(2)').innerText
                let rawLink = item.querySelector('a:nth-of-type(2)').href
                let remoteLink = rawLink.replace('?id=','/')
                let remoteTime = item.querySelector('.timeago').innerText;
                names.push(hrName);
                links.push(remoteLink);
                times.push(remoteTime);
                msgs.push(remoteMsg);
            });
            let div
            let nameEl
            let msgEl
            let timeEl
            loadingSpinner.remove();

            const notiHolder = document.createElement('div')
            notiHolder.className = 'noti-panel-holder'

            const notiHeader = document.createElement('div');
            notiHeader.className = 'noti-panel-header';

            const readButton = document.createElement('span');
            const purgeButton = document.createElement('span');
            const arrowHolder = document.createElement('span');
            arrowHolder.className = 'noti-arrow-holder'

            const backButton = document.createElement('i');
            backButton.className = 'noti-back fa-solid fa-arrow-left';

            const forwardButton = document.createElement('i');
            forwardButton.className = 'noti-forward fa-solid fa-arrow-right';

            readButton.className = 'noti-read';
            readButton.innerText = 'Read';

            purgeButton.className = 'noti-purge';
            purgeButton.innerText = 'Purge';
            purgeButton.style.setProperty('--noti-button-opacity', '0.7')

            notiHeader.appendChild(readButton);
            notiHeader.appendChild(purgeButton);

            let unreads
            for (let i = 0; i < read.length; ++i) {
                if (read[i] === "unread") {
                    unreads = true;
                    break;
                }
            }
            if (unreads) {
                readButton.style.setProperty('--noti-button-opacity','0.7')
                readButton.addEventListener('click', () => {
                    clearPanel();
                    genericPOSTRequest(notificationsURL + '/read', readAndReset, readToken);
                });
            } else {
                readButton.style.opacity = 0.7;
                readButton.style.cursor = 'unset';
            }
            purgeButton.addEventListener('click', () => {
                clearPanel();
                genericPOSTRequest(notificationsURL + '/clear', readAndReset, purgeToken);
            });

            if (currentPageInt != 1) {
                arrowHolder.appendChild(backButton);
                backButton.addEventListener('click', () => {
                    clearPanel();
                    genericXMLRequest(notificationsURL + '?p=' + (currentPageInt - 1),insertMsgs);
                });
            }
            let testNextPage = notificationsXML.querySelector('a.pagination__item--next-page')
            if (testNextPage) {
                arrowHolder.appendChild(forwardButton);
                forwardButton.addEventListener('click', () => {
                    clearPanel();
                    genericXMLRequest(notificationsURL + '?p=' + (currentPageInt + 1),insertMsgs);
                });
            }
            notiHeader.appendChild(arrowHolder);
            iff.appendChild(notiHeader)
            const notiMsgHolder = document.createElement('div')
            iff.appendChild(notiMsgHolder)
            notiMsgHolder.className = "noti-panel-message-holder"

            for(let i = 0; i < msgs.length; i++) {
                div = document.createElement('div')
                if (read[i] === "read") {
                    div.className = "noti-panel-message opacity-50"
                } else {
                    div.className = "noti-panel-message"
                }

                msgEl = document.createElement('a')
                nameEl = document.createElement('a')
                timeEl = document.createElement('text')

                timeEl.innerText = times[i]
                timeEl.style.cssText = "margin-left: 10px; color:white"
                timeEl.className = "noti-panel-time"

                msgEl.href= links[i]
                msgEl.innerText = msgs[i]
                msgEl.style.cssText = "margin-left: 10px"
                let msgIndex = msgEl.href.split('/')[4]
                if (msgIndex === "messages" ) {
                    msgEl.className = "noti-panel-snippet noti-message"
                } else {
                    msgEl.className = "noti-panel-snippet"
                }

                nameEl.href = 'https://' + window.location.hostname + '/u/' + names[i];
                nameEl.innerText = names[i];
                nameEl.className = "noti-panel-sender"

                div.appendChild(nameEl);
                div.appendChild(timeEl);
                div.appendChild(msgEl);
                notiMsgHolder.appendChild(div)
            }
        }

        function startup () {
            safeGM("addStyle",customPanelCSS);
            safeGM("addStyle",spinnerCSS);
            build();
        }

        function toggleIframe (listItem) {
            const existingIframe = listItem.querySelector('.notifications-iframe');

            if (existingIframe) {
                existingIframe.remove();
                return
            }

            const iframe = document.createElement('div');
            iframe.className = 'notifications-iframe dropdown__menu';
            iframe.style.cssText = iframeCSS

            let loading = document.createElement('div')
            loading.className = "loadingmsg"
            loading.style.cssText = spinnerCSS
            iframe.appendChild(loading)

            let clickModal = document.createElement('div')
            clickModal.className = "clickmodal"
            clickModal.style.cssText = clickModalCSS
            clickModal.addEventListener('click', () => {
                iframe.remove();
                clickModal.remove();
                safeGM("addStyle",resetDropdownCSS)
            })
            document.querySelector('.kbin-container').appendChild(clickModal)
            listItem.appendChild(iframe);
            genericXMLRequest(notificationsURL + '?p=1',insertMsgs);
        }

        function build () {
            const notiPanel = document.querySelector('li.notification-button');
            if (notiPanel) return
            const parentElement = document.querySelector('.header .kbin-container');
            if (parentElement) {
                const listItem = document.createElement('li');
                listItem.classList.add('notification-button');

                const anchorOuterElement = document.createElement('a');
                const anchorElement = document.createElement('i');
                anchorOuterElement.appendChild(anchorElement);
                //anchorElement.textContent = ' ';
                anchorElement.classList.add('fa-solid', 'fa-bell');
                //anchorElement.style.cursor = 'pointer';
                anchorElement.setAttribute('aria-label', 'Notifications');
                anchorElement.setAttribute('title', 'Notifications');

                listItem.appendChild(anchorOuterElement);

                const siblingElement = document.querySelector('.dropdown .login').parentElement;

                if (siblingElement) {
                    siblingElement.parentElement.insertBefore(listItem, siblingElement);
                }

                const counterElement = document.querySelector('.counter > [href="/settings/notifications"]');
                const msgCounterElement = document.querySelector('.counter > [href="/profile/messages"]');
                let msgCount = 0;
                if (msgCounterElement) {
                    msgCount = parseInt(msgCounterElement.querySelector('.badge').innerText);
                    $(msgCounterElement).hide();
                }
                let oldCount = 0;
                if (counterElement) {
                    oldCount = parseInt(counterElement.querySelector('.badge').innerText);
                    $(counterElement).hide();
                }
                const notiPanelCount = msgCount + oldCount
                if (notiPanelCount > 0) {
                    const notiBadgeHolder = document.createElement('li')
                    const notiBadge = document.createElement('span');
                    notiBadgeHolder.appendChild(notiBadge);
                    notiBadge.classList.add('counter', 'badge', 'danger-bg', 'notification-counter')
                    notiBadge.innerText = notiPanelCount;
                    anchorOuterElement.appendChild(notiBadgeHolder);
                }
                anchorOuterElement.addEventListener('click', () => {
                    safeGM("addStyle",forceDropdownCSS);
                    toggleIframe(listItem)
                });
            }
        }

        function shutdown () {
            const notiPanel = document.querySelector('li.notification-button');
            if (notiPanel) {
                const msgCounterElement = document.querySelector('.counter > [href="/profile/messages"]');
                const counterElement = document.querySelector('.counter > [href="/settings/notifications"]');
                $(msgCounterElement).show();
                $(counterElement).show();
                notiPanel.remove();
            }
        }

        if (toggle) {
            startup();
        } else {
            shutdown();
        }
    }
,

    mag_instance_names:

    function magInstanceEntry (toggle) { // eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         Magazine Instance Names
        // @namespace    https://github.com/aclist
        // @version      0.1
        // @description  Shows instance names next to non-local magazines
        // @author       artillect
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        const path = window.location.href.split('/')
        if ((path[3] === "m") || (path[3] === "magazines")) return
        function showMagInstances () {
            $('.magazine-inline').each(function () {
                // Check if community is local
                if (!$(this).hasClass('instance')) {
                    $(this).addClass('instance');
                    // Get community's instance from their profile link
                    var magInstance = $(this).attr('href').split('@')[1];
                    // Check if community's link includes an @
                    if (magInstance) {
                        // Add instance name to community's name
                        $(this).html($(this).html() + '<span class="mag-instance">@' + magInstance + '</span>');
                    }
                }
            });
        }
        function hideCommunityInstances () {
            $('.magazine-inline.instance').each(function () {
                $(this).removeClass('instance');
                $(this).html($(this).html().split('<span class="mag-instance">@')[0]);
            });
        }
        //const localInstance = window.location.href.split('/')[2];
        if (toggle) {
            showMagInstances();
        } else {
            hideCommunityInstances();
        }
    }
,

    alt_all_content_access:

    /**
     * This mod aims to make clicking the magazine name in the navbar lead to the All Content
     * view instead of the Threads view, while removing the All Content button itself.
     * 
     * @param {Boolean} isActive Whether the mod has been turned on
    */
    function altAllContentAccess (isActive) {  // eslint-disable-line no-unused-vars
        const titleList = getTitle();
        const buttons = getAllContentButton();

        if (titleList.length == 0) return;
        if (buttons.length == 0) return;
        if (isActive) {
            setup();
        } else {
            teardown();
        }

        function setup () {
            const currentViewIsCollection = isCurrentViewCollection();
            titleList.forEach((title) => {
                const href = title.getAttribute("href");
                if (!currentViewIsCollection && !href.startsWith("/*/")) {
                    title.setAttribute("href", `/*${href}`);
                } else if (currentViewIsCollection && !href.endsWith("/*")) {
                    title.setAttribute("href", `${href}/*`);
                }
            });
            setButtonVisibility(true);
        }

        function teardown () {
            titleList.forEach((title) => {
                const href = title.getAttribute("href");
                if (href.startsWith("/*/")) title.setAttribute("href", href.slice(2));
                else if (href.endsWith("/*")) title.setAttribute("href", href.slice(0, href.length-2));
            });
            setButtonVisibility(false);
        }

        /**
         * Checks whether the existing All Content button should be hidden.
         * 
         * @returns {Boolean}
         */
        function doHideButton () {
            return getModSettings("alt-all-content-access")["hideAllContentButton"];
        }

        /**
         * Retrieves both the regular and the mobile button.
         * @returns {HTMLElement[]}
         */
        function getAllContentButton () {
            const threadsAttributePattern = "[href^='/*']";
            const collectionsAttributePattern = "[href$='/*']";
            const allContentQuery = "menu.head-nav__menu > li > a";
            const allContentMobileQuery = "div.mobile-nav menu.info a";
            return Array.from(
                document.querySelectorAll(`
                    ${allContentQuery}${threadsAttributePattern}, 
                    ${allContentMobileQuery}${threadsAttributePattern},
                    ${allContentQuery}${collectionsAttributePattern}, 
                    ${allContentMobileQuery}${collectionsAttributePattern}
                `)
            );
        }

        /**
         * Retrieves the clickable magazine name title, both the regular one and the mobile one..
         * @returns {HTMLElement[]}
         */
        function getTitle () {
            return Array.from(document.querySelectorAll("div.head-title a"));
        }

        /**
         * Makes the buttons appear or disappear depending on the setting in KES and whether the mod
         * is turned on or off.
         */
        function setButtonVisibility () {
            buttons.forEach((button) => {
                /** @type {HTMLElement} */
                const parent = button.parentNode;
                if (doHideButton() && isActive) parent.style.display = "none";
                else parent.style.removeProperty("display");
            });
        }

        /**
         * The All Content URL of collections works differently.
         * @returns {Boolean}
         */
        function  isCurrentViewCollection () {
            return buttons[0].getAttribute("href").endsWith("/*");
        }
    }
,

    code_highlighting:

    function initCodeHighlights (toggle) { // eslint-disable-line no-unused-vars
        /* global hljs */
        let kchCssUrl;
        safeGM("addStyle",`
        .kch-collapsed {
            display: none !important;
        }
        .hljs.kch_header {
            padding-top: 10px;
            padding-bottom: 10px;
        }
        code.hljs {
            border-top: 2px solid;'
        }
        .hljs-keyword {
            margin-left: 20px;
        }

        `);
        function kchStartup () {
            addHeaders('pre code');
            setCss(kchCssUrl);
        }
        function kchShutdown () {
            safeGM("removeStyle", "kch-hljs")
            const clicker = document.querySelector('#kch-clicker')
            if (clicker) {
                const comms = document.querySelector('#comments')
                clicker.before(comms)
                clicker.remove()
            }
            $('.kch_header').remove();
        }
        function addTags (item) {
            if (item.parentElement.querySelector('.kch_header')) return
            let lang;

            if (item.previousSibling) {
                if (item.previousSibling.className === "hljs kch_header") return
            }
            for (let name of item.className.split(' ')) {
                if (name.includes('-')) {
                    lang = name.split('-')[1];
                    break;
                }
            }
            const header = document.createElement('div');
            header.className = 'hljs kch_header';

            const span = document.createElement('span');
            span.className = 'hljs-keyword'
            span.innerHTML = lang;

            // TODO: create static stylesheet
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-copy hljs-section';
            icon.setAttribute('aria-hidden', 'true');
            icon.style = 'margin-left: 10px; cursor: pointer;';
            const span_copied = document.createElement('span');
            span_copied.id = 'copied-tooltip';
            span_copied.innerHTML = 'COPIED!';
            span_copied.style = 'display: none; margin-left: 10px;';
            const hide_icon = document.createElement('i');
            hide_icon.className = 'fa-solid fa-chevron-up hljs-section';
            hide_icon.setAttribute('aria-hidden', 'true');
            hide_icon.style = 'float: right; margin-right: 20px; cursor: pointer;';

            header.appendChild(span);
            header.appendChild(icon);
            header.appendChild(span_copied);
            header.appendChild(hide_icon);
            item.parentElement.prepend(header);

            //for compatibility with collapsible comments mod
            //outer clicker is immune to changes in the comments tree
            //and uses event delegation to filter clicks
            if (document.querySelector('#kch-clicker')) return
            const clicker = document.createElement('div')
            clicker.id = 'kch-clicker'
            const comms = document.querySelector('#comments')
            comms.before(clicker)
            clicker.appendChild(comms)
            clicker.addEventListener('click', captureHeaderClicks, event)
        }
        function captureHeaderClicks (e) {
            switch (e.target.className) {
                case "fa-solid fa-copy hljs-section": {
                    const par = e.target.parentElement
                    const next = getNextValidSibling(par);
                    navigator.clipboard.writeText(next.innerText);
                    const t = document.querySelector('#copied-tooltip')
                    t.style.display = 'inline';
                    setTimeout(function () {
                        t.style.display = 'none';
                    }, 1000);
                    break;
                }
                case "fa-solid fa-chevron-up hljs-section": {
                    e.target.className = 'fa-solid fa-chevron-down hljs-section'
                    toggleCollapse(e.target);
                    break;
                }
                case "fa-solid fa-chevron-down hljs-section": {
                    e.target.className = 'fa-solid fa-chevron-up hljs-section'
                    toggleCollapse(e.target);
                    break;
                }
            }
        }
        function toggleCollapse (child) {
            const par = child.parentElement
            const next = getNextValidSibling(par);
            next.classList.toggle('kch-collapsed')
        }
        function getNextValidSibling (el) {
            let next
            next = el.nextSibling
            if (next.style.display === "none") {
                next = el.nextSibling.nextSibling
            }
            return next

        }
        function setCss (url) {
            safeGM("xmlhttpRequest",{
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "text/css"
                },
                onload: function (response) {
                    safeGM("addStyle", response.responseText, "kch-hljs");
                }
            });
        }
        function addHeaders (selector) {
            document.querySelectorAll(selector).forEach((item) => {
                if (!(item.classList.contains('hljs'))) {
                    hljs.highlightElement(item);
                }
                if (item.style.display === "none") return
                addTags(item);
            });
        }
        if (toggle) {
            const settings = getModSettings("codehighlights");
            const myStyle = settings["style"];
            const prefix = "https://raw.githubusercontent.com"
            const suffix = "highlightjs/highlight.js/main/src/styles/base16"
            kchCssUrl = `${prefix}/${suffix}/${myStyle}.css`
            kchStartup();
            hljs.configure({ ignoreUnescapedHTML: true });
            hljs.highlightAll();
        } else {
            kchShutdown();
        }
    }
,

    rearrange:

    function rearrangeInit (toggle) { // eslint-disable-line no-unused-vars
        function rearrangeSetup () {
            if (window.location.href.split('#')[1] != 'comments') return
            const settings = getModSettings('rearrange');
            const content = document.querySelector('#content');
            content.style.display = 'grid';
            const op = document.querySelector('.section--top');
            const activity = document.querySelector('#activity');
            const post = document.querySelector('#comment-add');
            const options = document.querySelector('#options');
            const comments = document.querySelector('#comments');

            op.style.order = settings["op"]
            activity.style.order = settings["activity"]
            post.style.order = settings["post"]
            options.style.order = settings["options"]
            comments.style.order = settings["comments"]
        }
        if (toggle) {
            rearrangeSetup();
        } else {
            const content = document.querySelector('#content');
            content.style.display = 'unset';
        }
    }
,

    fix_codeblocks:

    /**
     * Lemmy federates its code blocks with syntax highlighting, but /kbin doesn't currently 
     * correctly handle that. It just displays the additional <span> tags for the syntax
     * highlighting in plain text. This makes the code very hard to read.
     * This mod fixes the issue by removing those erroneous tags.
     * 
     * @param {Boolean} isActive Whether the mod has been turned on
     */
    function fixLemmyCodeblocks (isActive) { // eslint-disable-line no-unused-vars
        /** @type {String} */
        const STYLEPATTERN = "((font-style:italic|font-weight:bold);)?color:#[0-9a-fA-F]{6};";
    
        if (isActive) {
            setup();
        } else {
            teardown();
        }

        function setup () {
            getCodeBlocks()
                .filter((code) => isErroneousCode(code))
                .filter((code) => !isFixed(code))
                .forEach((code) => fix(code));
        }

        function teardown () {
            getCodeBlocks(true).forEach((code) => {
                /** @type {HTMLElement} */
                code.nextElementSibling.remove();
                code.style.removeProperty("display");
                markAsUnfixed(code);
            });
        }

        /**
         * Repairs a given code block.
         * @param {HTMLElement} original The code block that needs to be fixed
         */
        function fix (original) {
            const fixed = document.createElement("code");
            original.after(fixed);

            const start = new RegExp(`^\\n?<span style="${STYLEPATTERN}">`);
            const end = new RegExp(`\\n<\\/span>\\n?$`);
            const combined = new RegExp(`<\\/span><span style="${STYLEPATTERN}">`, "g");

            fixed.textContent = original.textContent
                .replace(start, "")
                .replaceAll(combined, "")
                .replace(end, "");

            original.style.display = "none";
            markAsFixed(original);
        }

        /**
         * Checks whether a given code block needs to be fixed.
         * @param {HTMLElement} code
         * @returns {Boolean}
         */
        function isErroneousCode (code) {
            const pattern = new RegExp(`^\\n?<span style="${STYLEPATTERN}">(.+\\n)+<\\/span>\\n?$`);
            return pattern.test(code.textContent);
        }

        /**
         * @param {Boolean} fixedCodeOnly Whether to only return those code blocks that have been fixed 
         * (optional)
         * @returns {HTMLElement[]} A list of all the code blocks on the page
         */
        function getCodeBlocks (fixedCodeOnly = false) {
            const allBlocks = Array.from(document.querySelectorAll("pre code"));
            return fixedCodeOnly
                ? allBlocks.filter((block) => isFixed(block))
                : allBlocks;
        }

        /** @param {HTMLElement} elem @returns {Boolean} */
        function isFixed (elem) {
            return elem.dataset.fixed;
        } 
        /** @param {HTMLElement} */
        function markAsFixed (elem) {
            elem.dataset.fixed = true;
        }
        /** @param {HTMLElement} */
        function markAsUnfixed (elem) {
            delete elem.dataset.fixed;
        }
    }
,

    dropdown:

    function dropdownEntry (toggle) { // eslint-disable-line no-unused-vars
        function addDropdown (user, testMsg) {
            function addOption (item) {
                const text = item.innerText;
                const val = text.substring(0, text.indexOf(' '));
                const option = document.createElement("option");
                const selectList = document.querySelector("#options select");
                option.setAttribute("value", val);
                option.text = text;
                selectList.appendChild(option);
            }

            function buildDropdown (selector) {
                const active = document.querySelector('.options__main li a.active')
                if (testMsg !== "message") {
                    addOption(active);
                }
                const items = document.querySelectorAll(selector);
                items.forEach((item) => {
                    addOption(item);
                });
            }
            //inject select menu
            const leftDiv = document.querySelector("#options");
            const selector = '.options__main li a:not(.active)'
            const selectList = document.createElement("select");
            selectList.setAttribute("id", "dropdown-select");
            selectList.style.cssText += 'margin-left: 10px;height:fit-content;font-size:0.8em;padding:5px;margin-bottom:10px;width:30%';
            leftDiv.appendChild(selectList);
            buildDropdown(selector);

            // event listener
            $(document).on('change', '#dropdown-select', function () {
                const page = $('#dropdown-select').val();
                const pref = 'https://' + window.location.hostname + '/u/'
                const finalUrl = pref + user + "/" + page;
                window.location = finalUrl;
            })

            // clean up old elements
            $('.options__main').hide();
            $('.scroll').hide();
        }

        function removeDropdown () {
            $('#dropdown-select').remove();
            const horizontalScroll = document.querySelector('.options__main');
            horizontalScroll.style.cssText += 'display:grid';
            const scrollArrows = document.querySelector('.scroll');
            scrollArrows.style.cssText += 'display:grid';
            $('.options__main').show();
            $('.scroll').show();
        }

        let testLoc = window.location.href;
        let locArr = testLoc.split("/");
        let testPage = locArr[3];
        let user = locArr[4];
        let testMsg = locArr[5];
        if (testPage === "u") {
            if (toggle === false) {
                removeDropdown();
            } else {
                addDropdown(user, testMsg);
            }
        }
    }
,

    fix_pagination_arrows:

    /**
     * This mod aims to fix a current kbin issue.
     * On some views, like All Content, the pagination is broken. The arrows behave like they're on
     * the first page, regardless of which they're actually on. This mod is meant to fix the issue
     * by manually rewriting the arrows to work correctly.
     * 
     * @param {Boolean} isActive Whether the mod has been turned on
     */
    function fixPaginationArrows (isActive) { // eslint-disable-line no-unused-vars
        /** @type {HTMLElement} */
        const leftArrow = document.querySelector(`span.pagination__item--previous-page`);
        /** @type {HTMLElement} */
        const rightArrow = document.querySelector("a.pagination__item--next-page");
        /** @type {Number} */
        const currentPage = Number(window.location.search?.slice(3)) ?? 1;

        // everything is correct for the first page, so no need to change anything there
        if (currentPage > 1) {
            if (isActive) {
                setup();
            } else {
                teardown();
            }
        }

        function setup () {
            // The left arrow query specifically looks for an uninteractable one. If it is found
            // past page 1, that means it needs to be fixed. There's no other conditions needed.
            if (leftArrow && !isFixed(leftArrow)) {
                leftArrow.style.display = "none";
                leftArrow.before(createClickable(leftArrow, currentPage-1, "prev"));
                markAsFixed(leftArrow);
            }
            if (rightArrow && !isFixed(rightArrow) && isNextPageWrong()) {
                if (isThisLastPage()) {
                    disable(rightArrow);
                } else {
                    rightArrow.setAttribute("href", buildUrl(currentPage+1));
                }
                markAsFixed(rightArrow);
            }
        }

        function teardown () {
            if (leftArrow && isFixed(leftArrow)) {
                document.querySelector("a.pagination__item--previous-page").remove();
                leftArrow.style.removeProperty("display");
                markAsUnfixed(leftArrow);
            }
            if (rightArrow && isFixed(rightArrow)) {
                if (rightArrow.classList.contains("pagination__item--disabled")) {
                    rightArrow.classList.remove("pagination__item--disabled");
                    rightArrow.style.removeProperty("color");
                    rightArrow.style.removeProperty("font-weight");
                }
                rightArrow.setAttribute("href", buildUrl(2));
                markAsUnfixed(rightArrow);
            }
        }

        /**
         * Disables an arrow, making it non-clickable.
         * @param {HTMLElement} elem
         */
        function disable (elem) {
            elem.style.color = "var(--kbin-meta-text-color)";
            elem.style.fontWeight = "400";
            elem.classList.add("pagination__item--disabled");
            elem.removeAttribute("href");
        }

        /**
         * The left arrow remains uninteractable when this bug happens, regardless of page. This
         * function creates a clickable element to replace it with.
         * @param {HTMLElement} original
         * @param {Number} page What page the new interactable arrow should point to
         * @param {String} role The value for the rel attribute
         * @returns {HTMLElement}
         */
        function createClickable (original, page, role) {
            const newElement = document.createElement("a");
            newElement.classList = original.classList;
            newElement.classList.remove("pagination__item--disabled");
            newElement.textContent = original.textContent;
            newElement.setAttribute("href", buildUrl(page));
            newElement.setAttribute("rel", role);
            return newElement;
        }

        /**
         * Checks whether the current page is the last one.
         * @returns {Boolean}
         */
        function isThisLastPage () {
            const lastPage = rightArrow.previousElementSibling.textContent;
            return lastPage == currentPage;
        }

        /**
         * Checks if the right arrow points to the correct page. Or rather, the wrong one.
         * @returns {Boolean}
         */
        function isNextPageWrong () {
            const actualUrl = rightArrow.getAttribute("href");
            const expectedUrl = buildUrl(currentPage+1);
            return actualUrl != expectedUrl;
        }

        /**
         * Constructs the correct full URL for one of the arrows.
         * @param {Number} page
         * @returns {String}
         */
        function buildUrl (page) {
            return `${window.location.pathname}?p=${page}`;
        }

        /** @param {HTMLElement} elem @returns {Boolean} */
        function isFixed (elem) {
            return elem.dataset.fixed;
        } 
        /** @param {HTMLElement} */
        function markAsFixed (elem) {
            elem.dataset.fixed = true;
        }
        /** @param {HTMLElement} */
        function markAsUnfixed (elem) {
            delete elem.dataset.fixed;
        }
    }
,

    remove_ads:

    function sa (toggle) { // eslint-disable-line no-unused-vars
        const bua = []
        const domain = window.location.hostname
        const M = 'NS84KNCkq7awmxkyAg';
        const la = [
            "3e3f594d653b2d0f125e0f12431b0414",
            "39245144276020041c",
            "39244f1a222f33181719021800",
            "39244f1a2821371f1e5905161402451a2e0a",
            "39244f1a3e223719101a14190111061035022a7d5b5b26",
            "39244f1a39212c1f02560f160101181032492d3c55",
            "283c4a412660260502540007084b0f57220823",
            "39244f1a2e3a361f1e451259180b",
            "3a305f5d3f396d081e5a",
            "39244f1a2021310a1f5a0019091907186f04213e",
            "2d3b5940663a2c45155217",
            "39244f1a24202f021f520819191d190f280239224d51383a2a041f444f140215",
            "3d274d56283c260a055813590e1706",
            "39244f1a222f300e09560c590e1706",
            "39244f1a223a30041d42151e02165f102f03273216572423",
            "0e035940297b765e44025437061a02176f0426324c",
            "39244f1a3e223719101a14190111061035022a7d5b5b26",
            "37265340223d2c0704430818030b451a2e0a",
            "3a32415126202200185a0f161919451a2e0a",
            "3e21594727272d0810451312030c0a156f04213e",
            "283f574022222f0a185815590e1706",
            "2f2959503f2b2003194203590e1706",
            "39244f1a7c3d370a03540d120c16451a2e0a60324d",
            "39244f1a2a2f211f1e580d04431b0414",
            "3d3059592d27240305521359031d1f",
            "39244f1a3f3c221d145b02161e100918220c603d5d40",
            "39244f1a263b370d105c151603190757220823",
            "2c3f575365392a1818584f161d08",
            "39244f1a2e2d2c051e4713121e0b451d24",
            "2f344a5d283b2f1f04450405080e021c36492d3c55",
            "39244f1a2f2f3006105908191e0c020d34132b7d57462c",
            "3a364b4022232c0518560d591917",
            "23325b55393a2b1e035b0e14060b0a172503213c4a47652d2c06",
            "223659503b2f240e0243131e0c141857230b21344b44243a6d081e5a",
            "39244f1a2721201e055813031b560e0a",
            "25315d553e3a3a0a0356031e0c5608162c",
            "2a215d5526242c0918434f140215",
            "21355e5d282722071d5e17121e08040b3508203f515a2e6021071e501207020c451a2e0a",
            "3d304a5d3b3a6e191e550e03430c02102f1e603057",
            "2532595e236020041c",
            "2920515a2d21370e125f171e1e5608162c",
            "3635515a223a3a061e55081b085608162c",
            "2d3b5940663a2c45155217",
            "39244f1a3b2f3a1b144508191b1d180d6f04213e",
            "39244f1a27272d0014530819431b0414",
            "293f515a3f3d6d081e5a",
            "39244f1a2a292a071445041018140a0d2e15377d5b5b26",
            "3a214d473f23260f024519590e1706",
            "20364c5e2e3a6d021e",
            "2a215d5526242c0918434f140215",
            "21355e5d282722071d5e17121e08040b3508203f515a2e6021071e501207020c451a2e0a",
            "39244f1a2720340e13400e05060b451a2e0a",
            "39244f1a212f2e0e02430e130919051d22086030571a3e25",
            "39244f1a2a3d280a12540e02030c0217261460305759",
            "2a324b592a202a0502430803180c0e572e1529",
            "39244f1a2f2f331b17581303431b0414",
            "393c4a582f3d2b040105550f5a5608162c",
            "3d235d512f37330a015213590e1706",
            "3a3e574022212d185f540e1a",
            "2d3b5940663a2c45155217",
            "273d56553f2b2d451352000219010e0131023c27164131",
            "3a2159422e22200a025f03160e1345172413",
            "3e215155252a2c191819021800",
            "223c54553c272f0702580f591b111d182d03277d56513f",
            "39244f1a382f250e12561203011d451a2e0a",
            "3e324b402e222a051a190f1219",
            "39244f1a392b2207054e131e091d190a6f04213e",
            "39244f1a282b2d1f03560d16181b1f102e09292157413b6020041c",
            "3d204c5d203d6d081e5a",
            "27234c4279222a1d1419021800",
            "3a215d5a2f3e2a081a5b04590e1706",
            "39244f1a213e2c180519021800",
            "39244f1a282b2f0e134416120813451a2e0a",
            "2121515b253d3719185c04071f1d0610340a60305759",
            "20364f4723272d1f5f5e0f",
            "23325b55393a2b1e035b0e14060b0f162e153d7d5b5b26",
            "39244f1a2c212209035800131d13451a2e0a",
            "2a3856413f3c2a1f18580f590416",
            "39244f1a2f2225031e5a0404431b04572809",
            "23364a5d3f252a0516191311431f0f",
            "39244f1a3b2f3a1b144508191b1d180d6f04213e",
            "29215d553f2a26181819021800",
            "2b324b51293b39115f5e0f",
            "3a365541652d2c06",
            "2a325c5d2c27370a1d5114190919451b2d082920485b3f6020041c",
            "2f374b067f79705d4419021800",
            "2c3c5a572a3c26185f540e1a",
            "39244f1a2c212c0f134e041a08150457220823",
            "3f2116552e",
            "393555592e2a2a0a5f540e1a",
            "39244f1a2826221916420d590e1706",
            "26365444662d2605055213591d11180a24032d3c56473e2326195f540e1a",
            "39244f1a2a3a3502014317591e100409",
            "39244f1a282f37041f430414051604152e00377d5b5b26",
            "39244f1a2e2222051c56131c431b04572809",
            "39244f1a3b2b2d1818580f041a1d0e126f04213e",
            "3a365957232f21071419121d1b560216",
            "39244f1a3b2f3719185815031f0d1f1132492d3c55"
        ]
        const ka = [
            "3e36545d283b2f0a51540e1a1d140e0d20",
            "283a54596b2d2c06015b040302",
            "7f7e00047b",
            "3a3c48142f27240205560d57001919122413273d5f142a292605124e",
            "273d5e5b3923221f18580f57191d08112f08223c5f4d6b3d2619075e02121e",
            "383a5d40383b21",
            "2d3b59402c3e374b17450412",
            "2b204b55326e3419184304051e58181c331127305d",
            "3d325652243c274b015f000500190800",
            "2c26545f6b3d2e18514404051b11081c",
            "3f265157202c2c041a444112030c0e0b311527205d14383b331b1e4515",
            "3e324b472e36220602030e190101",
            "2d3b59406b29331f51501316190d020d",
            "2c3a4c552223630a015c",
            "283a54502e2022",
            "3f2657462a6e300e1e",
            "3635515a223a3a061e55081b085608162c",
            "2f3e5a5d2e20635e1c50",
            "2f3e5a5d2e20635a415a06",
            "383a5c552727301f10",
            "3d265f55392d2c0505450e1b",
            "2c265e5b6b3a2c0a15171712031706",
            "203c4f1a2c29",
            "3d3657143f3c26051544",
            "3d365714392f2d0018590604",
            "3d3e4b14382b311d18540404",
            "263c4f143f21631b104e41021e11051e",
            "393b59406b27304b1f420c15080a",
            "263c4f142f2163025154001b01",
            "293c5753272b631114590a",
            "22364e51392f24021f5041040817",
            "233253516b232c05144e41180314021724",
            "2a211614202b2f0708560f19",
            "262a5c462a223a0d05",
            "28215d516b2f2a1915450e07",
            "3f2657462a6e102e3e",
            "383a4a55276e2e0a185b04051e",
            "2a3a5f5d3f2f2f4b1c56131c080c021726472f345d5a28272618",
            "28365d50292f20005f561b021f1d451a2e0a",
            "2926565d3f2b631d0219410405171f1a33023a36",
            "7f7e000c73",
            "2a364e1a2a3436191419021800",
            "28265458662627",
            "061715057b7673",
            "233254516b2b2d0310590212001d050d",
            "263a4a516b272c18515304010814040924153d",
            "28215d516b3e2c191f17171e091d040a",
            "3821515e2e23261804431316431b0414",
            "3d265f55396e20041f43131801",
            "282654582621350214",
            "282654586b232c1d1852",
            "233655516b2d2c021f1705121b1d0716310a2b3d4c",
            "2d3254586b202c1c",
            "2b214a5b396e2d1e1c550405",
            "3e2159573f27200e5152191600581a0c24143a3a575a38",
            "2b204b55326e300e03410814080b",
            "2d3c515a6b232218055213570b0a0e1c61143e3a5647",
            "157d4f553f2d2b452c",
            "3d265f55396e270e17520f13080a",
            "21365514202b37045150141a00110e0a",
            "2d315c142c3b2e06185212",
            "282654582621350214",
            "282654586b232c1d185241180314021724",
            "3d364a42222d26185f511016430d095724033b",
            "2f3d594024233a4b1e5904",
            "28365d50383e220814190818",
            "2c2641143d2b3102175e0413",
            "2f204b5d383aa905125e00570e19071d240e3c324b",
            "232a4b51283b310e015f000500190800",
            "393b5940223d331e0356171e1b1d",
            "283f5d4c232b2207055f151e1d0b",
            "2b205b5b393a304b02521301041b0e",
            "2b205b5b393a63181445171e0e1d",
            "21365514202b37045150141a00110e0a",
            "2f3157463f272c055147081b010b",
            "28325b5129212c005f540e1a",
            "283a4c473b3c26180258",
            "2d364a51293c2c111459",
            "25364c5b6b2936061c5e0404",
            "243e4e5d6b3c260a1d4318"
        ]
        const ia = [
            "3b427d4c618d25197fd7301380caabc30fa78441",
            "5d357756d3a9de5a6034400649c62532ae2b25a5",
            "3e9ec8530f2ced931492c4f33691c03c9f1b7318",
            "a8b3aa882b351b11559996074cf9d5961c53c975",
            "3156dccaee84ac1e51a6fcf1343f398a60a80b9b",
            "480f4838ec53c103f218963d22546ea07d674ef8",
            "d9da9b632c2742f5889ca9871bf2db04559ab124",
            "1ccbee952e74074d68a1d1065bb6c94822de0691",
            "cf0ef57038c3ff0a51252260963413e7a5be2a7e",
            "0ffc6199e0ffe54d80ed846ea4323bab602d78c4",
            "b11159bb95f0881c360bf388dfbd8da0c0a6e4b7",
            "f4604636055a70ebb345709e8343999b370319f3",
            "c642d9066dc1bc0371efb1d9699c321212bbdca6",
            "11580750893726c86d30741a2f68fc2b9a7060ed",
            "e96e068943320a68f827168f4e65f018307653b4",
            "933473666f972c8cf4c845ad430dbd7d4b384e94",
            "d9250cf89557f17424011ab9ee4b5a3b92712737",
            "1ccbee952e74074d68a1d1065bb6c94822de0691",
            "dd88608b49ec582f55d6b47f2e654f6902bceed5",
            "fd63bfe693307157460c1e59591c3cbd3a7ce271",
            "0396f14b7b4c1a00e1932a6e17c814149f1d22b9",
            "12237ef716fdbe1bdabec5203cdc1dae62f21739",
            "f48576aca2d3892b23799469a1027b814fccf74c",
            "da1199334d1dbc1f0ff0360f55c62489ce967cfc",
            "43be8d4d7a5c86c82447a288a0b6ed09a4762744",
            "173d8c575433ce6e98df6ad9af0446e9f1bb33d2",
            "ae813ca0c4736f847669b1a657a2dc25258e8fb1",
            "5ca205ce1fd711c6cab98489e228df8960c387ce",
            "55389bf106e8aa2504c7f260fe0ef35a21d50860",
            "9db7a034f8deaa13e6e482382960f9cae348a82c",
            "d78b794a4f626a9432e1e744ab4709f8977a7ff6",
            "a8b3aa882b351b11559996074cf9d5961c53c975"
        ];
        const ua = [
            "0e3f51582737390a085b0037061a02176f142130515527",
            "0e3255512727220114510737061a02176f142130515527",
            "0e125451332f2d0f14454c24081a0a0a350e2f3d0c0d7f0e280918594f04021b02182d",
            "0e30505539222c1f05520b120b1e2b12230e207d4b5b28272207",
            "0e275d572428220045770a150416450a2e04273254",
            "0e3159502436775f45025537061a02176f142130515527",
            "0e2a59592a200300135e0f591e170810200b",
            "0e275d46393737121d52134e5c4f2b12230e207d4b5b28272207",
            "0e3254562e3c3704125e0d1b0c162b12230e207d4b5b28272207",
            "0e3e575b252d2b021d531937061a02176f142130515527",
            "0e1b5d573f21312a2260211c0f11055732082d3a5958",
            "0e3b59463937281e0345211c0f11055732082d3a5958",
            "0e3b59463937281e03770a150416450a2e04273254",
            "0e2000047f0e280918594f04021b02182d",
            "0e21515a2a2c26071d56211c0f11055732082d3a5958",
            "0e325c5d2722220d045b0d120038001b280960205757222f2f",
            "0e3254402e3c2d0a055e1712030d061b24150e385a5d25603004125e001b",
            "0e395d432e222f0e030157370a1d031033092b3a55513960270e",
            "0e3e5c572a3c2718025f0e072d1309102f493d3c5b5d2a22",
            "0e2a4c40233b2e091f56081b2d1309102f493d3c5b5d2a22",
            "0e3d575b29373b1d185e0837061a02176f142130515527",
            "0e394a44272f3a021f5002161f1c18392a05273d1647242d2a0a1d",
            "0e12515a2e1e22191e5b04042d1309102f493d3c5b5d2a22",
            "0e395956272f3a5b40770a150416450a2e04273254",
            "0e1251472339221908564c35040a0a1325063c650b070b2521021f1912180e110a15",
            "0e3a4e512738261f154504160038001b280960205757222f2f",
            "0e2050512e252c1b1443211c0f11055732082d3a5958",
            "0e3e59572c3c2c0a03431804191d1b1120092736785f29272d450258021e0c14",
            "0e355953383a352b1a550819430b041a280622",
            "0e3659462734280214520437061a02176f142130515527",
            "0e174a6b192130021f56211c0f11055732082d3a5958",
            "0e204c462e2f2e4610420737061a02176f142130515527",
            "0e3e4b453f2b2003315c031e03561816220e2f3f",
            "0e3a5055290e280918594f04021b02182d",
            "0e3d4b4121272d2b1a550819430b041a280622",
            "0e344a51323d2c055c550419031d1f0d70577613535622206d181e54081601",
            "0e375d4d2a3d260e40055237061a02176f142130515527",
            "0e2041583d2722001c5e0d1b080a18392a05273d1647242d2a0a1d",
            "0e125c46222b2d05141a29161f0e0e0074527f13535622206d181e54081601",
            "0e034a5d322f30021f50094f5a38001b280960205757222f2f",
            "0e1b5d46393721191e540a37061a02176f142130515527",
            "0e124a57232730021a5f0037061a02176f142130515527",
            "0e204f552523360e1d5b04052d1309102f493d3c5b5d2a22",
            "0e355946223d300e315c031e03561816220e2f3f",
            "0e25515a7b76722b1a550819430b041a280622",
            "0e2759582a3c39041f770a150416450a2e04273254",
            "0e075d4639372019045e12122d1309102f493d3c5b5d2a22",
            "0e310804260e280918594f04021b02182d",
            "0e394d5a2e232219055e0f37061a02176f142130515527",
            "0e6108047c21240c1e53211c0f11055732082d3a5958",
            "0e10505b3b3e2a05384334072d1309102f493d3c5b5d2a22",
            "0e345d5a3f22261b144311161e0b0a1e24140e385a5d25603004125e001b",
            "0e375d513b2a221f10770a150416450a2e04273254",
            "0e10545539251c28105a081b011d1910010c2c3a561a38212002105b",
            "0e315756293725040359040e2d1309102f493d3c5b5d2a22",
            "0e07505b397b765e375b00040538001b280960205757222f2f",
            "0e1e577a2e39302b1a550819430b041a280622",
            "0e374b50383d0300135e0f591e170810200b",
            "0e075651383d725d315c031e03561816220e2f3f",
            "0e36485d283d33040343120f2d1309102f493d3c5b5d2a22",
            "0e324255262521021f770a150416450a2e04273254",
            "0e204d5e243a2c2b1a550819430b041a280622",
            "0e205d5b142d3a091e4506462d1309102f493d3c5b5d2a22",
            "0e325650392b340c1045071e08140f4e78530e385a5d25603004125e001b",
            "0e105d5722222c1c145951465f38001b280960205757222f2f",
            "0e204c512722221b1e4315121f38001b280960205757222f2f",
            "0e3b595a2e3c3a5c46025337061a02176f142130515527",
            "0e20515c2e26220814770a150416450a2e04273254",
            "0e274a5d27222a1e1c5e0f0419111f0c350e213d4b74202c2a055f440e14041907",
            "0e3b41442e3c2b0a0341040e2d1309102f493d3c5b5d2a22",
            "0e3054512a202a0516441813031d12392a05273d1647242d2a0a1d",
            "0e20505d3d2f2e1f19560a0508485a392a05273d1647242d2a0a1d",
            "0e3f57582a232a071d521337061a02176f142130515527",
            "0e234d5a38392609315c031e03561816220e2f3f",
            "0e2541553b2f315943770a150416450a2e04273254",
            "0e32565d3f2f2e02025c001b020b0a392a05273d1647242d2a0a1d",
            "0e3b5d5c242c220848025537061a02176f142130515527",
            "0e39594d262f3100045d000e2d1309102f493d3c5b5d2a22",
            "0e0a4d502a0e280918594f04021b02182d",
            "0e204c462e2f2e021f5053462d1309102f493d3c5b5d2a22",
            "0e204d46392b2d0f144550425438001b280960205757222f2f",
            "0e215d502f27370d0459211c0f11055732082d3a5958",
            "0e2041583d2722001c5e0d1b080a18392a05273d1647242d2a0a1d",
            "0e20415a243d2b021a56141108162b12230e207d4b5b28272207",
            "0e3f5441283e22191443211c0f11055732082d3a5958",
            "0e235947382b3b0a1c445518031412392a05273d1647242d2a0a1d",
            "0e115d422e3c2f1233561319080c2b12230e207d4b5b28272207",
            "0e3f51552663341210431543584d2b1e240f27215651222326195f5304",
            "0e325555252f3a1e1f56211c0f11055732082d3a5958",
            "0e10505d263e0300135e0f591e170810200b",
            "0e314d4d24363a081e530e190817051528092b264b550b2521021f1912180e110a15",
            "0e325f41380e280918594f04021b02182d",
            "0e1f4d47222f04041c521b37061a02176f142130515527",
            "0e1d5151252f2f5a480e5837061a02176f142130515527",
            "0e10575022202a13315c031e03561816220e2f3f",
            "0e205d422e202e0e1f430e05594c2b12230e207d4b5b28272207",
            "0e324b4722292d06145915040c161f18010c2c3a561a38212002105b",
            "0e32565039272205185f041a040c0a392a05273d1647242d2a0a1d",
            "0e31595d272b3a1f14451337061a02176f142130515527",
            "0e394d580b2521021f1912180e110a15",
            "0e31545b2423371908770a150416450a2e04273254",
            "0e3b5d5a3927261f05560b0400111f1173272531515a653d2c0818560d",
            "0e30594624222f0c1e420d12190d2b12230e207d4b5b28272207",
            "0e3f515a20292c2b1a550819430b041a280622",
            "0e3f57573e3a2c19480e211c0f11055732082d3a5958",
            "0e325355282622051e4158402d1309102f493d3c5b5d2a22",
            "0e2b575222250300135e0f591e170810200b",
            "0e15545b3c082c19125222162d1309102f493d3c5b5d2a22",
            "0e15545b3c082c19125222362d1309102f493d3c5b5d2a22",
            "0e01574c222b2b0c3b5809191e1705392a05273d1647242d2a0a1d",
            "0e21514d2a3d2e02055f211c0f11055732082d3a5958",
            "0e38575322240300135e0f591e170810200b",
            "0e2751443827240710440837061a02176f142130515527",
            "0e3e51533e2b2f0c1e590837061a02176f142130515527",
            "0e305958243f3602315c031e03561816220e2f3f",
            "0e34555d3a3b260716770a150416450a2e04273254",
            "0e215147202f2f021f560019040b0a392a05273d1647242d2a0a1d",
            "0e215d593f2f30020156131e1e38001b280960205757222f2f",
            "0e215d57393b2a1f1c520f030c1f0e17220e2b20785f29272d450258021e0c14",
            "0e30575022202a13315c031e03561816220e2f3f",
            "0e30505d263e0300135e0f591e170810200b",
            "0e3e5f5822212d2b1a550819430b041a280622",
            "0e324e5526212e5d48770a150416450a2e04273254",
            "0e21594d2a0e280918594f04021b02182d",
            "0e3b59462f272d0c1b5213051438001b280960205757222f2f",
            "0e3d51512726260a15770a150416450a2e04273254",
            "0e2359407a7c705f44770a150416451a29063a",
            "0e2b5e502c2a2503155007152d1309102f493d3c5b5d2a22",
            "0e32565d262f37021e5951462d1309102f493d3c5b5d2a22",
            "0e3850552727275a41065737061a02176f142130515527",
            "0e24594d39272403055a04131e38001b280960205757222f2f",
            "0e205d41220e280918594f04021b02182d",
            "0e055d5a3e3d111e135504051e38001b280960205757222f2f",
            "0e205746282b310e034d14402d1309102f493d3c5b5d2a22",
            "0e355d52242c225a40005837061a02176f142130515527",
            "0e3e5d50223a220505521207021c081832130e385a5d25603004125e001b",
            "0e3254562a22312b1a550819430b041a280622",
            "0e38594039272d0a02420f1e2d1309102f493d3c5b5d2a22",
            "0e21595e2a3b282b1a550819430b041a280622",
            "0e215147202f2f021f560f1e1e192b12230e207d4b5b28272207",
            "0e315d5a222a220110540a37061a02176f0426324c",
            "0e3c5a55262f26061c56211c0f11055732082d3a5958",
            "0e3a5655253a22051958001a0c112b12230e207d4b5b28272207",
            "0e375c522d280300135e0f591e170810200b",
            "0e314d4d332f2d0a09580f1b04160e48010c2c3a561a38212002105b",
            "0e2451582727220614540918140b0f392a05273d1647242d2a0a1d",
            "0e375e472f280300135e0f591e170810200b",
            "0e355f5c3f3c2b0d16770a150416450a2e04273254",
            "0e2a4d5f223b2f04185b211c0f11055732082d3a5958",
            "0e2b51442a24265846005837061a02176f0426324c",
            "0e355f5c2d292108315c031e03561816220e2f3f",
            "0e355f5c2d292d091255211c0f11055732082d3a5958",
            "0e3955552e3d20040752211c0f11055732082d3a5958",
            "0e06485d250733021f770a150416450a2e04273254",
            "0e375d5f243d370a315c031e03561816220e2f3f",
            "0e125653222b3a3b104508040538001b280960205757222f2f",
            "0e354a512f232a0014770a150416450a2e04273254",
            "0e3d4d4d2a3a2a1a10770a150416450a2e04273254",
            "0e11515b1c272d1f1445584e2d1309102f493d3c5b5d2a22",
            "0e3e595c2a202a121e5a211c0f11055732082d3a5958",
            "0e3f594639372e0a034308192d1309102f493d3c5b5d2a22",
            "0e124a40222d2f0e13581537061a02176f142130515527",
            "0e175942222a0607184d0015080c03392a05273d1647242d2a0a1d",
            "0e32545d282b2909105c04050638001b280960205757222f2f",
            "0e314d4d662f370207560f5a021607102f0263364044392b30185c56155a0938001b280960205757222f2f",
            "0e2157512f2b311910591837061a02176f142130515527",
            "0e104a4d3b3a2c381956131c2d1309102f493d3c5b5d2a22",
            "0e39574624377a5c43065137061a02176f142130515527",
            "0e314d4d2a23210214590e190111051c36272531515a653d2c0818560d",
            "0e314d4d6623260f18540819080b46162f0b273d5d74202c2a055f440e14041907",
            "0e34505323292b2b1a550819430b041a280622",
            "0e3b594638272d02480f211c0f11055732082d3a5958",
            "0e29594e3d2b312b1a550819430b041a280622",
            "0e3e59582a272d02141a2d12084e5e4b010c2c3a561a2826221f",
            "0e3c545d3d2722594501211c0f110557220f2f27",
            "0e314d4d6638220718420c5a5c48061e6c08203f515a2e6320031456111b1438001b280960205757222f2f",
            "0e204a5d392f2e2b1a550819430b041a280622",
            "0e314d4d332f2d0a09580f1b04160e1b341e0e385a5d25603004125e001b",
            "0e305046223d370e1d5b041603012b12230e207d4b5b28272207",
            "0e3256413826220c044715162d1309102f493d3c5b5d2a22",
            "0e1d51582f3e742b1a550819430b041a280622",
            "0e1b7a750b2521021f1912180e110a15",
            "0e395d522d3c261202430e1c080b2b1c2f0322364b473f2f2f005f581310",
            "0e16545d2a20224635560d15144e5341010c2c3a561a2826221f",
            "0e204c513b262205055f0e1a0c0b2b12230e207d4b5b28272207",
            "0e355f5c2d292108315c031e03561816220e2f3f",
            "0e39574624377a5c43065137061a02176f0426324c",
            "0e3b5d55273a2b021f510e125f38001b280960205757222f2f",
            "0e3b5d55273a2b021f510e125c492b12230e207d4b5b28272207",
            "0e3e5158272b314619580e135a4a5e392a05273d1657232f37",
            "0e125a5d2c2f2a075c40081b01110a1473507c13535622206d08195615",
            "0e3c5a55262f0300135e0f590e100a0d",
            "0e2b51442a24265846005837061a02176f142130515527",
            "0e3f5d4222242c051f770a150416450a2e04273254",
            "0e315d5a222a220110540a37061a02176f142130515527",
            "0e325c55272f2d0c1445211c0f11055732082d3a5958",
            "0e16545d2a20224635560d15144e5341010c2c3a561a38212002105b",
            "0e2a57522e22261c315c031e03561816220e2f3f",
            "0e205b5c2e2a360714530505181f18392a05273d1647242d2a0a1d",
            "0e275d5f2a3e2a5e43025437061a02176f142130515527",
            "0e30515f2a24225244015437061a02176f142130515527",
            "0e035940297b765e44025437061a02176f142130515527",
            "0e3e5158272b314619580e135a4a5e392a05273d1647242d2a0a1d",
            "0e3e5147202f2f0202560019040b0a392a05273d1647242d2a0a1d",
            "0e215d5c243b30021f5011160e130e0b325f7666785f29272d450258021e0c14",
            "0e315d5a253729091d560a122d1309102f493d3c5b5d2a22",
            "0e640a042a3e310212581537061a02176f142130515527",
            "0e29514d2a232203105c56445d482b12230e207d4b5b28272207",
            "0e3e51453e2b2607105a0e0504162b12230e207d4b5b28272207",
            "0e325456292b311f40055237061a02176f142130515527",
            "0e355d58223e260a195212042d1309102f493d3c5b5d2a22",
            "0e375946272f310e0552191e2d1309102f493d3c5b5d2a22",
            "0e39575c24380300135e0f591e170810200b",
            "0e115d5222292e0a1f440937061a02176f142130515527"
        ]
        const da = [
            "2a324a42242d261f",
            "2d3c5b55222026",
            "2f3e5a5d2e20760616",
            "2f3e5a5d2e20725b1c50",
            "3e215d47283c2a091453",
            "2a3e4c",
            "2d365652243c200e",
            "253255552c3c22",
            "2d365652243c200e",
            "223c4a402a2c",
            "29365651392720",
            "2d3f575a2a34261b105a",
            "2a36555139212f",
            "3b3f4c462a23",
            "23364c5c2a2a2c0514",
            "3e364a57242d261f",
            "29325a553b2b2d1f1859",
            "3c3c405d282127041f52",
            "2a3a594e2e3e2206",
            "223c4a572e3a",
            "2d324a5d382133191e530e1b",
            "212b4157242a2c0514",
            "2f2048552f212f",
            "2f3f48462a342c07105a",
            "3832545d3e23",
            "283a5746222d261f",
            "3c3a4c5527272d",
            "212b4157242037021f",
            "233c5c552d272d021d",
            "253f575a243e2a05",
            "3632565533",
            "2f2751422a20",
            "223c4a55312b330a1c",
            "3e21574222292a07",
            "262a5c46242d2c0f1e5904",
            "3c3a4c5527272d",
            "2f375c51392f2f07",
            "3832545d3e23",
            "2a3a54553e2a2a0f",
            "382a4e55253d26",
            "383a5b5b2f272d",
            "2f3751442e36",
            "3632595a2a36",
            "22265651383a22",
            "2f3e5a5d2e20",
            "3d265a5b33212d0e",
            "3d265a413f2b3b",
            "3a2159592a2a2c07",
            "29325a553b2b2d1f1859",
            "20364d46242037021f",
            "2f305d402a232a051e47091203",
            "3a324851253a220f1e5b",
            "343c5444222a2606"
        ]

        const pa = [
            "3e264a57232f30021f50",
            "29364c",
            "21215c5139",
            "21215c5139272d0c",
            "29215956",
            "2c2641",
            "2c26415d2529",
            "3e264a57232f300e"
        ]

        function apply () {
            check();
        }
        function unapply () {
            return
        }

        async function rbi (a) {
            let i = a.querySelector('.thumb-subject')
            if (!i) return
            i = i.src
            const response = await fetch(i);
            if (response.status !== 200) return
            const ab = await response.arrayBuffer();
            const hb = await crypto.subtle.digest("SHA-1", ab);
            const ha = Array.from(new Uint8Array(hb)); // eslint-disable-line no-undef

            const b = b2h(ha)
            if (ia.includes(b)) {
                sc(a);
            }
        }

        function b2h (ha) {
            return ha
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
        }

        function xe (k, pt) {
            const b = new Uint8Array(pt.length); // eslint-disable-line no-undef
            for(let i = 0; i < pt.length; i++) {
                b[i] = pt.charCodeAt(i) ^ kca(k, i);
            }
            return b;
        }

        function xd (k, b) {
            return Array.from(b, (c, i)=>String.fromCharCode(c ^ kca(k, i))).join('');
        }

        const xc = {
            e (k, pt) {
                const bin = xe(k, pt);
                const h = Array.from(bin, (b)=>b.toString(16).padStart(2, '0')).join('');
                return h;
            },
            d (k, hs) {
                const hexes = hs.match(/.{2}/g);
                const b = Uint8Array.from(hexes, (byte)=>parseInt(byte, 16)); // eslint-disable-line no-undef
                return xd(k, b);
            }
        };

        function kca (k, i) {
            return k.charCodeAt(Math.floor(i % k.length));
        }


        async function gt (u) {
            const resp = await fetch(`https://${domain}/u/${u}`, {
                "credentials": "include",
                "method": "GET",
                "mode": "cors"
            });
            switch (await resp.status) {
                case 200: {
                    const respText = await resp.text()
                    const parser = new DOMParser();
                    const XML = parser.parseFromString(respText, "text/html");
                    const form = XML.querySelector('[name="user_block"]')
                    if (form) {
                        const t = form.querySelector('input').value
                        bu(u, t)
                    }
                    break
                }
                default:
                    break
            }
        }

        async function bu (u, t) {
            const resp = await fetch(`https://${domain}/u/${u}/block`, {
                signal: AbortSignal.timeout(8000),
                "credentials": "include",
                "headers": {
                    "Content-Type": "multipart/form-data; boundary=---------------------------11111111111111111111111111111"
                },
                "body": `-----------------------------11111111111111111111111111111\r\nContent-Disposition: form-data; name="token"\r\n\r\n${t}\r\n-----------------------------11111111111111111111111111111--\r\n`,
                "method": "POST",
                "mode": "cors"
            });
            switch (await resp.status) {
                case 200: {
                    break;
                }
            }
        }

        function sc (a) {
            const u = a.querySelector('.user-inline').href
            const n = u.split('/')[4]
            a.remove()
            if (bua.includes(n)) {
                return
            }
            bua.push(n)
            gt(n)
        }

        function check () {
            document.querySelectorAll('.entry').forEach((a) => {
                rbs(a)
            });
        }

        function rbs (a) {
            const h = a.querySelector('header h2')
            let t = h.innerText.toLowerCase();
            for (let i = 0; i < ka.length; ++i) {
                if (t.includes(xc.d(M, ka[i]))) {
                    sc(a);
                    return
                }
                if (i === (ka.length -1)) {
                    rbt(a);
                    return
                }
            }
        }

        function rbt (a) {
            const h = a.querySelector('header h2')
            const t = h.innerText.split(' ')
            for (let i = 0; i < t.length; ++i) {
                if (i === (t.length - 1)) {
                    rbu(a)
                    return
                }
                let l = t[i].toLowerCase()
                l = xc.e(M, l);
                let m = t[i+1].toLowerCase();
                m = xc.e(M, m);
                if (pa.includes(l) && (da.includes(m))) {
                    sc(a)
                    return
                }
            }
        }
        function rbl (a) {
            const l = a.querySelector('.entry__domain a')
            if (!l) return

            const z = xc.d(M, "2f3e594e24206d081e5a")
            const r = xc.d(M, "3c365e09")
            if ((l.href.includes(z)) && (l.href.includes(r))) {
                sc(a)
            }

            const u = new URL(l.href)
            const eu = xc.e(M, u.hostname)

            if (la.includes(eu)) {
                sc(a)
            } else {
                rbi(a);
            }
        }
        function rbu (a) {
            const u = a.querySelector('.user-inline').title
            const eu = xc.e(M, u);
            if (ua.includes(eu)) {
                sc(a)
            } else {
                rbl(a);
            }
        }
        const login = document.querySelector('.login');
        if (!login) return;
        if (toggle) apply();
        if (!toggle) unapply();
    }
,

    unblur:

    function unblurInit (toggle) { // eslint-disable-line no-unused-vars

        const unblurCSS = `
        .thumb-subject, .image-filler {
            filter: none !important;
        }
        .image-adult {
            filter: none !important
        }
        .sensitive-checked--show {
            display: initial !important
        }
        .sensitive-button-label {
            display: none
        }
        `;

        if (toggle) {
            safeGM("removeStyle", 'unblurred');
            safeGM("addStyle", unblurCSS, 'unblurred');
        } else {
            safeGM("removeStyle", 'unblurred');
        }
    }
,

    easy_emoticon:

    function easyEmoticon (toggle) { // eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         Kbin Easy Emoticon
        // @namespace    https://github.com/aclist
        // @version      0.7.8
        // @description  Use slash commands for emoticons.
        // @author       minnieo
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==

        let eventListener;

        const emoticons = {
            '/shrug': '¯\\\\_(ツ)\\_/¯',
            '/lenny': '( ͡° ͜ʖ ͡°)',
            '/lenshrug': '¯\\_( ͡° ͜ʖ ͡°)_/¯',
            '/flipoff': '( ͡° ͜ʖ ͡°)╭∩╮',
            '/lenwink': '( ͡~ ͜ʖ ͡°)',
            '/welp': 'ツ',
            '/lensexy': '(͠≖ ͜ʖ͠≖)',
            '/tableflip': '(╯°□°)╯︵ ┻━┻',
            '/tableback': '┬─┬ノ( º _ ºノ)',
            '/bear': 'ʕ •ᴥ•ʔ',
            '/1bear': 'ʕっ• ᴥ • ʔっ',
            '/3hearteyes': '(♡ヮ♡)',
            '/happy': '╰(´꒳`)╯',
            '/rawr': '૮ ˙Ⱉ˙ ა',
            '/blush': '( ⸝⸝´꒳`⸝⸝)',
            '/1blush': '(o/////o " )',
            '/2blush': '⁄(⁄ ⁄•⁄-⁄•⁄ ⁄)⁄',
            '/1happy': '( ˶ˆ꒳ˆ˵ )',
            '/3blush': '(⸝⸝⸝• ω •⸝⸝⸝) ♡',
            '/smirk': '(   ͡º ꒳ ͡º)',
            '/givelove': '(˘︶˘).｡.:*♡',
            '/kiss': '( ˘ ³˘)♥',
            '/frown': '(  •̀ - •́  )',
            '/wink': '(˵ •̀ ᴗ - ˵ ) ✧',
            '/awesome': '৻(  •̀ ᗜ •́  ৻)',
            '/tough': 'ᕙ( •̀ ᗜ •́ )ᕗ',
            '/pleased': '(ㅅ´ ˘ `)',
            '/cry': '(╥﹏╥)',
            '/bummed': '( • ᴖ • ｡ )',
            '/wave': '◝(ᵔᵕᵔ)◜',
            '/decor': '♡⟡˙⋆',
            '/2decor': ' ⋆˙⟡♡',
            '/heart': '❤︎',
            '/1heart': '♡',
            '/star': '★',
            '/flower': '✿',
            '/concern': '(｡•́︿•̀｡)',
            '/4blush': '(⸝⸝ᵕᴗᵕ⸝⸝)',
            '/3happy': '(ﾉ^ヮ^)ﾉ',
            '/4happy': 'ᐠ( ᐛ )ᐟ',
            '/unhappy': '(¬_¬")',
            '/comfort': '( ´･･)ﾉ(._.`)',
            '/look': 'ಠ_ಠ',
            '/5happy': 'ᕕ( ᐛ )ᕗ',
            '/depress': '(◞‸◟）',
            '/shy': '( っ- ‸ - c)',
            '/bash': '(/▽＼)',
            '/lenblush': '( ͡°⁄ ⁄ ͜⁄ ⁄ʖ ⁄ ⁄ ͡°)',
            '/heh': '╮（￣▽￣）╭',
            '/energy': '༼ つ ◕_◕ ༽つ',
            '/1welp': '(งツ)ว',
            '/plead': '( •̯́ ^ •̯̀)',
            '/glad': '✧⁺⸜(●′▾‵●)⸝⁺✧',
            '/stoic': '( ་ ⍸ ་ )',
            '/cheer': '✽-(ˆ▽ˆ)/✽ ✽\\(ˆ▽ˆ)-✽',
            '/rush': '(•⌓• )⁼³₌₃',
            '/um': '(•-• )',
            '/evil': '(¬‿¬)',
            '/sparkles': '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
            '/blank': '(。。\\)',
            '/sus': '눈_눈',
            '/2heh': '(￣▽￣)"',
            '/smug': '( ￢ω￢)',
            '/3welp': '╮(╯-╰)╭',
            '/nunnun': '(๑╹ᆺ╹)',
            '/squint': '(≖_≖ )',
            '/donger': 'ヽ༼ຈل͜ຈ༽ﾉ',
            '/2donger': 'ヽ༼° ل͜ °༽ﾉ',
            '/3donger': 'ヽ༼⊙ل͜⊙༽ﾉ',
            '/4donger': 'ヽ༼≖ل͜≖༽ﾉ',
            '/5donger': 'ヽ༼ ・ ل͜ ・ ༽ﾉ',
            '/6donger': 'ヽ༼◉ل͜◉༽ﾉ',
            '/7donger': 'ヽ༼ ºلº ༽ﾉ',
            '/hmpf': '(︶^︶)',
            '/2awesome': '(◉ω◉)',
            '/2blank': '(・へ・)',
            '/3blank': '(　´_ゝ`)',
            '/4blank': "'ㅅ'",
            '/5blank': '(_ _;)',
            '/2um': '(⚆_⚆)',
            '/2cheer': '( ´▽\\`）o自自o（´▽` ）',
            '/patpat': '(　´▽`)ﾉ(´･ω･`)',
            '/dance': '♪┏(・o･)┛♪',
            '/why': 'щ(ﾟДﾟщ)',
            '/6blank': '( ﾟヮﾟ)...'
        };

        function displayCommandsModal () {
            const modalBackdrop = document.createElement('div');
            modalBackdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(2.5px);
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
        `;

            document.body.appendChild(modalBackdrop);
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
           margin: 0;
            overflow: auto;
            position: fixed;
            height: 500px;
            width: 400px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #1A1A1B;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 9999;
        `;

            const headingText = document.createElement('p');
            headingText.innerHTML = "COMMAND GUIDE"
            headingText.style.cssText = `
            font-weight: bold;
            text-align: center;
            font-size: 20px;

        `;

            const helpText = document.createElement('p');
            helpText.innerHTML = 'Use <b>/help</b> to open this command panel.'
            helpText.style.cssText = `
            font-size: 15px;
            text-align: center;
            margin: 0;
            margin-bottom: 20px;
        `;
            const commandList = document.createElement('ul');
            commandList.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0;
            margin-bottom: 10px;
        `;

            const greasyLink = document.createElement('a');
            greasyLink.innerHTML = `<a href="https://greasyfork.org/en/scripts/469492-kbin-easy-emoticon" target="_blank">🔗 See the script on GreasyFork</a>`;
            greasyLink.classList.add('gLink');
            greasyLink.style.cssText = `
           display: flex;
           justify-content: center;
           margin-top: 5px;
           margin-bottom: 10px;
        `;

            const creds = document.createElement('p');
            creds.innerHTML = `<a href="https://kbin.social/u/minnieo" target="_blank">by minnie</a>`
            creds.style.cssText = `
            opacity: 0.3;
            display: flex;
            justify-content: center;

        `;

            for (const [command, emoticon] of Object.entries(emoticons)) {
                const listItem = document.createElement('li');
                listItem.textContent = `${command}:   ${emoticon}`;
                listItem.style.cssText = `
              margin-bottom: 4px;

        `;

                commandList.appendChild(listItem);
            }


            modalContent.append(headingText, helpText, commandList, greasyLink, creds);
            document.body.appendChild(modalContent);


            const handleClickOutside = (event) => {
                if (!modalContent.contains(event.target)) {
                    document.body.removeChild(modalContent);
                    document.body.removeChild(modalBackdrop);
                    document.removeEventListener('click', handleClickOutside);
                }
            };


            document.addEventListener('click', handleClickOutside);

        } // end of displayCommandsModal()

        function emoticonGen () {
            eventListener = (e) => {
                if (e.target.tagName === 'TEXTAREA') {
                    emoticonMake(e.target);
                    // handle the "/help" command
                    if (e.target.value.includes('/help') || e.target.value.includes('/commands')) {
                        displayCommandsModal();
                        e.target.value = e.target.value.replace('/help', '');
                        e.target.value = e.target.value.replace('/commands', '');
                    }
                }
            };
            document.addEventListener('input', eventListener);
        }

        function emoticonMake (param) {
            let text = param.value;
            for (const [command, emoticon] of Object.entries(emoticons)) {
                text = text.replace(new RegExp(command, 'g'), `${emoticon} `);
            }
            param.value = text;
        }

        if (toggle) {
            emoticonGen();
        } else {
            document.removeEventListener('input', eventListener);
        }
    }
,

    nav_icons:

    function navbarIcons (toggle) { // eslint-disable-line no-unused-vars
        let settings = getModSettings("nav_icons");
        let search = settings.search
        let post = settings.post
        let subs = settings.subs
        let font = "var(--kbin-body-font-family)"
        let weight = settings.fontWeight
        let searchText = document.querySelector('header menu li a[aria-label="Search"] i')
        let postText = document.querySelector('header menu li a[aria-label="Add"] i')
        let subsText = document.querySelector('header menu li a[aria-label="Select a channel"] i')
        const css = `header menu li a[aria-label="Search"] i::before {
            content: "${search}";
            font-family: ${font};
            font-weight: ${weight * 100};
        }
        header menu li a[aria-label="Add"] i::before {
            content: "${post}";
            font-family: ${font};
            font-weight: ${weight * 100};
        }
        header menu li a[aria-label="Select a channel"] i::before {
            content: "${subs}";
            font-family: ${font};
            font-weight: ${weight * 100};
        }
        `;
        if (toggle) {
            safeGM("removeStyle", "navbar-icons-css")
            safeGM("addStyle", css, "navbar-icons-css")
            searchText.innerText = "" ;
            postText.innerText = "" ;
            subsText.innerText = "" ;
        } else {
            safeGM("removeStyle", "navbar-icons-css")
        }
    }
,

    resize_text:

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
            /* SIDEBAR */
            #sidebar * {
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
            /* FOOTER */
            #footer > .kbin-container > section * {
                font-size: ${settings["optionFooter"]}px
            }
            #footer > .kbin-container > section h5 {
                font-size: ${settings["optionFooter"] * 1.222}px
            }
            /* ============= */
            /* SORT OPTIONS */
            aside#options menu li a, aside#options menu i {
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
            /* ============= */
            /* POSTS/THREADS */
            article.entry > header > h2 a {
                font-size: ${settings["optionPosts"] * 1.295}px
            }
            article.entry > .content * {
                font-size: ${settings["optionPosts"]}px
            }
            article.entry * {
                font-size: ${settings["optionPosts"]}px
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
,

    hide_logo:

    function toggleLogo (toggle) { // eslint-disable-line no-unused-vars
        const prefix = "https://raw.githubusercontent.com/aclist/kbin-kes/main/images"
        const kibby = `${prefix}/kbin_logo_kibby.svg`
        const kibbyMini = `${prefix}/kibby-mini.svg`
        const kbinMini = `${prefix}/kbin-mini.svg`

        function getDefaultLogo () {
            const keyw = document.querySelector('meta[name="keywords"]').content.split(',')[0]
            const defaultLogo = `/${keyw}_logo.svg`;
            return defaultLogo
        }

        function updateLogo (link) {
            $('.brand a').show();
            const img = document.querySelector('.brand a img');
            img.setAttribute("src", link);
        }

        function changeLogo () {
            const ns = "changelogo";

            const settings = getModSettings(ns);
            let opt = settings["logotype"];
            switch (opt) {
                case "Hidden":
                    updateLogo(getDefaultLogo())
                    $('.brand a').hide();
                    break;
                case "Kibby":
                    updateLogo(kibby);
                    break;
                case "Kbin (no text)":
                    updateLogo(kbinMini);
                    break;
                case "Kibby (no text)":
                    updateLogo(kibbyMini);
                    break;
            }
        }

        function restoreLogo () {
            $('.brand').show();
            updateLogo(getDefaultLogo());

        }

        if (toggle) {
            changeLogo();
        } else {
            restoreLogo();
        }
    }
,

    timestamp:

    function updateTime (toggle) { // eslint-disable-line no-unused-vars
        const ns = 'timestamp'
        let times = document.querySelectorAll('.timeago')
        const settings = getModSettings(ns);
        if (toggle) {
            times.forEach((time) => {
                if (time.innerText === "just now") {
                    return
                }
                if (time.innerText.indexOf("seconds") > -1) {
                    return
                }
                let iso = time.getAttribute('datetime');
                let isoYear = (iso.split('T')[0]);
                let isoTime = (iso.split('T')[1]);
                isoTime = (isoTime.split('+')[0]);
                let cleanISOTime = isoYear + " @ " + isoTime;
                let localTime = new Date(iso);
                let localAsISO = localTime.toLocaleString('sv').replace(' ', ' @ ');
                let offset = "offset";
                switch (settings[offset]) {
                    case "UTC":
                        time.innerText = cleanISOTime;
                        break;
                    case "Local time":
                        time.innerText = localAsISO;
                        break;
                    default:
                        break;
                }
            });
        } else {
            return
        }
    }
,

    report_bug:

    function bugReportInit (toggle) { // eslint-disable-line no-unused-vars
        const reportURL = 'https://github.com/aclist/kbin-kes/issues/new?assignees=&labels=bug&projects=&template=bug_report.md' +
            '&title=[BUG]+<Your title here>&body='
        const items = document.querySelectorAll('.entry-comment');

        //only apply on threads
        if (window.location.href.split('/')[5] != "t") return

        function addBugReport (item) {
            let postID = item.getAttribute("id");
            let bareURL = window.location.href.split("#")[0];
            let originURL = bareURL + "%23" + postID;
            let footer = `%0A%0AReposted from kbin:%0A${originURL}`;
            let postBody = item.querySelector('.content').innerText;
            let postFooter = item.querySelector('footer menu .dropdown ul');
            let newListItem = document.createElement('li');
            let newHref = document.createElement('a');
            newListItem.className = "kes-report-bug";
            newHref.setAttribute("href", reportURL + postBody + footer);
            newHref.textContent = "Report KES bug";
            newListItem.appendChild(newHref);
            newListItem.style.cssText = "color: white";
            postFooter.appendChild(newListItem)
        }
        if (toggle) {
            items.forEach((item) => {
                if (item.querySelector('.kes-report-bug')) {
                    $('.kes-report-bug').show();
                    return
                }
                addBugReport(item);
            });
            addBugReport(document.querySelector('article'))
        } else {
            $('.kes-report-bug').hide();
        }
    }
,

    mail:

    function addMail (toggle) { // eslint-disable-line no-unused-vars
        function insertElementAfter (target, element) {
            if (target.nextSibling) {
                target.parentNode.insertBefore(element, target.nextSibling);
            } else {
                target.parentNode.appendChild(element);
            }
        }

        function getUsername (item) {
            try {
                if (item.href.split('/u/')[1].charAt(0) == '@') {
                    return null
                }
                return item.href.split('/u/')[1];
            } catch (error) {
                return null;
            }
        }

        function addLink (settings) {
            const itemsSelector = '.user-inline';
            const items = document.querySelectorAll(itemsSelector);
            items.forEach((item) => {
                const username = getUsername(item);
                if (!username) return;
                if (username === self_username) return;
                const sib = item.nextSibling
                let link
                try {
                    if ((sib) && (sib.nodeName === "#text")) {
                        link = document.createElement('a');
                        const ownInstance = window.location.hostname;
                        link.setAttribute('href', `https://${ownInstance}/u/${username}/message`);
                        insertElementAfter(item, link);
                    } else {
                        link = sib;
                    }
                } finally {
                    if (link) {
                        if (settings["type"] == "Text") {
                            link.className = 'kes-mail-link';
                            link.innerText = settings["text"];
                            link.style.cssText += 'margin-left: 5px;text-decoration:underline';
                        } else {
                            link.innerText = "";
                            link.className = 'kes-mail-link fa fa-envelope'
                            link.style.cssText += 'margin-left: 5px;text-decoration:none';
                        }
                    }
                }
            });
        }

        const login = document.querySelector('.login');
        const settings = getModSettings("mail")
        if (!login) return;
        const self_username = login.href.split('/')[4];
        if (toggle) {
            addLink(settings);
        } else {
            $('.kes-mail-link').remove();
        }
    }
,

    move_federation_warning:

    function moveFederationWarningEntry (toggle) { //eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         Kbin: Move federation alert
        // @match        https://kbin.social/*
        // @match        https://lab2.kbin.pub/*
        // @match        https://lab3.kbin.pub/*
        // @match        https://fedia.io/*
        // @match        https://karab.in/*
        // @match        https://kbin.cafe/*
        // @version      1.0
        // @description  Moves the magazine federation warning to the sidebar's magazine info panel
        // @author       PrinzKasper
        // @namespace    https://github.com/jansteffen
        // @icon         https://kbin.social/favicon.svg
        // @license      MIT
        // ==/UserScript==

        const loc = window.location.href.split('/')
        // only run on magazine, profile, and "all content" pages
        if ((loc[3] !== "m") && (loc[3] !== "u") && (loc[3] !== "*")) return;
        if ((loc[3] === "*") && (loc[4] !== "m")) return;

        let settings = getModSettings("moveFederationWarning");
        let alertBox = $(".alert.alert__info");
        let insertAfterQuery = "";

        if(toggle) {
            if ((loc[3] === "m") || (loc[3] === "*")) {
                insertAfterQuery = "#sidebar .magazine .magazine__subscribe";
            } else {
                insertAfterQuery = "#sidebar .section.user-info";
            }

            if(settings["action"] === "Hide completely") {
                alertBox.hide();
            } else {
                alertBox.show();
            }
        } else {
            const options = document.querySelectorAll('#main #options')
            insertAfterQuery = options[options.length-1]
            alertBox.show();
        }

        let insertAfter = $(insertAfterQuery);

        if(alertBox !== null && insertAfter !== null) {
            insertAfter.after(alertBox);
        }
    }
,

    hide_thumbs:

    function hideThumbs (toggle) { //eslint-disable-line no-unused-vars
        const settings = getModSettings('hidethumbs')
        const index = 'kes-index-thumbs'
        const inline = 'kes-inline-thumbs'
        const thumbsCSS = `
        .entry.section.subject figure, .no-image-placeholder {
            display: none
        }
        `
        const inlineCSS = `
        .thumbs {
            display:none
        }
        `
        function apply (sheet, name) {
            unset(name)
            safeGM("addStyle", sheet, name)
        }
        function unset (name) {
            safeGM("removeStyle", name)
        }
        if (toggle) {
            if (settings["index"]) {
                apply(thumbsCSS, index);
            } else {
                unset(index)
            }
            if (settings["inline"]) {
                apply(inlineCSS, inline)
            } else {
                unset(inline)
            }
        } else {
            unset(index)
            unset(inline)
        }
    }
,

    adjust:

    function adjustSite (toggle) { // eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         Color adjustments
        // @namespace    https://github.com/aclist
        // @version      0.2
        // @description  Adjust appearance of site
        // @author       minnieo
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        const sheetName = "#custom-kes-colors"

        if (toggle) {
            adjustColors(sheetName);
        } else {
            safeGM("removeStyle", sheetName);
        }

        function adjustColors (sheetName) {
            let settings = getModSettings('adjust');
            let sepia = `${settings.sepia * 10}%`;
            let hue = `${settings.hueRotate * 10}deg`;
            let bright = `${(settings.bright * 10) + 100}%`;
            let saturate = `${(settings.saturate * 10) + 100}%`;
            let contrast = `${(settings.contrast * 10) + 100}%`;
            let upvoteCol = getHex(settings.upvote); // eslint-disable-line no-undef
            let downvoteCol = getHex(settings.downvote); // eslint-disable-line no-undef
            let boostCol = getHex(settings.boost); // eslint-disable-line no-undef


            const customCSS = `
                html {
                    filter: sepia(${sepia}) hue-rotate(${hue}) brightness(${bright}) saturate(${saturate}) contrast(${contrast});
                }
                .vote .active.vote__up button {
                    color: ${upvoteCol};
                    ${settings.border ? `border: 2px solid ${upvoteCol};` : ''}
                }
                .vote .active.vote__down button {
                    color: ${downvoteCol};
                    ${settings.border ? `border: 2px solid ${downvoteCol};` : ''}
                }
                .entry footer menu > a.active, .entry footer menu > li button.active {
                    color: ${boostCol};
                    text-decoration: none;
                }
            `;
            safeGM("removeStyle", sheetName);
            safeGM("addStyle", customCSS, sheetName)
        }
    }
,

    alpha_sort_subs:

    function alphaSortInit (toggle) { // eslint-disable-line no-unused-vars
        const ind = window.location.href.split('/')[5]
        if (!ind) return
        if ((ind.indexOf('subscriptions') < 0) && (ind.indexOf('followers') < 0)) return
        const ul = document.querySelector('.section.magazines.magazines-columns ul,.section.users.users-columns ul')
        const obj = {}

        if (toggle) {
            const mags = document.querySelectorAll('.section.magazines.magazines-columns ul li a,.section.users.users-columns ul li a');
            const namesArr = []

            mags.forEach((item) => {
                const dest = item.href;
                const hrName = item.innerText;
                obj[hrName] = dest
                namesArr.push(hrName);
            });

            const sorted = namesArr.sort((a, b) => {
                return a.localeCompare(b, undefined, { sensitivity: 'base' });
            });

            const outer = document.querySelector('.section.magazines.magazines-columns,.section.users.users-columns')
            $(ul).hide();

            for (let i =0; i<sorted.length; ++i) {
                const myListItem = document.createElement('li');
                myListItem.className = "alpha-sorted-subs"
                const mySubsLink = document.createElement('a');
                mySubsLink.setAttribute('href', obj[sorted[i]]);
                mySubsLink.innerText = namesArr[i];
                mySubsLink.className = 'subs-nav';
                myListItem.append(mySubsLink);
                outer.append(myListItem);
            }

        } else {
            $('.alpha-sorted-subs').remove();
            $(ul).show();
        }
    }
,

    expand_posts:

    function expandPostsInit (toggle) { // eslint-disable-line no-unused-vars

        async function update (response) {
            const xml = response.response
            const parser = new DOMParser();
            const doc = parser.parseFromString(xml, "text/html");
            const articleId = doc.querySelector('article').id
            const postBody = doc.querySelector('.content').innerText
            const arr = Array.from(document.querySelectorAll('.entry'))
            const res = arr.find((el) => el.id === articleId);
            const oldBody = res.querySelector('.short-desc p');
            const settings = getModSettings("expand-posts")
            const collapseLabel = settings.collapse
            const newButton = makeButton(collapseLabel, res)
            newButton.className = 'kes-collapse-post-button'

            oldBody.innerText = postBody
            oldBody.appendChild(newButton)
            if (oldBody.childNodes[0].nodeName === "BR") {
                oldBody.children[0].remove()
            }
            const prev = newButton.previousElementSibling
            const prevOfPrev = newButton.previousElementSibling.previousElementSibling
            if (prev.nodeName === "BR" && prevOfPrev.nodeName=== "BR") {
                prevOfPrev.remove()
            }
        }
        function makeButton (text, parent) {
            const button = document.createElement('a')
            const br = document.createElement('br')
            button.innerText = text
            button.className = 'kes-expand-post-button'
            button.style.cursor = 'pointer'
            button.addEventListener('click', (e) => {
                const mode = e.target.innerText
                const settings = getModSettings("expand-posts")
                const loadingLabel = settings.loading
                const expandLabel = settings.expand
                if (mode === expandLabel) {
                    button.innerText = loadingLabel
                    button.className = 'kes-loading-post-button'
                    const link = parent.querySelector('header h2 a')
                    genericXMLRequest(link, update)
                } else {
                    const body = parent.querySelector('.short-desc p')
                    const ar = body.innerText.split('\n')
                    for (let i = 0; i < ar.length; ++i) {
                        if (ar[i]) {
                            body.innerText = ar[i] + '...'
                            button.innerText = expandLabel
                            button.className = 'kes-expand-post-button'
                            body.appendChild(br)
                            body.appendChild(button)
                            break
                        }
                    }
                }
            });
            return button
        }
        function propagateButtons () {
            const entries = document.querySelectorAll('.entry')
            entries.forEach((entry) => {
                const b = entry.querySelector('.short-desc p')
                const br = document.createElement('br')
                if (b) {
                    const end = b.innerText.slice(-3)
                    if (end == "...") {
                        br.id = "kes-expand-divider"
                        const button = makeButton(expandLabel, entry)
                        b.appendChild(br)
                        b.appendChild(button)
                    }
                }
            });
            updateButtonLabels();
        }
        function updateButtonLabels () {
            const expandLabels = document.querySelectorAll('.kes-expand-post-button')
            const loadingLabels = document.querySelectorAll('.kes-loading-post-button')
            const collapseLabels = document.querySelectorAll('.kes-collapse-post-button')
            expandLabels.forEach((label) =>{
                label.innerText = expandLabel
            });
            collapseLabels.forEach((label) =>{
                label.innerText = collapseLabel
            });
            loadingLabels.forEach((label) =>{
                label.innerText = loadingLabel
            });
        }

        const settings = getModSettings("expand-posts")
        const loadingLabel = settings.loading
        const expandLabel = settings.expand
        const collapseLabel = settings.collapse
        if (toggle) {
            propagateButtons();
        } else {
            const oldButtons = document.querySelectorAll('.kes-expand-post-button')
            const oldButtons2 = document.querySelectorAll('.kes-collapse-post-button')
            oldButtons.forEach((button)=>{
                button.remove();
            });
            oldButtons2.forEach((button)=>{
                button.remove();
            });
        }
    }
,

    thread_delta:

    function threadDeltaInit (toggle) { // eslint-disable-line no-unused-vars
        const settings = getModSettings('thread-delta');
        const fgcolor = getHex(settings["fgcolor"]) // eslint-disable-line no-undef
        const bgcolor = getHex(settings["bgcolor"]) // eslint-disable-line no-undef
        const state = settings["state"]

        const hostname = window.location.hostname;
        const loc = window.location.pathname.split('/')
        if (loc[1] != "m") {
            return
        }
        const mag = loc[2]

        function applyDeltas (counts) {
            const nav = document.querySelector('.head-nav__menu')
            const c = nav.querySelectorAll('a')
            const prefix = " Δ "

            let thread_delta
            let blog_delta
            let countBar

            const thread_count = Number(c[1].innerText.split('(')[1].split(')')[0])
            const blog_count = Number(c[2].innerText.split('(')[1].split(')')[0])

            if (! document.querySelector('#kes-thread-delta-bar')) {
                countBar = document.querySelector('#kes-thread-delta-bar')
                const top = document.querySelector('body');
                countBar = document.createElement('div');
                countBar.id = 'kes-thread-delta-bar';
                top.insertBefore(countBar, top.children[0])
            } else {
                countBar  = document.querySelector('#kes-thread-delta-bar')
            }

            countBar.style.height = "1rem"
            countBar.style.fontSize = "0.6em"
            countBar.style.textAlign = "center"
            countBar.style.color = fgcolor
            countBar.style.backgroundColor = bgcolor
            if (state == "off") {
                countBar.style.display = "none"
            }
            else {
                countBar.style.display = ""
            }
            countBar.innerText = `Magazine: ${mag} | Threads: (${thread_count})`
            if (counts[0]) {
                thread_delta = (thread_count - counts[0])
                if (thread_delta > 0) {
                    countBar.style.display = ""
                    countBar.innerText = countBar.innerText + `${prefix} ${thread_delta}`
                }
            }
            countBar.innerText = countBar.innerText + ` | Microblogs: (${blog_count})`
            if (counts[1]) {
                blog_delta = (blog_count - counts[1])
                if (blog_delta >0) {
                    countBar.style.display = ""
                    countBar.innerText = countBar.innerText + `${prefix} ${blog_delta}`
                }
            }

            counts[0] = thread_count
            counts[1] = blog_count

            saveCounts(hostname, mag, counts)
        }

        async function loadCounts (hostname, mag) {
            let counts
            counts = await safeGM("getValue", `thread-deltas-${hostname}-${mag}`)
            if (!counts) {
                counts = []
            }
            applyDeltas(counts)
        }

        async function saveCounts (hostname, mag, counts) {
            // eslint-disable-next-line no-unused-vars
            const savedCounts = await safeGM("setValue", `thread-deltas-${hostname}-${mag}`, counts)
        }

        if (toggle) {
            loadCounts(hostname, mag);
        } else {
            const countBar = document.querySelector('#kes-thread-delta-bar')
            if (countBar) {
                countBar.remove();
            }
            const e = []
            saveCounts(hostname, mag, e)
        }
    }
,

    hide_upvotes:

    function hideUpvotes (toggle) { //eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         kbin Vote Hider
        // @namespace    https://github.com/aclist
        // @version      0.2
        // @description  Hide upvotes, downvotes, and karma
        // @author       artillect
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        if (toggle) {
            $('form.vote__up').hide();
        } else {
            $('form.vote__up').show();
        }
    }
,

    hide_sidebar:

    function hideSidebar (toggle) { // eslint-disable-line no-unused-vars

        const obj = {
            sidebar: '#sidebar',
            mags: '#sidebar > .related-magazines',
            users: '#sidebar > .active-users',
            posts: '#sidebar > .posts',
            threads: '#sidebar > .entries',
            instance: '#sidebar > .kbin-promo',
            intro: '.sidebar-options > .intro'
        }

        const settings = getModSettings('hide-sidebar');

        const keys = Object.keys(obj);

        if (toggle) {
            for (let i = 0; i< keys.length; i++) {
                let key = keys[i]
                if (settings[key]) {
                    $(obj[key]).hide();
                } else {
                    $(obj[key]).show();
                }
            }
        } else {
            for (let i = 0; i< keys.length; i++) {
                let key = keys[i]
                $(obj[key]).show();
            }
        }
    }
,

    hover_indicator:

    function hoverIndicator (toggle) { // eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         Hover Indicator
        // @namespace    https://github.com/aclist
        // @version      0.1.0
        // @description  applies a outline to hovered elements
        // @author       minnieo
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        if (toggle) {
            applyOutlines();
        } else {
            safeGM("removeStyle", "kes-hover-css")
        }

        function applyOutlines () {
            const settings = getModSettings('hover');
            const color = getHex(settings.color); // eslint-disable-line no-undef
            const thickness = settings.thickness;

            const sels = [
                "a",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "img",
                "button",
                "label",
                "markdown-toolbar",
                "textarea",
                "i",
                "time",
                "small",
                "div.content",
                "ul",
                "li",
                "span",
                "figure",
                "input",
                "div.checkbox",
                "div.ts-wrapper",
                "#scroll-top",
                ".more",
                "select:hover"

            ]
            const selectors = sels.join(':hover, ');
            const mergedCSS = `${selectors} {
                outline: ${thickness}px solid ${color};
            }
            p:not(div.content p):hover {
                border: ${thickness}px solid ${color};
            }
            `;
            const exclusions = `
            li > form > button:hover, li > a, i > span, a > i, a > img, span > i, a > span, span > a, li > i, button > span, li > button, #scroll-top > i {
                outline: none !important;
            }

            `
            safeGM("removeStyle", "kes-hover-exclusions")
            safeGM("removeStyle", "kes-hover-css")
            safeGM("addStyle", mergedCSS, "kes-hover-css")
            safeGM("addStyle", exclusions, "kes-hover-exclusions")
        }
    }
,

    thread_checkmarks:

    function checksInit (toggle, mutation) { // eslint-disable-line no-unused-vars
        const settings = getModSettings('checks');
        const checkColor = settings["check-color"]
        const threadIndex = document.querySelector('[data-controller="subject-list"]')
        const user = document.querySelector('.login');
        const username = user.href.split('/')[4];
        const hostname = window.location.hostname

        if ((!threadIndex) || (!username)) return

        async function fetchMags (username) {
            const loaded = await safeGM("getValue", `omni-user-mags-${hostname}-${username}`)
            if (!loaded) return
            setChecks(loaded)
        }
        function addCheck (subs, item) {
            if (item.querySelector('#kes-omni-check')) return
            const mag = item.getAttribute('href').split('/')[2]
            if (subs.includes(mag)) {
                const ch = document.createElement('span')
                ch.style.color = getHex(checkColor); // eslint-disable-line no-undef
                ch.id = 'kes-omni-check'
                ch.innerText = " ✓"
                //FIXME: append adjacent; collision with mag instance mod
                item.after(ch)
                //item.appendChild(ch)
            }
        }
        function setChecks (subs) {
            const exists = document.querySelector('#kes-omni-check')
            if (exists) {
                document.querySelectorAll('#kes-omni-check').forEach((item) => {
                    item.style.color = getHex(checkColor); // eslint-disable-line no-undef
                });
            }
            document.querySelectorAll('.magazine-inline').forEach((item) => {
                addCheck(subs, item)
            });
        }

        if (toggle) {
            fetchMags(username);
        } else {
            const oldChecks = document.querySelectorAll('#kes-omni-check')
            oldChecks.forEach((check) => {
                check.remove();
            });
        }
    }
,

    user_instance_names:

    function userInstanceEntry (toggle) { // eslint-disable-line no-unused-vars
        function showUserInstances () {
            $('.user-inline').each(function () {
                if (!$(this).hasClass('instance')) {
                    $(this).addClass('instance');
                    // Get user's instance from their profile link
                    var userInstance = $(this).attr('href').split('@')[2];
                    // Check if user's link includes an @
                    if (userInstance) {
                        // Add instance name to user's name
                        $(this).html($(this).html() +
                            '<span class="user-instance">@' +
                            userInstance +
                            '</span>');
                    }
                }
            });
        }
        function hideUserInstances () {
            $('.user-inline.instance').each(function () {
                $(this).removeClass('instance');
                $(this).html($(this).html().split('<span class="user-instance">@')[0]);
            });
        }
        if (toggle) {
            showUserInstances();
        } else {
            hideUserInstances();
        }
    }
,

    submission_label:

    function addPrefix (toggle) { // eslint-disable-line no-unused-vars 

        const settings = getModSettings("submission_label");
        const label = settings["prefix"]
        const css = `
        article:not(.entry-cross) .user-inline::before {
            content: " ${label} ";
            font-weight: 400;
        }
        `;

        if (toggle) {
            safeGM("removeStyle", "submission-css")
            safeGM("addStyle", css, "submission-css")
        } else {
            safeGM("removeStyle", "submission-css")
        }
    }
,

    hide_downvotes:

    function hideDownvotes (toggle) { // eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         kbin Vote Hider
        // @namespace    https://github.com/aclist
        // @version      0.2
        // @description  Hide upvotes, downvotes, and karma
        // @author       artillect
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        if (toggle) {
            $('form.vote__down').hide();
        } else {
            $('form.vote__down').show();
        }
    }
,

    kbin_federation_awareness:

    function initKFA (toggle) { // eslint-disable-line no-unused-vars
        /*
            License: MIT
            Original Author: CodingAndCoffee (https://kbin.social/u/CodingAndCoffee)
        */

        const kfaHasStrictModerationRules = [
            'beehaw.org',
            'lemmy.ml'
        ];

        function kfaIsStrictlyModerated (hostname) {
            return kfaHasStrictModerationRules.indexOf(hostname) !== -1;
        }

        function kfaComponentToHex (c) {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function kfaRgbToHex (r, g, b) {
            return "#" + kfaComponentToHex(r) + kfaComponentToHex(g) + kfaComponentToHex(b);
        }

        function kfaHexToRgb (hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function kfaSubtractColor (hex, amount) {
            let rgb = kfaHexToRgb(hex);
            if (rgb.r > amount) {
                rgb.r -= amount;
            } else {
                rgb.r = 0;
            }
            if (rgb.g > amount) {
                rgb.g -= amount;
            } else {
                rgb.g = 0;
            }
            if (rgb.b > amount) {
                rgb.b -= amount;
            } else {
                rgb.b = 0;
            }
            return kfaRgbToHex(rgb.r, rgb.g, rgb.b);
        }

        function kfaGetCss () {
            let fedColor0 = kfaSettingsFed;
            let fedColor1 = kfaSubtractColor(fedColor0, 50);
            let fedColor2 = kfaSubtractColor(fedColor1, 50);
            let fedColor3 = kfaSubtractColor(fedColor2, 50);
            let modColor0 = kfaSettingsMod;
            let modColor1 = kfaSubtractColor(modColor0, 50);
            let modColor2 = kfaSubtractColor(modColor1, 50);
            let modColor3 = kfaSubtractColor(modColor2, 50);
            let homeColor0 = kfaSettingsHome;
            let homeColor1 = kfaSubtractColor(homeColor0, 50);
            let homeColor2 = kfaSubtractColor(homeColor1, 50);
            let homeColor3 = kfaSubtractColor(homeColor2, 50);
            if (kfaSettingsStyle === 'border') {
                let commentFed = ` .comment.data-federated {  box-shadow: `;
                let articleFed = ` article.data-federated {  box-shadow: `;
                let commentMod = ` .comment.data-moderated {  box-shadow: `;
                let articleMod = ` article.data-moderated {  box-shadow: `;
                let commentHome = ` .comment.data-home {  box-shadow: `;
                let articleHome = ` article.data-home {  box-shadow: `;
                commentMod += `1px 0 0 ` + modColor0 + `, 2px 0 0 ` + modColor0 + `, 3px 0 0 ` + modColor1 + `, 4px 0 0 ` + modColor2 + `, 5px 0 0 ` + modColor3 + `; }`;
                commentFed += `1px 0 0 ` + fedColor0 + `, 2px 0 0 ` + fedColor0 + `, 3px 0 0 ` + fedColor1 + `, 4px 0 0 ` + fedColor2 + `, 5px 0 0 ` + fedColor3 + `; }`;
                commentHome += `1px 0 0 ` + homeColor0 + `, 2px 0 0 ` + homeColor0 + `, 3px 0 0 ` + homeColor1 + `, 4px 0 0 ` + homeColor2 + `, 5px 0 0 ` + homeColor3 + `; }`;
                if (kfaSettingsArticleSide === 'left' || kfaSettingsArticleSide === 'both') {
                    articleMod += `-1px 0 0 ` + modColor0 + `, -2px 0 0 ` + modColor0 + `, -3px 0 0 ` + modColor1 + `, -4px 0 0 ` + modColor2 + `, -5px 0 0 ` + modColor3;
                    articleFed += `-1px 0 0 ` + fedColor0 + `, -2px 0 0 ` + fedColor0 + `, -3px 0 0 ` + fedColor1 + `, -4px 0 0 ` + fedColor2 + `, -5px 0 0 ` + fedColor3;
                    articleHome += `-1px 0 0 ` + homeColor0 + `, -2px 0 0 ` + homeColor0 + `, -3px 0 0 ` + homeColor1 + `, -4px 0 0 ` + homeColor2 + `, -5px 0 0 ` + homeColor3;
                }
                if (kfaSettingsArticleSide === 'right' || kfaSettingsArticleSide === 'both') {
                    if (kfaSettingsArticleSide === 'both') {
                        articleMod += `, `;
                        articleFed += `, `;
                        articleHome += `, `;
                    }
                    articleMod += `1px 0 0 ` + modColor0 + `, 2px 0 0 ` + modColor0 + `, 3px 0 0 ` + modColor1 + `, 4px 0 0 ` + modColor2 + `, 5px 0 0 ` + modColor3;
                    articleFed += `1px 0 0 ` + fedColor0 + `, 2px 0 0 ` + fedColor0 + `, 3px 0 0 ` + fedColor1 + `, 4px 0 0 ` + fedColor2 + `, 5px 0 0 ` + fedColor3;
                    articleHome += `1px 0 0 ` + homeColor0 + `, 2px 0 0 ` + homeColor0 + `, 3px 0 0 ` + homeColor1 + `, 4px 0 0 ` + homeColor2 + `, 5px 0 0 ` + homeColor3;
                }
                articleMod += `; }`;
                articleFed += `; }`;
                articleHome += `; }`;
                return commentFed + articleFed + commentMod + articleMod + commentHome + articleHome;
            } else if (kfaSettingsStyle === 'bubble') {
                // Scale 1-10; Default 5 (i.e., 50%); 10 is 50% of 20. 20 * (x * 0.1)
                const defaultScale = 20;
                const setScale = defaultScale * (kfaSettingsScale * 0.1);
                let fedStyle = ` .comment div.data-federated, article .data-federated { display: inline-block; width: ` + setScale + `px; height: ` + setScale + `px; border-radius: 10px; box-shadow: `;
                let modStyle = ` .comment div.data-moderated, article .data-moderated { display: inline-block; width: ` + setScale + `px; height: ` + setScale + `px; border-radius: 10px; box-shadow: `;
                let homeStyle = ` .comment div.data-home, article .data-home { display: inline-block; width: ` + setScale + `px; height: ` + setScale + `px; border-radius: 10px; box-shadow: `;
                modStyle += `0 0 3px 2px ` + modColor0 + `; background-color: ` + modColor0 + `; margin-right: 4px; margin-left: 4px; }`;
                fedStyle += `0 0 3px 2px ` + fedColor0 + `; background-color: ` + fedColor0 + `; margin-right: 4px; margin-left: 4px; }`;
                homeStyle += `0 0 3px 2px ` + homeColor0 + `; background-color: ` + homeColor0 + `; margin-right: 4px; margin-left: 4px; }`;
                return modStyle + fedStyle + homeStyle;
            }
        }

        function kfaStartup () {
            kfaInitClasses();
            kfaInjectedCss = safeGM("addStyle",kfaGetCss());
        }

        function kfaShutdown () {
            if (kfaInjectedCss) {
                kfaInjectedCss.remove();
            }
            function removeOld () {
                for (let i = 0; i<arguments.length; ++i) {
                    arguments[i].forEach((el) => {
                        el.remove();
                    });
                }
            }
            const dh = document.querySelectorAll('header .data-home')
            const df = document.querySelectorAll('header .data-federated')
            const dm = document.querySelectorAll('header .data-moderated')
            const mh = document.querySelectorAll('.meta.entry__meta .data-home')
            const mf = document.querySelectorAll('.meta.entry__meta .data-federated')
            const mm = document.querySelectorAll('.meta.entry__meta .data-moderated')
            removeOld(dh, df, dm, mh, mf, mm);
        }

        function findHostname (op) {
            if (op.includes('@')) {
                //other instances
                const arr = op.split('@')
                return arr[arr.length - 1]
            } else {
                //home instance
                return window.location.hostname
            }
        }

        function toggleClass (article, classname) {
            const articleIndicator = document.createElement('div');
            const articleAside = article.querySelector('aside');
            articleAside.prepend(articleIndicator);

            article.classList.toggle(classname);
            articleIndicator.classList.toggle(classname);
        }

        function kfaInitClasses () {
            document.querySelectorAll('#content article.entry:not(.entry-cross)').forEach(function (article) {
                if (article.querySelector('[class^=data-]')) { return }
                let op = article.querySelector('.user-inline').href
                op = String(op)
                const hostname = findHostname(op);
                article.setAttribute('data-hostname', hostname);
                let type

                if (kfaIsStrictlyModerated(hostname)) {
                    type = 'data-moderated'
                } else if (hostname !== window.location.hostname) {
                    type = 'data-federated'
                } else {
                    type = 'data-home'
                }
                toggleClass(article, type)
            });

            document.querySelectorAll('.comments blockquote.entry-comment').forEach(function (comment) {
                if (comment.querySelector('[class^=data-]')) { return }
                let commentHeader = comment.querySelector('header');
                const userInfo = commentHeader.querySelector('a.user-inline');
                if (userInfo) {
                    const userHostname = userInfo.title.split('@').reverse()[0];
                    let commentIndicator = document.createElement('div');

                    if (kfaIsStrictlyModerated(userHostname)) {
                        comment.classList.toggle('data-moderated');
                        commentIndicator.classList.toggle('data-moderated');
                    } else if (userHostname !== window.location.hostname) {
                        comment.classList.toggle('data-federated');
                        commentIndicator.classList.toggle('data-federated');
                    } else {
                        comment.classList.toggle('data-home');
                        commentIndicator.classList.toggle('data-home');
                    }
                    commentHeader.prepend(commentIndicator);
                }
            });
        }

        let kfaInjectedCss;
        let kfaSettingsFed;
        let kfaSettingsMod;
        let kfaSettingsHome;
        let kfaSettingsArticleSide;
        let kfaSettingsStyle;
        let kfaSettingsScale;

        if (toggle) {
            const settings = getModSettings('kbinFedAware');
            kfaSettingsFed = settings['kfaFedColor'];
            kfaSettingsMod = settings['kfaModColor'];
            kfaSettingsHome = settings['kfaHomeColor'];
            kfaSettingsArticleSide = settings['kfaPostSide'];
            kfaSettingsStyle = settings['kfaStyle'];
            kfaSettingsScale = settings['kfaBubbleScale'];
            kfaStartup();
        } else {
            kfaShutdown();
        }
    }

,

    mobile_cleanup:

    function mobileHideInit (toggle) { // eslint-disable-line no-unused-vars
        function mobileHideTeardown () {
            let filterBtn
            let viewBtn
            try {
                filterBtn = document.querySelector('button[aria-label="Filter by type"]');
                viewBtn = document.querySelector('button[aria-label="Change view"]');
            } finally {
                if (viewBtn) {
                    viewBtn.style.display = 'block'
                }
                if (filterBtn) {
                    filterBtn.style.display = 'block'
                }
            }
        }
        function mobileHideSetup () {
            let filterBtn
            let viewBtn
            const settings = getModSettings('mobilehide')
            try {
                filterBtn = document.querySelector('button[aria-label="Filter by type"]');
                viewBtn = document.querySelector('button[aria-label="Change view"]');
            } finally {
                if (filterBtn) {
                    if (settings["filter"]) {
                        filterBtn.style.display = 'none'
                    } else {
                        filterBtn.style.display = 'block'
                    }
                }
                if (viewBtn) {
                    if (settings["view"]) {
                        viewBtn.style.display = 'none'
                    } else {
                        viewBtn.style.display = 'block'
                    }
                }
            }
        }
        if (toggle) {
            mobileHideSetup();
        } else {
            mobileHideTeardown();
        }
    }
,

    hide_posts:

    function hidePostsInit (toggle) { //eslint-disable-line no-unused-vars

        async function wipeArray () {
            await safeGM("setValue","hidden-posts","[]")
        }
        async function setArray () {
            const val = await safeGM("getValue","hidden-posts")
            if(val) {
                setup(val)
            } else {
                await safeGM("setValue","hidden-posts","[]")
                setup('[]')
            }
        }
        async function addToArr (idArr,toHideID) {
            idArr.push(toHideID)
            const updatedArr = JSON.stringify(idArr)
            await safeGM("setValue","hidden-posts",updatedArr)
        }
        function teardown (hp) {
            $('.kes-hide-posts').hide();
            for (let i = 0; i < hp.length; ++i) {
                const toShow = document.querySelector('#entry-' + hp[i]);
                $(toShow).show();
                hideSib(toShow, 'show')
            }
            let hideThisPage = []
            storeCurrentPage(hideThisPage);
            wipeArray();
        }
        async function fetchCurrentPage () {
            const hp = await safeGM("getValue","hide-this-page");
            if (hp) {
                teardown(hp);
            }
        }
        async function storeCurrentPage (hideThisPage) {
            await safeGM("setValue","hide-this-page",hideThisPage)
        }
        function hideSib (el, mode) {
            const sib = el.nextSibling;
            if (sib.className === "js-container") {
                if (mode === 'hide') {
                    $(sib).hide();
                } else {
                    $(sib).show();
                }
            }
        }
        function setup (array) {
            const hideThisPage = []
            const rawIdArr = array;
            const idArr = JSON.parse(rawIdArr);
            const posts = document.querySelectorAll('#content .entry')
            posts.forEach((item) => {
                const entryID = item.id.split('-')[1]
                if (idArr.includes(entryID)) {
                    $(item).hide();
                    hideSib(item, 'hide');
                    hideThisPage.push(entryID)
                } else {
                    const toHide = item.querySelector('.kes-hide-posts');
                    if (toHide) {
                        $(toHide).show();
                        return
                    }
                    const hideButtonHolder = document.createElement('li');
                    const hideButton = document.createElement('a');
                    hideButtonHolder.appendChild(hideButton)
                    hideButton.className = "stretched-link kes-hide-posts"
                    hideButton.innerText = "hide";
                    hideButton.setAttribute("hide-post-id",entryID);
                    const footer = item.querySelector('footer menu');
                    footer.appendChild(hideButtonHolder);
                    hideButton.addEventListener('click',(event) => {
                        const toHideID = event.target.getAttribute("hide-post-id");
                        const toHide = document.querySelector('#entry-' + toHideID);
                        $(toHide).hide();
                        hideSib(toHide, 'hide')
                        hideThisPage.push(toHideID)
                        addToArr(idArr,toHideID);
                        storeCurrentPage(hideThisPage)
                    });
                }
            });

        }
        if (toggle) {
            setArray();
        } else {
            fetchCurrentPage();
        }
    }
,

    softblock:

    function softBlockInit (toggle) { // eslint-disable-line no-unused-vars
        //TODO: don't apply on magazine pages
        const hostname = window.location.hostname;
        const softBlockCSS = `
        .softblocked-article {
            display: none;
        }
        .softblock-manage, .softblock-icon:hover {
            cursor: pointer;
        }
        #softblock-panel {
            background-color: gray;
            z-index: 99999;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 150px;
            width: 50%;
            overflow-y: scroll;
            flex-direction: column-reverse;
            padding-top: 10px;
        }
        .softblock-panel-close {
            margin: auto;
        }
        .softblock-panel-list {
            color: white;
        }
        `

        function softBlock (mags) {
            const path = location.pathname.split('/')[1]
            switch (path) {
                case "":
                case "sub": {
                    blockThreads(mags);
                    break
                }
                case "magazines": {
                    addToIndex(mags);
                    break
                }
                case "m": {
                    addToSidebar(mags);
                    break
                }
            }
        }
        function blankCSS (el) {
            el.classList.add('softblocked-article');
        }
        function hideThreads (mags) {
            if (!mags) return
            let el
            const articles = document.querySelectorAll('.magazine-inline')
            articles.forEach((article) => {
                const instance = article.href.split('/')[4]
                if (mags.includes(instance)) {
                    if (getInstanceType() === "kbin") { // eslint-disable-line no-undef
                        el = article.parentElement.parentElement;
                    } else {
                        el = article.parentElement.parentElement.parentElement;
                    }
                    blankCSS(el);
                }
            });
        }
        function blockThreads (mags) {
            hideThreads(mags)
            document.querySelectorAll('.meta').forEach((item) => {
                if (item.querySelector('.softblock-icon')) {
                    return
                }
                const ch = document.createElement('span');
                ch.className = 'softblock-icon'
                const ic = document.createElement('ic');
                ic.className = "fa-solid fa-comment-slash"
                ch.appendChild(ic);
                ch.addEventListener('click', (e) => {
                    const meta = e.target.parentElement.parentElement
                    const href = meta.querySelector('.magazine-inline').href
                    const mag = href.split('/')[4]
                    if (!mags.includes(mag)) {
                        mags.push(mag);
                    }
                    saveMags(hostname, mags);
                    hideThreads(mags)
                });
                item.appendChild(ch)
            });
        }
        function returnState (mags, mag) {
            if (mags.includes(mag)) {
                return 'unblock'
            } else {
                return 'block'
            }
        }
        function addToSidebar (mags) {
            const mag = location.pathname.split('/')[2]
            const el = document.querySelector('.magazine__subscribe form[name="magazine_block"]')
            const state = returnState(mags, mag);
            const old = document.querySelector('.softblock-button')
            if (old) {
                return
            }
            insertBlockButton(mags, state, el);
        }
        function clean (mags) {
            const list = document.createElement('ul')
            list.className = 'softblock-panel-list'
            const sorted = mags.sort((a, b) => {
                return a.localeCompare(b, undefined, { sensitivity: 'base' });
            });
            for (let i=0; i<sorted.length; ++i) {
                const it = document.createElement('li')
                it.innerText = sorted[i]
                insertBlockButton(mags, 'unblock', it)
                list.appendChild(it)
            }
            if (mags.length === 0) {
                const empty = document.createElement('text')
                empty.innerText = "No softblocked mags."
                list.appendChild(empty)

            }
            return list
        }
        function addToIndex (mags) {
            const manageLink = document.querySelector('.softblock-manage')
            if(manageLink) {
                return
            }
            const sib = document.querySelector('.options__main a[href="/magazines/abandoned"]')
            const par = sib.parentElement
            const but = document.createElement('a')
            but.className = 'softblock-manage'
            but.innerText = "softblocked"
            but.addEventListener('click', () => {
                if (document.querySelector('#softblock-panel')) {
                    return
                }
                const cleanmags = clean(mags)
                const mod = document.createElement('div')
                mod.id = 'softblock-panel'
                const closeButton = document.createElement('button')
                closeButton.innerText = 'close'
                closeButton.className = 'softblock-panel-close'
                closeButton.addEventListener('click', (e)=>{
                    e.target.parentElement.remove();
                });
                mod.appendChild(cleanmags)
                mod.appendChild(closeButton)
                document.querySelector('header').appendChild(mod)
            });
            par.insertAdjacentElement("afterend", but)

            const rows = document.querySelectorAll('.magazines.table-responsive .magazine-inline')
            rows.forEach((link) => {
                const mag = link.href.split('/')[4]
                const row = link.parentElement.parentElement
                const el = row.querySelector('.magazine__subscribe form[name="magazine_block"]')
                const state = returnState(mags, mag);
                if (el.querySelector('.softblock-button')) {
                    return
                }
                insertBlockButton(mags, state, el);
            });
        }

        function insertBlockButton (mags, state, el) {

            const blockButton = document.createElement('button');
            blockButton.classList.add('softblock-button', 'btn', 'btn__secondary', 'action')

            const blockIcon = document.createElement('i');
            const cl = 'fa-solid fa-comment-slash';
            const sp = document.createElement('span')
            sp.className = 'softblock-span';
            blockIcon.className = cl;

            blockButton.appendChild(blockIcon);
            blockButton.appendChild(sp);

            blockButton.addEventListener('click', (e) => {
                let mag
                let button
                let span
                if (location.pathname.split('/')[1] === "magazines") {
                    const type = e.target.tagName
                    const row = e.target.parentElement.parentElement.parentElement.parentElement
                    const row2 = e.target.parentElement.parentElement.parentElement
                    let par
                    switch (type) {
                        case "I":
                            par = row
                            break
                        case "SPAN":
                            par = row
                            break
                        case "BUTTON":
                            par = row2
                            break
                    }
                    mag = par.querySelector('.magazine-inline').href.split('/')[4]
                    button = par.querySelector('.softblock-button')
                    span = par.querySelector('.softblock-span')
                } else {
                    mag = location.pathname.split('/')[2];
                    button = document.querySelector('.softblock-button')
                    span = document.querySelector('.softblock-span')
                }
                const text = span.innerText
                switch (text) {
                    case "Softblock":{
                        span.innerText = 'Unsoftblock'
                        button.classList.add('danger')
                        if(mags.includes(mag)) {
                            break
                        }
                        mags.push(mag)
                        break
                    }
                    case "Unsoftblock": {
                        span.innerText = 'Softblock'
                        button.classList.remove('danger')
                        if(!mags.includes(mag)) {
                            break
                        }
                        const ind = mags.indexOf(mag)
                        mags.splice(ind, 1)
                        break
                    }
                }
                saveMags(hostname, mags)
            });

            switch(state) {
                case "block": {
                    sp.innerText = 'Softblock'
                    break
                }
                case "unblock": {
                    sp.innerText = 'Unsoftblock'
                    blockButton.classList.add('danger')
                    break
                }
            }
            el.insertAdjacentElement("afterend", blockButton);
        }

        async function loadMags (hostname) {
            const mags = await safeGM("getValue", `softblock-mags-${hostname}`)
            if (!mags) {
                const e = [];
                saveMags(hostname, e)
            }
            softBlock(mags)
        }

        async function saveMags (hostname, mags) {
            await safeGM("setValue", `softblock-mags-${hostname}`, mags)
        }
        function removeEls () {
            let range
            for (let i = 0; i < arguments.length; ++i) {
                range = document.querySelectorAll(arguments[i])
                range.forEach((el) => {
                    el.remove();
                });
            }
        }

        if (toggle) {
            safeGM('addStyle', softBlockCSS, 'softblock-css');
            loadMags(hostname);
        } else {
            safeGM('removeStyle', 'softblock-css')
            removeEls('.softblock-icon', '.softblock-button')
            const e = []
            saveMags(hostname, e)
        }
    }
,

    subs:

    function initMags (toggle) { // eslint-disable-line no-unused-vars

        function createMags () {
            const nav = document.querySelector('.head-nav__menu');
            const mobileNav = document.querySelector('.section.mobile-nav');
            //const mags = document.querySelector('[href="/magazines"]');
            const user = document.querySelector('.login');
            const username = user.href.split('/')[4];
            const subLink = 'https://' + window.location.hostname + '/u/' + username + '/subscriptions';
            let peopleLink = document.querySelector('.head-nav__menu a[href*="people"]')
            const subsNav = document.querySelector('.subs-nav');
            if (username == null) {
                return;
            } else if (subsNav) {
                return;
            } else {
                const subsPage = window.location.href.split('/')[5];
                const myListItem = document.createElement('li');
                const mySubsLink = document.createElement('a');
                mySubsLink.setAttribute('href', subLink);
                mySubsLink.innerText = 'My mags';
                if (subsPage === "subscriptions") {
                    mySubsLink.className = 'subs-nav active';
                    peopleLink.className = ""
                } else {
                    mySubsLink.className = 'subs-nav';
                }
                myListItem.append(mySubsLink);
                nav.appendChild(myListItem);
                mobileNav.appendChild(myListItem.cloneNode(true));
            }
        }

        if (toggle) {
            createMags();
        } else {
            $('.subs-nav').remove();
        }
    }
}
