const kibby = 'https://raw.githubusercontent.com/aclist/kbin-kes/main/images/kbin_logo_kibby.svg'
const kibbyMini = 'https://raw.githubusercontent.com/aclist/kbin-kes/main/images/kibby-mini.svg'
const kbinMini = 'https://raw.githubusercontent.com/aclist/kbin-kes/main/images/kbin-mini.svg'
const defaultLogo = "/kbin_logo.svg";

function updateLogo (link) {
    $('.brand a').show();
    const img = document.querySelector('.brand a img');
    img.setAttribute("src", link);
}

function changeLogo () {
    const ns = "changelogo";

    const settings = getModSettings(ns);
    let opt = settings["logotype"];
    switch (opt) {
    case "Hidden":
        updateLogo(defaultLogo)
	$('.brand a').hide();
        break;
    case "Kibby":
        updateLogo(kibby);
        break;
    case "Kbin (no text)":
        updateLogo(kbinMini);
        break;
    case "Kibby (no text)":
        updateLogo(kibbyMini);
        break;
    }
}

function restoreLogo () {
    $('.brand').show();
    updateLogo(defaultLogo);

}

function toggleLogo (toggle) {
    if (toggle) {
        changeLogo();
    } else {
        restoreLogo();
    }
}
