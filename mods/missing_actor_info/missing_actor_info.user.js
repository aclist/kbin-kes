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
        If you meant to access a remote user, you should append their instance after the username.
        <br/><br/>
        <add form to edit in a domain, and a retry button>
    `;
    const EXPLAIN_LOCAL_MAG = `
        It seems you've tried to access a magazine from this instance, but such a magazine does not 
        exist.<br/>
        Please verify you've written its name correctly.
        <br/><br/>
        If you meant to access a remote magazine, you should append its instance after the 
        magazine's name.
        <br/><br/>
        <add form to edit in a domain, and a retry button><br/>
        <add shortcut button to create the magazine>
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
        search page. This URL will then be available within moments.<br/>
        To actually see new posts federated over however, you'll need to subscribe to the {page}.
        <br/><br/>
        <add shortcut to search the magazine or user><br/>
        <add link to the remote page>
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
        const p = document.createElement('p');
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
        const title = document.createElement('h2');
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