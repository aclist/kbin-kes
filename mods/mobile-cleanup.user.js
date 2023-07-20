function teardown(){
    const filterBtn = document.querySelector('button[aria-label="Filter by type"]');
    const viewBtn = document.querySelector('button[aria-label="Change view"]');
    viewBtn.style.display = 'block'
    filterBtn.style.display = 'block'
}
function setup(){
    const settings = getModSettings('mobilehide')
    const filterBtn = document.querySelector('button[aria-label="Filter by type"]');
    const viewBtn = document.querySelector('button[aria-label="Change view"]');
    if (settings["filter"]) {
        filterBtn.style.display = 'none'
    } else {
        filterBtn.style.display = 'block'
    }
    if (settings["view"]) {
        viewBtn.style.display = 'none'
    } else {
        viewBtn.style.display = 'block'
    }
}
function mobileHideInit(toggle){
    if (toggle){
        setup();
    } else {
        teardown();
    }
}
