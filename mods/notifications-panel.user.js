(function () {
    GM_addStyle(`#header .notification-button .badge{font-size:.8em;padding:.1em .4em}#header menu .notification-button a:not(.fa-solid.fa-bell){border:0!important;padding:0;display:inline;position:absolute;top:.5em;margin-left:1.6em}#header menu li a:has(~.notification-counter:hover){border-bottom:var(--kbin-header-hover-border)}`);

    const parentElement = document.querySelector('.header .kbin-container');

    if (parentElement) {
        const listItem = document.createElement('li');
        listItem.classList.add('notification-button');
        listItem.style.cursor = 'pointer';

        const anchorElement = document.createElement('a');
        anchorElement.textContent = ' ';
        anchorElement.classList.add('fa-solid', 'fa-bell');
        anchorElement.setAttribute('aria-label', 'Notifications');
        anchorElement.setAttribute('title', 'Notifications');

        listItem.appendChild(anchorElement);

        const siblingElement = document.querySelector('.dropdown .login').parentElement;

        if (siblingElement) {
            siblingElement.parentElement.insertBefore(listItem, siblingElement);
        }

        const counterElement = document.querySelector('.counter > [href="/settings/notifications"]');

        if (counterElement) {
            counterElement.removeAttribute('href');
            counterElement.classList.add('notification-counter');
            listItem.appendChild(counterElement);
        }

        function toggleIframe() {
            const existingIframe = listItem.querySelector('.notifications-iframe');

            if (existingIframe) {
                existingIframe.remove();
            } else {
                const iframe = document.createElement('iframe');
                iframe.src = 'https://' + window.location.hostname + '/settings/notifications';
                iframe.className = 'notifications-iframe dropdown__menu';
                iframe.style.cssText = `position:absolute;z-index:99;top:100%;right:0;left:auto;transform:rotateX(0) translateX(-50%);resize:vertical;min-height:360px;user-select:none;opacity:1;visibility:visible;`;

                listItem.appendChild(iframe);

                iframe.addEventListener('load', () => {
                    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                    const links = iframeDocument.getElementsByTagName('a');

                    for (let i = 0; i < links.length; i++) {
                        links[i].addEventListener('click', (event) => {
                            event.preventDefault();
                            window.location.href = event.target.href;
                        });
                    }

                    const styleElement = iframeDocument.createElement('style');
                    styleElement.textContent = `.pills,h1{display:inline-block}#middle,body{background:var(--kbin-section-bg)}#footer,#header,#scroll-top,#sidebar,#subscription-panel,#topbar{display:none!important}#middle,.kbin-container{margin-top:0!important}h1{font-size:1rem;padding-left:.5rem}.section--small{padding:.5rem}.btn__secondary,form{height:25px}.btn{padding:0 6px}.page-notifications #main .notification{grid-template-areas:"a a a b" "a a a b";display:grid;width:100%;font-size:.8rem;margin-bottom:0;border-bottom:0;border-left:0;border-right:0}.page-notifications #main .notification:hover{background:var(--kbin-bg)}.page-notifications #main .notification>div{grid-area:a}.page-notifications #main .notification>span{grid-area:b}body::-webkit-scrollbar{width:8px}body::-webkit-scrollbar-track{background:var(--kbin-section-bg)}body::-webkit-scrollbar-thumb{background-color:rgb(112 112 112 / 50%);border-radius:5px;border:2px solid transparent}.pills{padding:0;float:right;margin:.67em}html{margin:0}body{min-height:100vmax}.section--muted{border:0}`;
                    iframeDocument.head.appendChild(styleElement);
                });
            }
        }


        listItem.addEventListener('click', toggleIframe);

        document.addEventListener('click', (event) => {
            const target = event.target;
            const isListItem = target === listItem || listItem.contains(target);
            const isIframe = target.classList.contains('notifications-iframe');

            if (!isListItem && !isIframe) {
                const existingIframe = listItem.querySelector('.notifications-iframe');
                if (existingIframe) {
                    existingIframe.remove();
                }
            }
        });
    }
})();
