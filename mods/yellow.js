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

function readSettings(){
    let settings = localStorage.getItem(ns);
    if (!settings) {
        settings = {};
    } else {
        settings = JSON.parse(settings);
    }
    return settings;
}

function setColor(color){
  let bg = document.querySelector('.head-nav')
  bg.style.cssText = 'background-color:' + color
}

function yellowInit(toggle){
    if (toggle === false) {
	    setColor('yellow')
    } else {
	    const settings = readSettings();
	    console.log(settings);
	    const userColor = settings['color'];
	    console.log(userColor);
	    //setColor(userColor);
    }
}
