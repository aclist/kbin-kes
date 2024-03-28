function addMail (toggle) {
    function insertElementAfter (target, element) {
        if (target.nextSibling) {
            target.parentNode.insertBefore(element, target.nextSibling);
        } else {
            target.parentNode.appendChild(element);
        }
    }

    function getUsername (item) {
        try {
            if (item.href.split('/u/')[1].charAt(0) == '@') {
                return null
            }
            return item.href.split('/u/')[1];
        } catch (error) {
            return null;
        }
    }

    function addLink (settings) {
        const itemsSelector = '.user-inline';
        const items = document.querySelectorAll(itemsSelector);
        items.forEach((item) => {
            const username = getUsername(item);
            if (!username) return;
            if (username === self_username) return;
            const sib = item.nextSibling
            let link
            try {
                if ((sib) && (sib.nodeName === "#text")) {
                    link = document.createElement('a');
                    const ownInstance = window.location.hostname;
                    link.setAttribute('href', `https://${ownInstance}/u/${username}/message`);
                    insertElementAfter(item, link);
                } else {
                    link = sib;
                }
            } finally {
                if (link) {
                    if (settings["type"] == "Text") {
                        link.className = 'kes-mail-link';
                        link.innerText = settings["text"];
                        link.style.cssText += 'margin-left: 5px;text-decoration:underline';
                    } else {
                        link.innerText = "";
                        link.className = 'kes-mail-link fa fa-envelope'
                        link.style.cssText += 'margin-left: 5px;text-decoration:none';
                    }
                }
            }
        });
    }

    const login = document.querySelector('.login');
    if (!login) return;
    const self_username = login.href.split('/')[4];
    if (toggle) {
        addLink(settings);
    } else {
        $('.kes-mail-link').remove();
    }
}
