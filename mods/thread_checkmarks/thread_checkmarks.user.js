function checksInit (toggle, mutation) { // eslint-disable-line no-unused-vars
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
        if (item.querySelector('#kes-omni-check')) return
        const mag = item.getAttribute('href').split('/')[2]
        if (subs.includes(mag)) {
            const ch = document.createElement('span')
            ch.style.color = getHex(checkColor); // eslint-disable-line no-undef
            ch.id = 'kes-omni-check'
            ch.innerText = " ✓"
            //FIXME: append adjacent; collision with mag instance mod
            item.after(ch)
            //item.appendChild(ch)
        }
    }
    function setChecks (subs) {
        const exists = document.querySelector('#kes-omni-check')
        if (exists) {
            document.querySelectorAll('#kes-omni-check').forEach((item) => {
                item.style.color = getHex(checkColor); // eslint-disable-line no-undef
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
