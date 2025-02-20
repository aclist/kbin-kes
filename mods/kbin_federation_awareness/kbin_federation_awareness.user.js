function initKFA (toggle) { // eslint-disable-line no-unused-vars
    //License: MIT
    //Original Author: CodingAndCoffee (https://kbin.social/u/CodingAndCoffee)

    const kfaHasStrictModerationRules = [
        'beehaw.org',
        'lemmy.ml'
    ];

    function kfaIsStrictlyModerated (hostname) {
        return kfaHasStrictModerationRules.indexOf(hostname) !== -1;
    }

    function setScale (scale, mod) {
        //Scale 1-5; Default 3
        const defaultScale = mod;
        const compScale = defaultScale * (scale * 0.2);
        return compScale
    }

    function kfaGenCSS () {
        const settings = getModSettings('kbinFedAware');
        const home = settings["kfaHomeColor"];
        const fed = settings["kfaFedColor"];
        const mod = settings["kfaModColor"];
        const style = settings["kfaStyle"];
        const indicatorScale = settings["kfaScale"];
        log(indicatorScale, Log.Log)
        const bubbleFuzz = settings["kfaBubbleShadow"];
        if (style === "bubble") {
            const scale = setScale(indicatorScale, 20)
            const bubbleCSS=`
                header div.data-federated,
                header div.data-moderated,
                header div.data-home,
                article .data-federated,
                article .data-moderated,
                article .data-home {
                    display: inline-block;
                    width: ${scale}px;
                    height: ${scale}px;
                    border-radius: 10px;
                    margin-right: 4px;
                    margin-left: 4px
                }
                header div.data-federated,
                article .data-federated {
                    background-color: ${fed};
                }
                header div.data-moderated,
                article .data-moderated {
                    background-color: ${mod};
                }
                header div.data-home,
                article .data-home {
                    background-color: ${home};
                }
            `;
            if (bubbleFuzz === true) {
                const fuzzCSS = `
                    header div.data-federated,
                    article.data-federated {
                        box-shadow: 0 0 3px 2px ${fed};
                    }
                    header div.data-moderated,
                    article.data-moderated {
                        box-shadow: 0 0 3px 2px ${mod};
                    }
                    header div.data-home,
                    article.data-home {
                        box-shadow: 0 0 3px 2px ${home};
                    }
                `;
                return bubbleCSS + fuzzCSS
            } else {
                return bubbleCSS
            }
        }
        if (style === "border") {
            const scale = setScale(indicatorScale, 10)
            const borderCSS = `
            article.data-federated,
            .comment.data-federated {
                box-shadow: ${scale}px 0 0 ${fed};
            article.data-moderated,
            .comment.data-moderated {
                box-shadow: ${scale}px 0 0 ${mod};
            }
            article.data-home,
            .comment.data-home {
                box-shadow: ${scale}px 0 0 ${home};
            }
            `;
            return borderCSS
        }
    }

    function kfaStartup () {
        kfaInitClasses();
        safeGM("removeStyle","kfaInjectedCss");
        safeGM("addStyle",kfaGenCSS(),"kfaInjectedCss");
    }

    function kfaShutdown () {
        safeGM("removeStyle","kfaInjectedCss");
        const els = [
            "data-home",
            "data-federated",
            "data-moderated"
        ]
        for (let i in els) {
            document.querySelectorAll("div." + els[i])
                .forEach((element) => element.remove());
            document.querySelectorAll("." + els[i])
                .forEach((element) => element.classList.remove(els[i]));
        }
    }

    function findHostname (op) {
        if (op.includes('@')) {
            //other instances
            const arr = op.split('@')
            return arr[arr.length - 1]
        } else {
            //home instance
            return window.location.hostname
        }
    }

    function toggleClass (article, classname) {
        const articleIndicator = document.createElement('div');
        const articleAside = article.querySelector('aside');

        article.classList.toggle(classname);
        articleIndicator.classList.toggle(classname);
        articleAside.prepend(articleIndicator);
    }

    function prependToComment (comment) {
        const commentHeader = comment.querySelector('header');
        const userInfo = commentHeader.querySelector('a.user-inline');
        if (userInfo) {
            const userHostname = userInfo.title.split('@').reverse()[0];
            let commentIndicator = document.createElement('div');

            if (kfaIsStrictlyModerated(userHostname)) {
                comment.classList.toggle('data-moderated');
                commentIndicator.classList.toggle('data-moderated');
            } else if (userHostname !== window.location.hostname) {
                comment.classList.toggle('data-federated');
                commentIndicator.classList.toggle('data-federated');
            } else {
                comment.classList.toggle('data-home');
                commentIndicator.classList.toggle('data-home');
            }
            commentHeader.prepend(commentIndicator);
        }
    }

    function kfaInitClasses () {
        const page = getPageType(); // eslint-disable-line no-undef
        if (page === Mbin.Microblog) {
            document.querySelectorAll('.section.post.subject').forEach(function (comment) {
                if (comment.querySelector('[class^=data-]')) { return }
                prependToComment(comment);
            });
            document.querySelectorAll('.comments blockquote.post-comment').forEach(function (comment) {
                if (comment.querySelector('[class^=data-]')) { return }
                prependToComment(comment);
            });
            return
        }
        if (page !== Mbin.Microblog) {
            document.querySelectorAll('#content article.entry:not(.entry-cross)').forEach(function (article) {
                if (article.querySelector('[class^=data-]')) { return }
                let op = article.querySelector('.user-inline').href
                op = String(op)
                const hostname = findHostname(op);
                article.setAttribute('data-hostname', hostname);
                let type

                if (kfaIsStrictlyModerated(hostname)) {
                    type = 'data-moderated'
                } else if (hostname !== window.location.hostname) {
                    type = 'data-federated'
                } else {
                    type = 'data-home'
                }
                toggleClass(article, type)
            });

            document.querySelectorAll('.comments blockquote.entry-comment').forEach(function (comment) {
                if (comment.querySelector('[class^=data-]')) { return }
                let commentHeader = comment.querySelector('header');
                const userInfo = commentHeader.querySelector('a.user-inline');
                if (userInfo) {
                    const userHostname = userInfo.title.split('@').reverse()[0];
                    let commentIndicator = document.createElement('div');

                    if (kfaIsStrictlyModerated(userHostname)) {
                        comment.classList.toggle('data-moderated');
                        commentIndicator.classList.toggle('data-moderated');
                    } else if (userHostname !== window.location.hostname) {
                        comment.classList.toggle('data-federated');
                        commentIndicator.classList.toggle('data-federated');
                    } else {
                        comment.classList.toggle('data-home');
                        commentIndicator.classList.toggle('data-home');
                    }
                    commentHeader.prepend(commentIndicator);
                }
            });
        }
    }

    if (toggle) {
        //kfaShutdown();
        kfaStartup();
    } else {
        kfaShutdown();
    }
}
