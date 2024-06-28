/**
 * The page shown when trying to access a user or magazine that hasn't been federated to the
 * instance yet can be quite unhelpful. It simply shows a 404 error.
 * This mod overhauls the page so it informs the user about what's going on and how they can
 * federate the user, as well as providing helpful links to quickly federate the user or
 * access their profile on the original instance.
 * 
 * @param {boolean} isActive Whether the mod has been turned on
 */
function missingActorInfo (isActive) { // eslint-disable-line no-unused-vars
    /**
     * Separates a resource path into its individual parts, taking it apart in the pattern
     * `/<type>/<resource>@<domain>`.  
     * For simplicity with inserting it into text, the `type` will be expanded from u/m
     * to user/magazine.  
     * If for some reason the path can't be parsed, `null` is returned.
     * @param {string} path
     * @returns {{type: string, domain: string, resource: string} | null}
     */
    function separateResourcePath (path) {
        var output;
        try {
            output = path
                .match(/\/(?<type>u|m)\/(?<resource>\w+)(@(?<domain>\w+\.(?:\w+\.)*\w+))?/)
                .groups;
        } catch (e) {
            output = null;
        }
        if (output['type'] == 'u') output['type'] = 'user';
        else if (output['type'] == 'm') output['type'] = 'magazine';
        else output = null;
        return output;
    }

    const INSTANCE_NAME = window.location.hostname;
    const SEPARATED_PATH = separateResourcePath(window.location.pathname);
    const PAGE_PLACEHOLDER_REGEX = new RegExp('{page}', 'g');
    const INSTANCE_PLACEHOLDER_REGEX = new RegExp('{instance}', 'g');

    const TITLE_TEXT = `The requested ${SEPARATED_PATH.type} was not found on ${INSTANCE_NAME}!`;
    /** The text to display when a local user (without \@domain.tld) is accessed. */
    const EXPLAIN_LOCAL_USER = `
        It seems you've tried to access a user from this instance, but such a user does not exist.
        <br/>Please verify you've written their name correctly.
        <br/><br/>
        If you meant to access a remote user, you should append their instance's domain after 
        the username.
    `;
    /** The text to display when a local magazine (without \@domain.tld) is accessed. */
    const EXPLAIN_LOCAL_MAG = `
        It seems you've tried to access a magazine from this instance, but such a magazine does not 
        exist.<br/>
        Please verify you've written its name correctly.
        <br/><br/>
        If you meant to access a remote magazine, you should append its instance's domain after the 
        magazine's name.
    `;
    /** The text to display when a remote actor (user or magazine) is accessed. */
    const EXPLAIN_REMOTE = `
        It seems you've tried to access a ${SEPARATED_PATH.type} from ${SEPARATED_PATH.domain}, but 
        that ${SEPARATED_PATH.type} is not known to ${INSTANCE_NAME} yet.
        <br/><br/>
        First, please double check you haven't made any spelling errors.<br/>
        If that doesn't resolve the issue, then you're probably the first one from
        ${INSTANCE_NAME} to express interest in this ${SEPARATED_PATH.type}.
        <br/><br/>
        To prompt ${INSTANCE_NAME} to create a ${SEPARATED_PATH.type} page for this URL, search for 
        it on the search page. This URL will then be available within moments, provided 
        communication between the instances works correctly.<br/>
        To actually see new posts federated over however, you will need to subscribe to 
        the ${SEPARATED_PATH.type}.
    `;
    
    if (isActive) setup();
    //else teardown();

    function setup () {
        // Preconditions
        if (SEPARATED_PATH == null) return;
        if (!document.querySelector('.page-error')) return;
        if (!document.title.includes('404')) return;

        const parent = getErrorContainer();
        resetContainer(parent);
        parent.append(buildTitle());
        parent.append(buildParagraph(selectAppropriateText()));
        parent.append(buildEditURLUI());
        if (SEPARATED_PATH.domain != undefined) {
            parent.append(buildSearchButton());
            (async () => {
                const btn = await buildOriginalLinkButton();
                if (btn != undefined) parent.append(btn);
            })();
        } else if (SEPARATED_PATH.type == 'magazine') {
            parent.append(buildCreateMagazineButton());
        }
    }

    /**
     * Strings here may use placeholders like '{page}' or '{instance}' which are meant to be filled
     * in at a later point. Which would be now, that's this function's job.
     * 
     * @param {string} text
     */
    function replacePlaceholders (text) {
        return text
            .replace(PAGE_PLACEHOLDER_REGEX, SEPARATED_PATH.type)
            .replace(INSTANCE_PLACEHOLDER_REGEX, SEPARATED_PATH.domain);
    }

    /**
     * Based on the circumstances, chooses which text to display to the user.
     */
    function selectAppropriateText () {
        if (SEPARATED_PATH.domain != undefined) return EXPLAIN_REMOTE;
        else if (SEPARATED_PATH.type == 'user') return EXPLAIN_LOCAL_USER;
        else return EXPLAIN_LOCAL_MAG;
    }

    function buildTitle () {
        const title = create('h2');
        title.textContent = replacePlaceholders(TITLE_TEXT);
        title.style.color = 'var(--kbin-text-muted-color)';
        title.style.marginBlockStart = 0;
        return title;
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

    /**
     * Creates a button which points to the resouece on its home instance.  
     * The webfinger lookup in this function currently does not work with Lemmy, which claims
     * it is a "Bad Request". It's been successfully tested with both mbin and Mastodon however.
     * 
     * @returns {HTMLAnchorElement | undefined}
     */
    async function buildOriginalLinkButton () {
        const btn = buildButton("View on original instance", 'placeholder');
        const domain = SEPARATED_PATH.domain;
        const resourceName = `${SEPARATED_PATH.resource}@${SEPARATED_PATH.domain}`;
        const url = `https://${domain}/.well-known/webfinger?resource=${resourceName}`;
        const headers = new Headers({ 'Accept': 'application/activity+json' });

        const response = await fetch(url, { method: 'GET', headers });
        if (response.ok == false) return undefined;
        const data = await response.json();
        // look through the webfinger results to get the user's homepage
        btn.href = data['links'].find((link) => link['rel'] == 'self')['href'];
        return btn;
    }

    /**
     * Creates a button which acts as a shortcut to the search page, with the current
     * resource path already filled in.
     * 
     * @returns {HTMLAnchorElement}
     */
    function buildSearchButton () {
        return buildButton(
            "Go to search", `/search?q=${SEPARATED_PATH.resource}@${SEPARATED_PATH.domain}`
        );
    }

    /**
     * Creates a button which acts as a shortcut to the magazine creation page.  
     * 
     * @returns {HTMLAnchorElement}
     */
    function buildCreateMagazineButton () {
        return buildButton("Create New Magazine", '/newMagazine');
    }

    /**
     * Creates a UI through which the current resource URL can be edited, and the edited
     * version reloaded.  
     * This is meant as a feature for less tech savvy users who might not
     * understand urls too well, or for mobile users where editing the url directly, in my
     * personal experience, is quite a lot more annoying than on PC.
     * 
     * @returns {HTMLElement}
     */
    function buildEditURLUI () {
        /** @type {HTMLInputElement} */ const nameField = create('input');
        /** @type {HTMLInputElement} */ const domainField = create('input');
        nameField.value = SEPARATED_PATH.resource;
        domainField.value = SEPARATED_PATH.domain ?? "";
        domainField.placeholder = "(when local, leave blank)";

        function getNewLink () {
            // type is either 'user' or 'magazine', we want the first letter of whichever it is
            var value = `/${SEPARATED_PATH.type.slice(0,1)}/${nameField.value}`;
            if (domainField.value != '') value += '@' + domainField.value;
            return value;
        }
        /** @returns {HTMLAnchorElement} */
        function buildReloadButton () {
            const reloadBtn = Object.assign(create('a'), {
                textContent: "Reload",
                className: 'btn btn-link btn__primary',
                href: getNewLink()
            });
            Object.assign(reloadBtn.style, {
                marginLeft: '0.5rem',
                paddingTop: '0.2rem',
                paddingBottom: '0.3rem'
            });
            return reloadBtn;
        }

        const reloadBtn = buildReloadButton();
        nameField.addEventListener('input', () => reloadBtn.href = getNewLink());
        domainField.addEventListener('input', () => reloadBtn.href = getNewLink());

        const div = create('div');
        Object.assign(div.style, {
            color: 'inherit',
            fontSize: 'var(--kbin-body-font-size)',
            fontWeight: 'var(--kbin-body-font-weight)',
            marginTop: '3rem'
        });
        div.append(
            "Edit User Name & Instance Domain:", 
            create("br"), 
            nameField, "@", domainField, reloadBtn);
        return div;
    }

    /**
     * Shortcut function to creating a new element.
     * 
     * @param {string} e The HTML tag to create
     */
    function create (e) {
        return document.createElement(e);
    }

    /**
     * @param {string} text The text to display
     * @returns {HTMLElement}
     */
    function buildParagraph (text) {
        const p = create('p');
        p.innerHTML = replacePlaceholders(text);
        p.style.color = 'inherit';
        p.style.fontSize = 'var(--kbin-body-font-size)';
        p.style.fontWeight = 'var(--kbin-body-font-weight)';
        return p;
    }

    /**
     * Removes all elements from a given container, to return it to being a blank slate.
     * 
     * @param {HTMLElement} container
     */
    function resetContainer (container) {
        container.style.textAlign = 'start';
        Array.from(container.childNodes).forEach((child) => {
            child.remove();
        });
    }

    /**
     * Retrieves from the page the container which contains the 404 error message.
     * 
     * @returns {HTMLElement}
     */
    function getErrorContainer () {
        return document.querySelector('#content');
    }
}