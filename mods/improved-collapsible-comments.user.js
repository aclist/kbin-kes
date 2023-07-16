// ==UserScript==
// @name         kbin Improved Collapsible Comments
// @namespace    http://tampermonkey.net/
// @version      1.3.7
// @description  Improves the comment tree layout and adds a line that lets you collapse replies
// @author       artillect
// @match        https://kbin.social/*
// @match        https://fedia.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @license      MIT
// ==/UserScript==

function initCollapsibleComments (toggle) {

    if (toggle) {
        if (document.querySelector('.entry-comment.nested') || !document.querySelector('.comments')) {
            return;
        }
        applyToNewPosts();
        applyCommentStyles();

        // let observer = new MutationObserver(applyToNewPosts);
        // observer.observe(document.body, { childList: true, subtree: true });
        
        // Get settings
        const settings = getModSettings('collapsibleComments');
        const clickAnywhere = settings.click == "Anywhere on comments";

        initCollapsibleCommentsListeners(clickAnywhere);
    } else {
        if (document.querySelector('.entry-comment.nested')) {
            location.reload();
        }
    }
}

function initCollapsibleCommentsListeners (toggle) {
    // Get all comments
    let comments = document.querySelectorAll('.entry-comment');

    // Add event listeners to comments
    for (let i = 0; i < comments.length; i++) {
        if (!toggle) {
            // Get expando
            let expandos = comments[i].querySelectorAll('.expando');
            let expando = expandos[expandos.length-1];
            // Get expando icon
            let icons = comments[i].querySelectorAll('.expando-icon');
            let icon = icons[icons.length-1];
            // Get comment header
            let header = comments[i].querySelector('header');

            // Add event listeners
            expando.addEventListener('click', function () {toggleReplies(event,comments[i])});
            header.addEventListener('click', function () {toggleReplies(event,comments[i])});
            icon.addEventListener('click', function () {toggleReplies(event, comments[i])});

            // Remove comment event listener if it exists
            comments[i].removeEventListener('click', function () {toggleReplies(event, comments[i])});
        } else {
            // Add event listener to comment
            comments[i].addEventListener('click', function () {toggleReplies(event, comments[i])});
        }
    }
}

function toggleReplies (event, comment) {
    var senderElement = event.target
    var parent = event.target.parentElement;

    // Prevent collapsing when text is selected
    const cellText = document.getSelection();
    if (cellText.type === 'Range') return;

    if (parent.nodeName === "BUTTON" || parent.nodeName === "MARKDOWN_TOOLBAR"
       || parent.nodeName === "FORM" || parent.nodeName.match(/MD/)
       || parent.className === "more") {
        return;
    }

    if ( senderElement.nodeName === "A" || senderElement.nodeName === "BUTTON"
        || senderElement.nodeName === "TEXTAREA" || senderElement.className.match(/fa-arrow/)
        || senderElement.nodeName === "SELECT" || senderElement.nodeName === "OPTION"
        || senderElement.className === "more") {
        return;
    }

    // Collapse or expand comment
    if (comment.className.match(/collapsed-comment/)) {
        // Expand comment
        comment.classList.remove('collapsed-comment');
        // Remove number of children from header
        let header = comment.querySelector('header');
        let numChildrenSpan = header.querySelector('.numChildren');
        header.removeChild(numChildrenSpan);

        // Change + to -
        let icons = comment.querySelectorAll('.expando-icon');
        let icon = icons[icons.length-1];
        icon.className = 'expando-icon fas fa-minus';
    } else {
        // Collapse comment
        comment.classList.add('collapsed-comment');

        // Get number of children
        let children = comment.querySelectorAll('.entry-comment');
        let numChildren = children.length;
        // Add number of children to header
        let header = comment.querySelector('header');
        let numChildrenSpan = document.createElement('span');
        numChildrenSpan.className = 'numChildren';
        if (numChildren == 1) {
            numChildrenSpan.innerHTML = '(' + numChildren + ' reply)';
        } else {
            numChildrenSpan.innerHTML = '(' + numChildren + ' replies)';
        }
        header.appendChild(numChildrenSpan);

        // Get expando icon
        let icons = comment.querySelectorAll('.expando-icon');
        let icon = icons[icons.length-1];
        // Change - to +
        icon.className = 'expando-icon fas fa-plus';
    }
    event.stopPropagation();
}

function nestComments (comments,levels) {
    // Go through comments in reverse order
    for (let i = comments.length-1; i >= 0; i--) {
        // Add nested class to comment
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
            let previousChildren = previousElement.querySelector(".children");
            if (!previousChildren) {
                previousChildren = document.createElement('div');
                previousChildren.className = 'children';
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
                let children = previousComment.querySelector('.children');
                if (!children) {
                    // If not, create one
                    children = document.createElement('div');
                    children.className = 'children';
                    previousComment.appendChild(children);
                }
                // Insert comment into children container
                children.prepend(comment);
                break;
            }
        }
    }
}

function applyCommentStyles () {
    // Add styles to comments
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
    .entry-comment .children {
        gap: 8px;
    }
    .children .entry-comment {
        border-top: 1px solid var(--kbin-bg) !important;
    }

    .comment-level--1 {
        margin-bottom: 8px;
    }

    .collapsed-comment .children, .collapsed-comment .content, .collapsed-comment footer, .collapsed-comment .vote, .collapsed-comment .more {
        display: none !important;
    }

    .entry-comment .children, .entry-comment .content, .entry-comment footer, .entry-comment .vote {
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
        border-radius: 10px;
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
        grid-template-areas:
        "expando-icon avatar header vote"
        "expando body body body"
        "expando footer footer footer"
        "expando children children children";
        grid-template-columns: 20px 20px auto min-content;
        grid-template-rows: min-content auto auto;
        display: grid;
        margin-left: 0 !important;
    }
    .children .entry-comment {
        margin-left: 0 !important;
    }

    .entry-comment > .entry-comment {
        display: block;
    }

    .entry-comment .children {
        grid-area: children;
        display: flex;
        flex-direction: column;
    }

    .entry-comment header {
        cursor: pointer;
    }
    `;
    for (let i = 1; i < 10; i++) {
        style += `
        blockquote.comment-level--${i} {
            margin-left: 0 !important;
        }
        `;
    }
    safeGM("addStyle",style);
}

function applyToNewPosts () {
    // Get all comments
    let comments = document.querySelectorAll(".entry-comment:not(.nested)");
    // Get all comment levels
    let levels = [];
    for (let i = 0; i < comments.length; i++) {
        let level = comments[i].className.match(/comment-level--(\d)/)[1];
        levels.push(level);
    }

    nestComments(comments,levels);
}
