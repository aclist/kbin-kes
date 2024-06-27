/**
 * The page shown when trying to access a user or magazine that hasn't been federated to the
 * instance yet can be quite unhelpful. It simply shows a 404 error.
 * This mod overhauls the page so it informs the user about what's going on and how they can
 * federate the user, as well as providing helpful links to quickly federate the user or
 * access their profile on the original instance.
 * 
 * Implementation notes from Github:
 * - for remote users or communities, there should be instructions on how to initiate 
 * federation and a button to visit it on the original instance.
 * - For local communities, there should be a button to create it.
 * 
 * @param {boolean} isActive Whether the mod has been turned on
 */
function missingActorInfo (isActive) { // eslint-disable-line no-unused-vars
    const INSTANCE_NAME = window.location.hostname;

    // add a function to turn the {page} in these into the isApplicablePage result
    const TITLE_TEXT = `The requested {page} was not found on ${INSTANCE_NAME}!`;
    const EXPLAIN_LOCAL_USER = `
        It seems you've tried to access a user from this instance, but such a user does not exist.
        <br/>Please verify you've written their name correctly.
        <br/><br/>
        If you meant to access a remote user, you should append their instance's domain after 
        the username.
    `;
    const EXPLAIN_LOCAL_MAG = `
        It seems you've tried to access a magazine from this instance, but such a magazine does not 
        exist.<br/>
        Please verify you've written its name correctly.
        <br/><br/>
        If you meant to access a remote magazine, you should append its instance's domain after the 
        magazine's name.
    `;
    const EXPLAIN_REMOTE = `
        It seems you've tried to access a {page} from {instance}, but that {page} is not known to 
        ${INSTANCE_NAME} yet.
        <br/><br/>
        First, please double check you haven't made any spelling errors.<br/>
        If that doesn't resolve the issue, then you're probably the first one from
        ${INSTANCE_NAME} to express interest in this {page}.
        <br/><br/>
        To prompt ${INSTANCE_NAME} to create a {page} page for this URL, search for it on the 
        search page. This URL will then be available within moments, provided communication
        between the instances works correctly.<br/>
        To actually see new posts federated over however, you will need to subscribe to the {page}.
    `;
    
    if (isActive) setup();
    //else teardown();

    function setup () {
        const page = isApplicablePage();
        if (!page) return;

        const parent = getErrorContainer();
        resetContainer(parent);
        addContents(parent, page);
    }

    /**
     * @param {HTMLElement} parent
     * @param {'user' | 'magazine'} pageType
     */
    function addContents (parent, pageType) {
        const replacePage = new RegExp('{page}', 'g');
        parent.append(buildTitle(TITLE_TEXT.replace(replacePage, pageType)));
        const separatedPath = separateResourcePath(window.location.pathname);
        var text;
        if (separatedPath.domain != undefined) 
            text = EXPLAIN_REMOTE.replace(new RegExp('{instance}', 'g'), separatedPath.domain);
        else if (pageType == 'user') text = EXPLAIN_LOCAL_USER;
        else text = EXPLAIN_LOCAL_MAG;
        text = text.replace(replacePage, pageType);
        parent.append(buildParagraph(text));
        addControls(parent, pageType);
    }

    /**
     * @param {HTMLElement} parent
     * @param {'user' | 'magazine'} pageType
     */
    function addControls (parent, pageType) {
        parent.append(buildEditURLUI());
        const separatedPath = separateResourcePath(window.location.pathname);
        if (separatedPath.domain != undefined) {
            parent.append(buildSearchButton());
            (async () => {
                const btn = await buildOriginalLinkButton();
                if (btn != undefined) parent.append(btn);
            })();
        } else if (pageType == 'magazine') {
            parent.append(buildCreateMagazineButton());
        }
    }

    /** @returns {HTMLAnchorElement} */
    function buildButton (text, link) {
        /** @type {HTMLAnchorElement} */
        const btn = create('a');
        btn.textContent = text;
        btn.className = 'btn btn-link btn__secondary';
        btn.href = link;
        btn.style.marginTop = '1rem';
        btn.style.display = 'inline-block';
        return btn;
    }

    /** @returns {HTMLAnchorElement} */
    async function buildOriginalLinkButton () {
        // this function does NOT currently work with Lemmy
        const btn = buildButton("View on original instance", 'placeholder');
        const path = separateResourcePath(window.location.pathname);
        const domain = path.domain;
        const resourceName = `${path.resource}@${path.domain}`;
        const url = `https://${domain}/.well-known/webfinger?resource=${resourceName}`;
        const headers = new Headers({ 'Accept': 'application/activity+json' });

        const response = await fetch(url, { method: 'GET', headers });
        if (response.ok == false) return undefined;
        const data = await response.json();
        data['links'].forEach((link) => {
            if (link['rel'] == 'self') {
                btn.href = link['href'];
                return;
            }
        });
        return btn;
    }

    /** @returns {HTMLAnchorElement} */
    function buildSearchButton () {
        const path = separateResourcePath(window.location.pathname);
        return buildButton("Go to search", `/search?q=${path.resource}@${path.domain}`);
    }

    /** @returns {HTMLAnchorElement} */
    function buildCreateMagazineButton () {
        return buildButton("Create New Magazine", '/newMagazine');
    }

    /** @returns {HTMLElement} @param {'user' | 'magazine'} pageType  */
    function buildEditURLUI (pageType) {
        const path = separateResourcePath(window.location.pathname);
        /** @type {HTMLInputElement} */
        const nameField = create('input');
        /** @type {HTMLInputElement} */
        const domainField = create('input');
        const reloadBtn = create('a');
        reloadBtn.textContent = "Reload";
        nameField.value = path.resource;
        domainField.value = path.domain ?? "";
        domainField.placeholder = "(when local, leave blank)";
        reloadBtn.style.marginLeft = '.5rem';
        reloadBtn.className = 'btn btn-link btn__primary';
        reloadBtn.style.paddingTop = '0.2rem';
        reloadBtn.style.paddingBottom = '0.3rem';

        function getNewLink () {
            var value = (pageType == 'user' ? '/u/' : '/m/') + nameField.value;
            if (domainField.value != '') value += '@' + domainField.value;
            return value;
        }
        reloadBtn.href = getNewLink();
        nameField.addEventListener('input', () => reloadBtn.href = getNewLink());
        domainField.addEventListener('input', () => reloadBtn.href = getNewLink());

        const div = create('div');
        div.style.color = 'inherit';
        div.style.fontSize = 'var(--kbin-body-font-size)';
        div.style.fontWeight = 'var(--kbin-body-font-weight)';
        div.style.marginTop = '3rem';
        div.append(
            "Edit User Name & Instance Domain:", 
            create("br"), 
            nameField, 
            "@", 
            domainField, 
            reloadBtn);
        return div;
    }

    /** @returns {HTMLElement} @param {string} e */
    function create (e) {
        return document.createElement(e);
    }

    /**
     * @param {string} path
     * @returns {{domain: string, resource: string}}
     */
    function separateResourcePath (path) {
        return path
            .slice(3)
            .match(/(?<resource>\w+)(@(?<domain>\w+\.(?:\w+\.)*\w+))?/)
            .groups;
    }

    /**
     * @param {string} text
     * @returns {HTMLElement}
     */
    function buildParagraph (text) {
        const p = create('p');
        p.innerHTML = text;
        p.style.color = 'inherit';
        p.style.fontSize = 'var(--kbin-body-font-size)';
        p.style.fontWeight = 'var(--kbin-body-font-weight)';
        return p;
    }

    /** 
     * @param {string} text
     * @returns {HTMLElement}
     */
    function buildTitle (text) {
        const title = create('h2');
        title.innerHTML = text;
        title.style.color = 'var(--kbin-text-muted-color)';
        title.style.marginBlockStart = 0;
        return title;
    }

    /** @param {HTMLElement} container */
    function resetContainer (container) {
        container.style.textAlign = 'start';
        Array.from(container.childNodes).forEach((child) => {
            child.remove();
        });
    }

    /** @returns {HTMLElement} */
    function getErrorContainer () {
        return document.querySelector('#content');
    }

    function isApplicablePage () {
        if (!document.querySelector('.page-error')) return false;
        if (!document.title.includes('404')) return false;
        const url = window.location.pathname;
        if (url.includes('/u/')) return 'user';
        if (url.includes('/m/')) return 'magazine';
        return false;
    }
}