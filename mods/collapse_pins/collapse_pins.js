function pinsInit (toggle) { // eslint-disable-line no-unused-vars

    function setCSS () {
        let color
        const settings = getModSettings("collapse_pins")
        const outline = settings["outline"]
        if (outline == "Add colored outline") {
            color = getHex(settings["bordercolor"])
        } else {
            color = "transparent"
        }
        const css = `
    .kes-pin {
        display: none;
    }
    #kes-pin-button {
        cursor: pointer;
    }
    .entry:has(footer i.fa-thumbtack) {
        border: 2px solid ${color}
    }
    `;
        return css
    }

    if (isThread()) return // eslint-disable-line no-undef
    if (isProfile()) return // eslint-disable-line no-undef

    function applyPins () {

        const css = setCSS();
        safeGM("removeStyle", 'kes-pin-css');
        safeGM("addStyle", css, 'kes-pin-css');

        if (document.querySelector('#kes-pin-button')) return
        const pins = document.querySelectorAll('.entry:has(footer i.fa-thumbtack)')
        if (pins.length === 0) return
        pins.forEach((pin) => {
            pin.classList.add('kes-pin')
        })

        let suffix
        if (pins.length === 1) suffix = "post"
        if (pins.length > 1) suffix = "posts"
        

        const b = document.createElement('div')
        const p = document.createElement('p')
        const toggleOnText = `Hiding ${pins.length} pinned ${suffix}. Click to expand.`
        const toggleOffText = `Showing ${pins.length} pinned ${suffix}. Click to collapse.`

        b.id = 'kes-pin-button'
        p.innerText = toggleOnText

        b.addEventListener('click', () => {
            if (p.innerText === toggleOnText) {
                p.innerText = toggleOffText
            } else {
                p.innerText = toggleOnText
            }
            pins.forEach((pin) => {
                pin.classList.toggle('kes-pin')
            })
        })

        b.appendChild(p)
        document.querySelector('#content').prepend(b)

    }

    function unapplyPins () {
        document.querySelector('#kes-pin-button').remove();
        safeGM("removeStyle", "kes-pin-css");
    }

    if (toggle) applyPins();
    if (!toggle) unapplyPins();

}
