function checksInit (toggle, mutation) { // eslint-disable-line no-unused-vars
    const id = 'checks';
    const settings = getModSettings(id);
    const checkColor = settings["check-color"]
    const threadIndex = document.querySelector('[data-controller="subject-list"]')
    const user = document.querySelector('.login');
    const username = user.href.split('/')[4];

    if ((!threadIndex) || (!username)) return

    function addCheck (subs, item) {
        if (item.parentNode.querySelector('#kes-omni-check')) return
        const mag = item.getAttribute('href').split('/')[2]
        if (subs.includes(mag)) {
            const ch = document.createElement('span')
            ch.style.color = getHex(checkColor);
            ch.id = 'kes-omni-check'
            ch.innerText = " ✓"
            item.after(ch)
        }
    }
    function setChecks (subs) {
        if (!subs) return
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
        loadMags(setChecks, id, settings["refresh"]);
    } else {
        loadMags.cancel(id);
        if (settings["refresh"]) clearCachedMags();
        const oldChecks = document.querySelectorAll('#kes-omni-check')
        oldChecks.forEach((check) => {
            check.remove();
        });
    }
}
