function alphaSortInit(toggle){
    if (window.location.href.split('/')[5] !== "subscriptions") return
    const ul = document.querySelector('.section.magazines.magazines-columns ul')

    if (toggle) {
        var mags = document.querySelectorAll('.section.magazines.magazines-columns ul li a');
        var magsArr = []
        var namesArr = []

        mags.forEach((item) => {
            var toLower = item.href.toLowerCase();
            magsArr.push(toLower);
            var hrName = item.innerText.toLowerCase();
            namesArr.push(hrName);
        });

        namesArr.sort();
        magsArr.sort();

        var outer = document.querySelector('.section.magazines.magazines-columns')
        var ul = document.querySelector('.section.magazines.magazines-columns ul')
        $(ul).hide();

        for (let i =0; i<magsArr.length; ++i){
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
