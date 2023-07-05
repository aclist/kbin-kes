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
function updateTime(toggle) {
    const settings = getModSettings(ns);
    let times = document.querySelectorAll('.timeago')
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
		    switch (offset) {
			    case "UTC":
				time.innerText = cleanISOTime;
				case "Local time": 
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
