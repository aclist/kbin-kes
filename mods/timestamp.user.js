const ns = 'timestamp'

function updateTime (toggle) {
    let times = document.querySelectorAll('.timeago')
    const settings = getModSettings(ns);
    if (toggle) {
        times.forEach((time) => {
            if (time.innerText === "just now") {
                console.log("just posted, skipping timestamp")
                return
            }
            if (time.innerText.indexOf("seconds") > -1) {
                console.log("timestamp is in seconds, skipping")
                return
            }
            let iso = time.getAttribute('datetime');
            let isoYear = (iso.split('T')[0]);
            let isoTime = (iso.split('T')[1]);
            isoTime = (isoTime.split('+')[0]);
            let cleanISOTime = isoYear + " @ " + isoTime;
            let localTime = new Date(iso);
            let localAsISO = localTime.toLocaleString('sv').replace(' ', ' @ ');
            let offset = "offset";
            switch (settings[offset]) {
            case "UTC":
                time.innerText = cleanISOTime;
                break;
            case "Local time":
                time.innerText = localAsISO;
                break;
            default:
                return
                break;
            }
        });
    } else {
        return
    }
}
