function bugReportInit(toggle) {
    const items = document.querySelectorAll('.entry-comment');
    if (toggle) {
        items.forEach((item) => {
            let postID = item.getAttribute("id");
            let bareURL = window.location.href.split("#")[0];
            let originURL = bareURL + "%23" + postID;
            let footer = `%0A%0AReposted from kbin:%0A${originURL}`;
            let postBody = item.querySelector('.content').innerText;
            let postFooter = item.querySelector('footer menu');
            let newListItem = document.createElement('li');
            let newHref = document.createElement('a');
	    newListItem.className = "kes-report-bug";
            newHref.setAttribute("href", `https://github.com/aclist/kbin-kes/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=[BUG]+<Your title here>&body=${postBody}+${footer}`);
            newHref.textContent = "REPORT BUG";
            newListItem.appendChild(newHref);
            newListItem.style.cssText = "background-color: #111; color: white; padding: 2px";
            postFooter.appendChild(newListItem)
        });
    } else {
      $('.kes-report-bug').hide();
    }
}
