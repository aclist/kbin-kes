// ==UserScript==
// @name         Kbin Easy Emoticon
// @namespace    https://github.com/aclist
// @version      0.6.2
// @description  Use slash commands for emoticons
// @author       minnieo
// @match        https://kbin.social/*
// @license      MIT
// ==/UserScript==

let eventListener;
//lemmy based emoticons
const emoticons = [
    '¯\\\\_(ツ)\\_/¯', '( ͡° ͜ʖ ͡°)', '¯\\_( ͡° ͜ʖ ͡°)_/¯', '( ͡° ͜ʖ ͡°)╭∩╮',
    '( ͡~ ͜ʖ ͡°)', 'ツ', '(͠≖ ͜ʖ͠≖)', '(╯°□°)╯︵ ┻━┻', '┬─┬ノ( º _ ºノ)'
];

const emoticonsCute = [
    'ʕ •ᴥ•ʔ', 'ʕっ• ᴥ • ʔっ', '(♡ヮ♡)', '╰(´꒳`)╯',
    '૮ ˙Ⱉ˙ ა', '( ⸝⸝´꒳`⸝⸝)', '(o/////o " )', '⁄(⁄ ⁄•⁄-⁄•⁄ ⁄)⁄', '( ˶ˆ꒳ˆ˵ )',
    '(⸝⸝⸝• ω •⸝⸝⸝) ♡', '(   ͡º ꒳ ͡º)', '(˘︶˘).｡.:*♡', '( ˘ ³˘)♥', '(  •̀ - •́  )',
    '(˵ •̀ ᴗ - ˵ ) ✧', '৻(  •̀ ᗜ •́  ৻)', 'ᕙ( •̀ ᗜ •́ )ᕗ', '(ㅅ´ ˘ `)', '(╥﹏╥)',
    '( • ᴖ • ｡ )', '◝(ᵔᵕᵔ)◜', '♡⟡˙⋆', ' ⋆˙⟡♡', '❤︎', '♡', '★', '✿',
    '(｡•́︿•̀｡)', '(⸝⸝ᵕᴗᵕ⸝⸝)', '(ﾉ^ヮ^)ﾉ', 'ᐠ( ᐛ )ᐟ', '(¬_¬")', '( ´･･)ﾉ(._.`)',
    'ಠ_ಠ', 'ᕕ( ᐛ )ᕗ', '（◞‸◟）', '( っ- ‸ - c)', ' ( ͡°⁄ ⁄ ͜⁄ ⁄ʖ ⁄ ⁄ ͡°)',
    '╮（￣▽￣）╭', '༼ つ ◕_◕ ༽つ', '(งツ)ว', '( •̯́ ^ •̯̀)', '✧⁺⸜(●′▾‵●)⸝⁺✧',
    '( ་ ⍸ ་ )', '✽-(ˆ▽ˆ)/✽ ✽\(ˆ▽ˆ)-✽', '(•⌓• )⁼³₌₃', '(•-• )', '(ó﹏ò｡)',
    '(¬‿¬)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '(/▽＼)', '(。。\\)', '눈_눈', '(￣▽￣)"',
    '( ￢ω￢)', '╮(╯-╰)╭', '(๑╹ᆺ╹)', '(≖_≖ )', 'ヽ༼ຈل͜ຈ༽ﾉ', 'ヽ༼° ل͜ °༽ﾉ',
    'ヽ༼⊙ل͜⊙༽ﾉ', 'ヽ༼≖ل͜≖༽ﾉ', 'ヽ༼ ・ ل͜ ・ ༽ﾉ', 'ヽ༼◉ل͜◉༽ﾉ', 'ヽ༼ ºلº ༽ﾉ', 
    '(︶^︶)', '(◉ω◉)', '(・へ・)', '(　´_ゝ`)', '\'ㅅ\'', '(_ _;)', '(⚆_⚆)',
    '( ´▽`）o自自o（\´▽` )', '(　´▽`)ﾉ(´･ω･`)', '♪┏(・o･)┛♪', 'щ(ﾟДﾟщ)', '( ﾟヮﾟ)...'
];

function emoticonGen() {
    eventListener = (e) => {
        if (e.target.tagName === 'TEXTAREA') {
            emoticonMake(e.target);
            console.log('working');
        }
    };
    document.addEventListener('input', eventListener)
}

function emoticonMake(param) {
    let text = param.value;
    text = text
        .replace(/\/shrug/, `${emoticons[0]} `)
        .replace(/\/lenny/, `${emoticons[1]} `)
        .replace(/\/lenshrug/, `${emoticons[2]} `)
        .replace(/\/flipoff/, `${emoticons[3]} `)
        .replace(/\/lenwink/, `${emoticons[4]} `)
        .replace(/\/welp/, `${emoticons[5]} `)
        .replace(/\/lensexy/, `${emoticons[6]} `)
        .replace(/\/tableflip/, `${emoticons[7]} `)
        .replace(/\/tableback/, `${emoticons[8]} `);

    // cute emoticons
    text = text
        .replace(/\/bear/, `${emoticonsCute[0]} `)
        .replace(/\/1bear/, `${emoticonsCute[1]} `)
        .replace(/\/3hearteyes/, `${emoticonsCute[2]} `)
        .replace(/\/happy/, `${emoticonsCute[3]} `)
        .replace(/\/rawr/, `${emoticonsCute[4]} `)
        .replace(/\/blush/, `${emoticonsCute[5]} `)
        .replace(/\/1blush/, `${emoticonsCute[6]} `)
        .replace(/\/2blush/, `${emoticonsCute[7]} `)
        .replace(/\/1happy/, `${emoticonsCute[8]} `)
        .replace(/\/3blush/, `${emoticonsCute[9]} `)
        .replace(/\/smirk/, `${emoticonsCute[10]} `)
        .replace(/\/givelove/, `${emoticonsCute[11]} `)
        .replace(/\/kiss/, `${emoticonsCute[12]} `)
        .replace(/\/frown/, `${emoticonsCute[13]} `)
        .replace(/\/wink/, `${emoticonsCute[14]} `)
        .replace(/\/awesome/, `${emoticonsCute[15]} `)
        .replace(/\/tough/, `${emoticonsCute[16]} `)
        .replace(/\/pleased/, `${emoticonsCute[17]} `)
        .replace(/\/cry/, `${emoticonsCute[18]} `)
        .replace(/\/bummed/, `${emoticonsCute[19]} `)
        .replace(/\/wave/, `${emoticonsCute[20]} `)
        .replace(/\/1s/, `${emoticonsCute[21]} `)
        .replace(/\/2s/, `${emoticonsCute[22]} `)
        .replace(/\/heart/, `${emoticonsCute[23]} `)
        .replace(/\/1heart/, `${emoticonsCute[24]} `)
        .replace(/\/star/, `${emoticonsCute[25]} `)
        .replace(/\/flower/, `${emoticonsCute[26]} `)
        .replace(/\/concern/, `${emoticonsCute[27]} `)
        .replace(/\/4blush/, `${emoticonsCute[28]} `)
        .replace(/\/3happy/, `${emoticonsCute[29]} `)
        .replace(/\/4happy/, `${emoticonsCute[30]} `)
        .replace(/\/unhappy/, `${emoticonsCute[31]} `)
        .replace(/\/comfort/, `${emoticonsCute[32]} `)
        .replace(/\/look/, `${emoticonsCute[33]} `)
        .replace(/\/5happy/, `${emoticonsCute[34]} `)
        .replace(/\/depress/, `${emoticonsCute[35]} `)
        .replace(/\/shy/, `${emoticonsCute[36]} `)
        .replace(/\/lenblush/, `${emoticonsCute[37]} `)
        .replace(/\/heh/, `${emoticonsCute[38]} `)
        .replace(/\/energy/, `${emoticonsCute[39]} `)
        .replace(/\/1welp/, `${emoticonsCute[40]} `)
        .replace(/\/plead/, `${emoticonsCute[41]} `)
        .replace(/\/glad/, `${emoticonsCute[42]} `)
        .replace(/\/stoic/, `${emoticonsCute[43]} `)
        .replace(/\/cheer/, `${emoticonsCute[44]} `)
        .replace(/\/rush/, `${emoticonsCute[45]} `)
        .replace(/\/um/, `${emoticonsCute[46]} `)
        .replace(/\/scared/, `${emoticonsCute[47]} `)
        .replace(/\/evil/, `${emoticonsCute[48]} `)
        .replace(/\/sparkles/, `${emoticonsCute[49]} `)
        .replace(/\/bash/, `${emoticonsCute[50]} `)
        .replace(/\/blank/, `${emoticonsCute[51]} `)
        .replace(/\/sus/, `${emoticonsCute[52]} `)
        .replace(/\/2heh/, `${emoticonsCute[53]} `)
        .replace(/\/smug/, `${emoticonsCute[54]} `)
        .replace(/\/3welp/, `${emoticonsCute[55]} `)
        .replace(/\/nunnun/, `${emoticonsCute[56]} `)
        .replace(/\/squint/, `${emoticonsCute[57]} `)
        .replace(/\/donger/, `${emoticonsCute[58]} `)
        .replace(/\/2donger/, `${emoticonsCute[59]} `)
        .replace(/\/3donger/, `${emoticonsCute[60]} `)
        .replace(/\/4donger/, `${emoticonsCute[61]} `)
        .replace(/\/5donger/, `${emoticonsCute[62]} `)
        .replace(/\/6donger/, `${emoticonsCute[63]} `)
        .replace(/\/7donger/, `${emoticonsCute[64]} `)
        .replace(/\/hmpf/, `${emoticonsCute[65]} `)
        .replace(/\/2awesome/, `${emoticonsCute[66]} `)
        .replace(/\/2blank/, `${emoticonsCute[67]} `)
        .replace(/\/3blank/, `${emoticonsCute[68]} `)
        .replace(/\/4blank/, `${emoticonsCute[69]} `)
        .replace(/\/5blank/, `${emoticonsCute[70]} `)
        .replace(/\/2um/, `${emoticonsCute[71]} `)
        .replace(/\/2cheer/, `${emoticonsCute[72]} `)
        .replace(/\/patpat/, `${emoticonsCute[73]} `)
        .replace(/\/dance/, `${emoticonsCute[74]} `)
        .replace(/\/why/, `${emoticonsCute[75]} `)
        .replace(/\/6blank/, `${emoticonsCute[76]} `)

        ;

    param.value = text;

}

function easyEmoticon(toggle) {
    if (toggle) {
        emoticonGen();
    } else {
        document.removeEventListener('input', eventListener);
    }
}
