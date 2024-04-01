function textResize (toggle) { // eslint-disable-line no-unused-vars
    const modalContent = "kes-settings-modal-content"
    const modalContainer = "kes-settings-modal-container"

    function kesModalOpen(){
        const kesModalContent = document.querySelector(modalContent);
        if (kesModalContent) {
            return true
        } else {
            return false
        }
    }

    function setOpacity(value){
        const kesModalContent = document.querySelector(modalContent);
        const kesModalContainer = document.querySelector(modalContainer);
        kesModalContent.style.opacity = value;
        kesModalContainer.style.opacity = value;
    }

    function resizeText () {
        const settings = getModSettings('resize');
        const fontSizes = {
            posts: `${settings["optionPosts"]}px`,
            magSidebar: `${settings["optionMagSidebar"]}px`,
            homeSidebar: `${settings["optionHomeSidebar"]}px`,
            comments: `${settings["optionComments"]}px`,
            userMessages: `${settings["optionMessages"]}px`,
            activity: `${settings["optionActivity"]}px`
        };

        let oldID = sessionStorage.getItem('modalFade');
        clearTimeout(oldID)

        if (kesModalOpen) {
            setOpacity(0.2)
        }
        // === POSTS === //
        const postContent = document.querySelectorAll('article.entry');
        const domainTitle = document.querySelectorAll('.entry__domain, .entry__domain a');
        const textContentH2 = document.querySelectorAll('.entry header h1 a:not(.entry__domain a), .entry header h2 a:not(.entry__domain a)');
        const postSizeNum = settings["optionPosts"];
        postContent.forEach((postContentElem) => {
            const textContentElements = postContentElem.querySelectorAll('h1.a, h3, p, a, time, button:not([data-action="subject#vote"]), small.badge');
            const voteText = postContentElem.querySelectorAll('span[data-subject-target="favCounter"], span[data-subject-target="downvoteCounter"], i.fa-arrow-up, i.fa-arrow-down');
            textContentElements.forEach((textContentElem) => {
                textContentElem.style.setProperty('font-size', fontSizes.posts);
            });

            voteText.forEach((textVote) => {
                textVote.style.setProperty('font-size', fontSizes.posts);
            });
        });

        domainTitle.forEach((titleDomainResize) => {
            titleDomainResize.style.setProperty('font-size', `${postSizeNum * .8}px`);
            titleDomainResize.style.setProperty('opacity', '.7');
        });

        textContentH2.forEach((postTitles) => {
            postTitles.style.setProperty('font-size', `${postSizeNum * 1.2}px`);
        });

        // === COMMENTS  === //
        const commentSection = document.querySelectorAll('section.comments.entry-comments.comments-tree');
        commentSection.forEach((commentElem) => {
            const commentElement = commentElem.querySelectorAll('blockquote header a, header time, div.content p, div.content a, span[data-subject-target$="Counter"], li, a, i.fa-arrow-up, i.fa-arrow-down, h1, h2, h3, h4');

            commentElement.forEach((commentResize) => {
                commentResize.style.setProperty('font-size', fontSizes.comments);
            })
        })

        // === MAG SIDEBAR === //
        const magSidebar = document.querySelectorAll('aside#sidebar section.magazine.section');
        const magSidebarName = document.querySelectorAll('aside#sidebar section.magazine.section h3');
        const magName = document.querySelectorAll('aside#sidebar section.magazine.section a');
        const modSidebar = document.querySelectorAll('section.user-list, section.user-list h3');
        magSidebar.forEach((sidebar) => {
            sidebar.style.setProperty('font-size', fontSizes.magSidebar);
        })

        magName.forEach((mag) => {
            mag.style.setProperty('font-size', fontSizes.magSidebar);
        })

        modSidebar.forEach((mods) => {
            mods.style.setProperty('font-size', fontSizes.magSidebar);
        })

        magSidebarName.forEach((magname) => {
            magname.style.setProperty('font-size', fontSizes.magSidebar);
        })
        // === HOMEPAGE SIDEBAR === //
        const homepageSidebarMain = document.querySelectorAll('aside#sidebar section.related-magazines');
        const homeActiveUsers = document.querySelectorAll('aside#sidebar section.active-users');
        const homepageSidebarPosts = document.querySelectorAll('aside#sidebar section.posts');
        const homeEntries = document.querySelectorAll('aside#sidebar section.entries');
        homepageSidebarMain.forEach((homepageSidebarElem) => {
            const homeRelatedMags = homepageSidebarElem.querySelectorAll('a img, h1, h2, h3, p, li, span, a:not(.icon), i');

            homeRelatedMags.forEach((relatedMagElem) => {
                relatedMagElem.style.setProperty('font-size', fontSizes.homeSidebar);
            });
        })
        homeActiveUsers.forEach((activeUserElem) => {
            const activeUser = activeUserElem.querySelectorAll('h3');
            activeUser.forEach((resizeActiveUser) => {
                resizeActiveUser.style.setProperty('font-size', fontSizes.homeSidebar);
            })
        })
        homepageSidebarPosts.forEach((sidebarPostsElem) => {
            const sidebarPosts = sidebarPostsElem.querySelectorAll('h3, div.container blockquote.content p, div.container time, div.container a');

            sidebarPosts.forEach((sidebarPost) => {
                sidebarPost.style.setProperty('font-size', fontSizes.homeSidebar);
            });
        });
        homeEntries.forEach((homeEntryElem) => {
            const homeEntry = homeEntryElem.querySelectorAll('h3, div.container blockquote.content p, div.container time, div.container a');
            homeEntry.forEach((homeEntryText) => {
                homeEntryText.style.setProperty('font-size', fontSizes.homeSidebar);
            })
        })
        // === ACTIVITY === //
        const activity = document.querySelectorAll('div.section.users.users-columns');
        activity.forEach((activityElem) => {
            const activityElement = activityElem.querySelectorAll('ul, li, small, a, img');

            activityElement.forEach((activityResize) => {
                activityResize.style.setProperty('font-size', fontSizes.activity);
            })
        });

        //TODO: header avatar?
        const css = `
        /* PROFILE PAGES */
        .user-box * {
            font-size: ${settings["optionProfile"]}px
        }
        section.user-info > h3, section.user-info > ul > li a {
            font-size: ${settings["optionProfile"]}px
        }
        section.user-info > h3, section.user-info > ul > li * {
            font-size: ${settings["optionProfile"]}px
        }
        /* POST CREATION PAGES */
        /*TODO: this line is not applying */
        .entry-create > div > #entry_link_title_max_length {
            font-size: ${settings["optionCreate"]}px
        }
        .entry-create > div > div > .ts-control > * {
            font-size: ${settings["optionCreate"]}px
        }
        .options.options--top.options-activity * {
            font-size: ${settings["optionCreate"]}px !important
        }
        .entry-create * {
            font-size: ${settings["optionCreate"]}px
        }
        /* HEADERS */
        #header :not(.icon) {
            font-size: ${settings["optionHeader"]}px
        }
        /* SETTINGS */
        .page-settings * {
            font-size: ${settings["optionUserSettings"]}px
        }
        .page-settings h2 {
            font-size: ${settings["optionUserSettings"] * 2.5}px
        }
        /* FOOTER */
        #footer > .kbin-container > section * {
            font-size: ${settings["optionFooter"]}px
        }
        #footer > .kbin-container > section h5 {
            font-size: ${settings["optionFooter"] * 1.222}px
        }
        /* SORT OPTIONS */
        aside#options menu li a, aside#options menu i {
            font-size: ${settings["optionSortBy"]}px
        }
        /* INBOX NOTIFICATIONS */
        .page-notifications > .kbin-container > main > * {
            font-size: ${settings["optionNotifs"]}px
        }
        .page-notifications > .kbin-container > main > .pills > menu > form > button {
            font-size: ${settings["optionNotifs"] * 0.85}px
        }
        .page-notifications > .kbin-container > main > h1 {
            font-size: ${settings["optionNotifs"] * 2.5}px !important
        }
        `;
        safeGM("removeStyle", "resize-css")
        safeGM("addStyle", css, "resize-css")

        if (kesModalOpen) {
            let timerID = window.setTimeout(setOpacity(1.0),1000);
            sessionStorage.setItem('modalFade', timerID);
        }
    }

    if (toggle) {
        resizeText();
    } else {
        safeGM("removeStyle", "resize-css")
        return
    }
}
