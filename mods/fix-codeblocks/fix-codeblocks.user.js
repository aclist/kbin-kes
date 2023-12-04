function fixLemmyCodeblocks(toggle) {
    // included everything inside here because of the private functions advisory

    const testPattern = /\n?<span style="color:#323232;">(.+\n)+<\/span>\n?/;
    const startTagPattern = /^\n?<span style="color:#323232;">/;
    const endTagPattern = /\n<\/span>\n?$/;
    const combinedPattern = /^<\/span><span style="color:#323232;">/gm;
    // matches any line (or rather the start thereof) except the first one
    const startOfNewLinePattern = /(?<=\n)^/gm;

    const attribute = "data-code-fixed";
    const startTag = '<span style="color:#323232;">';
    const endTag = "</span>";

    function fixCodeblock(code) {
        if (testPattern.test(code.innerText)) {
            code.innerText = code.innerText
                .replace(startTagPattern, "")
                .replaceAll(combinedPattern, "")
                .replace(endTagPattern, "");
            code.setAttribute(attribute, "");
        }
    }

    // including this to keep the mod's behavior consistent with the others
    function revertCodeblock(code) {
        const text = code.innerText.replaceAll(startOfNewLinePattern, `${endTag}${startTag}`);
        code.innerText = `\n${startTag}${text}\n${endTag}\n`;
        code.removeAttribute(attribute);
    }

    if (toggle) {
        document.querySelectorAll("pre code").forEach(fixCodeblock);
    } else {
        document.querySelectorAll(`pre code[${attribute}]`).forEach(revertCodeblock);
    }
}