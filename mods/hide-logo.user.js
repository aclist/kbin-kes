// ==UserScript==
// @name         kbin-hidelogo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://kbin.social/*
// @grant        none
// ==/UserScript==

const ns = changelogo
const bird = URL
const render = URL
const default = "/kbin_logo.svg"
const settings = getModSettings(ns);

function updateLogo(link){
    const img = document.querySelector('.brand a img');
    img.setAttribute("src", link);
}

function changeLogo(){
    let opt = settings["logotype"]
	switch (opt) {
		case "Hidden":
			updateLogo(default)
    			$('.brand').hide();
			break;
		case "Kibby":
			updateLogo(bird);
			break;
		case "3D render":
			updateLogo(render);
			break;
	}
}
function restoreLogo(){
const brand = document.querySelector('.brand')
	if(brand){
          updateLogo(default)

	} else {
	$('.brand').show();
	}
}

function toggleLogo(toggle){
	if(toggle){
		changeLogo();
	} else {
		restoreLogo();
	}

}
