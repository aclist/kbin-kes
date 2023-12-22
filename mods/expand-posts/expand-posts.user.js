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
        oldBody.innerText = postBody
        const newButton = makeButton('COLLAPSE', res)
        oldBody.appendChild(newButton)
    }
    function makeButton (text, parent) {
        const button = document.createElement('a')
        button.innerText = text
        button.className = 'kes-expand-post-button'
        button.style.cursor = 'pointer'
        button.addEventListener('click', (e) => {
            const mode = e.target.innerText
            if (mode === 'EXPAND') {
                button.innerText = 'LOADING'
                const link = parent.querySelector('header h2 a')
                genericXMLRequest(link, update)
            } else {
                const body = parent.querySelector('.short-desc p')
                const ar = body.innerText.split('\n')
                for (let i = 0; i < ar.length; ++i) {
                    if (ar[i]) {
                        body.innerText = ar[i] + '...'
                        break
                    }
                    button.innerText = 'EXPAND'
                    const br = document.createElement('br')
                    body.appendChild(br)
                    body.appendChild(button)
                }
            }
        });
        return button
    }
    function propagateButtons () {
        const entries = document.querySelectorAll('.entry')
        entries.forEach((entry) => {
            try {
                const b = entry.querySelector('.short-desc p')
                const br = document.createElement('br')
                const end = b.innerText.slice(-3)
                if (end == "...") {
                    const button = makeButton('EXPAND', entry)
                    b.appendChild(br)
                    b.appendChild(button)
                }
            }
            catch (e) {
                console.warn(e)
            }
        });
    }
    if (toggle) {
        propagateButtons();
    } else {
        const oldButtons = document.querySelectorAll('.kes-expand-post-button')
        oldButtons.forEach((button)=>{
            button.remove();
        });
    }
}
