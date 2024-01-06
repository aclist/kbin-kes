function fixLemmyCodeblocks (toggle) {
    const testPattern = /^\n?<span style="color:#[0-9a-fA-F]{6};">(.+\n)+<\/span>\n?$/;
    const startTagPattern = /^\n?<span style="color:#[0-9a-fA-F]{6};">/;
    const endTagPattern = /\n<\/span>\n?$/;
    const combinedPattern = /<\/span><span style="color:#[0-9a-fA-F]{6};">/g;

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
