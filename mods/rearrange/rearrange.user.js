function rearrangeInit (toggle) { // eslint-disable-line no-unused-vars
    function rearrangeSetup () {
        if (window.location.href.split('#')[1] != 'comments') return
        const settings = getModSettings('rearrange');
        const content = document.querySelector('#content');
        content.style.display = 'grid';
        const op = document.querySelector('.section--top');
        const activity = document.querySelector('#activity');
        const post = document.querySelector('#comment-add');
        const options = document.querySelector('#options');
        const comments = document.querySelector('#comments');

        op.style.order = settings["op"]
        activity.style.order = settings["activity"]
        post.style.order = settings["post"]
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
