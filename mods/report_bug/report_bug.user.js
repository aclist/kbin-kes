function bugReportInit (toggle) { // eslint-disable-line no-unused-vars
    const reportURL = 'https://github.com/aclist/kbin-kes/issues/new?assignees=&labels=bug&projects=&template=bug_report.md' +
        '&title=[BUG]+<Your title here>&body='
    const items = document.querySelectorAll('.entry-comment');

    //only apply on threads
    if (window.location.href.split('/')[5] != "t") return

    function addBugReport (item) {
        let postID = item.getAttribute("id");
        let bareURL = window.location.href.split("#")[0];
        let originURL = bareURL + "%23" + postID;
        let footer = `%0A%0AReposted from kbin:%0A${originURL}`;
        let postBody = item.querySelector('.content').innerText;
        let postFooter = item.querySelector('footer menu .dropdown ul');
        let newListItem = document.createElement('li');
        let newHref = document.createElement('a');
        newListItem.className = "kes-report-bug";
        newHref.setAttribute("href", reportURL + postBody + footer);
        newHref.textContent = "Report KES bug";
        newListItem.appendChild(newHref);
        newListItem.style.cssText = "color: white";
        postFooter.appendChild(newListItem)
    }
    if (toggle) {
        items.forEach((item) => {
            if (item.querySelector('.kes-report-bug')) {
                $('.kes-report-bug').show();
                return
            }
            addBugReport(item);
        });
        addBugReport(document.querySelector('article'))
    } else {
        $('.kes-report-bug').hide();
    }
}
