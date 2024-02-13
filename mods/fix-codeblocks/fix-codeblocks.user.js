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
 * - Mark fixed code visually for transparency
 * - Add a way to selectively revert blocks
 */
class FixLemmyCodeblocksMod {
    getFixedCodeAttributeName () {
        return "data-fixed-code"
    }

    /** @returns {HTMLElement[]} @param {boolean} fixedCodeOnly */
    getCodeBlocks (fixedCodeOnly = false) {
        const attr = fixedCodeOnly ? `[${this.getFixedCodeAttributeName()}]` : "";
        return Array.from(document.querySelectorAll(`pre code${attr}`));
    }

    getStylePattern () {
        return "((font-style:italic|font-weight:bold);)?color:#[0-9a-fA-F]{6};";
    }

    /** @param {HTMLElement} code */
    isErroneousCode (code) {
        const pattern = 
            new RegExp(`^\\n?<span style="${this.getStylePattern()}">(.+\\n)+<\\/span>\\n?$`);
        return pattern.test(code.textContent);
    }

    /** @param {HTMLElement} code */
    isFixed (code) {
        return code.nextElementSibling?.hasAttribute(this.getFixedCodeAttributeName());
    }

    /** @param {HTMLElement} original */
    fix (original) {
        const fixed = document.createElement("code");
        fixed.setAttribute(this.getFixedCodeAttributeName, "");
        original.after(fixed);

        const start = new RegExp(`^\\n?<span style="${this.getStylePattern()}">`);
        const end = new RegExp(`\\n<\\/span>\\n?$`);
        const combined = new RegExp(`<\\/span><span style="${this.getStylePattern()}">`, "g");

        fixed.textContent = original.textContent
            .replace(start, "")
            .replaceAll(combined, "")
            .replace(end, "");

        original.style.display = "none";
    }

    setup () {
        this.getCodeBlocks()
            .filter((code) => !this.isErroneousCode(code))
            .filter((code) => this.isFixed(code))
            .forEach((code) => this.fix(code));
    }

    teardown () {
        this.getCodeBlocks(true).forEach((code) => {
            /** @type {HTMLElement} */
            const originalBlock = code.previousElementSibling;
            originalBlock.style.removeProperty("display");
            code.remove();
        });
    }
}

function fixLemmyCodeblocks (isActive) { // eslint-disable-line no-unused-vars
    if (isActive) {
        new FixLemmyCodeblocksMod().setup();
    } else {
        new FixLemmyCodeblocksMod().teardown();
    }
}