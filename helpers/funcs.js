const funcObj = { // eslint-disable-line no-unused-vars

    always_more: //mes-func
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
    },

    improved_collapsible_comments: //mes-func
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

            .comments > div[class^="comment-line--"] {
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
                blockquote:not(.post-comment).comment-level--${i} {
                    margin-left: 0 !important;
                }
                `;
            }
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
            safeGM("addStyle", mbinStyle, "mbin-kes-comments-style")
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
    },

    omni: //mes-func
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
                //TODO: user may have no subscribed mags
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
                    ?? document.querySelector('.mbin-container')
                const kth = document.createElement('div');
                kth.style.cssText = 'height: 0px; width: 0px'
                const ktb = document.createElement('button')
                ktb.style.cssText = 'opacity:0;width:0'
                ktb.id = 'kes-omni-keytrap'
                kth.appendChild(ktb)
                pageHolder.insertBefore(kth, pageHolder.children[0])
                ktb.addEventListener('keyup',kickoffListener)
                const globalKeyInsert = document.querySelector('[data-controller="kbin notifications"]')
                    ?? document.querySelector('[data-controller="mbin notifications"]');
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
    },

    clarify_recipient: //mes-func
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
    },

    hide_reputation: //mes-func
    function hideReputation (toggle) { //eslint-disable-line no-unused-vars
        // ==UserScript==
        // @name         kbin Vote Hider
        // @namespace    https://github.com/aclist
        // @version      0.3
        // @description  Hide upvotes, downvotes, and karma
        // @author       artillect
        // @match        https://kbin.social/*
        // @license      MIT
        // ==/UserScript==
        const itemSelector = 'li:has(a[href$="/reputation/threads"])'
        if (toggle) {
            $(`#sidebar > section.section.user-info > ul > ${itemSelector}`).hide()
            document.styleSheets[0].addRule(`.user-popover ul ${itemSelector}`,'display:none')
        } else {
            $(`#sidebar > section.section.user-info > ul > ${itemSelector}`).show()
            document.styleSheets[0].addRule(`.user-popover ul ${itemSelector}`,'display:initial')
        }
    },

    notifications_panel: //mes-func
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
            const token = notificationsXML.querySelector('#push-subscription-div')
                .getAttribute('data-application-server-public-key');
            let currentPage = notificationsXML.querySelector('[property="og:url"]').content.split('=')[1]
            let currentPageInt = parseInt(currentPage)
            // 2025-01-19: there can be 25 messages before pagination occurs
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
                    genericPOSTRequest(notificationsURL + '/read', readAndReset, token);
                });
            } else {
                readButton.style.opacity = 0.7;
                readButton.style.cursor = 'unset';
            }
            purgeButton.addEventListener('click', () => {
                clearPanel();
                genericPOSTRequest(notificationsURL + '/clear', readAndReset, token);
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
            iframe.addEventListener('click', () => {
                if (iframe.querySelector('.noti-no-messages')) {
                    iframe.remove();
                    document.querySelector('.clickmodal').remove();
                    return;
                }
            });

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
            });
            const container = document.querySelector('.kbin-container') 
                ?? document.querySelector('.mbin-container');
            container.appendChild(clickModal);
            listItem.appendChild(iframe);
            genericXMLRequest(notificationsURL + '?p=1',insertMsgs);
        }

        function build () {
            const notiPanel = document.querySelector('li.notification-button');
            if (notiPanel) return
            const parentElement = document.querySelector('.header .kbin-container')
                    ?? document.querySelector('.header .mbin-container');
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
    },

    mag_instance_names: //mes-func
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
    },

    code_highlighting: //mes-func
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
    },

    rearrange: //mes-func
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
    },

    dropdown: //mes-func
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
                const page = $('#dropdown-select').val().toLowerCase();
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
    },

    remove_ads: //mes-func
    function filter (toggle, mutation) { // eslint-disable-line no-unused-vars

        const settings = getModSettings("spamfilter")
        if (!settings) return
        const fresh = settings["fresh"]
        const weighted = settings["weight"]
        const block = settings["block"]

        //
        //currently unused
        //const votes = document.querySelectorAll('.vote')
        //function filter (posts) {
        //    return Array.from(posts).filter((el) =>
        //        parseInt(el.querySelector('.vote__up button span').innerText) <= parseInt(el.querySelector('.vote__down button span').innerText)
        //    )
        //}

        const user_ids = []
        const user_links = []
        const checked = []
        const banned = []
        const softbanned = []

        let unique_users = {}
        let modal
        let iteration
    
        const domain = window.location.hostname
        const url = new URL(window.location).href.split('/')
        if (url[3] !== "m") return
        if (url[5] === "t") return

        const modalCSS = `
        #kes-filter-modal-bg {
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 90;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5) !important
        }

        #kes-filter-modal {
            background-color: gray;
            width: 500px;
            height: 100px;
            display: grid;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
        }
        #kes-filter-text {
            color: black;
            margin: 20px
        }

        `;


        function makeModal () {
            const modal_bg = document.createElement('div')
            const modal = document.createElement('div')
            const text = document.createElement('p')
            modal_bg.id = "kes-filter-modal-bg"
            modal.id = "kes-filter-modal"
            text.id = "kes-filter-text"
            text.innerText = "KES: filtering spam, please wait..."
            modal_bg.appendChild(modal)
            modal.appendChild(text)
            return modal_bg
        }
    
        function apply () {
            modal = makeModal()
            document.body.appendChild(modal)
            safeGM("removeStyle", "kes-filter-css")
            safeGM("addStyle", modalCSS, "kes-filter-css")
            check();
        }
        function unapply () {
            safeGM("removeStyle", "kes-filter-css")
        }

        function filterDupes (array) {
            const filtered = [...new Set(array)]
            const sorted = filtered.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            return sorted
        }

        function clearStorage () {
            localStorage.setItem("kes-banned-users", "")
            localStorage.setItem("kes-softbanned-users", "")
            localStorage.setItem("kes-checked-users", "")
        }

        function check () {
            document.querySelectorAll('.user-inline').forEach((user) => {
                user_ids.push(user.title)
                user_links.push(user.href)
            })

            unique_users = filterDupes(user_ids)
            iteration = unique_users.length

            // first invocation
            if (!mutation) {
                clearStorage();
                for (let i = 0; i < unique_users.length; ++i) {
                    checked.push(unique_users[i]);
                    applyFilters(unique_users[i]);
                }
                return
            }
            const str_banned = localStorage.getItem("kes-banned-users")
            const str_softbanned = localStorage.getItem("kes-softbanned-users")
            const str_checked = localStorage.getItem("kes-checked-users")
            //applies on DOM mutation events; check prior lists to save time
            //arrays are initialized empty on each DOM recursion
            for (let i = 0; i < unique_users.length; ++i) {
                if (iteration == 1) {
                    modal.remove();
                }
                if (str_checked.split(',').includes(unique_users[i])) {
                    checked.push(unique_users[i])
                    --iteration
                    continue
                } else if (str_banned.split(',').includes(unique_users[i])) {
                    banned.push(unique_users[i])
                    continue
                } else if (str_softbanned.split(',').includes(unique_users[i])) {
                    softbanned.push(unique_users[i])
                    continue
                }
                checked.push(unique_users[i])
                applyFilters(unique_users[i])
            }

        }

        function getRelativeName (user) {
            let relative_name
            if (user.split('@')[2] === domain) {
                relative_name = user.split('@')[1]
            } else {
                relative_name = user
            }
            return relative_name
        }

        function applyFilters (user) {
            const relative_name = getRelativeName(user)
            const url = `https://${domain}/ajax/fetch_user_popup/${relative_name}`
            if (softbanned.includes(name)) {
                --iteration
                return
            }
            if (banned.includes(name)) {
                --iteration
                return
            }
            genericXMLRequest(url, parse)
        }
        async function parse (response) {
            const parser = new DOMParser();
            const json = JSON.parse(response.responseText)
            const XML = parser.parseFromString(json.html, "text/html");
            const u = XML.querySelector('.user__name span').innerText.split('\n')[1].trim()
            const age = XML.querySelector('.timeago').innerText.split(' ')
            const repnum = XML.querySelector('header ul li:nth-of-type(3)').innerText.trim().split(' ')[2]
            const threadsnum = XML.querySelector('menu li:nth-of-type(1) a div:first-of-type').innerText
            const commentsnum = XML.querySelector('menu li:nth-of-type(2) a div:first-of-type').innerText

            if ((parseInt(commentsnum) === 0) && (parseInt(threadsnum > 2))) {
                banned.push(u)
            } else if (repnum.charAt(0) === "-") {
                banned.push(u)
            } else {
                switch (age[1]) {
                    case "hour":
                    case "hours":
                        softbanned.push(u)
                        break;
                    case "day":
                    case "days": {
                        if ( age[0] < 3) {
                            softbanned.push(u)
                        }
                        break;
                    }
                    default:
                        break;
                }
            }

            --iteration
            if (iteration === 0) {
                updateStorage();
                processFilters();
            }
        }

        function updateStorage () {
            localStorage.setItem("kes-softbanned-users", filterDupes(softbanned))
            localStorage.setItem("kes-banned-users", filterDupes(banned))
            localStorage.setItem("kes-checked-users", filterDupes(checked))
        }

        function removeArticle (article) {
            article.remove()
        }

        function getPoster (article) {
            const user = article.querySelector('.user-inline').title
            return user
        }

        function voteWeight (article) {
            const up = article.querySelector('.vote__up')
            const down = article.querySelector('.vote__down')
            let up_ct = up.querySelector('[data-subject-target="favCounter"]').innerText
            let down_ct = down.querySelector('[data-subject-target="downvoteCounter"]').innerText
            up_ct = parseFloat(up_ct)
            down_ct = parseFloat(down_ct)

            if (up_ct === 0 && down_ct > 1) {
                return 1
            }
            if (up_ct > 0 && down_ct / up_ct > 1.5) {
                return 1
            } else {
                return 0
            }
        }

        function processFilters () {
            const articles = document.querySelectorAll('.entry')
            for (let i = 0; i < banned.length; ++i) {
                if (block) gt(getRelativeName(banned[i]))
            }
            for (let i = 0; i < articles.length; ++i) {
                const name = getPoster(articles[i])
                if (softbanned.includes(name)) {
                    if (fresh) {
                        removeArticle(articles[i])
                        continue
                    }
                }
                if (banned.includes(name)) {
                    if (block) {
                        removeArticle(articles[i])
                        continue
                    }
                }
                const weight = voteWeight(articles[i])
                if (weight === 1) {
                    if (weighted) {
                        removeArticle(articles[i])
                        continue
                    }
                }
            }
            modal.remove()
            localStorage.setItem("kes-banned-users", banned)
            localStorage.setItem("kes-softbanned-users", softbanned)
            localStorage.setItem("kes-checked-users", checked)
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

        if (toggle) apply(mutation);
        if (!toggle) unapply();
    },

    unblur: //mes-func
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
    },

    easy_emoticon: //mes-func
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
    },

    nav_icons: //mes-func
    function navbarIcons (toggle) { // eslint-disable-line no-unused-vars
        let settings = getModSettings("nav_icons");
        let search = settings.search
        let post = settings.post
        let font = "var(--kbin-body-font-family)"
        let weight = settings.fontWeight
        let searchText = document.querySelector('header menu li a[aria-label="Search"] i')
        let postText = document.querySelector('header menu li a[aria-label="Add"] i')
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
        `;
        if (toggle) {
            safeGM("removeStyle", "navbar-icons-css")
            safeGM("addStyle", css, "navbar-icons-css")
            searchText.innerText = "" ;
            postText.innerText = "" ;
        } else {
            safeGM("removeStyle", "navbar-icons-css")
        }
    },

    resize_text: //mes-func
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
    },

    hide_logo: //mes-func
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
    },

    timestamp: //mes-func
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
    },

    report_bug: //mes-func
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
    },

    mail: //mes-func
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
    },

    default_sort: //mes-func
    /**
     * Allows users to customize the default sort option selected when the url doesn"t 
     * specify one already. This can be configured separately for the different types of pages
     * that have sort options.
     * 
     * @param {Boolean} isActive Whether the mod has been turned on
    */
    function defaultSort (isActive) {  // eslint-disable-line no-unused-vars
        /**
         * The different page types for which users can choose their own default.
         * Each object contains the id used to access the chosen default option from the KES settings,
         * and a list of available options on that page type.
         */
        const pageTypes = {
            THREAD: { id: "Thread", options: ["top", "hot", "newest", "active", "commented"] },
            COMMENTS: { id: "Comment", options: ["top", "hot", "active", "newest", "oldest"] },
            MICROBLOG: { id: "Post", options: ["top", "hot", "newest", "active", "commented"] },
            MAGAZINES: { id: "Magazine", options: ["newest", "hot", "active", "abandoned"] }
        };
        /** The attribute used to mark which sort option has been modified. */
        const markerAttribute = "defaultSort_originalPath";
        /** Regex pattern used to remove or extract the url parameters from a URL. */
        const urlParameterRegex = /\?.+/;

        if (isActive) setup();
        else teardown();

        /**
         * When users access a page like '/m/kbinmeta', they get the default sort option applied as
         * defined by the instance. Instead, '/m/kbinmeta/top' applies a specific sort option.  
         * 
         * This mod (and thus this main function) has two goals:  
         * 1\. redirect users from implicitly sorted pages (like /m/kbinmeta) to the explicitly sorted
         * page of their choice (like /m/kbinmeta/top).  
         * 2. change the native default option from linking to the implicitly sorted page to the
         * explicitly sorted equivalent (to actually make that sort option accessible without getting
         * redirected away from it).
         */
        function setup () {
            const options = getOptionsFromPage();
            if (options.length == 0) return; // this isn't a sortable page

            const pageType = determinePageType();
            if (getChosenDefault(pageType) == 'default') return;

            const optionsToHandle = determineInstanceDefault(options, pageType.options);
            if (optionsToHandle == null) return; // all the options are already explicit

            // Rewrite the link of the default option to lead to the explicitly sorted page.
            const exampleLink = options.find(
                (option) => option.getAttribute('href') != optionsToHandle.element.getAttribute('href')
            ).getAttribute('href');
            optionsToHandle.element.setAttribute(
                `data-${markerAttribute}`, 
                optionsToHandle.element.getAttribute('href')
            );
            optionsToHandle.element.setAttribute('href', (() => {
                const baseRegex = `\\/(?:${pageType.options.join('|')})`;
                var newLink = exampleLink.replaceAll(
                    // replace at end
                    new RegExp(`${baseRegex}$`, 'g'), `/${optionsToHandle.target}`
                );
                newLink = newLink.replaceAll(
                    // replace within
                    new RegExp(`${baseRegex}\\/`, 'g'), `/${optionsToHandle.target}/`
                );
                return newLink;
            })());

            if (!isUrlExplicitlySorted(window.location.pathname, pageType.options)) {
                const userDefault = getChosenDefault(pageType);
                var buttonToClick = findOptionByName(options, userDefault);
                buttonToClick.click();
            }
        }

        /**
         * This function is responsible for reversing the changes made by the setup() function.  
         * In this case, that would be to make the native default option link to the implicitly sorted
         * page again.
         */
        function teardown () {
            /** @type {HTMLElement} */
            const markedOption = document.querySelector(`[data-${markerAttribute}]`);
            if (markedOption == null) return; // already torn down
            const attrValue = markedOption.getAttribute(`data-${markerAttribute}`);
            markedOption.setAttribute('href', attrValue);
            markedOption.removeAttribute(`data-${markerAttribute}`);
        }

        /**
         * Checks whether a URL is explicitly sorted. That means the sort option used is 
         * mentioned in the url.
         * @param validOptions {string[]} The options the url should be tested for
         * @param url {string} The url to check
         */
        function isUrlExplicitlySorted (url, validOptions) {
            url = url.replace(urlParameterRegex, '');
            return validOptions.some(
                (option) => url.endsWith(`/${option}`) || url.includes(`/${option}/`)
            );
        }

        /**
         * Retrieve the user's chosen default option from the KES settings.  
         * The value 'default' may be returned to indicate that the user does not want to change
         * from whatever the native default is.
         * @param pageType {{id: string; options: string[]}} What type of page to get the user's chosen
         * default for
         * @returns {string}
         */
        function getChosenDefault (pageType) {
            return getModSettings("default-sort")[`default${pageType.id}Sort`];
        }

        /** 
         * On any sortable page, there is one sort option that's the default used if no option
         * is explicitly specified. This default may get changed by instances or in newer versions
         * of kbin/mbin, so to future-proof this mod, this function figures out which option is the
         * default one and returns both the menu item and url endpoint corresponding to it.
         * @param actualOptions {HTMLElement[]} The options present on the page
         * @param expectedOptions {string[]} The options that should be available on the page
        */
        function determineInstanceDefault (actualOptions, expectedOptions) {
            // create copies as we'll modify the array later
            var expectedOptions2 = Array.from(expectedOptions);
            var actualOptions2 = Array.from(actualOptions);

            for (var i = 0; i < actualOptions2.length; i++) {
                const actual = actualOptions2[i];

                const url = actual.getAttribute('href').replace(urlParameterRegex, '');
                const found = expectedOptions2.find((option) => {
                    return url.endsWith(`/${option}`) || url.includes(`/${option}/`);
                });

                if (found) {
                    expectedOptions2 = expectedOptions2.filter((value) => value != found);
                    actualOptions2 = actualOptions2.filter((value) => value != actual);
                    i--;
                }
            }

            if (actualOptions2.length == 0 || expectedOptions2.length == 0) return null;
            return { element: actualOptions2[0], target: expectedOptions2[0] };
        }

        /**
         * Finds the option on the page which explicitly links to the specified target sort option.
         * @param options {HTMLElement[]} The list of links to look through
         * @param target {string} The target url endpoint to look for
         */
        function findOptionByName (options, target) {
            return Array.from(options).find((option) => {
                const url = option.getAttribute('href').replace(urlParameterRegex, '');
                return url.endsWith(`/${target}`) || url.includes(`/${target}/`);
            });
        }

        /**
         * Figures out which page we're currently on.  
         * Will always return THREAD by default if no other page type is found to apply.
         */
        function determinePageType () {
            const path = window.location.pathname.replace(urlParameterRegex, '');
            if (path.includes('/microblog/') || path.endsWith('/microblog')) return pageTypes.MICROBLOG;
            if (path.startsWith('/magazines')) return pageTypes.MAGAZINES;
            if (path.startsWith('/d/') && (path.endsWith('/comments') || path.includes('/comments/')))
                return pageTypes.COMMENTS;
            if (path.startsWith('/m/') && path.includes('/t/')) return pageTypes.COMMENTS;
            // else:
            return pageTypes.THREAD;
        }

        /**
         * Retrieves the options actually present on the current page.
         */
        function getOptionsFromPage () {
            const excludeRelatedTags = ":not([href='#'])";
            const excludePeoplePage = ":not([href$='/people'])";
            const excludeSettings = ":not([href^='/settings/'])";
            const excludeProfiles = ":not([href^='/u/'])";
            const excludeActivityElements = ":not(#activity)";

            const kbinQuery = `${excludeActivityElements} > .options__main > li > a`
                + excludeRelatedTags + excludePeoplePage + excludeSettings + excludeProfiles;

            const mbinQuery = ".dropdown:has(i.fa-sort) .dropdown__menu > li > a";

            return Array.from(document.querySelectorAll(`${kbinQuery}, ${mbinQuery}`));
        }
    },

    collapse_pins: //mes-func
    function pinsInit (toggle) { // eslint-disable-line no-unused-vars

        function setCSS () {
            let color
            const settings = getModSettings("collapse_pins")
            const outline = settings["outline"]
            if (outline == "Add colored outline") {
                color = getHex(settings["bordercolor"])
            } else {
                color = "transparent"
            }
            const css = `
        .kes-pin {
            display: none;
        }
        #kes-pin-button {
            cursor: pointer;
        }
        .entry:has(footer i.fa-thumbtack) {
            border: 2px solid ${color}
        }
        `;
            return css
        }

        if (isThread()) return // eslint-disable-line no-undef
        if (isProfile()) return // eslint-disable-line no-undef

        function applyPins () {

            const css = setCSS();
            safeGM("removeStyle", 'kes-pin-css');
            safeGM("addStyle", css, 'kes-pin-css');

            if (document.querySelector('#kes-pin-button')) return
            const pins = document.querySelectorAll('.entry:has(footer i.fa-thumbtack)')
            if (pins.length === 0) return
            pins.forEach((pin) => {
                pin.classList.add('kes-pin')
            })

            let suffix
            if (pins.length === 1) suffix = "post"
            if (pins.length > 1) suffix = "posts"
        

            const b = document.createElement('div')
            const p = document.createElement('p')
            const toggleOnText = `Hiding ${pins.length} pinned ${suffix}. Click to expand.`
            const toggleOffText = `Showing ${pins.length} pinned ${suffix}. Click to collapse.`

            b.id = 'kes-pin-button'
            p.innerText = toggleOnText

            b.addEventListener('click', () => {
                if (p.innerText === toggleOnText) {
                    p.innerText = toggleOffText
                } else {
                    p.innerText = toggleOnText
                }
                pins.forEach((pin) => {
                    pin.classList.toggle('kes-pin')
                })
            })

            b.appendChild(p)
            document.querySelector('#content').prepend(b)

        }

        function unapplyPins () {
            document.querySelector('#kes-pin-button').remove();
            safeGM("removeStyle", "kes-pin-css");
        }

        if (toggle) applyPins();
        if (!toggle) unapplyPins();

    },

    move_federation_warning: //mes-func
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
    },

    hide_thumbs: //mes-func
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
    },

    adjust: //mes-func
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
    },

    alpha_sort_subs: //mes-func
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
    },

    expand_posts: //mes-func
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
    },

    thread_delta: //mes-func
    function threadDeltaInit (toggle) { // eslint-disable-line no-unused-vars
        const settings = getModSettings('thread-delta');
        const fgcolor = getHex(settings["fgcolor"]) // eslint-disable-line no-undef
        const bgcolor = getHex(settings["bgcolor"]) // eslint-disable-line no-undef
        const state = settings["always_on"]

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
    },

    hide_upvotes: //mes-func
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
    },

    hide_sidebar: //mes-func
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
    },

    hover_indicator: //mes-func
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
    },

    thread_checkmarks: //mes-func
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
    },

    user_instance_names: //mes-func
    function userInstanceEntry (toggle) { // eslint-disable-line no-unused-vars

        function showUserInstances (selector) {
            const els = document.querySelectorAll(selector);
            els.forEach((el) => {
                if (el.getAttribute("data-instance") !== "true") {
                    const userInstance = el.getAttribute("href").split("@")[2];
                    if (userInstance) {
                        el.innerText = el.innerText + "@" + userInstance;
                        el.setAttribute("data-instance", "true")
                    }
                }
            });
        }

        function hideUserInstances (selector) {
            const els = document.querySelectorAll(selector);
            els.forEach((el) => {
                if (el.getAttribute("data-instance") === "true") {
                    el.setAttribute("data-instance", "false");
                    el.innerText = el.innerText.split("@")[0]
                }
            });
        }

        function setSelector () {
            const page = getPageType() //eslint-disable-line no-undef
            let el
            switch (page) {
                case "Mbin.Thread.Favorites":
                case "Mbin.User.Followers":
                case "Mbin.User.Following":
                    el = ".users-columns .stretched-link"
                    break;
                default:
                    el = ".user-inline"
                    break;
            }
            return el
        }

        const selector = setSelector();

        if (toggle) {
            showUserInstances(selector);
        } else {
            hideUserInstances(selector);
            return
        }
    },

    submission_label: //mes-func
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
    },

    hide_downvotes: //mes-func
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
    },

    kbin_federation_awareness: //mes-func
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
            safeGM("addStyle",kfaGetCss(),"kfaInjectedCss");
        }

        function kfaShutdown () {
            safeGM("removeStyle","kfaInjectedCss");
            document.querySelectorAll('div.data-home, div.data-federated, div.data-moderated')
                .forEach((element) => element.remove());
            document.querySelectorAll('.data-home')
                .forEach((element) => element.classList.remove('data-home'));
            document.querySelectorAll('.data-federated')
                .forEach((element) => element.classList.remove('data-federated'));
            document.querySelectorAll('.data-moderated')
                .forEach((element) => element.classList.remove('data-moderated'));
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
            kfaShutdown();
            kfaStartup();
        } else {
            kfaShutdown();
        }
    },

    mobile_cleanup: //mes-func
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
    },

    hide_posts: //mes-func
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
    },

    softblock: //mes-func
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
                case "sub":
                case "all": {
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
                    el = article.parentElement.parentElement.parentElement;
                    blankCSS(el);
                }
            });
        }
        function blockThreads (mags) {
            hideThreads(mags)
            document.querySelectorAll('.entry__meta').forEach((item) => {
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
            let mags = await safeGM("getValue", `softblock-mags-${hostname}`)
            if (!mags) {
                mags = [];
                saveMags(hostname, mags)
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
    },

    subs: //mes-func
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
