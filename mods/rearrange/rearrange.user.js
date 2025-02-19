function rearrangeInit (toggle) { // eslint-disable-line no-unused-vars
    function rearrangeSetup () {
        const pt = getPageType();
        if (pt !== Mbin.Thread.Comments) return
        const settings = getModSettings('rearrange');
        const content = document.querySelector('#content');
        content.style.display = 'grid';
        const op = document.querySelector('.section--top');
        const activity = document.querySelector('#activity');
        const options = document.querySelector('#options');
        const comments = document.querySelector('#comments');
        const cross = document.querySelector('.entries-cross');

        op.style.order = settings["op"]
        activity.style.order = settings["activity"]
        if (isLoggedIn()) {
            const post = document.querySelector('#comment-add');
            post.style.order = settings["post"]
        }
        if (cross) {
            cross.style.order = settings["crossposts"]
        }
        options.style.order = settings["options"]
        comments.style.order = settings["comments"]
    }
    if (toggle) {
        rearrangeSetup();
    } else {
        const content = document.querySelector('#content');
        content.style.display = 'unset';
    }
}
