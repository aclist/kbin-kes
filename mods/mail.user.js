// ==UserScript==
// @name          megamod-kbin-mail
// @description   Adds mail link next to usernames
// @namespace     https://github.com/aclist/
// @author        aclist
// @version       0.0.1
// @match         https://kbin.social/*
// @require       http://code.jquery.com/jquery-3.4.1.min.js
// @license       MIT
// ==/UserScript==

const itemsSelector = '.user-inline';

function insertElementAfter(target, element) {
  if (target.nextSibling) {
    target.parentNode.insertBefore(element, target.nextSibling);
  } else {
    target.parentNode.appendChild(element);
  }
}

function getUsername(item) {
  try {
     if ( item.href.split('/u/')[1].charAt(0) == '@') {
         return null
     }
    return item.href.split('/u/')[1];
  } catch (error) {
    return null;
  }
}

function addItemLink(item) {
  const username = getUsername(item);
  if (!username) return;
  const link = document.createElement('a');
  link.setAttribute('href', `https://kbin.social/u/${username}/message`);
  link.innerText = 'Mail';
  link.className = 'item-link';
  link.style.cssText += 'margin-left: 5px;text-decoration:underline !important';
  insertElementAfter(item, link);
}

function checkItem(item) {
  if (item && item.nextElementSibling && item.nextElementSibling.classList) {
    return !!item
      .nextElementSibling
      .classList.contains('item-link');
  }
  return false;
}

function checkItems(selector) {
  const items = document.querySelectorAll(selector);
  items.forEach((item) => {
    if (!checkItem(item)) addItemLink(item);
  });
}

megamod.addMail = function(toggle){
    console.log(toggle);
    if (toggle == false) {
	    $('.item-link').remove();
    } else {
        checkItems(itemsSelector);
    }
}

