const exp = require("constants");

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
    if (isActive) setup();
    else teardown();

    function setup () {
        if (!document.querySelector('.page-error')) return;
        if (!document.title.includes('404')) return;
        const url = window.location.pathname;
        const isUser = url.includes('/u/');
        const isMagazine = url.includes('/m/');
        if (isUser || isMagazine) {
            /** @type {HTMLElement} */
            const parent = document.querySelector('#content');
            parent.style.textAlign = 'start';
            Array.from(parent.childNodes).forEach((child) => {
                child.remove()
            });

            const instance = window.location.hostname;

            const title = document.createElement('h2');
            title.textContent = 
                `The requested ${isUser ? "user" : "magazine"} does not exist on ${instance}!`;
            title.style.color = "var(--kbin-text-muted-color)";
            parent.append(title);

            const explanation = document.createElement('p');
            const pageInstruction = document.createElement('p');
            const federationInstruction = document.createElement('p');
            if (isUser) {
                explanation.textContent = `The user you tried to access doesn't exist on this `
                    + `instance yet. This is most likely because ${instance} hasn't yet been `
                    + `told to federate the user. To avoid overburdening its server, `
                    + `${instance} only federates users and magazines its local users are `
                    + `interested in.`
                pageInstruction.textContent = `To make this URL work, do a search for the user `
                    + `once. There's a button on this page which does that for you. This prompts `
                    + `${instance} to look the user up and build a page to display at this URL. `
                    + `The URL should then work shortly afterwards.`
                federationInstruction.textContent = `Simply looking them up won't cause `
                    + `${instance} to start federating in new posts from the user though. `
                    + `To achieve that, at least one person needs to be following the user `
                    + `from your instance.`
            } else {
                explanation.textContent = `The magazine you tried to access doesn't exist on this `
                    + `instance yet. This is most likely because ${instance} hasn't yet been `
                    + `told to federate the magazine. To avoid overburdening its server, `
                    + `${instance} only federates users and magazines its local users are `
                    + `interested in.`
                pageInstruction.textContent = `To make this URL work, do a search for the magazine `
                    + `once. There's a button on this page which does that for you. This prompts `
                    + `${instance} to look the magazine up and build a page to display at this `
                    + `URL. The URL should then work shortly afterwards.`
                federationInstruction.textContent = `Simply looking them up won't cause `
                    + `${instance} to start federating in new posts from the magazine though. `
                    + `To achieve that, at least one person needs to be subscribed to the magazine `
                    + `from your instance.`
            }
            explanation.style.fontSize = "var(--kbin-body-font-size)";
            pageInstruction.style.fontSize = "var(--kbin-body-font-size)";
            federationInstruction.style.fontSize = "var(--kbin-body-font-size)";
            explanation.style.fontWeight = "var(--kbin-body-font-weight)";
            pageInstruction.style.fontWeight = "var(--kbin-body-font-weight)";
            federationInstruction.style.fontWeight = "var(--kbin-body-font-weight)";
            parent.append(explanation);
            parent.append(pageInstruction);
            parent.append(federationInstruction);
        }
    }

    function teardown () {

    }
}