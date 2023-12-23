function threadDeltaInit (toggle) {
    const settings = getModSettings('thread-delta');
    const fgcolor = getHex(settings["fgcolor"])
    const bgcolor = getHex(settings["bgcolor"])
    const state = settings["state"]

    const hostname = window.location.hostname;
    const loc = window.location.pathname.split('/')
    if (loc[1] != "m") {
        return
    }
    const mag = loc[2]

    function applyDeltas (counts) {
        const nav = document.querySelector('.head-nav__menu')
        const c = nav.querySelectorAll('a')
        const prefix = " Δ "

        let thread_delta
        let blog_delta
        let countBar

        const thread_count = Number(c[1].innerText.split('(')[1].split(')')[0])
        const blog_count = Number(c[2].innerText.split('(')[1].split(')')[0])

        if (! document.querySelector('#kes-thread-delta-bar')) {
            countBar = document.querySelector('#kes-thread-delta-bar')
            const top = document.querySelector('body');
            countBar = document.createElement('div');
            countBar.id = 'kes-thread-delta-bar';
            top.insertBefore(countBar, top.children[0])
        } else {
            countBar  = document.querySelector('#kes-thread-delta-bar')
        }

        countBar.style.height = "20px"
        countBar.style.fontSize = "0.5em"
        countBar.style.textAlign = "center"
        countBar.style.color = fgcolor
        countBar.style.backgroundColor = bgcolor
        if (state == "off") {
            countBar.style.display = "none"
        } else {
            countBar.style.display = ""
        }
        
        countBar.innerText = `Magazine: ${mag} | Threads: (${thread_count})`
        if (counts[0]) {
            thread_delta = (thread_count - counts[0])
            if (thread_delta > 0) {
                countBar.innerText = countBar.innerText + `${prefix} ${thread_delta}`
            }
        }
        countBar.innerText = countBar.innerText + ` | Blogs: (${blog_count})`
        if (counts[1]) {
            blog_delta = (blog_count - counts[1])
            if (blog_delta >0) {
                countBar.innerText = countBar.innerText + `${prefix} ${blog_delta}`
            }
        }

        counts[0] = thread_count
        counts[1] = blog_count

        saveCounts(hostname, mag, counts)
    }

    async function loadCounts (hostname, mag) {
        let counts
        counts = await safeGM("getValue", `thread-deltas-${hostname}-${mag}`)
        if (!counts) {
            counts = []
        }
        applyDeltas(counts)
    }

    async function saveCounts (hostname, mag, counts) {
        const savedCounts = await safeGM("setValue", `thread-deltas-${hostname}-${mag}`, counts)
    }

    if (toggle) {
        loadCounts(hostname, mag);
    } else {
        const countBar = document.querySelector('#kes-omni-tapbar')
        if (countBar) {
            countBar.remove();
        }
        const e = []
        saveCounts(hostname, mag, e)
    }
}
