function setup () {
    settings = getModSettings('rearrange');
    const content = document.querySelector('#content');
    content.style.display = 'grid';
    const op = document.querySelectr('.section--top');
    const activity = document.querySelectr('#activity');
    const post = document.querySelectr('#comment-add');
    const options = document.querySelectr('#options');
    const comments = document.querySelectr('#comments');

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
