function checksInit (toggle, mutation) {
    const settings = getModSettings('checks');
    const checkColor = settings["check-color"]
    const threadIndex = document.querySelector('[data-controller="subject-list"]')
    const user = document.querySelector('.login');
    const username = user.href.split('/')[4];
    const mut = mutation

    if ((!threadIndex) || (!username)) return

    async function fetchMags (username) {
        const loaded = await safeGM("getValue", 'omni-user-mags-' + username)
        if (!loaded) return
        setChecks(loaded)
    }
    function addCheck(subs, item){
        console.log(item)
        const mag = item.getAttribute('href').split('/')[2]
        console.log("mag is:", mag)
        if (subs.includes(mag)) {
            addCheck(item);
        }
        const ch = document.createElement('span')
        ch.style.color = getHex(checkColor);
        ch.id = 'kes-omni-check'
        ch.innerText = " ✓"
        item.appendChild(ch)
    }
    function setChecks (subs) {
        if (mut) {
            console.log("caught mutation")
            console.log(mut)
            if (mut.children[0].id === 'kes-omni-check') {
                console.log("check already present")
                return
            } else {
                console.log("adding check")
                addCheck(subs, mut)
            }
        } else {
            console.log("no mutation, iterating")
            document.querySelectorAll('.magazine-inline.instance').forEach((item) => {
                console.log(item)
                addCheck(subs, item)
            });
        }
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
