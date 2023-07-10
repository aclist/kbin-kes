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

function addDropdown(){
    function addOption(item){
        var text = item.innerText;
        var val = text.substring(0, text.indexOf(' '));
        var option = document.createElement("option");
        var selectList = document.querySelector(".options__title select");
         option.setAttribute("value", val);
         option.text = text;
         selectList.appendChild(option);
    }

    function buildDropdown(selector) {
        var active = document.querySelector('.options__main li a.active')
        addOption(active);
        const items = document.querySelectorAll(selector);
          items.forEach((item) => {
              addOption(item);
          });
    }
    //inject select menu
    var leftDiv = document.querySelector(".options__title");
    var selector = '.options__main li a:not(.active)'
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "dropdown-select");
    selectList.style.cssText += 'margin-left: 10px;height:fit-content;font-size:0.8em;padding:5px';
    leftDiv.appendChild(selectList);
    buildDropdown(selector);

    // event listener
	$(document).on('change','#dropdown-select',function(){
        var page = $('#dropdown-select').val();
        var baseUrl = window.location.href;
        var urlArr = baseUrl.split("/");
        var username = urlArr[4];
        const pref = 'https://kbin.social/u/'
        var finalUrl = pref + username + "/" + page;
        window.location = finalUrl;
    })

	// clean up old elements
	//window.addEventListener("load", function () {
	//var horizontalScroll = document.querySelector('.options__main');
	$('.options__main').hide();
	$('.scroll').hide();
	//horizontalScroll.style.cssText += 'display:none';
	//var scrollArrows = document.querySelector('.scroll');
	//scrollArrows.style.cssText += 'display:none';
    //});
}
function removeDropdown(){
            $('#dropdown-select').remove();
            var detached = $('.#dropdown-select').replaceWith('');
            var horizontalScroll = document.querySelector('.options__main');
            horizontalScroll.style.cssText += 'display:grid';
            var scrollArrows = document.querySelector('.scroll');
            scrollArrows.style.cssText += 'display:grid';
		$('.options__main').show();
		$('.scroll').show();
}
function dropdownEntry(toggle){
    let testLoc = window.location.href;
    let locArr = testLoc.split("/");
    let testPage = locArr[3];
    if(testPage === "u") {
	    if (toggle === false) {
		removeDropdown();
	    } else {
		addDropdown();
	    }
    }
}
