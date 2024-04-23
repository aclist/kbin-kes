function toggleLogo (toggle) { // eslint-disable-line no-unused-vars
    const prefix = "https://raw.githubusercontent.com/aclist/kbin-kes/main/images"
    const kibby = `${prefix}/kbin_logo_kibby.svg`
    const kibbyMini = `${prefix}/kibby-mini.svg`
    const kbinMini = `${prefix}/kbin-mini.svg`

    function getDefaultLogo () {
        const keyw = document.querySelector('meta[name="keywords"]').content.split(',')[0]
        const defaultLogo = `/${keyw}_logo.svg`;
        return defaultLogo
    }

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
                updateLogo(getDefaultLogo())
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
        updateLogo(getDefaultLogo());

    }

    if (toggle) {
        changeLogo();
    } else {
        restoreLogo();
    }
}
