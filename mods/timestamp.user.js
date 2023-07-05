// ==UserScript==
// @name         kbin-timestamp
// @namespace    https://github.com/aclist
// @version      0.1
// @description  More verbose post timestamps
// @author       aclist
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

const timeObserver = new MutationObserver(updateTime);
const ns = 'timestamp'
let times = document.querySelectorAll('.timeago')
function updateTime(toggle) {
    const settings = getModSettings(ns);
    if (toggle) {
    times.forEach((time) => {
	let oldTime = time.innerText;
	time.setAttribute('oldtime', oldTime);
	let iso = time.getAttribute('datetime');
	let isoYear = (iso.split('T')[0]);
	let isoTime = (iso.split('T')[1]);
	isoTime = (isoTime.split('+')[0]);
	let cleanISOTime = isoYear + " @ " + isoTime;
	let localTime = new Date(iso);
	let localAsISO = localTime.toLocaleString('sv').replace(' ', ' @ ');
	    if (settings[offset]) {
		    console.log("found localstorage key")
		    switch (offset) {
			    console.log(offset)
			    case "UTC":
			    console.log("UTC")
			    conosle.log(cleanISOTime)
				time.innerText = cleanISOTime;
			    case "Local time": 
			    console.log("Local time")
			    conosle.log(localAsISO)
				time.innerText = localAsISO;
		    }
	    }
     });
    } else {
    times.forEach((time) => {
	let oldTime = time.getAttribute('oldtime');
	if (oldTime){
	time.innerText = oldTime;
	}
    });
        timeObserver.disconnect();
    }
}
