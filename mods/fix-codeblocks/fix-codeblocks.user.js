/**
 * Lemmy federates its code blocks with syntax highlighting, but /kbin doesn't currently 
 * correctly handle that. It just displays the additional <span> tags for the syntax
 * highlighting in plain text. This makes the code very hard to read.
 * 
 * This mod fixes the issue by removing those erroneous tags.
 * 
 * Testing:
 * 
 * Todo:
 * - Explain the basic procedure to test that this works correctly
 * - Set up (possibly automated) unit tests
 * - Check if anything not yet covered needs to be. Does only Rust currently
 * have syntax highlighting federated? The federated highlighting and the
 * highlighting I can see on lemm.ee are very similar but not the same,
 * indicating that they're different implementations yet use similar rules.
 * Check if there's some common standardized style they use which could serve
 * as a reference.
 * 
 * Future Plans:
 * - Try to make sure this doesn't replace anything within strings.
 * - Maybe make a version that makes the federated syntax highlighting functional rather 
 * than removing it.
 * 
 * @param {boolean} isActive
 */
function fixLemmyCodeblocks (isActive) { // eslint-disable-line no-unused-vars
    const stylePattern = "((font-style:italic|font-weight:bold);)?color:#[0-9a-fA-F]{6};";

    const testPattern = new RegExp(`^\\n?<span style="${stylePattern}">(.+\\n)+<\\/span>\\n?$`);
    const startTagPattern = new RegExp(`^\\n?<span style="${stylePattern}">`);
    const endTagPattern = new RegExp(`\\n<\\/span>\\n?$`);
    const combinedPattern = new RegExp(`<\\/span><span style="${stylePattern}">`, "g");

    const fixedCodeAttribute = "data-fixed-code"

    /** @param {HTMLElement} codeblock */
    function fixCodeblock (codeblock) {
        if (!testPattern.test(codeblock.textContent)) return;
        if (codeblock.nextElementSibling?.hasAttribute(fixedCodeAttribute)) return;

        const fixedBlock = document.createElement("code");
        fixedBlock.setAttribute(fixedCodeAttribute, "");
        codeblock.after(fixedBlock);

        fixedBlock.textContent = codeblock.textContent
            .replace(startTagPattern, "")
            .replaceAll(combinedPattern, "")
            .replace(endTagPattern, "");

        codeblock.style.display = "none";
    }

    /** @param {HTMLElement} fixedBlock */
    function revertCodeblock (fixedBlock) {
        /** @type {HTMLElement} */
        const originalBlock = fixedBlock.previousElementSibling;
        originalBlock.style.removeProperty("display");
        fixedBlock.parentNode.removeChild(fixedBlock);
    }

    if (isActive) {
        document.querySelectorAll("pre code").forEach(fixCodeblock);
    } else {
        document.querySelectorAll(`pre code[${fixedCodeAttribute}]`).forEach(revertCodeblock);
    }
}
