function textResize (toggle) { // eslint-disable-line no-unused-vars

    function restoreOpacity () {
        kesModalContent = document.querySelector('div.kes-settings-modal-content');
        kesModalContainer = document.querySelector('div.kes-settings-modal-container');

        kesModalContent.style.setProperty('background-color', `rgba(44, 44, 44, 1.0)`);
        kesModalContainer.style.setProperty('background-color', `rgba(44, 44, 44, 1.0)`);

    }
    function resizeText () {
        const settings = getModSettings('resize');
        const fontSizes = {
            header: `${settings["optionHeader"]}px`,
            posts: `${settings["optionPosts"]}px`,
            magSidebar: `${settings["optionMagSidebar"]}px`,
            homeSidebar: `${settings["optionHomeSidebar"]}px`,
            profile: `${settings["optionProfile"]}px`,
            createPosts: `${settings["optionCreate"]}px`,
            comments: `${settings["optionComments"]}px`,
            userMessages: `${settings["optionMessages"]}px`,
            activity: `${settings["optionActivity"]}px`
        };

        let oldID = sessionStorage.getItem('modalFade');
        let kesModalContent
        let kesModalContainer
        clearTimeout(oldID)

        try {
            kesModalContent = document.querySelector('div.kes-settings-modal-content');
            kesModalContainer = document.querySelector('div.kes-settings-modal-container');
        } finally {
            if (kesModalContent) {
                kesModalContent.style.setProperty('background-color', `rgba(44, 44, 44, 0.2)`);
                kesModalContainer.style.setProperty('background-color', `rgba(44, 44, 44, 0.2)`);
            }
        }

        // === HEADER === //
        // selects elem w id header and class header
        const topHeader = document.querySelectorAll('#header.header');
        const avatar = document.querySelector('img.user-avatar');
        // header *loops*
        topHeader.forEach((headerElem) => {
            const topHeaderElems = headerElem.querySelectorAll('a img, h1, h2, h3, p, li, span, a:not(.icon), i');
            topHeaderElems.forEach((resizeHeaderElems) => {
                resizeHeaderElems.style.setProperty('font-size', fontSizes.header);

                if (avatar) {
                    const avatarWidth = avatar.offsetWidth;
                    const avatarHeight = avatar.offsetHeight;
                    const percentage = fontSizes.header * 5; // 80% of pix size
                    const newWidth = avatarWidth * (percentage / 100);
                    const newHeight = avatarHeight * (percentage / 100);

                    avatar.style.width = `${newWidth}px`;
                    avatar.style.height = `${newHeight}px`;
                }
            })
        })

        // === POSTS === //
        // post *variables*
        const postContent = document.querySelectorAll('article.entry');
        const domainTitle = document.querySelectorAll('.entry__domain, .entry__domain a');
        const textContentH2 = document.querySelectorAll('.entry header h1 a:not(.entry__domain a), .entry header h2 a:not(.entry__domain a)');
        const postSizeNum = settings["optionPosts"];


        // post *loops*
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

        // homepage sidebar *variables*
        const homepageSidebarMain = document.querySelectorAll('aside#sidebar section.related-magazines');
        const homeActiveUsers = document.querySelectorAll('aside#sidebar section.active-users');
        const homepageSidebarPosts = document.querySelectorAll('aside#sidebar section.posts');
        const homeEntries = document.querySelectorAll('aside#sidebar section.entries');

        // homepage sidebar loops
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


        // === PROFILE === //

        // profile *variables*
        const profileBox = document.querySelectorAll('div.user-box');
        const profileInfo = document.querySelectorAll('aside#sidebar section.user-info');

        // profile *loops*
        profileBox.forEach((profileElem) => {
            const profileBoxElem = profileElem.querySelectorAll('h1, p, small');

            profileBoxElem.forEach((resizeProfileElem) => {
                resizeProfileElem.style.setProperty('font-size', fontSizes.profile);
            })

        })

        profileInfo.forEach((profileInfoElem) => {
            const profileInfoElement = profileInfoElem.querySelectorAll('h3, ul, li, a, p');

            profileInfoElement.forEach((resizeProfileInfoElems) => {
                resizeProfileInfoElems.style.setProperty('font-size', fontSizes.profile);
            })
        })

        // === CREATE POSTS === //
        // create posts *variables*
        const createPost = document.querySelectorAll('form.entry-create');
        const createMicroBlog = document.querySelectorAll('form.post-add');
        const createHeader = document.querySelectorAll('aside.options.options--top.options-activity');
        const createMag = document.querySelectorAll('form[name="magazine"]');
        // create posts *loops*
        createPost.forEach((createPostElem) => {
            const createPostElement = createPostElem.querySelectorAll('label, markdown-toolbar, ul, li, button, i, textarea[placeholder="Body"], input[placeholder="Select a magazine"], select[id^="entry_"][id$="_lang"], input.image-input');

            createPostElement.forEach((createPostResize) => {
                createPostResize.style.setProperty('font-size', fontSizes.createPosts);
            })
        });

        createMicroBlog.forEach((createMicroElem) => {
            const createMicroBlogElement = createMicroElem.querySelectorAll('markdown-toolbar, ul, li, button, i, label, input, input#post_magazine_autocomplete-ts-control, select[id="post_lang"], input.image-input');

            createMicroBlogElement.forEach((microBlogResize) => {
                microBlogResize.style.setProperty('font-size', fontSizes.createPosts);
            })

        });

        createHeader.forEach((createHeaderElem) => {
            const createHeaderElement = createHeaderElem.querySelectorAll('div.options__title h2, menu li a');

            createHeaderElement.forEach((createHeaderResize) => {
                createHeaderResize.style.setProperty('font-size', fontSizes.createPosts);
            })
        });

        createMag.forEach((createMagElem) => {
            const createMagElement = createMagElem.querySelectorAll('label, markdown-toolbar, ul, li, button, i, input[placeholder="/m/"], textarea[placeholder="Description"], textarea[placeholder="Rules"]');

            createMagElement.forEach((createMagResize) => {
                createMagResize.style.setProperty('font-size', fontSizes.createPosts);
            })
        });
        const css = `
        .page-settings * {
            font-size: ${settings["optionUserSettings"]}px
        }
        .page-settings h2 {
            font-size: ${settings["optionUserSettings"] * 2.5}px
        }
        #footer > .kbin-container > section * {
            font-size: ${settings["optionFooter"]}px
        }
        #footer > .kbin-container > section h5 {
            font-size: ${settings["optionFooter"] * 1.222}px
        }
        aside#options menu li a, aside#options menu i {
            font-size: ${settings["optionSortBy"]}px
        }
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

        // === ACTIVITY === //
        const activity = document.querySelectorAll('div.section.users.users-columns');
        activity.forEach((activityElem) => {
            const activityElement = activityElem.querySelectorAll('ul, li, small, a, img');

            activityElement.forEach((activityResize) => {
                activityResize.style.setProperty('font-size', fontSizes.activity);
            })
        });
        let timerID = window.setTimeout(restoreOpacity,1000);
        sessionStorage.setItem('modalFade', timerID);
    }

    if (toggle) {
        resizeText();
    } else {
        safeGM("removeStyle", "resize-css")
        return
    }
}
