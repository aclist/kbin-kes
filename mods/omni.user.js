// ==UserScript==
// @name         BBB-debug
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://kbin.social/*
// @require      https://github.com/aclist/kbin-kes/raw/testing/helpers/safegm.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kbin.social
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant	GM_addStyle
// @grant	GM_xmlhttpRequest
// ==/UserScript==

//TODO: if mod is on, cache subs and set listener
//TODO: GM. API xhr request

function omniInit (toggle) {

    const kesActive = 'kes-subs-active'
    const omniCSS = `
    @media (max-width: 576px) {
        #kes-omni-list {
            width: fit-content !important
        }
    }
    #kes-omni-scroller {
        height: 80%;
        overflow-y: scroll;
    }
    #kes-omni-warning {
        background-color: var(--kbin-alert-danger-text-color);
        color: var(--kbin-input-bg);
        text-align: center;
    }
    .kes-subs-modal {
        display: flex;
        justify-content: center;
        position: fixed;
        z-index: 100;
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
        width: fit-content;
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

    function createOmni () {

        safeGM("removeStyle", omniCSS, "omni-css")
        safeGM("addStyle", omniCSS, "omni-css")

        const user = document.querySelector('.login');
        const username = user.href.split('/')[4];

        //prepareLogin(username);
        let str
        if (username) {
            console.log("logged in")
            str = 'user'
            loadMags(str, username)
        } else {
            console.log("logged out")
            str = 'default'
            loadMags(str)
        }

        async function loadMags (mode, username) {
            console.log("mode is:", mode)
            console.log("user is:", username)
            const dataStr = setMagString(mode);
            console.log("data is:", dataStr)
            const loaded = await safeGM("getValue", dataStr)
            if (loaded.length < 1) {
                console.log("data not present, fetching")
                fetchMags(username);
            } else {
                console.log("loading menu")
                console.log("found array:", loaded)
                omni(loaded);
            }
        }
        function setMagString (mode) {
            console.log("SMS mode is:", mode)
            let mags;
            switch (mode) {
                case 'default':
                    mags = 'omni-default-mags'
                    break;
                case 'user':
                    mags = 'omni-user-mags'
                    break;
            }
            return mags;
        }
        async function saveMags (mode, mags) {
            console.log("saveMags mode is:", mode)
            const dataStr = setMagString(mode);
            await safeGM("setValue", dataStr, mags)
            console.log("triggering omni")
            console.log("mag content:", mags)
            omni(mags);
        }

        function fetchMags (username) {
            let url
            if (username) {
                url = `https://kbin.social/u/${username}/subscriptions`
            } else {
                url = 'https://kbin.social/magazines'
            }
            genericXMLRequest(url, parseMags)
        }
        function parseMags (response) {
            let links
            let mags
            let parser = new DOMParser();
            let notificationsXML = parser.parseFromString(response.responseText, "text/html");
            console.log(notificationsXML)
            if (notificationsXML.title === "Magazines - kbin.social") {
                mags = notificationsXML.querySelector('.magazines.table-responsive')
                links = mags.querySelectorAll('.stretched-link')
            } else {
                mags = notificationsXML.querySelector('.magazines-columns')
            }
            links = mags.querySelectorAll('.stretched-link')
            alphaSort(links);
        }
        function alphaSort (links) {
            const clean = []
            links.forEach((link) => {
                clean.push(link.href.split('/')[4])
                clean.sort().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
            });
            console.log("saving sorted mag content under:", str)
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
            let currentElGeom;
            let scrollerGeom;
            if (direction === 'down') {
                currentElGeom = document.querySelector(active).getBoundingClientRect().bottom
                scrollerGeom = document.querySelector(scroll).getBoundingClientRect().bottom
                if ((currentElGeom > scrollerGeom) || (currentElGeom < 0)) {
                    el.scrollIntoView();
                }
            } else {
                currentElGeom = document.querySelector(active).getBoundingClientRect().top;
                const currentElGeomBot = document.querySelector(active).getBoundingClientRect().bottom;
                scrollerGeom = document.querySelector(scroll).getBoundingClientRect().top;
                const scrollerGeomBot = document.querySelector(scroll).getBoundingClientRect().bottom;
                if ((currentElGeom < scrollerGeom) || (currentElGeomBot > scrollerGeomBot)) {
                    el.scrollIntoView();
                }
            }
        }
        function kickoffListener (e) {
            const keyCodes = {
                "Backtick": 192,
                "Backslash": 220,
                "Tab": 9,
                "Equals": 61,
                "Left bracket": 219,
                "Right bracket": 221
            }

            const settings = getModSettings('omni');
            const meta = settings["meta"]
            const code = keyCodes[meta]

            if (e.keyCode === code) {
                e.preventDefault();
                const exists = document.querySelector('.kes-subs-modal')
                if (exists) {
                    if ($(exists).is(":visible")) {
                        $(exists).hide();
                    } else {
                        $(exists).show();
                        document.querySelector("#kes-omni-search").focus();
                    }
                }
            }

        }
        function omni (subs) {
            const kesModal = document.createElement('div')
            kesModal.className = "kes-subs-modal"
            kesModal.addEventListener('click', (e) =>{
                if ((e.target.tagName === "UL") || (e.target.tagName === "DIV")) {
                    const torem = document.querySelector('.kes-subs-modal')
                    $(torem).hide();
                }
            });
            const entryholder = document.createElement('ul')
            const search = document.createElement('input')
            search.type = "search"
            search.id = "kes-omni-search"
            search.setAttribute
            search.addEventListener("keydown", (e) => {
                switch (e.keyCode) {
                case 40: {
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
                case 38: {
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
                switch (e.keyCode) {
                case 13: {
                    const act = document.querySelector("#kes-omni-list li.kes-subs-active")
                    const dest = act.textContent
                    window.location = 'https://kbin.social/m/' + dest
                    break;
                }
                case 38: {
                    e.preventDefault();
                    break;
                }
                case 40: {
                    break;
                }
                default: {
                    const filter = e.target.value

                    const visi = []
                    const LL = e.target.parentElement
                    const VB = LL.querySelectorAll('li')
                    for (let i = 0; i < VB.length; i++) {
                        let t = VB[i].textContent
                        if (t.toLowerCase().indexOf(filter) > -1) {
                            visi.push(VB[i])
                            VB[i].style.display = "";
                        } else {
                            VB[i].style.display= "none";
                            makeInactive(VB[i])
                        }
                    }
                    for (let k = 0; k < visi.length; ++k) {
                        if (k === 0) {
                            makeActive(visi[k])
                        } else {
                            makeInactive(visi[k])
                        }
                    }
                }
                }
            });

            entryholder.id = 'kes-omni-list'
            const innerholder = document.createElement('div')
            innerholder.id = 'kes-omni'

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
                outerA.href = 'https://kbin.social/m/' + subs[i]
                scroller.appendChild(outerA);
            }
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
            kesModal.style.display = 'none';
            document.body.appendChild(kesModal)
            document.addEventListener('keydown', kickoffListener)
        }
    }
    if (toggle) {
        createOmni();
    } else {
        const e = []
        safeGM("setValue",'omni-user-mags', e)
        safeGM("setValue",'omni-default-mags', e)
        const q = document.querySelector('.kes-subs-modal')
        if (q) {
            window.location.reload();
        }
    }
}
