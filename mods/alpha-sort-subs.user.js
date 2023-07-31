function alphaSortInit (toggle) {
    const ind = window.location.href.split('/')[5]
    if ((!ind) || (ind.indexOf('subscriptions') < 0)) return
    const ul = document.querySelector('.section.magazines.magazines-columns ul')

    if (toggle) {
        const mags = document.querySelectorAll('.section.magazines.magazines-columns ul li a');
        const magsArr = []
        const namesArr = []

        mags.forEach((item) => {
            const toLower = item.href.toLowerCase();
            magsArr.push(toLower);
            const hrName = item.innerText.toLowerCase();
            namesArr.push(hrName);
        });

        namesArr.sort();
        magsArr.sort();

        const outer = document.querySelector('.section.magazines.magazines-columns')
        $(ul).hide();

        for (let i =0; i<magsArr.length; ++i) {
            const myListItem = document.createElement('li');
            myListItem.className = "alpha-sorted-subs"
            const mySubsLink = document.createElement('a');
            mySubsLink.setAttribute('href', magsArr[i]);
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
