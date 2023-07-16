// ==UserScript==
// @name           megamod-kbin-dropdown
// @namespace      https://github.com/aclist/kbin-scripts/
// @description    make dropdown on profile page
// @author         aclist
// @version        0.0.3
// @match          https://kbin.social/u/*
// @require        http://code.jquery.com/jquery-3.4.1.min.js
// @license        MIT
// @downloadURL    https://github.com/aclist/kbin-scripts/raw/main/dropdown.user.js
// @updateURL      https://github.com/aclist/kbin-scripts/raw/main/dropdown.user.js
// ==/UserScript==

// globals $
function addDropdown (user, testMsg) {
    function addOption (item) {
        const text = item.innerText;
        const val = text.substring(0, text.indexOf(' '));
        const option = document.createElement("option");
        const selectList = document.querySelector("#options select");
        option.setAttribute("value", val);
        option.text = text;
        selectList.appendChild(option);
    }

    function buildDropdown (selector) {
        const active = document.querySelector('.options__main li a.active')
        if (testMsg !== "message") {
            addOption(active);
        }
        const items = document.querySelectorAll(selector);
        items.forEach((item) => {
            addOption(item);
        });
    }
    //inject select menu
    const leftDiv = document.querySelector("#options");
    const selector = '.options__main li a:not(.active)'
    const selectList = document.createElement("select");
    selectList.setAttribute("id", "dropdown-select");
    selectList.style.cssText += 'margin-left: 10px;height:fit-content;font-size:0.8em;padding:5px;margin-bottom:10px;width:30%';
    leftDiv.appendChild(selectList);
    buildDropdown(selector);

    // event listener
    $(document).on('change', '#dropdown-select', function () {
        const page = $('#dropdown-select').val();
        const pref = 'https://kbin.social/u/';
        const finalUrl = pref + user + "/" + page;
        window.location = finalUrl;
    })

    // clean up old elements
    $('.options__main').hide();
    $('.scroll').hide();
}

function removeDropdown () {
    $('#dropdown-select').remove();
    const detached = $('#dropdown-select').replaceWith('');
    const horizontalScroll = document.querySelector('.options__main');
    horizontalScroll.style.cssText += 'display:grid';
    const scrollArrows = document.querySelector('.scroll');
    scrollArrows.style.cssText += 'display:grid';
    $('.options__main').show();
    $('.scroll').show();
}

function dropdownEntry (toggle) {
    let testLoc = window.location.href;
    let locArr = testLoc.split("/");
    let testPage = locArr[3];
    let user = locArr[4];
    let testMsg = locArr[5];
    if (testPage === "u") {
        if (toggle === false) {
            removeDropdown();
        } else {
            addDropdown(user, testMsg);
        }
    }
}
