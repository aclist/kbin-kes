const Log = Object.freeze({
    LOG: 1,
    WARN: 2,
    ERROR: 3
})

const Mbin = Object.freeze({
    TOP: 1,
    SEARCH: 2,
    MAGAZINES: 3,
    PEOPLE: 4,
    BOOKMARKS: 5,
    TAG: 6,
    MICROBLOG: 7,
    SETTINGS: 8,
    MAGAZINE: 9,
    MODLOG: 10,
    Messages: Object.freeze({
        INBOX: 11,
        NOTIFICATIONS: 12,
        THREAD: 13
    }),
    User: Object.freeze({
        DEFAULT: 14,
        DIRECTMESSAGE: 15,
        SUBSCRIPTIONS: 16,
        THREADS: 17,
        COMMENTS: 18,
        POSTS: 19,
        REPLIES: 20,
        BOOSTS: 21,
        FOLLOWING: 22,
        FOLLOWERS: 23
    }),
    Thread: Object.freeze({
        COMMENTS: 24,
        FAVORITES: 25,
        BOOSTS: 26
    }),
    Domain: Object.freeze({
        DEFAULT: 27,
        COMMENTS: 28
    }),
    New: Object.freeze({
        LINK: 29,
        THREAD: 30,
        PHOTO: 31,
        MAGAZINE: 32
    })
})

const Trigger = Object.freeze({
    PAGELOAD: 0,
    TOGGLE: 1,
    SETTING: 2,
    MUTATION: 3,
    DEPENDENCY: 4
})

const Theme = Object.freeze({
    KBIN: 1,
    LIGHT: 2,
    DARK: 3,
    SOLARIZED_LIGHT: 4,
    SOLARIZED_DARK: 5,
    TOKYO_NIGHT: 6
})

const Scripthandler = {
    NATIVE: 1,
    TAMPER: 2
}

