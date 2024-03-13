function clarifyRecipientInit (toggle) {
    function rewrite (title) {
        const self = document.querySelector('.dropdown .login').getAttribute("href").split('/')[2]
        const recipient = document.querySelector('.user-inline:not([href="/u/' + self + '"])')
        const recipientName = recipient.getAttribute('href').split('/')[2]

        title.innerText = "Sending message to " + recipientName
    }
    function reset (title) {
        title.innerText = "Body"
    }

    const ar = window.location.href.split('/')
    if ((ar[3] != "profile") || (ar[4] != "messages")) return
    const title = document.querySelector('form[name="message"] .required')
    if (!title) return
    if (toggle) {
        rewrite(title);
    } else {
        reset(title);
    }
}
