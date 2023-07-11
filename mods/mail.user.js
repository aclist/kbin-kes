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

function addLink() {
   const itemsSelector = '.user-inline';
   const items = document.querySelectorAll(itemsSelector);
   items.forEach((item) => {
   const username = getUsername(item);
   if (!username) return;
   const sib = item.nextSibling
   let link
	   try {
		  if ((sib) && (sib.nodeName === "#text")) {
		  link = document.createElement('a');
		  const ownInstance = window.location.hostname;
		  link.setAttribute('href', `https://${ownInstance}/u/${username}/message`);
		  insertElementAfter(item, link);
		   } else {
			   link = sib;
		   }
	   } catch (error){
		   console.log(error)
	   }
           settings = getModSettings("mail");
	  if (settings["type"] == "Text") {
	     link.className = 'kes-mail-link';
	     link.innerText = settings["text"];
	     link.style.cssText += 'margin-left: 5px;text-decoration:underline';
	  } else {
		  link.innerText = "";
		  link.className = 'kes-mail-link fa fa-envelope'
		  link.style.cssText += 'margin-left: 5px;text-decoration:none';
	  }
	  let prefix = document.querySelector('.entry > .entry__meta .user-inline')
	  prefix.style.cssText = 'content:' + settings["prefix"]  + '; color:var(--text);'
   });
}
function addMail(toggle){
    if (toggle) {
	addLink();
    } else {
        $('.kes-mail-link').remove();
    }
}

