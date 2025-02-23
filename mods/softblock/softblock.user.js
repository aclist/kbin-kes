function softBlockInit (toggle) { // eslint-disable-line no-unused-vars
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
    .softblock-table-empty {
        display: flex;
        justify-content: center;
    }
    `

    function softBlock (mags) {
        const pt = getPageType();
        switch (pt) {
            case Mbin.Top: {
                blockThreads(mags);
                break
            }
            case Mbin.Magazines: {
                addToIndex(mags);
                break
            }
            case Mbin.Magazine: {
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

    function makeEmpty () {
        const empty = document.createElement('text')
        empty.className = "softblock-table-empty"
        empty.innerText = "No softblocked mags."
        return empty
    }

    function wipeTable () {
        document.querySelector('.softblock-panel-table')?.remove();
        const body = document.querySelector('#softblock-panel-inner-modal-body');
        const empty = makeEmpty();
        body.appendChild(empty);
    }

    function addToSidebar (mags) {
        const el = document.querySelector('.magazine__subscribe form[name="magazine_block"]')
        if (!el) return
        if (document.querySelector('.softblock-button')) return
        const mag = el.action.split("/")[4]
        const button = createBlockButton(mags, mag);
        el.insertAdjacentElement("afterend", button)
    }

    function clean (mags) {
        const list = document.createElement('table');
        const body = document.createElement('tbody');
        list.appendChild(body);
        list.className = 'softblock-panel-table'
        const sorted = mags.sort((a, b) => {
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        });
        if (mags.length === 0) {
            return makeEmpty()
        }
        for (let i=0; i<sorted.length; ++i) {
            const it = document.createElement('tr')
            const td1 = document.createElement('td')
            const td1a = document.createElement("a")
            td1.appendChild(td1a)
            td1a.innerText = sorted[i]
            td1a.setAttribute("href", "m/" + sorted[i])
            const td2 = document.createElement('td')
            const tdb = createBlockButton(mags, sorted[i])
            td1.style.padding = "0.5rem 1rem"
            td2.style.padding = "0.5rem 1rem"
            td2.appendChild(tdb)
            it.appendChild(td1)
            it.appendChild(td2)
            body.appendChild(it)
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
            if (row.querySelector(".softblock-row")) return
            const t = document.createElement("td");
            t.className = "softblock-row"
            row.appendChild(t);
            const button = createBlockButton(mags, mag)
            t.appendChild(button)
        });
    }

    function createBlockButton (mags, mag) {

        const state = returnState(mags, mag)
        const blockButton = document.createElement('button');
        blockButton.classList.add('softblock-button', 'btn', 'btn__secondary', 'action')

        const blockIcon = document.createElement('i');
        const cl = 'fa-solid fa-comment-slash';
        const sp = document.createElement('span')
        sp.className = 'softblock-span';
        blockIcon.className = cl;

        blockButton.appendChild(blockIcon);
        blockButton.appendChild(sp);

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
        blockButton.dataset.mag = mag

        blockButton.addEventListener('click', (e) => {
            const target = e.currentTarget
            const mag = target.dataset.mag
            const span = target.querySelector('.softblock-span')
            let text = span.innerText
            switch (text) {
                case "Softblock":{
                    span.innerText = 'Unsoftblock'
                    target.classList.add('danger')
                    if(mags.includes(mag)) {
                        break
                    }
                    mags.push(mag)
                    break
                }
                case "Unsoftblock": {
                    span.innerText = 'Softblock'
                    target.classList.remove('danger')
                    if(!mags.includes(mag)) {
                        break
                    }
                    const ind = mags.indexOf(mag)
                    mags.splice(ind, 1)

                    //remove applicable row from modal
                    if (document.querySelector("#softblock-panel-inner-modal-content")) {
                        const parRow = target.parentNode.parentNode.parentNode
                        parRow.remove();
                        const m = `.magazine-inline[href="/m/${mag}"]`
                        const tableRow = document.querySelector(m)
                        //also unsubscribe from magazine table
                        if (tableRow) {
                            tableRow.parentNode.parentNode.querySelector(".softblock-button").click();
                        }
                        if (mags.length === 0) {
                            wipeTable();
                        }
                    }

                    break
                }
            }
            saveMags(hostname, mags)
        });

        const aside = document.createElement("aside")
        aside.className = "softblock-aside"
        aside.appendChild(blockButton)
        return aside
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
