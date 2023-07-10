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
	console.log(opt)
	switch (opt) {
		case "Hidden":
			updateLogo(defaultLogo)
    			$('.brand').hide();
			break;
		case "Kibby":
    			$('.brand').show();
			updateLogo(bird);
			break;
		case "3D render":
    			$('.brand').show();
			updateLogo(render);
			break;
	}
}
function restoreLogo(){
	$('.brand').show();
        updateLogo(defaultLogo);

}

function toggleLogo(toggle){
	console.log(toggle);
	if(toggle){
		changeLogo();
	} else {
		restoreLogo();
	}
}
