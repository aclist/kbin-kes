function setup () {
    if (window.location.href.split('#')[1] != 'comments') return
    settings = getModSettings('rearrange');
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
function rearrangeInit (toggle) {
    if (toggle) {
        setup();
    } else {
        const content = document.querySelector('#content');
        content.style.display = 'unset';
    }
}
