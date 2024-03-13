function alphaSortInit (toggle) {
    const ind = window.location.href.split('/')[5]
    if (!ind) return
    if ((ind.indexOf('subscriptions') < 0) && (ind.indexOf('followers') < 0)) return
    const ul = document.querySelector('.section.magazines.magazines-columns ul,.section.users.users-columns ul')
    const obj = {}

    if (toggle) {
        const mags = document.querySelectorAll('.section.magazines.magazines-columns ul li a,.section.users.users-columns ul li a');
        const namesArr = []

        mags.forEach((item) => {
            const dest = item.href;
            const hrName = item.innerText;
            obj[hrName] = dest
            namesArr.push(hrName);
        });

        const sorted = namesArr.sort((a, b) => {
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        });

        const outer = document.querySelector('.section.magazines.magazines-columns,.section.users.users-columns')
        $(ul).hide();

        for (let i =0; i<sorted.length; ++i) {
            const myListItem = document.createElement('li');
            myListItem.className = "alpha-sorted-subs"
            const mySubsLink = document.createElement('a');
            mySubsLink.setAttribute('href', obj[sorted[i]]);
            mySubsLink.innerText = namesArr[i];
            mySubsLink.className = 'subs-nav';
            myListItem.append(mySubsLink);
            outer.append(myListItem);
        }

    } else {
        $('.alpha-sorted-subs').remove();
        $(ul).show();
    }
}
