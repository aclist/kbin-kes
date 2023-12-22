function threadDeltaInit (toggle) {
    const hostname = window.location.hostname;
    const loc = window.location.pathname.split('/')
    if (loc[1] != "m") {
        return
    }
    const mag = loc[2]

    function applyDeltas (counts) {
        console.log(counts)
        const nav = document.querySelector('.head-nav__menu')
        const c = nav.querySelectorAll('a')

        const thread_count = Number(c[1].innerText.split('(')[1].split(')')[0])
        const blog_count = Number(c[2].innerText.split('(')[1].split(')')[0])
        const thread_delta = (thread_count - counts[0])
        const blog_delta = (blog_count - counts[1])

        console.log(thread_delta)
        console.log(thread_count)
        console.log(blog_count)
        console.log(blog_delta)

        const prefix = "Δ "

        if (thread_delta > 0) {
            c[1].innerText = c[1].innerText + prefix + thread_delta
            counts[0] = thread_count
        }
        if (blog_delta >0) {
            c[2].innerText = c[2].innerText + prefix + blog_delta
            counts[1] = blog_count
        }
        saveCounts(hostname, mag, counts)
    }

    async function loadCounts (hostname, mag) {
        const counts = await safeGM("getValue", `thread-deltas-${hostname}-${mag}`)
        if (!counts) {
            const e = [];
            saveCounts(hostname, e)
        }
        applyDeltas(counts)
    }

    async function saveCounts (hostname, mag, counts) {
        const savedCounts = await safeGM("setValue", `thread-deltas-${hostname}-${mag}`, counts)
    }

    if (toggle) {
        loadCounts(hostname, mag);
    } else {
        const counts = []
        saveCounts(hostname, mag, counts)
    }
}
