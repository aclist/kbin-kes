// ==UserScript==
// @name         kbin filter hider
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      0.1
// @description  Hide filter by time button
// @author       Twelph
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hideFilterButton(toggle) {
  let btn = document.querySelector('button[aria-label="Filter by time"]');

  if (btn) {
    btn.style.display = toggle ? 'none' : 'block';
  }
}
