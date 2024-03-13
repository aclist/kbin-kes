function expandPostsInit (toggle) {

    async function update (response) {
        const xml = response.response
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/html");
        const articleId = doc.querySelector('article').id
        const postBody = doc.querySelector('.content').innerText
        const arr = Array.from(document.querySelectorAll('.entry'))
        const res = arr.find((el) => el.id === articleId);
        const oldBody = res.querySelector('.short-desc p');
        const settings = getModSettings("expand-posts")
        const collapseLabel = settings.collapse
        const newButton = makeButton(collapseLabel, res)
        newButton.className = 'kes-collapse-post-button'
        const oldBr = document.querySelector('#kes-expand-divider')

        oldBody.innerText = postBody
        oldBody.appendChild(newButton)
        if (oldBody.childNodes[0].nodeName === "BR") {
            oldBody.children[0].remove()
        }
        const prev = newButton.previousElementSibling
        const prevOfPrev = newButton.previousElementSibling.previousElementSibling
        if (prev.nodeName === "BR" && prevOfPrev.nodeName=== "BR") {
            prevOfPrev.remove()
        }
    }
    function makeButton (text, parent) {
        const button = document.createElement('a')
        const br = document.createElement('br')
        button.innerText = text
        button.className = 'kes-expand-post-button'
        button.style.cursor = 'pointer'
        button.addEventListener('click', (e) => {
        const mode = e.target.innerText
            const settings = getModSettings("expand-posts")
            const loadingLabel = settings.loading
            const expandLabel = settings.expand
            const collapseLabel = settings.collapse
            if (mode === expandLabel) {
                button.innerText = loadingLabel
                button.className = 'kes-loading-post-button'
                const link = parent.querySelector('header h2 a')
                genericXMLRequest(link, update)
            } else {
                const body = parent.querySelector('.short-desc p')
                const ar = body.innerText.split('\n')
                for (let i = 0; i < ar.length; ++i) {
                    if (ar[i]) {
                        body.innerText = ar[i] + '...'
                        button.innerText = expandLabel
                        button.className = 'kes-expand-post-button'
                        body.appendChild(br)
                        body.appendChild(button)
                        break
                    }
                }
            }
        });
        return button
    }
    function propagateButtons () {
        const entries = document.querySelectorAll('.entry')
        entries.forEach((entry) => {
            const b = entry.querySelector('.short-desc p')
            const br = document.createElement('br')
            if (b) {
                const end = b.innerText.slice(-3)
                if (end == "...") {
                    br.id = "kes-expand-divider"
                    const button = makeButton(expandLabel, entry)
                    b.appendChild(br)
                    b.appendChild(button)
                }
            }
        });
        updateButtonLabels();
    }
    function updateButtonLabels () {
        const expandLabels = document.querySelectorAll('.kes-expand-post-button')
        const loadingLabels = document.querySelectorAll('.kes-loading-post-button')
        const collapseLabels = document.querySelectorAll('.kes-collapse-post-button')
        expandLabels.forEach((label) =>{
            label.innerText = expandLabel
        });
        collapseLabels.forEach((label) =>{
            label.innerText = collapseLabel
        });
        loadingLabels.forEach((label) =>{
            label.innerText = loadingLabel
        });
    }

    const settings = getModSettings("expand-posts")
    const loadingLabel = settings.loading
    const expandLabel = settings.expand
    const collapseLabel = settings.collapse
    if (toggle) {
        propagateButtons();
    } else {
        const oldButtons = document.querySelectorAll('.kes-expand-post-button')
        const oldButtons2 = document.querySelectorAll('.kes-collapse-post-button')
        oldButtons.forEach((button)=>{
            button.remove();
        });
        oldButtons2.forEach((button)=>{
            button.remove();
        });
    }
}
