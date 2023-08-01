function checksInit (toggle) {
    const settings = getModSettings('checks');
    const checkColor = settings["check-color"]
    const threadIndex = document.querySelector('[data-controller="subject-list"]')
    const user = document.querySelector('.login');
    const username = user.href.split('/')[4];
    console.log(checkColor)
    console.log(username)
    if ((!threadIndex) || (!username)) return

    async function fetchMags (username) {
        const loaded = await safeGM("getValue", 'omni-user-mags-' + username)
        setChecks(loaded)
    }
    function setChecks (subs) {
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
