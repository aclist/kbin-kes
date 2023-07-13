function messageEntry(toggle){
    let testLoc = window.location.href;
    let locArr = testLoc.split("/");
    let testPage = locArr[3];
    let user = locArr[4];
    let testMsg = locArr[5];
if ((testPage === "u") && (testMsg === "message")){
    let longName = document.querySelector('.options__title h2').innerText;
    let title = document.querySelector('form [for="message_body"]')
    if(toggle){
    title.innerText = "Send message to " + longName;
} else {
   title.innerText = "Body"
}
}
}
