const spinnerCSS = `
@keyframes spinner {
    0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
        transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
}
.loadingmsg::before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #cfd0d1;
    border-bottom-color: #1c87c9;
    border-radius: 50%;
    content: "";
    height: 40px;
    width: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
}
`;
const iframeCSS = `
position: absolute;
z-index: 9999;
top:100%;
right: 0;
left: auto;
transform: rotateX(0)translateX(-50%);
resize: vertical;
min-height: 360px;
user-select: none;
opacity: 1;
visibility: visible;
`;
const customPanelCss = `
#header .notification-button .badge {
    font-size:.8em;padding:.1em .4em
}
#header menu .notification-button > a:not(.fa-solid.fa-bell){
border:0!important;padding:0;display:inline;position:absolute;top:.5em;margin-left:1.6em
}
#header menu li a:has(~.notification-counter:hover){
    border-bottom:var(--kbin-header-hover-border)
}
`;

const clickModalCSS = `
position: fixed;
z-index: 98;
left: 0;
top: 0;
width: 100%;
height: 100%;
`
async function insertMsgs (response) {
    let iff = document.querySelector('.notifications-iframe')
    var parser = new DOMParser();
    var notificationsXML = parser.parseFromString(response.responseText, "text/html");
    let sects = notificationsXML.querySelectorAll('.notification')
    const links = []
    const names = []
    const times = []
    const msgs = []
    const read = []

    sects.forEach((item) => {
        let readStatus = item.className
        if (readStatus.indexOf('opacity-50') > -1) {
            read.push("read")
        } else {
            read.push("unread")
        }
        let rawName = item.querySelector('a:nth-of-type(1)').href
        let hrName = rawName.split('/')[4]
        let remoteMsg = item.querySelector('a:nth-of-type(2)').innerText
        let rawLink = item.querySelector('a:nth-of-type(2)').href
        let remoteLink = rawLink.replace('?id=','/')
        let remoteTime = item.querySelector('.timeago').innerText;
        names.push(hrName);
        links.push(remoteLink);
        times.push(remoteTime);
        msgs.push(remoteMsg);
    });
    let div
    let nameEl
    let msgEl
    let timeEl
    let clearLoading = document.querySelector('.loadingmsg')
    clearLoading.remove();
    for(let i = 0; i < msgs.length; i++) {
        div = document.createElement('div')
        if (read[i] === "read") {
            div.className = "noti-panel-message opacity-50"
        } else {
            div.className = "noti-panel-message"
        }

        msgEl = document.createElement('a')
        nameEl = document.createElement('a')
        timeEl = document.createElement('text')

        timeEl.innerText = times[i]
        timeEl.style.cssText = "margin-left: 10px; color:white"
        timeEl.className = "noti-panel-time"

        msgEl.href= links[i]
        msgEl.innerText = msgs[i]
        msgEl.style.cssText = "margin-left: 10px"
        let msgIndex = msgEl.href.split('/')[4]
        console.log("is PM:",msgIndex)
        if (msgIndex === "messages" ) {
            msgEl.className = "noti-panel-snippet noti-message"
        } else {
            msgEl.className = "noti-panel-snippet"
        }

        nameEl.href = "https://kbin.social/u/" + names[i];
        nameEl.innerText = names[i];
        nameEl.className = "noti-panel-sender"

        div.appendChild(nameEl);
        div.appendChild(timeEl);
        div.appendChild(msgEl);
        iff.appendChild(div);

        //user-inline instance
        //section section--small notification opacity-50
        //timeago

        //wrote a message => href="/profile"
        //replied to your comment => everything else
        //POST https://kbin.social/settings/notifications/clear
        //POST https://kbin.social/settings/notifications/read
    }
}
function startup () {
    safeGM("addStyle",customPanelCss);
    safeGM("addStyle",spinnerCSS);
    build();
}
function toggleIframe (listItem) {
    const existingIframe = listItem.querySelector('.notifications-iframe');

    if (existingIframe) {
        existingIframe.remove();
        return
    }

    const iframe = document.createElement('div');
    iframe.className = 'notifications-iframe dropdown__menu';
    iframe.style.cssText = iframeCSS

    console.log("making iframe")
    let loading = document.createElement('div')
    loading.className = "loadingmsg"
    loading.style.cssText = spinnerCSS
    iframe.appendChild(loading)

    iframe.addEventListener('click', () => {
        iframe.remove();
    });

    console.log("making click modal")
    let clickModal = document.createElement('div')
    clickModal.className = "clickmodal"
    clickModal.style.cssText = clickModalCSS
    clickModal.addEventListener('click', () => {
        iframe.remove();
        clickModal.remove();
    })
    document.querySelector('.kbin-container').appendChild(clickModal)
    console.log("pushing frame below list")
    listItem.appendChild(iframe);
    genericXMLRequest("https://kbin.social/settings/notifications",insertMsgs);
}
function build () {
    const notiPanel = document.querySelector('li.notification-button');
    if (notiPanel) return
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
        listItem.addEventListener('click', () => {
            toggleIframe(listItem)
        });
    }
}
function shutdown () {
    const notiPanel = document.querySelector('li.notification-button');
    notiPanel.remove();
}

function notificationsPanel (toggle) {
    if (toggle) {
        startup();
    } else {
        shutdown();
    }
}
