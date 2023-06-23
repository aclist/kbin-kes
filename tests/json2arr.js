// ==UserScript==
// @name         json test
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        kbin.social/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com

// ==/UserScript==

var site = "https://raw.githubusercontent.com/aclist/kbin-megamod/main/manifest.json"
function fetch() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: site,
        onload: makeArr,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },

    });
};

function makeArr(response) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(response.responseText, "text/html");
        var content = response.responseText

    var j = JSON.parse(content)
    for (let i = 0; i < j.length; ++i) {
        console.log(j[i].name)
    }
fetch();
