/**
 * Kbin currently wrongly sanitizes its custom CSS (as defined by magazines and users),
 * causing some characters to be replaced by HTML escape codes. This breaks CSS rules involving,
 * for example, the direct descendant selector (>) or nested CSS using the & character.
 * 
 * This mod aims to fix that issue until kbin does.
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
 */
function fixWronglySanitizedCss (isActive) { // eslint-disable-line no-unused-vars
    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {
        var dummy = document.createElement("div");
        document.querySelectorAll("style:not([id])").forEach((style) => {
            dummy.innerHTML = style.textContent;
            if (dummy.innerHTML != dummy.textContent) {
                style.textContent = dummy.textContent;
                markAsUnsanitized(style);
            }
        });
        dummy.remove();
    }

    function teardown () {
        var dummy = document.createElement("div");
        Array.from(document.querySelectorAll("style:not([id])"))
            .filter((style) => isUnsanitized(style))
            .forEach((style) => {
                dummy.textContent = style.textContent;
                style.textContent = dummy.innerHTML;
                markAsSanitized(style);
            });
        dummy.remove();
    }

    /** @param {HTMLElement} elem @returns {Boolean} */
    function isUnsanitized (elem) {
        return elem.dataset.unsanitized;
    } 
    /** @param {HTMLElement} elem */
    function markAsUnsanitized (elem) {
        elem.dataset.unsanitized = true;
    }
    /** @param {HTMLElement} elem */
    function markAsSanitized (elem) {
        delete elem.dataset.unsanitized;
    }
}