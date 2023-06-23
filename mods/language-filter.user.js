// ==UserScript==
// @name         kbin language filter
// @namespace    https://github.com/aclist
// @version      1.0
// @description  Filters posts by language
// @author       artillect
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

const whitelist = ['en', 'OC'];

function languageFilterEntry(toggle) {

    if (toggle) {
        hideFilteredPosts();
        let observer = new MutationObserver(hideFilteredPosts);
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        showFilteredPosts();
    }
}

function hideFilteredPosts() {
    // Get all posts
    var posts = document.getElementsByClassName("entry section");

    // Loop through posts
    for (var i = 0; i < posts.length; i++) {
        // Get badge
        var badge = posts[i].getElementsByClassName("badge")[0];
        // Check if badge exists
        if (badge) {
            // If badge is not in whitelist
            if (!whitelist.includes(badge.innerText)) {
                posts[i].style.display = "none";
                posts[i].classList.add("language-filtered");
            }
        } else {
            if(!whitelist.includes('en')) {
                posts[i].style.display = "none";
                posts[i].classList.add("language-filtered");
            }
        }
    }
}

function showFilteredPosts() {
    // get all posts
    var posts = document.getElementsByClassName("entry section");
    // loop through posts
    for (var i = 0; i < posts.length; i++) {
        // Check if post is filtered
        if (posts[i].classList.contains("language-filtered")) {
            // Show post
            posts[i].style.display = "grid";
        }
    }
}