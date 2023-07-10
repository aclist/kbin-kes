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
const bird = 'https://raw.githubusercontent.com/aclist/kbin-megamod/testing/images/kbin_logo_kibby.svg'
const render = URL
const defaultLogo = "/kbin_logo.svg"
const settings = getModSettings(ns);

function updateLogo(link){
    const img = document.querySelector('.brand a img');
    img.setAttribute("src", link);
}

function changeLogo(){
    let opt = settings["logotype"]
	switch (opt) {
		case "Hidden":
			updateLogo(defaultLogo)
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
          updateLogo(defaultLogo)

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
