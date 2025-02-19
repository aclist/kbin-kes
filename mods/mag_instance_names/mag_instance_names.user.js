function magInstanceEntry (toggle) { // eslint-disable-line no-unused-vars
    function cloneMagazineName (el) {
        document.querySelectorAll(el).forEach((magazine) => {
            if (magazine.dataset.checkedRemote !== undefined) return
            magazine.dataset.checkedRemote = "true"
            const arr = magazine.getAttribute("href").split("@")
            const name = arr[0].split("/")[2]
            const remote = arr[1]
            let spanEl
            if (remote) {
                //subscriptions sidebar uses a different span syntax
                if (el === ".subscription-list .stretched-link") {
                    spanEl = ".magazine-name"
                } else {
                    spanEl = "span"
                }
                const oldSpan = magazine.querySelector(spanEl)
                oldSpan.classList.add("hidden-instance");
                oldSpan.style.display = "none"
                const newSpan = document.createElement("span")
                newSpan.innerText = name + "@" + remote
                newSpan.classList.add("mes-remote-instance");
                oldSpan.insertAdjacentElement("afterend", newSpan)
            }
        });
    }

    function showRemotes () {
        for (let i in els) {
            cloneMagazineName(els[i]);
        }
    }

    function hideRemotes () {
        document.querySelectorAll('.hidden-instance').forEach((magazine) => {
            magazine.style.removeProperty("display");
            magazine.classList.remove("hidden-instance");
        });
        document.querySelectorAll('.mes-remote-instance').forEach((magazine) => {
            magazine.remove();
        });
        for (let i in els) {
            document.querySelectorAll(els[i]).forEach((magazine) => {
                delete magazine.dataset.checkedRemote
            });
        }
    }

    const els = [
        ".magazine-inline",
        ".subscription-list .stretched-link"
    ]
    if (toggle) {
        showRemotes();
    } else {
        hideRemotes();
    }
}
