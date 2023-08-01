function checksInit (toggle) {
    const settings = getModSettings('checks');
    const checkColor = settings["check-color"]
    const threadIndex = document.querySelector('[data-controller="subject-list"]')
    const user = document.querySelector('.login');
    const username = user.href.split('/')[4];
    const test = document.querySelector('#kes-omni-check')
    console.log(settings)
    console.log(checkColor)
    console.log(username)
    if ((!threadIndex) || (!username)) return
    if (test) return

    async function fetchMags (username) {
        const loaded = await safeGM("getValue", 'omni-user-mags-' + username)
        console.log(loaded)
        setChecks(loaded)
    }
    function setChecks (subs) {
        console.log(subs)
        document.querySelectorAll('.magazine-inline.instance').forEach((item) => {
            const mag = item.getAttribute('href').split('/')[2]
            if (subs.includes(mag)) {
                const ch = document.createElement('span')
                ch.style.color = getHex(checkColor);
                ch.id = 'kes-omni-check'
                ch.innerText = " ✓"
                item.appendChild(ch)
            }
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
