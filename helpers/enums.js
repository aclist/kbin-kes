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
    Messages: Object.freeze({
        Inbox: 10,
        Notifications: 11,
        Thread: 12
    }),
    User: Object.freeze({
        Default: 13,
        DirectMessage: 14,
        Subscriptions: 15,
        Threads: 16,
        Comments: 17,
        Posts: 18,
        Replies: 19,
        Boosts: 20,
        Following: 21,
        Followers: 22
    }),
    Thread: Object.freeze({
        Comments: 23,
        Favorites: 24,
        Boosts: 25
    }),
    Domain: Object.freeze({
        Default: 26,
        Comments: 27
    })
})

const Trigger = Object.freeze({
    Pageload: 0,
    Toggle: 1,
    Setting: 2,
    Mutation: 3,
    Dependency: 4
})
