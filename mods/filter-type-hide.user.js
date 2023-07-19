// ==UserScript==
// @name         kbin filter type hider
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      0.1
// @description  Hide filter by type button
// @author       Twelph
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hideFilterButton(toggle) {
  let btn = document.querySelector('button[aria-label="Filter by type"]');

  if (btn) {
    btn.style.display = toggle ? 'none' : 'block';
  }
}
