function fixLemmyCodeblocks (toggle) {
    const stylePattern = "((font-style:italic|font-weight:bold);)?color:#[0-9a-fA-F]{6};";

    const testPattern = new RegExp(`^\\n?<span style="${stylePattern}">(.+\\n)+<\\/span>\\n?$`);
    const startTagPattern = new RegExp(`^\\n?<span style="${stylePattern}">`);
    const endTagPattern = new RegExp(`\\n<\\/span>\\n?$`);
    const combinedPattern = new RegExp(`<\\/span><span style="${stylePattern}">`, "g");

    const fixedCodeAttribute = "data-fixed-code"

    /** @param {HTMLElement} codeblock */
    function fixCodeblock (codeblock) {
        if (!testPattern.test(codeblock.innerText)) return;
        if (codeblock.nextElementSibling?.hasAttribute(fixedCodeAttribute)) return;

        const fixedBlock = document.createElement("code");
        fixedBlock.setAttribute(fixedCodeAttribute, "");
        codeblock.parentNode.insertBefore(fixedBlock, codeblock.nextSibling);

        fixedBlock.innerText = codeblock.innerText
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

    if (toggle) {
        document.querySelectorAll("pre code").forEach(fixCodeblock);
    } else {
        document.querySelectorAll(`pre code[${fixedCodeAttribute}]`).forEach(revertCodeblock);
    }
}
