function dividerInit (toggle) { //eslint-disable-line no-unused-vars
    function insertSeparator () {
        const pt = getPageType()
        if (!isThread() && pt !== Mbin.Microblog) return
        if (document.querySelector("#mes-thread-divider")) return
        const top = document.querySelector(".section--top")
        const sep = document.createElement("div")
        top.insertAdjacentElement("beforebegin", sep)
        sep.style.height = "0.5rem"
        sep.id = "mes-thread-divider"
    }

    if (toggle) insertSeparator()
    if (!toggle) document.querySelector("#mes-thread-divider")?.remove();
}
