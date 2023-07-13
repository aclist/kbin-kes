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

function resizeComments() {   
      const sizes = {
        "Small": ".8rem",
        "Normal": ".9rem",
        "Large": "1rem",
        "Extra Large": "1.1rem",
        "Extra Extra Large": "1.3rem"
      };

      const selectedSize = settings["size"];
      const sizeValue = sizes[selectedSize];
    
      function iterateComments(param, size) {
        param.forEach(comment => {
          comment.style.fontSize = size;
        });
      }

      iterateComments(comment, sizeValue);
}

// function iterateComments(param, size) {
//         param.forEach(comment => {
//           comment.style.fontSize = `${size}`;
//         });
//       }

function resizeText() {
    const comment = document.querySelectorAll('blockquote.comment div');
    const posts = document.querySelectorAll('div.content.formatted');
    let settings = getModSettings("resize");

    if (settings["option"] == "Only comments") {
        //   if (settings["size"] == "Small") {
        //     iterateComments(comment, ".8rem");
        // } else if (settings["size"] == "Normal") {
        //     iterateComments(comment, ".9rem");
        // } else if (settings["size"] == "Large") {
        //     iterateComments(comment, "1rem");
        // } else if (settings["size"] == "Extra Large") {
        //     iterateComments(comment, "1.1rem");
        // } else if (settings["size"] == "Extra Extra Large") {
        //     iterateComments(comment, "1.3rem");
        // }
        resizeComments();
    } else if (settings["option"] == "Only posts") {
        if (settings["size"] == "Small") {
            resizePosts(posts, ".8rem");
        } else if (settings["size"] == "Normal") {
            resizePosts(posts, ".9rem");
        } else if (settings["size"] == "Large") {
            resizePosts(posts, "1rem");
        } else if (settings["size"] == "Extra Large") {
            resizePosts(posts, "1.1rem");
        } else if (settings["size"] == "Extra Extra Large") {
            resizePosts(posts, "1.3rem");
        }
    }
    

}


function textResize(toggle) {
    if (toggle) {
        resizeText();
    } else {
    }
}
