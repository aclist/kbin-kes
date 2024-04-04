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
