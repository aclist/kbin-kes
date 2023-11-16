//TODO: test propagation with recurs
//TODO: test on diff host

function softBlockInit (toggle) {
    const hostname = window.location.hostname;
    const softBlockCSS = `
    .softblocked-article {
        display: none;
    }
    .softblock-manage, .softblock-icon:hover {
        cursor: pointer;
    }
    #softblock-panel {
        background-color: gray;
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 150px;
        width: 20%;
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

    function softBlock(mags){
        console.log('current mags')
        console.log(mags)
        const path = location.pathname.split('/')[1]
        switch (path) {
            case "":
            case "sub": {
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
    function blankCSS(el){
        el.classList.add('softblocked-article');
    }
    function hideThreads(mags){
        const articles = document.querySelectorAll('.magazine-inline')
        articles.forEach((article) => {
            const instance = article.href.split('/')[4]
            if (mags.includes(instance)){
                const el = article.parentElement.parentElement;
                blankCSS(el);
            }
        });
    }
    function blockThreads(mags){
        hideThreads(mags)
        document.querySelectorAll('.meta').forEach((item) => {
            if (item.querySelector('softblock-icon')){
                console.log("bubbles already present")
                return
            }
            const ch = document.createElement('span');
            ch.className = 'softblock-icon'
            const ic = document.createElement('ic');
            ic.className = "fa-solid fa-comment-slash"
            ch.appendChild(ic);
            ch.addEventListener('click', (e) => {
                const article = e.target.parentElement.parentElement.parentElement
                const meta = e.target.parentElement.parentElement
                const href = meta.querySelector('.magazine-inline').href
                const mag = href.split('/')[4]
                if (!mags.includes(mag)){
                    mags.push(mag);
                }
                saveMags(hostname, mags);
                hideThreads(mags)
            });
            item.appendChild(ch)
        });
    }
    function returnState(mags, mag){
        let state
        if (mags.includes(mag)){
            return 'unblock'
        } else {
            return 'block'
        }
    }
    function addToSidebar(mags){
        const mag = location.pathname.split('/')[2]
        const el = document.querySelector('.magazine__subscribe form[name="magazine_block"]')
        const state = returnState(mags, mag);
        if (el.querySelector('.softblock-button')) {
            return
        }
        insertBlockButton(mags, state, el);
    }
    function clean(mags) {
        const list = document.createElement('ul')
        list.className = 'softblock-panel-list'
        console.log("clean")
        console.log(mags)
        const sorted = mags.sort((a, b) => {
            return a.localeCompare(b, undefined, {sensitivity: 'base'});
        });
        for (i=0; i<sorted.length; ++i){
            const it = document.createElement('li')
            it.innerText = sorted[i]
            insertBlockButton(mags, 'unblock', it)
            console.log(it)
            list.appendChild(it)
        }
        if (mags.length === 0) {
            const empty = document.createElement('text')
            empty.innerText = "No softblocked mags."
            list.appendChild(empty)

        }
        return list
    }
    function addToIndex(mags){
        const manageLink = document.querySelector('.softblock-manage')
        if(manageLink) {
            return
        }
        const sib = document.querySelector('.options__main a[href="/magazines/abandoned"]')
        const par = sib.parentElement
        const but = document.createElement('a')
        but.className = 'softblock-manage'
        but.innerText = "softblocked"
        but.addEventListener('click', () => {
            if (document.querySelector('#softblock-panel')) {
                return
            }
            const cleanmags = clean(mags)
            const mod = document.createElement('div')
            mod.id = 'softblock-panel'
            const closeButton = document.createElement('button')
            closeButton.innerText = 'close'
            closeButton.className = 'softblock-panel-close'
            closeButton.addEventListener('click', (e)=>{
                e.target.parentElement.remove();
            });
            mod.appendChild(cleanmags)
            mod.appendChild(closeButton)
            document.querySelector('header').appendChild(mod)
        });
        par.insertAdjacentElement("afterend", but)
    }

    const rows = document.querySelectorAll('.magazines.table-responsive .magazine-inline')
    rows.forEach((link) => {
        const mag = link.href.split('/')[4]
        const row = link.parentElement.parentElement
        const el = row.querySelector('.magazine__subscribe form[name="magazine_block"]')
        const state = returnState(mags, mag);
        //TODO: test propagation
        if (el.querySelector('.softblock-button')) {
            return
        }
        insertBlockButton(mags, state, el);
    });
}

function insertBlockButton(mags, state, el){

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
            switch (type){
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
        console.log(button)
        const text = span.innerText
        console.log(text)
        switch (text){
            case "Softblock":{
                span.innerText = 'Unsoftblock'
                button.classList.add('danger')
                if(mags.includes(mag)){
                    break
                }
                mags.push(mag)
                console.log(mags)
                break
            }
            case "Unsoftblock": {
                span.innerText = 'Softblock'
                button.classList.remove('danger')
                if(!mags.includes(mag)){
                    break
                }
                const ind = mags.indexOf(mag)
                mags.splice(ind, 1)
                break
            }
        }
        saveMags(hostname, mags)
    });

    switch(state){
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
    el.insertAdjacentElement("afterend", blockButton);
}

async function loadMags (hostname) {
    const mags = await safeGM("getValue", `softblock-mags-${hostname}`)
    if (!mags) {
        const e = [];
        saveMags(hostname, e)
    }
    softBlock(mags)
}

async function saveMags (hostname, mags) {
    const savedMags = await safeGM("setValue", `softblock-mags-${hostname}`, mags)
}
function removeEls(els){
    let range
    for (let i = 0; i < arguments.length; ++i){
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
softBlockInit(true);
