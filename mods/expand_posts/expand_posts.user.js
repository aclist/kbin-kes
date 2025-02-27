function expandPostsInit (toggle) { // eslint-disable-line no-unused-vars

    function makePost (post, original) {
        const newBody = document.createElement('div');
        newBody.id = "mes-expanded-post"
        newBody.appendChild(post);
        original.insertAdjacentElement("afterend", newBody);
        original.style.cssText = "display:none"
    }

    async function update (response) {
        const xml = response.response
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/html");
        const articleId = doc.querySelector('article').id
        const newPost = doc.querySelector('.content')
        const arr = Array.from(document.querySelectorAll('.entry'))
        const res = arr.find((el) => el.id === articleId);

        const oldPost = res.querySelector('.short-desc p');
        const oldButton = document.querySelector(".mes-loading-post-button");

        updateExpandMode(oldButton)
        makePost(newPost, oldPost);
    }

    function makeButton (parent) {
        const button = document.createElement('a')
 
        //initialize button expand mode
        button.innerText = settings.expand
        button.dataset.expandMode = "expand"
        button.className = "mes-expand-post-button"
        button.classList.add("btn", "btn-link", "btn__primary")

        button.addEventListener('click', () => {
            if (button.dataset.expandMode === "expand") {
                updateExpandMode(button)
                const link = parent.querySelector('header h2 a');
                genericXMLRequest(link, update);
            } else {
                updateExpandMode(button)
                collapsePost(button, parent);
            }
        });
        return button
    }

    function collapsePost (button, post) {
        const body = post.querySelector('.short-desc');
        const oldPost = body.querySelector("p");
        oldPost.style.cssText = ""
        body.querySelector("#mes-expanded-post").remove();
        oldPost.insertAdjacentElement("afterend", button);
    }

    function updateExpandMode (button) {
        const settings = getModSettings("expand-posts")
        const mode = button.dataset.expandMode
        let newMode
        switch (mode) {
            case "expand":
                newMode = "loading"
                break;
            case "loading":
                newMode = "collapse"
                break;
            case "collapse":
                newMode = "expand"
                break;
        }
        button.dataset.expandMode = newMode
        button.innerText = settings[newMode]
        button.classList.replace(`mes-${mode}-post-button`, `mes-${newMode}-post-button`)
    }

    function propagateButtons () {
        const entries = document.querySelectorAll('.entry')
        entries.forEach((entry) => {
            if (entry.dataset.expand !== undefined) return
            entry.dataset.expand = "true"
            const blurb = entry.querySelector('.short-desc p')
            if (!blurb) return
            if (blurb.innerText.slice(-3) === "...") {
                const button = makeButton(entry)
                blurb.insertAdjacentElement("afterend", button)
            }
        });
        updateButtonLabels();
    }

    function updateButtonLabels () {
        let allEls
        for (let i in els) {
            allEls = document.querySelectorAll("." + els[i]);
            allEls.forEach((el)=>{
                const label = els[i].split("-")[1]
                const hr = settings[label]
                el.innerText = hr
            })
        }
    }

    const settings = getModSettings("expand-posts")
    const els = [
        "mes-expand-post-button",
        "mes-loading-post-button",
        "mes-collapse-post-button"
    ]
    const buttonCSS = `
    .mes-expand-post-button, .mes-loading-post-button, .mes-collapse-post-button {
        font-size: 0.8rem;
        padding: 0px 5px 0px 5px;
        cursor: pointer;
    }
    .mes-expand-post-button.btn.btn-link.btn__primary {
        color: var(--kbin-button-primary-text-color) !important;
    }
    .mes-collapse-post-button.btn.btn-link.btn__primary {
        color: var(--kbin-button-primary-text-color) !important;
    }
    .mes-loading-post-button.btn.btn-link.btn__primary {
        color: var(--kbin-button-primary-text-color) !important;
    }
    `;


    if (toggle) {
        safeGM("removeStyle", "expand-css");
        safeGM("addStyle", buttonCSS, "expand-css");
        propagateButtons();
    } else {
        let allEls
        for (let i in els) {
            allEls = document.querySelectorAll("." + els[i]);
            allEls.forEach((el)=>{
                el.remove();
            })
        }
        document.querySelectorAll('.entry').forEach((entry) => {
            delete entry.dataset.expand
        });
        safeGM("removeStyle", "expand-css");
    }
}
