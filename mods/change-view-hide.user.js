// ==UserScript==
// @name         kbin change view hider
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      0.1
// @description  Hide the change view button
// @author       Twelph
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

function hideChangeViewButton(toggle) {
  const btn = document.querySelector('button[aria-label="Change view"]');

  if (btn) {
    btn.style.display = toggle ? 'none' : 'block';
  }
}
