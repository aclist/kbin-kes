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
    .softblock-aside {
        display: flex;
        justify-content: center;
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
        document.querySelectorAll('.entry:not(.entry-cross) aside.meta.entry__meta').forEach((item) => {
        //document.querySelectorAll('.entry__meta').forEach((item) => {
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
        console.log(mags)
        //const mag = location.pathname.split('/')[2]
        //const el = document.querySelector('.magazine__subscribe form[name="magazine_block"]')
        //const state = returnState(mags, mag);
        const old = document.querySelector('.softblock-button')
        if (old) {
            return
        }
        //insertBlockButton(mags, state, el);
    }
    function clean (mags) {
        const list = document.createElement('table');
        const body = document.createElement('tbody');
        list.appendChild(body);
        list.className = 'softblock-panel-table'
        const sorted = mags.sort((a, b) => {
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        });
        for (let i=0; i<sorted.length; ++i) {
            const it = document.createElement('tr')
            const td1 = document.createElement('td')
            const td1a = document.createElement("a")
            td1.appendChild(td1a)
            td1a.innerText = sorted[i]
            td1a.setAttribute("href", "m/" + sorted[i])
            const td2 = document.createElement('td')
            const tdb = document.createElement("button")
            td1.style.padding = "0.5rem 1rem"
            td2.style.padding = "0.5rem 1rem"
            tdb.classList.add("softblock-button", "btn", "btn__secondary", "action", "danger")
            tdb.innerText = "Unsoftblock"
            td2.appendChild(tdb)
            //insertBlockButton(mags, 'unblock', td2)
            it.appendChild(td1)
            it.appendChild(td2)
            body.appendChild(it)
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
        but.innerText = "Softblocked"
        but.addEventListener('click', () => {
            if (document.querySelector('#softblock-panel')) {
                return
            }
            const cleanmags = clean(mags)
            const mod = makeModal("softblock-panel")
            mod.querySelector("#softblock-panel-inner-modal-body").appendChild(cleanmags)
            document.body.appendChild(mod)
        });
        par.insertAdjacentElement("afterend", but)

        const header = document.querySelector('.magazines.table-responsive table thead tr')
        const softblockHead = document.createElement('th')
        softblockHead.style.textAlign = "center"
        softblockHead.innerText = "Softblock"
        header.appendChild(softblockHead)

        const tableRow = document.querySelectorAll('.magazines.table-responsive tbody tr');
        tableRow.forEach((row) => {
            const link = row.querySelector('.magazine-inline')
            const mag = link.href.split('/')[4]
            const state = returnState(mags, mag);
            if (row.querySelector(".softblock-row")) return
            const t = document.createElement("td");
            t.className = "softblock-row"
            row.appendChild(t);
            const a = document.createElement("aside")
            a.className = "softblock-aside"
            const button = createBlockButton(mags, state)
            a.appendChild(button)
            t.appendChild(a)
        });
    }

    function createBlockButton (mags, state) {

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
        blockButton.dataset.mag = "generic"
        return blockButton
        //el.insertAdjacentElement("afterend", blockButton);
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
}
