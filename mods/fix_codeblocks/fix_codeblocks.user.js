/**
 * Lemmy federates its code blocks with syntax highlighting, but /kbin doesn't currently 
 * correctly handle that. It just displays the additional <span> tags for the syntax
 * highlighting in plain text. This makes the code very hard to read.
 * This mod fixes the issue by removing those erroneous tags.
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
 */
function fixLemmyCodeblocks (isActive) { // eslint-disable-line no-unused-vars
    /** @type {String} */
    const STYLEPATTERN = "((font-style:italic|font-weight:bold);)?color:#[0-9a-fA-F]{6};";
    
    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {
        getCodeBlocks()
            .filter((code) => isErroneousCode(code))
            .filter((code) => !isFixed(code))
            .forEach((code) => fix(code));
    }

    function teardown () {
        getCodeBlocks(true).forEach((code) => {
            /** @type {HTMLElement} */
            code.nextElementSibling.remove();
            code.style.removeProperty("display");
            markAsUnfixed(code);
        });
    }

    /**
     * Repairs a given code block.
     * @param {HTMLElement} original The code block that needs to be fixed
     */
    function fix (original) {
        const fixed = document.createElement("code");
        original.after(fixed);

        const start = new RegExp(`^\\n?<span style="${STYLEPATTERN}">`);
        const end = new RegExp(`\\n<\\/span>\\n?$`);
        const combined = new RegExp(`<\\/span><span style="${STYLEPATTERN}">`, "g");

        fixed.textContent = original.textContent
            .replace(start, "")
            .replaceAll(combined, "")
            .replace(end, "");

        original.style.display = "none";
        markAsFixed(original);
    }

    /**
     * Checks whether a given code block needs to be fixed.
     * @param {HTMLElement} code
     * @returns {Boolean}
     */
    function isErroneousCode (code) {
        const pattern = new RegExp(`^\\n?<span style="${STYLEPATTERN}">(.+\\n)+<\\/span>\\n?$`);
        return pattern.test(code.textContent);
    }

    /**
     * @param {Boolean} fixedCodeOnly Whether to only return those code blocks that have been fixed 
     * (optional)
     * @returns {HTMLElement[]} A list of all the code blocks on the page
     */
    function getCodeBlocks (fixedCodeOnly = false) {
        const allBlocks = Array.from(document.querySelectorAll("pre code"));
        return fixedCodeOnly
            ? allBlocks.filter((block) => isFixed(block))
            : allBlocks;
    }

    /** @param {HTMLElement} elem @returns {Boolean} */
    function isFixed (elem) {
        return elem.dataset.fixed;
    } 
    /** @param {HTMLElement} */
    function markAsFixed (elem) {
        elem.dataset.fixed = true;
    }
    /** @param {HTMLElement} */
    function markAsUnfixed (elem) {
        delete elem.dataset.fixed;
    }
}