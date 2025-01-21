function clarifyRecipientInit (toggle) { // eslint-disable-line no-unused-vars
    function rewrite (form) {
        const self = document.querySelector('.dropdown .login').getAttribute("href").split('/')[2]
        const loc = window.location.href.split('/')[3]
        let recipientName
        if (loc === "profile") {
            const recipient = document.querySelector('.user-inline:not([href="/u/' + self + '"])')
            recipientName = recipient.href.split('/')[4]
        } else {
            recipientName = window.location.href.split('/')[4]
        } 

        const holder = document.createElement('div');
        holder.id = "mes-compose-holder";
        holder.textContent = "Sending message to " + recipientName;
        holder.style.paddingRight = '10px';
        form.prepend(holder);
    }
    function reset () {
        document.querySelector('#mes-compose-holder').remove();
    }

    const ar = window.location.href.split('/')
    if ((ar[3] != "profile") && (ar[4] != "messages") && (ar[3] != "u")) return
    const form = document.querySelector('form[name="message"]')
    if (!form) return
    if (toggle) {
        rewrite(form)
    } else {
        reset(form)
    }
}
