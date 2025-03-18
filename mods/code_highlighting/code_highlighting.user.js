function initCodeHighlights (toggle, trigger, setting) { // eslint-disable-line no-unused-vars
    /* global hljs */
    const codeCSS = `
    .hljs.kch_header {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    code.hljs {
        border-top: 2px solid;'
    }
    .kch_header span {
        margin-left: 20px;
    }
    #mes-copy-code-icon {
        margin-left: 10px;
        cursor: pointer;
    }
    #copied-tooltip {
        margin-left: 10px;
    }
    .fa-solid.fa-chevron-down.hljs-section,
    .fa-solid.fa-chevron-up.hljs-section {
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }
    `;

    safeGM("removeStyle", "mes-code-css")
    safeGM("addStyle", codeCSS, "mes-code-css")

    function kchStartup () {
        addHeaders('pre:not(.mes-code-clone)');
        setCss();
    }

    function shutdown () {
        safeGM("removeStyle", "kch-hljs")
        document.querySelectorAll("pre").forEach((item) => {
            item.style.removeProperty("display")
            delete item.dataset.codehighlight
        })
        $('.mes-code-clone').remove();
    }
    function addTags (item) {
        let lang;

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

        const icon = document.createElement('i');
        icon.id = "mes-copy-code-icon"
        icon.className = 'fa-solid fa-copy hljs-section';
        icon.setAttribute('aria-hidden', 'true');
        const span_copied = document.createElement('span');
        span_copied.id = 'copied-tooltip';
        span_copied.innerHTML = 'COPIED!';
        span_copied.style.display = "none"
        const hide_icon = document.createElement('i');
        hide_icon.className = 'fa-solid fa-chevron-up hljs-section';
        hide_icon.setAttribute('aria-hidden', 'true');


        icon.addEventListener("click", (e) => {
            const header = e.target.parentNode
            const code = header.nextElementSibling
            const tooltip = header.querySelector("#copied-tooltip")
            navigator.clipboard.writeText(code.innerText);
            tooltip.style.removeProperty("display")
            setTimeout(function () {
                tooltip.style.display = "none";
            }, 1000);
        })

        hide_icon.addEventListener("click", (e) => {
            const header = e.target.parentNode
            const code = header.nextElementSibling
            const chevron = e.target
            if (chevron.classList.contains("fa-chevron-up")) {
                chevron.classList.replace("fa-chevron-up", "fa-chevron-down")
                code.style.display = "none"
            } else {
                chevron.classList.replace("fa-chevron-down", "fa-chevron-up")
                code.style.removeProperty("display")
            }
        })

        header.appendChild(span);
        header.appendChild(icon);
        header.appendChild(span_copied);
        header.appendChild(hide_icon);
        item.prepend(header);

    }
    function setCss () {
        const settings = getModSettings("codehighlights");
        const myStyle = settings["style"];
        const prefix = "https://raw.githubusercontent.com"
        const suffix = "highlightjs/highlight.js/main/src/styles/base16"
        const url = `${prefix}/${suffix}/${myStyle}.css`
        safeGM("xmlhttpRequest",{
            method: "GET",
            url: url,
            headers: {
                "Content-Type": "text/css"
            },
            onload: function (response) {
                safeGM("removeStyle", response.responseText, "kch-hljs");
                safeGM("addStyle", response.responseText, "kch-hljs");
            }
        });
    }
    function addHeaders (selector) {
        document.querySelectorAll(selector).forEach((item) => {
            if (item.dataset.codehiglight === true) return
            const clone = item.cloneNode(true)
            clone.classList.add("mes-code-clone")
            item.insertAdjacentElement("afterend", clone)
            item.style.display = "none"
            item.dataset.codehighlight = true
            addTags(clone);
            clone.querySelectorAll("code").forEach((block) => {
                hljs.highlightElement(block);
            })
        });
    }


    function setup () {
        hljs.configure({ ignoreUnescapedHTML: true });
        kchStartup();
    }
    switch (trigger) {
        case Trigger.Mutation:
        case Trigger.Pageload:
        case Trigger.Toggle:
            (toggle) ? setup() : shutdown();
            break;
        case Trigger.Setting:
            setCss()
            break;
    }
}
