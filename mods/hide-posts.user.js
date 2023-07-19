async function wipeArray () {
    await safe_GM("setValue","hidden-posts","[]")
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
function setup (array) {
    const rawIdArr = array;
    const idArr = JSON.parse(rawIdArr);
    console.log(idArr);
    const posts = document.querySelectorAll('#content .entry')
    posts.forEach((item) => {
        const entryID = item.id.split('-')[1]
        if (idArr.includes(entryID)) {
            item.remove();
        } else {
            const hideButtonHolder = document.createElement('li');
            const hideButton = document.createElement('a');
            hideButtonHolder.appendChild(hideButton)
            hideButton.className = "stretched-link"
            hideButton.innerText = "hide post";
            hideButton.setAttribute("hide-post-id",entryID);
            const footer = item.querySelector('footer menu');
            footer.appendChild(hideButtonHolder);
            hideButton.addEventListener('click',(event) => {
                const toHideID = event.target.getAttribute("hide-post-id");
                const toHide = document.querySelector('#entry-' + toHideID);
                toHide.remove();
                addToArr(idArr,toHideID);
            });
        }

    });

}
function hidePostsInit (toggle) {
    if (toggle) {
        setArray();
    } else {
        wipeArray();
    }
}
