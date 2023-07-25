// ==UserScript==
// @name         Hover Indicator
// @namespace    https://github.com/aclist
// @version      0.1.0
// @description  applies a outline to hovered elements
// @author       minnieo
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

let styleElement;

function applyOutlines() {
    // user customizable vars
    const settings = getModSettings('hover');
    const color = settings.color;
    const thickness = settings.thickness;

    // remove the existing style element if it exists
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
    }

    // apply outlines to elements
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
    const outline = `${selectors} { outline: ${thickness}px solid ${color};}`;
    const border = `p:not(div.content p):hover { border: ${thickness}px solid ${color};}`;

    styleElement = document.createElement('style');
    styleElement.innerText = outline + border;
    document.head.appendChild(styleElement);
}

function hoverIndicator(toggle) {
    if (toggle) {
        applyOutlines();
    } else {
        document.head.removeChild(styleElement);
    }
}