const bird = 'https://raw.githubusercontent.com/aclist/kbin-megamod/testing/images/kbin_logo_kibby.svg'
const render = "URL";
const defaultLogo = "/kbin_logo.svg";

function updateLogo(link){
    const img = document.querySelector('.brand a img');
    img.setAttribute("src", link);
}

function changeLogo(){
  const ns = "changelogo";


    const settings = getModSettings(ns);
    let opt = settings["logotype"];
	switch (opt) {
		case "Hidden":
			updateLogo(defaultLogo)
    			$('.brand').hide();
			break;
		case "Kibby":
    			$('.brand').show();
			updateLogo(bird);
			break;
	}
}
function restoreLogo(){
	$('.brand').show();
        updateLogo(defaultLogo);

}

function toggleLogo(toggle){
	if(toggle){
		changeLogo();
	} else {
		restoreLogo();
	}
}
