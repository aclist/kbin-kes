/*
    License: MIT
    Original Author: CodingAndCoffee (https://kbin.social/u/CodingAndCoffee)
*/

const kfaHasStrictModerationRules = [
    'beehaw.org',
    'lemmy.ml'
];

function kfaIsStrictlyModerated(hostname) {
    return kfaHasStrictModerationRules.indexOf(hostname) !== -1;
}

function kfaComponentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function kfaRgbToHex(r, g, b) {
    return "#" + kfaComponentToHex(r) + kfaComponentToHex(g) + kfaComponentToHex(b);
}

function kfaHexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function kfaSubtractColor(hex, amount) {
    let rgb = kfaHexToRgb(hex);
    if (rgb.r > amount) {
        rgb.r -= amount;
    } else {
        rgb.r = 0;
    }
    if (rgb.g > amount) {
        rgb.g -= amount;
    } else {
        rgb.g = 0;
    }
    if (rgb.b > amount) {
        rgb.b -= amount;
    } else {
        rgb.b = 0;
    }
    return kfaRgbToHex(rgb.r, rgb.g, rgb.b);
}

function kfaGetCss() {
    let fedColor0 = kfaSettingsFed;
    let fedColor1 = kfaSubtractColor(fedColor0, 50);
    let fedColor2 = kfaSubtractColor(fedColor1, 50);
    let fedColor3 = kfaSubtractColor(fedColor2, 50);
    let modColor0 = kfaSettingsMod;
    let modColor1 = kfaSubtractColor(modColor0, 50);
    let modColor2 = kfaSubtractColor(modColor1, 50);;
    let modColor3 = kfaSubtractColor(modColor2, 50);;
    let homeColor0 = kfaSettingsHome;
    let homeColor1 = kfaSubtractColor(homeColor0, 50);
    let homeColor2 = kfaSubtractColor(homeColor1, 50);
    let homeColor3 = kfaSubtractColor(homeColor2, 50);
    if (kfaSettingsStyle === 'border') {
        let commentFed = ` .comment.data-federated {  box-shadow: `;
        let articleFed = ` article.data-federated {  box-shadow: `;
        let commentMod = ` .comment.data-moderated {  box-shadow: `;
        let articleMod = ` article.data-moderated {  box-shadow: `;
        let commentHome = ` .comment.data-home {  box-shadow: `;
        let articleHome = ` article.data-home {  box-shadow: `;
        commentMod += `1px 0 0 ` + modColor0 + `, 2px 0 0 ` + modColor0 + `, 3px 0 0 ` + modColor1 + `, 4px 0 0 ` + modColor2 + `, 5px 0 0 ` + modColor3 + `; }`;
        commentFed += `1px 0 0 ` + fedColor0 + `, 2px 0 0 ` + fedColor0 + `, 3px 0 0 ` + fedColor1 + `, 4px 0 0 ` + fedColor2 + `, 5px 0 0 ` + fedColor3 + `; }`;
        commentHome += `1px 0 0 ` + homeColor0 + `, 2px 0 0 ` + homeColor0 + `, 3px 0 0 ` + homeColor1 + `, 4px 0 0 ` + homeColor2 + `, 5px 0 0 ` + homeColor3 + `; }`;
        if (kfaSettingsArticleSide === 'left' || kfaSettingsArticleSide === 'both') {
            articleMod += `-1px 0 0 ` + modColor0 + `, -2px 0 0 ` + modColor0 + `, -3px 0 0 ` + modColor1 + `, -4px 0 0 ` + modColor2 + `, -5px 0 0 ` + modColor3;
            articleFed += `-1px 0 0 ` + fedColor0 + `, -2px 0 0 ` + fedColor0 + `, -3px 0 0 ` + fedColor1 + `, -4px 0 0 ` + fedColor2 + `, -5px 0 0 ` + fedColor3;
            articleHome += `-1px 0 0 ` + homeColor0 + `, -2px 0 0 ` + homeColor0 + `, -3px 0 0 ` + homeColor1 + `, -4px 0 0 ` + homeColor2 + `, -5px 0 0 ` + homeColor3;
        }
        if (kfaSettingsArticleSide === 'right' || kfaSettingsArticleSide === 'both') {
            if (kfaSettingsArticleSide === 'both') {
                articleMod += `, `;
                articleFed += `, `;
                articleHome += `, `;
            }
            articleMod += `1px 0 0 ` + modColor0 + `, 2px 0 0 ` + modColor0 + `, 3px 0 0 ` + modColor1 + `, 4px 0 0 ` + modColor2 + `, 5px 0 0 ` + modColor3;
            articleFed += `1px 0 0 ` + fedColor0 + `, 2px 0 0 ` + fedColor0 + `, 3px 0 0 ` + fedColor1 + `, 4px 0 0 ` + fedColor2 + `, 5px 0 0 ` + fedColor3;
            articleHome += `1px 0 0 ` + homeColor0 + `, 2px 0 0 ` + homeColor0 + `, 3px 0 0 ` + homeColor1 + `, 4px 0 0 ` + homeColor2 + `, 5px 0 0 ` + homeColor3;
        }
        articleMod += `; }`;
        articleFed += `; }`;
        articleHome += `; }`;
        return commentFed + articleFed + commentMod + articleMod + commentHome + articleHome;
    } else if (kfaSettingsStyle === 'bubble') {
        // Scale 1-10; Default 5 (i.e., 50%); 10 is 50% of 20. 20 * (x * 0.1)
        const defaultScale = 20;
        const setScale = defaultScale * (kfaSettingsScale * 0.1);
        let fedStyle = ` .comment .data-federated, article .data-federated { display: inline-block; width: ` + setScale + `px; height: ` + setScale + `px; border-radius: 10px; box-shadow: `;
        let modStyle = ` .comment .data-moderated, article .data-moderated { display: inline-block; width: ` + setScale + `px; height: ` + setScale + `px; border-radius: 10px; box-shadow: `;
        let homeStyle = ` .comment .data-home, article .data-home { display: inline-block; width: ` + setScale + `px; height: ` + setScale + `px; border-radius: 10px; box-shadow: `;
        modStyle += `0 0 3px 2px ` + modColor0 + `; background-color: ` + modColor0 + `; margin-right: 4px; }`;
        fedStyle += `0 0 3px 2px ` + fedColor0 + `; background-color: ` + fedColor0 + `; margin-right: 4px; }`;
        homeStyle += `0 0 3px 2px ` + homeColor0 + `; background-color: ` + homeColor0 + `; margin-right: 4px; }`;
        return modStyle + fedStyle + homeStyle;
    }
}

function kfaStartup() {
    kfaInitClasses();
    kfaInjectedCss = GM_addStyle(kfaGetCss());
}

function kfaShutdown() {
    kfaInjectedCss.remove();
}

function kfaRestart() {
    kfaShutdown();
    kfaStartup();
}

function kfaInitClasses() {
    const classList = [
        'data-moderated',
        'data-federated',
        'data-home'
    ];
    document.querySelectorAll('#content article.entry').forEach(function (article) {
        if (!(article.classList.value.split(' ').some(r => classList.indexOf(r) >= 0))) {
            const hostname = new URL(article.querySelector('footer menu .dropdown li:nth-child(4) a').href).hostname;
            let articleAside = article.querySelector('aside');
            article.setAttribute('data-hostname', hostname);
            let articleIndicator = document.createElement('div');
            if (kfaIsStrictlyModerated(hostname)) {
                article.classList.toggle('data-moderated');
                articleIndicator.classList.toggle('data-moderated');
            } else if (hostname !== window.location.hostname) {
                article.classList.toggle('data-federated');
                articleIndicator.classList.toggle('data-federated');
            } else {
                article.classList.toggle('data-home');
                articleIndicator.classList.toggle('data-home');
            }
            articleAside.prepend(articleIndicator);
        }
    });
}

let kfaInjectedCss;
let kfaSettingsFed;
let kfaSettingsMod;
let kfaSettingsHome;
let kfaSettingsArticleSide;
let kfaSettingsStyle;
let kfaSettingsScale;
let kfaLastToggleState = false;

function initKfa(toggle) {
    if (toggle) {
        const settings = getModSettings('kbinFedAware');
        kfaSettingsFed = settings['kfaFedColor'];
        kfaSettingsMod = settings['kfaModColor'];
        kfaSettingsHome = settings['kfaHomeColor'];
        kfaSettingsArticleSide = settings['kfaPostSide'];
        kfaSettingsStyle = settings['kfaStyle'];
        kfaSettingsScale = settings['kfaBubbleScale'];
        if (kfaLastToggleState === false) {
            kfaLastToggleState = true;
            kfaStartup();
        } else {
            kfaInitClasses();
        }
    } else {
        kfaLastToggleState = false;
        shutdown();
    }
}