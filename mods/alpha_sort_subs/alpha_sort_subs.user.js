function alphaSortInit (toggle) { // eslint-disable-line no-unused-vars
    if (getPageType() !== "Mbin.User.Subscriptions") return // eslint-disable-line no-undef

    function compare (a, b) {
        function _getMagName (magEl) {
            return magEl.querySelector('.stretched-link').innerText.toUpperCase();
        }

        return _getMagName(a) > _getMagName(b) ? 1: -1
    }

    if (toggle) {
        const columns = document.querySelector('.magazines-columns')
        const ul = columns.querySelector('ul');
        const mags = ul.querySelectorAll('li');
        const arr = [];

        mags.forEach((mag) => {
            arr.push(mag);
        })

        const ulCloned = document.createElement('ul');
        ulCloned.id = "mes-alpha-sort";
        arr.sort(compare);
        arr.forEach((mag)=>{
            //perform deep copy of children
            const clone = mag.cloneNode(true);
            ulCloned.appendChild(clone);
        })
        ul.style.display = "none";
        ul.after(ulCloned);
    } else {
        const ul = document.querySelector('.magazines-columns ul');
        ul.style.display = "";
        const ulCloned = document.querySelector('#mes-alpha-sort');
        ulCloned.remove();
    }
}
