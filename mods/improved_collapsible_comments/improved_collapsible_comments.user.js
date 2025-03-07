function initCollapsibleComments (toggle, trigger, mutation) { // eslint-disable-line no-unused-vars
    function applyCommentStyles () {
        var style = `
        .post-comment,
        .entry-comment {
        grid-column-gap: 2px;
        padding: 10px 0 0 0 !important;
        }

        .subject .more {
            bottom: 0px;
        }

        .post-comment header,
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
        .post-comment .kes-collapse-children,
        .entry-comment .kes-collapse-children {
            gap: 8px;
        }
        .kes-collapse-children .post-comment,
        .kes-collapse-children .entry-comment {
            border-top: 1px solid var(--kbin-bg) !important;
        }

        .comment-level--1 {
            margin-bottom: 8px;
        }

        .collapsed-comment .kes-collapse-children,
        .collapsed-comment .content,
        .collapsed-comment footer,
        .collapsed-comment .vote,
        .collapsed-comment .more {
            display: none !important;
        }

        .post-comment .kes-collapse-children,
        .post-comment .content,
        .post-comment footer,
        .post-comment .vote,
        .entry-comment .kes-collapse-children,
        .entry-comment .content,
        .entry-comment footer,
        .entry-comment .vote {
            opacity: 1;
            transition: opacity 0.2s ease;
        }

        .collapsed-comment {
            grid-template-areas:"expando-icon avatar header"!important;
            grid-template-columns: 20px 20px auto!important;
            grid-template-rows: min-content!important;
            grid-row-gap: 0!important;
        }

        .post-comment figure, .post-comment header,
        .entry-comment figure, .entry-comment header {
            transition: margin-left 0.2s ease;
        }

        .collapsed-comment header {
            margin-left: 24px !important;
        }

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

        .post-comment > figure,
        .entry-comment > figure {
            width: 20px;
        }

        @media (max-width: 992px) {
            .post-comment.nested,
            .entry-comment.nested {
                padding: 10px 0 0 2px !important;
                grid-column-gap: 0px;
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
        }

        @media (max-width: 600px) {
            .post-comment.nested,
            .entry-comment.nested {
                padding: 1px !important;
                grid-column-gap: 1px;
                grid-row-gap: 0px;
                grid-template-columns: 14px min-content auto min-content;
            }
            .post-comment,
            .entry-comment {
                border-bottom: 0px;
            }
        }

        @media (max-width: 1px) {
            .post-comment,
            .entry-comment {
                margin-left: 0 !important;
                color: red;
            }
        }
        .post-comment,
        .entry-comment {
            border-color: transparent !important;
            grid-template-rows: min-content auto auto;
            grid-template-columns: 40px 50px auto min-content;
            display: grid;
            margin-left: 0 !important;
        }
        .kes-collapse-children .post-comment,
        .kes-collapse-children .entry-comment {
            margin-left: 0 !important;
        }

        .post-comment > .post-comment,
        .entry-comment > .entry-comment {
            display: block;
        }

        .post-comment .kes-collapse-children,
        .entry-comment .kes-collapse-children {
            grid-area: kes-collapse-children;
            display: flex;
            flex-direction: column;
        }

        .post-comment .js-container,
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
        .post-comment,
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
        const hiddenfigureCSS = `
        .post-comment,
        .entry-comment {
            grid-template-columns: 40px 0px auto min-content;
        }
        .collapsed-comment {
            grid-template-columns: 20px 0px auto!important;
        }
        .collapsed-comment header {
            margin-left: 0px !important
        }
        `;
        safeGM("addStyle", hideDefaults, "hide-defaults");
        safeGM("addStyle", style, "threaded-comments");
        safeGM("addStyle", mbinStyle, "mbin-kes-comments-style");
        const el = document.querySelector(`${subSelector} figure`);
        const display = window.getComputedStyle(el).display
        if (display === "none") {
            safeGM("addStyle", hiddenfigureCSS, "mbin-kes-comments-figure-style");
        }
    }
    function applyToNewPosts (mutation) {
        function _pushLevels (comments) {
            let levels = [];
            for (let i = 0; i < comments.length; i++) {
                let level = comments[i].className.match(/comment-level--(\d+)/)[1];
                levels.push(level);
            }
            return levels
        }
        let commentGroups = []
        if (!mutation) {
            commentGroups = document.querySelectorAll(`${globalSelector}:not(.nested)`);
        } else {
            commentGroups.push(mutation.target)
        }

        let cleanComments = [];
        commentGroups.forEach((group) => {
            group.querySelectorAll(subSelector).forEach((reply) => {
                cleanComments.push(reply)
            });
        });
        const levels = _pushLevels(cleanComments)
        nestComments(cleanComments, levels);
    }
    function nestComments (comments, levels) {
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
            const comments = document.querySelectorAll(subSelector)
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
    function enterMain (mutation) {
        applyToNewPosts(mutation);
        applyCommentStyles();
        initCollapsibleCommentsListeners();
        clearMores();
    }
    function initCollapsibleCommentsListeners () {
        let comments = document.querySelectorAll(`${subSelector}:not(.listened)`);

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
        safeGM("removeStyle", "mbin-kes-comments-style");
        safeGM("removeStyle", "mbin-kes-comments-figure-style");
    }

    let globalSelector
    switch (getPageType()) {
        case Mbin.Microblog:
            globalSelector = ".post-comments"
            break;
        case Mbin.Thread.Comments:
            globalSelector = ".entry-comments"
            break;
        default:
            return;
    }
    const subSelector = globalSelector.substring(0, globalSelector.length-1)

    if (!toggle) {
        teardown()
        return
    }
    switch (trigger) {
        case Trigger.Mutation:
            enterMain(mutation);
            break;
        case Trigger.Pageload:
        case Trigger.Toggle:
            enterMain();
            break;
    }
}
