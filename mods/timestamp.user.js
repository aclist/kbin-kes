// ==UserScript==
// @name         kbin-timestamp
// @namespace    https://github.com/aclist
// @version      0.1
// @description  More verbose post timestamps
// @author       aclist
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==
const ns = 'timestamp'

function updateTime(toggle) {
    let times = document.querySelectorAll('.timeago')
    const settings = getModSettings(ns);
    if (toggle) {
        times.forEach((time) => {
            let oldTime = time.getAttribute("oldtime");
            if (!oldTime) {
                oldTime = time.innerText;
                time.setAttribute('oldtime', oldTime);
            }
            let iso = time.getAttribute('datetime');
            let isoYear = (iso.split('T')[0]);
            let isoTime = (iso.split('T')[1]);
            isoTime = (isoTime.split('+')[0]);
            let cleanISOTime = isoYear + " @ " + isoTime;
            let localTime = new Date(iso);
            let localAsISO = localTime.toLocaleString('sv').replace(' ', ' @ ');
            let offset = "offset";
            switch (settings[offset]) {
                case "UTC":
                    console.log("UTC")
                    console.log(cleanISOTime)
                    time.innerText = cleanISOTime;
                    break;
                case "Local time":
                    console.log("Local time")
                    console.log(localAsISO)
                    time.innerText = localAsISO;
                    break;
                default:
                    return
                    break;
            }

        });
    } else {
        times.forEach((time) => {
            let oldTime = time.getAttribute('oldtime');
            if (oldTime) {
                time.innerText = oldTime;
            }
        });
    }
}
