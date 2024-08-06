/* globals removeCustomCSS, addCustomCSS */
/**
 * Spoilers on kbin/mbin work a bit differently than I'm used to from other platforms. Instead of 
 * kbin's `<details>` approach, they're usually displayed as obscured blocks that show their 
 * contents when hovered or clicked on.  
 * This mod aims to switch out kbin's spoilers with ones closer to the ones seen on other platforms.
 * 
 * @param {boolean} isActive Whether the mod has been turned on
*/
function blockifySpoilers (isActive) { // eslint-disable-line no-unused-vars
    /** The attribute used to mark which elements have been created by this mod. */
    const markerAttributeNew = "blockySpoilers_markNewSpoiler";
    /** The attribute used to mark which spoilers have been treated by this mod. */
    const markerAttributeOld = "blockySpoilers_markOldSpoiler";
    /** The id used for this mod's CSS element. */
    const cssId = "blockySpoilersCSS";
    /** The class used to show the spoiler contents when the spoiler context is clicked */
    const showSpoilerClass = "showSpoiler";

    if (isActive) setup();
    else teardown();

    function setup () {
        applyCSS();

        const spoilers = getUntreatedSpoilers();
        if (spoilers.length == 0) return;

        spoilers.forEach((spoiler) => transform(spoiler));
    }

    function teardown () {
        removeCustomCSS(cssId);
        document.querySelectorAll(`[data-${markerAttributeNew}]`)
            .forEach((element) => element.remove());
        document.querySelectorAll(`[data-${markerAttributeOld}]`)
            .forEach((element) => element.removeAttribute(`data-${markerAttributeOld}`));
    }

    /**
     * Retrieves all the spoilers that have not yet been handled by this mod.
     * @returns {HTMLElement[]}
     */
    function getUntreatedSpoilers () {
        return Array.from(document.querySelectorAll(`details:not([data-${markerAttributeOld}])`));
    }

    /**
     * Creates the new spoiler block next to a native spoiler.
     * @param {HTMLElement} spoiler The original `<details>` element that should be replaced
     */
    function transform (spoiler) {
        const newElement = document.createElement('div');
        const context = document.createElement('p');
        const content = document.createElement('div');
        
        newElement.appendChild(context);
        newElement.appendChild(content);
        spoiler.after(newElement);

        const clonedSpoiler = spoiler.cloneNode(true);
        const summary = clonedSpoiler.querySelector('summary');
        context.textContent = summary.textContent;
        clonedSpoiler.removeChild(summary);
        content.innerHTML = clonedSpoiler.innerHTML;

        newElement.setAttribute(`data-${markerAttributeNew}`, '');
        spoiler.setAttribute(`data-${markerAttributeOld}`, '');

        context.onclick = () => {
            if (getClickEnabled())
                newElement.classList.toggle(showSpoilerClass);
        }
    }

    function applyCSS () {
        const style = `
            details {
                display: none;
            }

            div[data-${markerAttributeNew}] {
                background-color: hsl(0,0%,0%,0.3);
                display: inline-block;
                overflow: hidden;
                padding: .5rem;
                padding-right: 1rem;

                > p {
                    font-size: .8rem;

                    ${getClickEnabled() ? `
                    cursor: pointer;
                    ` : ''}
                }
                
                > div {
                    visibility: hidden;
                }

                ${getClickEnabled() ? `
                &.${showSpoilerClass} * {
                    visibility: visible !important;
                }
                ` : ''}
                
                ${getHoverEnabled() ? `
                &:hover * {
                    visibility: visible !important;
                }
                ` : ''}
            }
        `;

        removeCustomCSS(cssId);
        addCustomCSS(style, cssId);
    }

    /** @returns {boolean} */
    function getHoverEnabled () {
        return getModSettings("blocky-spoilers")[`showOnHover`];
    }

    /** 
     * Currently always enabled, as this doesn't really need to be a setting.
     * But I'm leaving the relevant code in in case I want to return the setting in the future.
     * @returns {boolean}
     */
    function getClickEnabled () {
        return true;
        //return getModSettings("blocky-spoilers")[`showOnClick`];
    }
}