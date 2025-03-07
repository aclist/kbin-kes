function initMags (toggle) { // eslint-disable-line no-unused-vars

    function createMags () {
        const nav = document.querySelector('.head-nav__menu');
        const mobileNav = document.querySelector('.section.mobile-nav');
        //const mags = document.querySelector('[href="/magazines"]');
        const user = document.querySelector('.login');
        const username = user.href.split('/')[4];
        const subLink = 'https://' + window.location.hostname + '/u/' + username + '/subscriptions';
        let peopleLink = document.querySelector('.head-nav__menu a[href*="people"]')
        const subsNav = document.querySelector('.subs-nav');
        if (username == null) {
            return;
        } else if (subsNav) {
            return;
        } else {
            const subsPage = window.location.href.split('/')[5];
            const myListItem = document.createElement('li');
            const mySubsLink = document.createElement('a');
            mySubsLink.setAttribute('href', subLink);
            mySubsLink.innerText = 'My mags';
            if (subsPage === "subscriptions") {
                mySubsLink.className = 'subs-nav active';
                peopleLink.className = ""
            } else {
                mySubsLink.className = 'subs-nav';
            }
            myListItem.append(mySubsLink);
            nav.appendChild(myListItem);
            mobileNav.appendChild(myListItem.cloneNode(true));
        }
    }

    if (toggle) {
        createMags();
    } else {
        $('.subs-nav').remove();
    }
}
