function initCodeHighlights (toggle) { // eslint-disable-line no-unused-vars
    /* global hljs */
    let kchCssUrl;
    safeGM("addStyle",`
    .kch-collapsed {
        display: none !important;
    }
    .hljs .kch_header {
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom-style: dashed;'
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
        $('.kch_header').remove();
    }
    function addTags (item) {
        if (item.parentElement.querySelector('.kch_header')) return
        const orig_code = item.textContent;
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
        icon.onclick = function () {
            navigator.clipboard.writeText(orig_code);
            tooltip.style.display = 'inline';
            setTimeout(function () {
                tooltip.style.display = 'none';
            }, 1000);
        }
        const span_copied = document.createElement('span');
        span_copied.id = 'copied-tooltip';
        span_copied.innerHTML = 'COPIED!';
        span_copied.style = 'display: none; margin-left: 10px;';
        const hide_icon = document.createElement('i');
        hide_icon.className = 'fa-solid fa-chevron-up hljs-section';
        hide_icon.setAttribute('aria-hidden', 'true');
        hide_icon.style = 'float: right; margin-right: 20px; cursor: pointer;';
        hide_icon.addEventListener('click', function () {
            hide_icon.classList.toggle('fa-chevron-up');
            hide_icon.classList.toggle('fa-chevron-down');
            item.classList.toggle('kch-collapsed');
        });

        header.appendChild(span);
        header.appendChild(icon);
        let tooltip = header.appendChild(span_copied);
        header.appendChild(hide_icon);
        item.parentElement.prepend(header);
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
