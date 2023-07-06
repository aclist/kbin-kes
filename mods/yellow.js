// ==UserScript==
// @name         yellow
// @namespace    https://github.com/aclist
// @version      0.3
// @description  test configs
// @author       aclist
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

const ns = 'yellow'

//function readSettings(){
//    let settings = localStorage.getItem(ns);
//    if (!settings) {
//        settings = {};
//    } else {
//        settings = JSON.parse(settings);
//    }
//    return settings;
//}

function setColor(color){
  let bg = document.querySelector('.head-nav')
  bg.style.cssText = 'background-color:' + color
}

function yellowInit(toggle){
    if (toggle === false) {
	    setColor('initial')
    } else {
	    const settings = getModSettings(ns);
	    const userColor = settings.color;
	    setColor(userColor);
    }
}
