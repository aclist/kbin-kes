GM_addStyle(`
    .collapsed {
        display: none !important;
    }
`);
function startup(firstBoot = false) {
    setCss(kchCssUrl);
    if (firstBoot) {
        addHeaders('code');
    } else {
        addHeaders('code');
    }
    const targetNode = document.getElementById('content').children[0];
    const config = { childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            addHeaders('code');
        }
    }
    observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
function shutdown() {
    kchInjectedCss.remove();
    $('.kch_header').remove();
    observer.disconnect();
}
function addTags(item) {
    if (item.previousSibling) {
	    if (item.previousSibling.className === "hljs kch_header") return
    }
    const orig_code = item.textContent;
    let lang;
    for (let name of item.className.split(' ')) {
        if (name.includes('-')) {
            lang = name.split('-')[1];
            break;
        }
    }
    const parent_html = item.parentElement.innerHTML;
    const header = document.createElement('div');
    header.className = 'hljs kch_header';
    header.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px; border-bottom-style: dashed;');
    const span = document.createElement('span');
    span.setAttribute('class', 'hljs-keyword');
    span.setAttribute('style', 'margin-left: 20px;');
    span.innerHTML = lang;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-copy hljs-section';
    icon.setAttribute('aria-hidden', 'true');
    icon.style = 'margin-left: 10px; cursor: pointer;';
    icon.onclick = function() {
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
    hide_icon.addEventListener('click', function() {
        hide_icon.classList.toggle('fa-chevron-up');
        hide_icon.classList.toggle('fa-chevron-down');
        item.classList.toggle('collapsed');
    });
    header.appendChild(span);
    header.appendChild(icon);
    let tooltip = header.appendChild(span_copied);
    header.appendChild(hide_icon);
    item.parentElement.prepend(header);
}
function addPreTag(parent, placement, code) {
    // For some reason, sometimes code isn't wrapped in pre. Let's fix that.
    const pre = document.createElement('pre');
    parent.replaceChild(pre, code);
    pre.appendChild(code);
    hljs.highlightElement(code);
}
function setCss(url) {
    // Downloads css files and sets them on page.
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            "Content-Type": "text/css"
        },
        onload: function(response) {
            kchInjectedCss = GM_addStyle(response.responseText);
        }
    });
}
function addHeaders(selector) {
    document.querySelectorAll('code').forEach(item => {
        const parent = item.parentElement;
        if (parent.nodeName !== 'PRE') {
            const placement = item.nextSibling;
            addPreTag(parent, placement, item);
        }
        if (!(item.classList.contains('hljs'))) {
            hljs.highlightElement(item);
        }
        addTags(item);
    });
}
let kchInjectedCss;
let kchCssUrl;
let observer;
function initCodeHighlights(toggle) {
    if (toggle) {
        const settings = getModSettings("codehighlights");
        let myStyle = settings["style"];
        kchCssUrl = `https://github.com/highlightjs/highlight.js/raw/main/src/styles/base16/${myStyle}.css`
        setCss(kchCssUrl);
            startup();
        // Configure HLJS and enable.
        hljs.configure({
            ignoreUnescapedHTML: true
        });
        hljs.highlightAll();
    } else {
        shutdown();
    }
}

