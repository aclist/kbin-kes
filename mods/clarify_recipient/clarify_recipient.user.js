function clarifyRecipientInit (toggle) {
    function rewrite (title) {
        const self = document.querySelector('.dropdown .login').getAttribute("href").split('/')[2]
        const loc = window.location.href.split('/')[3]
        let recipientName
        if (loc === "profile") {
            const recipient = document.querySelector('.user-inline:not([href="/u/' + self + '"])')
            recipientName = recipient.href.split('/')[4]
        } else {
            recipientName = window.location.href.split('/')[4]
        }

        title.innerText = "Sending message to " + recipientName
    }
    function reset (title) {
        title.innerText = "Body"
    }

    const ar = window.location.href.split('/')
    if ((ar[3] != "profile") && (ar[4] != "messages") && (ar[3] != "u")) return
    const title = document.querySelector('form[name="message"] .required')
    if (!title) return
    if (toggle) {
        rewrite(title);
    } else {
        reset(title);
    }
}
