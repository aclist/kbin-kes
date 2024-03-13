function hidePostsInit (toggle) {

    async function wipeArray () {
        await safeGM("setValue","hidden-posts","[]")
    }
    async function setArray () {
        const val = await safeGM("getValue","hidden-posts")
        if(val) {
            setup(val)
        } else {
            await safeGM("setValue","hidden-posts","[]")
            setup('[]')
        }
    }
    async function addToArr (idArr,toHideID) {
        idArr.push(toHideID)
        const updatedArr = JSON.stringify(idArr)
        await safeGM("setValue","hidden-posts",updatedArr)
    }
    function teardown (hp) {
        $('.kes-hide-posts').hide();
        for (let i = 0; i < hp.length; ++i) {
            const toShow = document.querySelector('#entry-' + hp[i]);
            $(toShow).show();
            hideSib(toShow, 'show')
        }
        let hideThisPage = []
        storeCurrentPage(hideThisPage);
        wipeArray();
    }
    async function fetchCurrentPage () {
        const hp = await safeGM("getValue","hide-this-page");
        if (hp) {
            teardown(hp);
        }
    }
    async function storeCurrentPage (hideThisPage) {
        await safeGM("setValue","hide-this-page",hideThisPage)
    }
    function hideSib(el, mode){
        const sib = el.nextSibling;
        if (sib.className === "js-container"){
            if (mode === 'hide') {
                $(sib).hide();
            } else {
                $(sib).show();
            }
        }
    }
    function setup (array) {
        const hideThisPage = []
        const rawIdArr = array;
        const idArr = JSON.parse(rawIdArr);
        const posts = document.querySelectorAll('#content .entry')
        posts.forEach((item) => {
            const entryID = item.id.split('-')[1]
            if (idArr.includes(entryID)) {
                $(item).hide();
                hideSib(item, 'hide');
                hideThisPage.push(entryID)
            } else {
                const toHide = item.querySelector('.kes-hide-posts');
                if (toHide) {
                    $(toHide).show();
                    return
                }
                const hideButtonHolder = document.createElement('li');
                const hideButton = document.createElement('a');
                hideButtonHolder.appendChild(hideButton)
                hideButton.className = "stretched-link kes-hide-posts"
                hideButton.innerText = "hide";
                hideButton.setAttribute("hide-post-id",entryID);
                const footer = item.querySelector('footer menu');
                footer.appendChild(hideButtonHolder);
                hideButton.addEventListener('click',(event) => {
                    const toHideID = event.target.getAttribute("hide-post-id");
                    const toHide = document.querySelector('#entry-' + toHideID);
                    $(toHide).hide();
                    hideSib(toHide, 'hide')
                    hideThisPage.push(toHideID)
                    addToArr(idArr,toHideID);
                    storeCurrentPage(hideThisPage)
                });
            }
        });

    }
    if (toggle) {
        setArray();
    } else {
        fetchCurrentPage();
    }
}
