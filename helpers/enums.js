const Log = Object.freeze({
    Log: 1,
    Warn: 2,
    Error: 3
})

const Mbin = Object.freeze({
    Top: 1,
    Search: 2,
    Magazines: 3,
    People: 4,
    Bookmarks: 5,
    Tag: 6,
    Microblog: 7,
    Settings: 8,
    Magazine: 9,
    People: 10,
    Modlog: 11,
    Messages: Object.freeze({
        Inbox: 12,
        Notifications: 13,
        Thread: 14
    }),
    User: Object.freeze({
        Default: 15,
        DirectMessage: 16,
        Subscriptions: 17,
        Threads: 18,
        Comments: 19,
        Posts: 20,
        Replies: 21,
        Boosts: 22,
        Following: 23,
        Followers: 24
    }),
    Thread: Object.freeze({
        Comments: 25,
        Favorites: 26,
        Boosts: 27
    }),
    Domain: Object.freeze({
        Default: 28,
        Comments: 29
    }),
    New: Object.freeze({
        LINK: 30,
        THREAD: 31,
        PHOTO: 32,
        MAGAZINE: 33
    })
})

const Trigger = Object.freeze({
    Pageload: 0,
    Toggle: 1,
    Setting: 2,
    Mutation: 3,
    Dependency: 4
})
