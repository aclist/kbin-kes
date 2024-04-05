function labelOp (toggle) { // eslint-disable-line no-unused-vars
    if (getInstanceType() === "mbin") return // eslint-disable-line no-unused-vars
    if (toggle) {
        let settings = getModSettings("labelcolors");
        let fg = settings["fgcolor"];
        let bg = settings["bgcolor"];
        const labelCSS = `
                blockquote.author > header > a.user-inline::after {
                content: 'OP';
                font-weight: bold;
                color: ${fg};
                background-color: ${bg};
                margin-left: 4px;
                padding: 0px 5px 0px 5px;
            }
            body.rounded-edges blockquote.author a.user-inline::after {
                border-radius: var(--kbin-rounded-edges-radius);
            }
        `;
        safeGM("addStyle", labelCSS, "labelop-css")
    } else {
        safeGM("removeStyle", "labelop-css")
    }
}
