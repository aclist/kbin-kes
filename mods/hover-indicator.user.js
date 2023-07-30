// ==UserScript==
// @name         Hover Indicator
// @namespace    https://github.com/aclist
// @version      0.1.0
// @description  applies a outline to hovered elements
// @author       minnieo
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hoverIndicator(toggle) {
    if (toggle) {
        applyOutlines();
    } else {
        safeGM("removeStyle", "kes-hover-css")
    }

    function applyOutlines() {
        const settings = getModSettings('hover');
        const color = settings.color;
        const thickness = settings.thickness;

        const sels = [
            "a",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "img",
            "button",
            "label",
            "markdown-toolbar",
            "textarea",
            "i",
            "time",
            "small",
            "div.content",
            "ul",
            "li",
            "span",
            "figure",
            "input",
            "div.checkbox",
            "div.ts-wrapper"

        ]
        const selectors = sels.join(':hover, ');
        const mergedCSS = `${selectors} {
            outline: ${thickness}px solid ${color};
        }
        p:not(div.content p):hover {
            border: ${thickness}px solid ${color};
        }
        `;
        safeGM("removeStyle", "kes-hover-css")
        safeGM("addStyle", mergedCSS, "kes-hover-css")
    }
}
