// ==UserScript==
// @name         megamod-kbin-subs
// @namespace    https://github.com/aclist
// @version      0.2
// @description  put subs on top page
// @author       aclist
// @match        https://kbin.social/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @license      MIT
// ==/UserScript==

function createMags () {
    const nav = document.querySelector('.head-nav__menu');
    const mobileNav = document.querySelector('.section.mobile-nav');
    //const mags = document.querySelector('[href="/magazines"]');
    const user = document.querySelector('.login');
    const username = user.href.split('/')[4];
    const subLink = 'https://' + window.location.hostname + '/u/' + username + '/subscriptions';
    let peopleLink = document.querySelector('.head-nav__menu a[href*="people"]')
    const subsNav = document.querySelector('.subs-nav');
    if (username == null) {
        return;
    } else if (subsNav) {
        return;
    } else {
        const subsPage = window.location.href.split('/')[5];
        const myListItem = document.createElement('li');
        const mySubsLink = document.createElement('a');
        mySubsLink.setAttribute('href', subLink);
        mySubsLink.innerText = 'My mags';
        if (subsPage === "subscriptions") {
            mySubsLink.className = 'subs-nav active';
            peopleLink.className = ""
        } else {
            mySubsLink.className = 'subs-nav';
        }
        myListItem.append(mySubsLink);
        nav.appendChild(myListItem);
        mobileNav.appendChild(myListItem.cloneNode(true));
    }
}

function initMags (toggle) {
    if (toggle) {
        createMags();
    } else {
        $('.subs-nav').remove();
    }
}
