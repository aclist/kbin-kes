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
height: 360px;
user-select: none;
opacity: 1;
visibility: visible;
`;
const customPanelCSS = `
#header .notification-button .badge {
    font-size:.8em;padding:.1em .4em
}
#header menu .notification-button > a:not(.fa-solid.fa-bell){
border:0!important;padding:0;display:inline;position:absolute;top:.5em;margin-left:1.6em
}
#header menu li a:has(~.notification-counter:hover){
    border-bottom:var(--kbin-header-hover-border)
}
.notifications-iframe::-webkit-scrollbar {
    width: 8px;
}
.notifications-iframe::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 5px;
    border: 2px solid transparent;
}
#header menu .notification-button > a:not(.fa-solid.fa-bell) {
    border: 0!important;
    padding: 0;
    display: inline;
    position: absolute;
    top: .5em;
    margin-left: 1.6em;
}
.notifications-iframe {
    width: 300px;
}
.noti-panel-message-holder {
    overflow-y: scroll;
    height: 90%;
}
.noti-panel-sender,
.noti-panel-snippet {
    padding: 0 !important;
}
.noti-panel-snippet {
    display: block !important;
    margin-top: .5rem;
}
.noti-panel-sender {
    width: fit-content !important;
    display: inline !important;
}
.noti-panel-message {
    padding: .8rem;
    border: var(--kbin-section-border);
    border-top: 0;
    border-left: 0;
    border-right: 0;
}
.noti-panel-message:hover {
    background: var(--kbin-bg);
}
.noti-panel-time {
    display: inline-block;
    opacity: .5;
}
.noti-panel-time:before {
    content: "·";
    margin: 0 5px;
}
.noti-panel-header {
    background: var(--kbin-button-primary-bg);
    display: flex;
    padding: 5px;
}
.noti-arrow-holder {
    margin-left: auto
}
.noti-read, .noti-purge {
    background: var(--kbin-button-secondary-hover-bg);
    margin-left: 7px;
}
.noti-read,.noti-purge,.noti-back,.noti-forward {
    padding: 5px;
}
.noti-read:hover,.noti-purge:hover,.noti-back:hover,.noti-forward:hover{
    opacity: 0.7;
}
.noti-no-messages {
    font-size: 1rem;
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
const forceDropdownCSS = `
.dropdown__menu a, .dropdown__menu button {
    display: initial !important;
    padding: initial !important;
}
`
const resetDropdownCSS = `
.dropdown__menu a, .dropdown__menu button {
    display: block !important;
    padding: .5rem 1rem !important;
}
`
async function insertMsgs (response) {
    const noMsgs = document.createElement('text');
    noMsgs.className = 'noti-no-messages';
    noMsgs.innerText = 'No new notifications!';
    let loadingSpinner = document.querySelector('.loadingmsg')
    let iff = document.querySelector('.notifications-iframe');
    let parser = new DOMParser();
    let notificationsXML = parser.parseFromString(response.responseText, "text/html");
    console.log(notificationsXML)
    let currentPage = notificationsXML.all[6].content.split('=')[1]
    console.log(currentPage)
    let currentPageInt = parseInt(currentPage)
    let sects = notificationsXML.querySelectorAll('.notification');
    if (sects.length === 0) {
        loadingSpinner.remove();
        iff.appendChild(noMsgs);
        return;
    }
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
    loadingSpinner.remove();

    const notiHolder = document.createElement('div')
    notiHolder.className = 'noti-panel-holder'

    const notiHeader = document.createElement('div');
    notiHeader.className = 'noti-panel-header';

    const readButton = document.createElement('span');
    const purgeButton = document.createElement('span');
    const arrowHolder = document.createElement('span');
    arrowHolder.className = 'noti-arrow-holder'

    const backButtonLink = document.createElement('a');
    const backButton = document.createElement('i');
    backButton.className = 'noti-back fa-solid fa-arrow-left';

    const forwardButtonLink = document.createElement('a');
    const forwardButton = document.createElement('i');
    forwardButton.className = 'noti-forward fa-solid fa-arrow-right';

    readButton.className = 'noti-read';
    readButton.innerText = 'Read';

    purgeButton.className = 'noti-purge';
    purgeButton.innerText = 'Purge';

    notiHeader.appendChild(readButton);
    notiHeader.appendChild(purgeButton);

    //POST https://kbin.social/settings/notifications/read
    //POST https://kbin.social/settings/notifications/clear
    console.log("current page is:",currentPageInt)

    if (currentPageInt != 1) {
        console.log("not on page 1")
        console.log("adding back button")
        arrowHolder.appendChild(backButton);
        backButton.addEventListener('click', (e) => {
            genericXMLRequest("https://kbin.social/settings/notifications?p=" + (currentPageInt - 1),insertMsgs);
        });
    }
    let testNextPage = notificationsXML.querySelector('a.pagination__item--next-page')
    console.log(testNextPage)
    if (testNextPage) {
        console.log("next page exists")
        arrowHolder.appendChild(forwardButton);
        forwardButton.addEventListener('click', (e) => {
            $('.noti-panel-holder').remove();
            genericXMLRequest("https://kbin.social/settings/notifications?p=" + (currentPageInt + 1),insertMsgs);
        });
    }
    notiHeader.appendChild(arrowHolder);
    iff.appendChild(notiHeader)
    const notiMsgHolder = document.createElement('div')
    iff.appendChild(notiMsgHolder)
    notiMsgHolder.className = "noti-panel-message-holder"

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
        notiMsgHolder.appendChild(div)
    }
}
function startup () {
    safeGM("addStyle",customPanelCSS);
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
        safeGM("addStyle",resetDropdownCSS)
    })
    document.querySelector('.kbin-container').appendChild(clickModal)
    console.log("pushing frame below list")
    listItem.appendChild(iframe);
    genericXMLRequest("https://kbin.social/settings/notifications?p=1",insertMsgs);
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
            safeGM("addStyle",forceDropdownCSS);
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
