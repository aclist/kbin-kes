async function wipeArray () {
    await safeGM("setValue","hidden-posts","[]")
    teardown();
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
async function teardown() {
    console.log(hideThisPage.length)
    for (i = 0; i < hideThisPage.length; ++i) {
        console.log(hideThisPage[i])
        const toHide = document.querySelector('#entry-' + hideThisPage[i]);
        console.log(toHide)
        $(toHide).show();
        return
    }
}
function setup (array) {
    const rawIdArr = array;
    const idArr = JSON.parse(rawIdArr);
    const posts = document.querySelectorAll('#content .entry')
    posts.forEach((item) => {
        const entryID = item.id.split('-')[1]
        if (idArr.includes(entryID)) {
            $(item).hide();
        } else {
            const toHide = item.querySelector('.kes-hide-posts');
            if (toHide) {
                console.log("hide button already on page")
                return
            }
            const hideButtonHolder = document.createElement('li');
            const hideButton = document.createElement('a');
            hideButtonHolder.appendChild(hideButton)
            hideButton.className = "stretched-link kes-hide-posts"
            hideButton.innerText = "hide post";
            hideButton.setAttribute("hide-post-id",entryID);
            const footer = item.querySelector('footer menu');
            footer.appendChild(hideButtonHolder);
            hideButton.addEventListener('click',(event) => {
                const toHideID = event.target.getAttribute("hide-post-id");
                const toHide = document.querySelector('#entry-' + toHideID);
                $(toHide).remove();
                hideThisPage.push(toHideID)
                addToArr(idArr,toHideID);
            });
        }

    });

}
function hidePostsInit (toggle) {
    const hideThisPage = []
    if (toggle) {
        setArray();
    } else {
        teardown();
    }
}
