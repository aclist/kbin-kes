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

        if (username) {
            loadMags(alphaSort);  // eslint-disable-line no-undef
        } else {
            loadDefaultMags();
        }

        async function loadDefaultMags () {
            const loaded = await safeGM("getValue", `omni-default-mags-${hostname}`);
            if ((!loaded) || (loaded.length < 1)) {
                fetchDefaultMags();
            } else {
                omni(loaded);
            }
        }
        async function saveDefaultMags (mags) {
            await safeGM("setValue", `omni-default-mags-${hostname}`, mags)
            omni(mags);
        }
        function fetchDefaultMags () {
            let url = `https://${hostname}/magazines`
            genericXMLRequest(url, parseDefaultMags)
        }
        function parseDefaultMags (response) {
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
            }
        }
        function alphaSort (links) {
            if (!links) return;
            if (typeof links[0] === "string") {
                links.sort().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                omni(links);
            } else {
                const clean = []
                for (let i = 0; i < links.length; ++i) {
                    links[i].forEach((link) => {
                        clean.push(link.href.split('/')[4])
                        clean.sort().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                    });
                }
                saveDefaultMags(clean)
            }
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
        clearMags() // eslint-disable-line no-undef
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
