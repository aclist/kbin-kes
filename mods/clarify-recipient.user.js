function rewrite (title) {
        const self = document.querySelector('.dropdown .login .user-name.innerText')
        const recipient = document.querySelector('.user-inline:not([href="/u/' + self + '"])')
        const recipientName = recipient.getAttribute('href').split('/')[2]

        title.innerText = "Sending message to " + recipientName
}
function reset(title) {
    title.innerText = "Body"
}

function clarifyRecipientInit(toggle) {
    const ar = window.location.href.split('/')
    if ((ar[3] != "profile") || (ar[4] != "messages")) return
    const title = document.querySelector('form[name="message"] .required')
    if (toggle) {
            rewrite(title);
        } else {
            reset(title);
        }
}
