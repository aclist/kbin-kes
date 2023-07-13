// ==UserScript==
// @name         Resize Comment Text
// @namespace    https://github.com/aclist
// @version      0.1
// @description  Change the size of comment text.
// @author       minnieo
// @match        https://kbin.social/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @match        https://www.kbin.cafe/*
// @match        https://karab.in/*
// @icon         https://kbin.social/favicon.svg
// @grant        none
// ==/UserScript==

function resizeText() {
  const comment = document.querySelectorAll('blockquote.comment div');
  const posts = document.querySelectorAll('div.content.formatted');
  let settings = getModSettings("resize");
  const sizes = {
      "Small": ".8rem",
      "Normal": ".9rem",
      "Large": "1rem",
      "Extra Large": "1.1rem",
      "Extra Extra Large": "1.3rem"
    };
  const selectedSize = settings["size"];
  const sizeValue = sizes[selectedSize];
  
  // call functions to modify text sizes depending on application choice
    if (settings["option"] == "Only comments") {
        resizeComments();
    } else if (settings["option"] == "Only posts") {
        resizePosts();
    } else if (settings["option"] == "Comments and posts") {
        resizeComments();
        resizePosts();
    }

  // functions that modify text sizes based on choice
  function resizeComments() {   
      function iterateComments(param, size) {
        param.forEach(comment => {
          comment.style.fontSize = size;
        });
      }
    
      iterateComments(comment, sizeValue);
  }

  function resizePosts() {
    posts.forEach(post => {
      post.style.fontSize = sizeValue;
    })
  }
}


function textResize(toggle) {
    if (toggle) {
        resizeText();
    } else {
    }
}
