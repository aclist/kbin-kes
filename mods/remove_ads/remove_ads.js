function filter (toggle, mutation) { // eslint-disable-line no-unused-vars

    const settings = getModSettings("spamfilter")
    if (!settings) return
    const fresh = settings["fresh"]
    const weighted = settings["weight"]
    const block = settings["block"]

    const user_ids = []
    const user_links = []
    const checked = []
    const banned = []
    const softbanned = []

    let unique_users = {}
    let iteration
    
    const domain = window.location.hostname
    const url = new URL(window.location).href.split('/')
    if (url[3] !== "m") return
    if (url[5] === "t") return

    
    function apply () {
        const modal = makeLoader("spam-modal", "KES: filtering spam, please wait...");
        document.body.appendChild(modal);
        check();
    }
    function unapply () {
        safeGM("removeStyle", "mes-filter-css");
    }

    function filterDupes (array) {
        const filtered = [...new Set(array)]
        const sorted = filtered.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        return sorted
    }

    function clearStorage () {
        localStorage.setItem("kes-banned-users", "")
        localStorage.setItem("kes-softbanned-users", "")
        localStorage.setItem("kes-checked-users", "")
    }

    function check () {
        document.querySelectorAll('.user-inline').forEach((user) => {
            user_ids.push(user.title)
            user_links.push(user.href)
        })

        unique_users = filterDupes(user_ids)
        iteration = unique_users.length

        // first invocation
        if (!mutation) {
            clearStorage();
            for (let i = 0; i < unique_users.length; ++i) {
                checked.push(unique_users[i]);
                applyFilters(unique_users[i]);
            }
            return
        }
        const str_banned = localStorage.getItem("kes-banned-users")
        const str_softbanned = localStorage.getItem("kes-softbanned-users")
        const str_checked = localStorage.getItem("kes-checked-users")
        //applies on DOM mutation events; check prior lists to save time
        //arrays are initialized empty on each DOM recursion
        for (let i = 0; i < unique_users.length; ++i) {
            if (iteration == 1) {
                clearLoader("spam-modal");
            }
            if (str_checked.split(',').includes(unique_users[i])) {
                checked.push(unique_users[i])
                --iteration
                continue
            } else if (str_banned.split(',').includes(unique_users[i])) {
                banned.push(unique_users[i])
                continue
            } else if (str_softbanned.split(',').includes(unique_users[i])) {
                softbanned.push(unique_users[i])
                continue
            }
            checked.push(unique_users[i])
            applyFilters(unique_users[i])
        }

    }

    function getRelativeName (user) {
        let relative_name
        if (user.split('@')[2] === domain) {
            relative_name = user.split('@')[1]
        } else {
            relative_name = user
        }
        return relative_name
    }

    function applyFilters (user) {
        const relative_name = getRelativeName(user)
        const url = `https://${domain}/ajax/fetch_user_popup/${relative_name}`
        if (softbanned.includes(name)) {
            --iteration
            return
        }
        if (banned.includes(name)) {
            --iteration
            return
        }
        genericXMLRequest(url, parse)
    }
    async function parse (response) {
        const parser = new DOMParser();
        const json = JSON.parse(response.responseText)
        const XML = parser.parseFromString(json.html, "text/html");
        const u = XML.querySelector('.user__name span').innerText.split('\n')[1].trim()
        const age = XML.querySelector('.timeago').innerText.split(' ')
        const repnum = XML.querySelector('header ul li:nth-of-type(3)').innerText.trim().split(' ')[2]
        const threadsnum = XML.querySelector('menu li:nth-of-type(1) a div:first-of-type').innerText
        const commentsnum = XML.querySelector('menu li:nth-of-type(2) a div:first-of-type').innerText

        if ((parseInt(commentsnum) === 0) && (parseInt(threadsnum > 2))) {
            banned.push(u)
        } else if (repnum.charAt(0) === "-") {
            banned.push(u)
        } else {
            switch (age[1]) {
                case "hour":
                case "hours":
                    softbanned.push(u)
                    break;
                case "day":
                case "days": {
                    if ( age[0] < 3) {
                        softbanned.push(u)
                    }
                    break;
                }
                default:
                    break;
            }
        }

        --iteration
        if (iteration === 0) {
            updateStorage();
            processFilters();
        }
    }

    function updateStorage () {
        localStorage.setItem("kes-softbanned-users", filterDupes(softbanned))
        localStorage.setItem("kes-banned-users", filterDupes(banned))
        localStorage.setItem("kes-checked-users", filterDupes(checked))
    }

    function removeArticle (article) {
        article.remove()
    }

    function getPoster (article) {
        const user = article.querySelector('.user-inline').title
        return user
    }

    function voteWeight (article) {
        const up = article.querySelector('.vote__up')
        const down = article.querySelector('.vote__down')
        let up_ct = up.querySelector('[data-subject-target="favCounter"]').innerText
        let down_ct = down.querySelector('[data-subject-target="downvoteCounter"]').innerText
        up_ct = parseFloat(up_ct)
        down_ct = parseFloat(down_ct)

        if (up_ct === 0 && down_ct > 1) {
            return 1
        }
        if (up_ct > 0 && down_ct / up_ct > 1.5) {
            return 1
        } else {
            return 0
        }
    }

    function processFilters () {
        const articles = document.querySelectorAll('.entry')
        for (let i = 0; i < banned.length; ++i) {
            if (block) gt(getRelativeName(banned[i]))
        }
        for (let i = 0; i < articles.length; ++i) {
            const name = getPoster(articles[i])
            if (softbanned.includes(name)) {
                if (fresh) {
                    removeArticle(articles[i])
                    continue
                }
            }
            if (banned.includes(name)) {
                if (block) {
                    removeArticle(articles[i])
                    continue
                }
            }
            const weight = voteWeight(articles[i])
            if (weight === 1) {
                if (weighted) {
                    removeArticle(articles[i])
                    continue
                }
            }
        }
        modal.remove()
        localStorage.setItem("kes-banned-users", banned)
        localStorage.setItem("kes-softbanned-users", softbanned)
        localStorage.setItem("kes-checked-users", checked)
    }

    async function gt (u) {
        const resp = await fetch(`https://${domain}/u/${u}`, {
            "credentials": "include",
            "method": "GET",
            "mode": "cors"
        });
        switch (await resp.status) {
            case 200: {
                const respText = await resp.text()
                const parser = new DOMParser();
                const XML = parser.parseFromString(respText, "text/html");
                const form = XML.querySelector('[name="user_block"]')
                if (form) {
                    const t = form.querySelector('input').value
                    bu(u, t)
                }
                break
            }
            default:
                break
        }
    }

    async function bu (u, t) {
        const resp = await fetch(`https://${domain}/u/${u}/block`, {
            signal: AbortSignal.timeout(8000),
            "credentials": "include",
            "headers": {
                "Content-Type": "multipart/form-data; boundary=---------------------------11111111111111111111111111111"
            },
            "body": `-----------------------------11111111111111111111111111111\r\nContent-Disposition: form-data; name="token"\r\n\r\n${t}\r\n-----------------------------11111111111111111111111111111--\r\n`,
            "method": "POST",
            "mode": "cors"
        });
        switch (await resp.status) {
            case 200: {
                break;
            }
        }
    }

    if (toggle) apply(mutation);
    if (!toggle) unapply();
}
