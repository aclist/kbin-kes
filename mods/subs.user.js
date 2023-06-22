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

function createMags(){
    var nav = document.querySelector('.head-nav__menu');
    var mags = document.querySelector('[href="/magazines"]');
    var user = document.querySelector('.login');
    var split = user.href.split("/");
    var username = split[4];
    var subLink = 'https://kbin.social/u/' + username + '/subscriptions';
    console.log(username);
        if ( username == null) {
            return;
        } else {
    const myListItem = document.createElement('li');
    const mySubsLink = document.createElement('a');
    mySubsLink.setAttribute('href', subLink);
    mySubsLink.innerText = 'My mags';
    mySubsLink.className = 'subs-nav';
    myListItem.append(mySubsLink);

        nav.appendChild(myListItem);
    }
}

function initMags(toggle){
    console.log(toggle);
    if (toggle === false) {
        $('.subs-nav').remove();
    } else {
        createMags();
    }
}
