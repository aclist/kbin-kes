// ==UserScript==
// @name         megamod-kbin-labelop
// @namespace    https://github.com/aclist
// @version      0.3
// @description  label thread author
// @author       aclist
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function labelOp(toggle){
    if (toggle) {
	let settings = getModSettings("labelcolors")
	let fg = settings["fgcolor"]
	let bg = settings["bgcolor"]
        document.styleSheets[0].addRule('.author > header > .user-inline::after','content: " OP";color:' +
		fg +
		';background-color:' +
		bg +
		';margin-left: 3px;padding-left: 1px;padding-right: 5px');
    } else {
         document.styleSheets[0].addRule('.author > header > .user-inline::after','content: "";background-color:unset;padding-left: 0px !important');
    }
}
