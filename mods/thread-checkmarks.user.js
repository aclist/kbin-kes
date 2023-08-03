function checksInit (toggle, mutation) {
    const settings = getModSettings('checks');
    const checkColor = settings["check-color"]
    const threadIndex = document.querySelector('[data-controller="subject-list"]')
    const user = document.querySelector('.login');
    const username = user.href.split('/')[4];
    const hostname = window.location.hostname

    if ((!threadIndex) || (!username)) return

    async function fetchMags (username) {
        const loaded = await safeGM("getValue", `omni-user-mags-${hostname}-${username}`)
        if (!loaded) return
        setChecks(loaded)
    }
    function addCheck (subs, item) {
        if (item.children.length === 0) {
            const mag = item.getAttribute('href').split('/')[2]
            if (subs.includes(mag)) {
                const ch = document.createElement('span')
                ch.style.color = getHex(checkColor);
                ch.id = 'kes-omni-check'
                ch.innerText = " ✓"
                item.appendChild(ch)
            }
        }
    }
    function setChecks (subs) {
        const exists = document.querySelector('#kes-omni-check')
        if (exists) {
            document.querySelectorAll('#kes-omni-check').forEach((item) => {
                item.style.color = getHex(checkColor);
            });
        }
        document.querySelectorAll('.magazine-inline').forEach((item) => {
            addCheck(subs, item)
        });
    }

    if (toggle) {
        fetchMags(username);
    } else {
        const oldChecks = document.querySelectorAll('#kes-omni-check')
        oldChecks.forEach((check) => {
            check.remove();
        });
    }
}
