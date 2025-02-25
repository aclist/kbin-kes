function toggleLogo (toggle) { // eslint-disable-line no-unused-vars
    const prefix = "https://raw.githubusercontent.com/aclist/kbin-kes/main/images"
    const kibby = `${prefix}/kbin_logo_kibby.svg`
    const kibbyMini = `${prefix}/kibby-mini.svg`
    const kbinMini = `${prefix}/kbin-mini.svg`
    const mbinNoText = "https://raw.githubusercontent.com/MbinOrg/mbin/refs/heads/main/assets/images/sources/mbin-notext.svg"
    const mbin = "https://raw.githubusercontent.com/MbinOrg/mbin/refs/heads/main/assets/images/sources/mbin-logo.svg"

    const logos = {
        "Kbin (no text)": kbinMini,
        "Kibby": kibby,
        "Kibby (no text)": kibbyMini,
        "Mbin (no text)": mbinNoText,
        "Mbin": mbin
    }

    function getDefaultLogo () {
        const keyw = document.querySelector('meta[name="keywords"]').content.split(',')[0]
        const defaultLogo = `/${keyw}_logo.svg`;
        return defaultLogo
    }

    function updateLogo (link) {
        $('.brand a').show();
        document.querySelector(".head-nav__menu").style.removeProperty("padding-left")
        const img = document.querySelector('.brand a img');
        //special handling for instances with text-only logo
        if (!img) {
            const sp = document.querySelector(".brand a span")
            sp.style.display = "none"
            const i = document.createElement("img");
            i.setAttribute("src", link)
            i.id = "logo"
            sp.insertAdjacentElement("afterend", i)
        } else {
            img.setAttribute("src", link);
        }
    }

    function changeLogo () {
        const ns = "changelogo";
        const settings = getModSettings(ns);
        let opt = settings["logotype"];
        switch (opt) {
            case "Hidden":
                updateLogo(getDefaultLogo())
                $('.brand a').hide();
                document.querySelector(".head-nav__menu").style.paddingLeft = "20px"
                break;
            default:
                updateLogo(logos[opt])
        }
    }

    function restoreLogo () {
        $('.brand').show();
        //special handling for instances with text-only logo
        const sp = document.querySelector(".brand a span");
        if (sp) {
            sp.style.removeProperty("display");
            document.querySelector(".brand a img").remove();
            return
        }
        updateLogo(getDefaultLogo());
    }

    if (toggle) {
        changeLogo();
    } else {
        restoreLogo();
    }
}
