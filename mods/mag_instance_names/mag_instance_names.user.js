function magInstanceEntry (toggle) { // eslint-disable-line no-unused-vars
    function cloneMagazineName (el) {
        document.querySelectorAll(el).forEach((magazine) => {
            if (magazine.dataset.checkedRemote !== undefined) return
            magazine.dataset.checkedRemote = "true"
            const arr = magazine.getAttribute("href").split("@")
            const name = arr[0].split("/")[2]
            const remote = arr[1]
            if (remote) {
                const clone = magazine.cloneNode(true);
                clone.innerText = name + "@" + remote
                clone.classList.add("mes-remote-instance")
                magazine.classList.add("mag-hidden-instance")
                magazine.style.display = "none"
                magazine.insertAdjacentElement("afterend", clone)
            }
        });
    }

    function showRemotes () {
        for (let i in els) {
            cloneMagazineName(els[i]);
        }
    }

    function hideRemotes () {
        document.querySelectorAll('.mag-hidden-instance').forEach((magazine) => {
            magazine.style.removeProperty("display");
            magazine.classList.remove("mag-hidden-instance");
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
