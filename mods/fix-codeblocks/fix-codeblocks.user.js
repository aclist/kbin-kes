/*
 * Lemmy federates its code blocks with syntax highlighting, but /kbin doesn't currently 
 * correctly handle that. It just displays the additional <span> tags for the syntax
 * highlighting in plain text. This makes the code very hard to read.
 * 
 * This mod fixes the issue by removing those erroneous tags.
 * 
 * Future Plans:
 * - Try to make sure this doesn't replace anything within strings.
 * - Maybe make a version that makes the federated syntax highlighting functional rather 
 * than removing it.
 */

function LemmyCodeFixer () {
    this.stylePattern = "((font-style:italic|font-weight:bold);)?color:#[0-9a-fA-F]{6};";

    this.testPattern = new RegExp(`^\\n?<span style="${this.stylePattern}">(.+\\n)+<\\/span>\\n?$`);
    this.startTagPattern = new RegExp(`^\\n?<span style="${this.stylePattern}">`);
    this.endTagPattern = new RegExp(`\\n<\\/span>\\n?$`);
    this.combinedPattern = new RegExp(`<\\/span><span style="${this.stylePattern}">`, "g");

    this.attribute = "data-fixed-code"

    /** @param {HTMLElement} codeblock */
    this.repair = function (codeblock) {
        if (!this.testPattern.test(codeblock.textContent)) return;
        if (codeblock.nextElementSibling?.hasAttribute(this.attribute)) return;

        const fixedBlock = document.createElement("code");
        fixedBlock.setAttribute(this.attribute, "");
        codeblock.after(fixedBlock);

        fixedBlock.textContent = codeblock.textContent
            .replace(this.startTagPattern, "")
            .replaceAll(this.combinedPattern, "")
            .replace(this.endTagPattern, "");

        codeblock.style.display = "none";
    }

    /** @param {HTMLElement} fixedBlock */
    this.revert = function (fixedBlock) {
        /** @type {HTMLElement} */
        const originalBlock = fixedBlock.previousElementSibling;
        originalBlock.style.removeProperty("display");
        fixedBlock.parentNode.removeChild(fixedBlock);
    }

    this.repairAll = function () {
        document.querySelectorAll("pre code").forEach(this.repair.bind(this));
    }

    this.revertAll = function () {
        document.querySelectorAll(`pre code[${this.attribute}]`).forEach(this.revert.bind(this));
    }
}

function fixLemmyCodeblocks (isActive) { // eslint-disable-line no-unused-vars
    const fixer = new LemmyCodeFixer();
    if (isActive) {
        fixer.repairAll();
    } else {
        fixer.revertAll();
    }
}