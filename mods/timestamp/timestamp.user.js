function updateTime (toggle) { // eslint-disable-line no-unused-vars

    function teardown () {
        times.forEach((time) => {
            if (time.classList.contains(class_hidden)) {
                time.classList.remove(class_hidden);
                time.style.display = "initial";
            }
        })
        const isoTimes = document.querySelectorAll("." + class_iso);
        isoTimes.forEach((isoTime) => {
            isoTime.remove();
        })
    }

    function cleanTime (time) {
        const iso = time.getAttribute('datetime');
        const isoYear = (iso.split('T')[0]);
        let isoTime = (iso.split('T')[1]);
        isoTime = (isoTime.split('+')[0]);
        const utcTime = isoYear + " @ " + isoTime;
        const localTime = new Date(iso);
        const localAsISO = localTime.toLocaleString('sv').replace(' ', ' @ ');
        return [utcTime, localAsISO]
    }

    function updateSibling (el) {
        const sibling = el.nextElementSibling;
        const variant = sibling.dataset.timeVariant;
        const cleanedTime = cleanTime(el);
        if (settings["offset"] != variant){
            setTime(sibling, cleanedTime);
        }
    }

    function setTime (el, time) {
        switch (settings["offset"]) {
            case "UTC":
                el.innerText = time[0];
                el.dataset.timeVariant = "UTC";
                break;
            case "Local time":
                el.innerText = time[1];
                el.dataset.timeVariant = "Local time";
                break;
            default:
                break;
        }
    }

    const ns = 'timestamp';
    const class_timeago = "timeago"
    const class_hidden = "hidden-timeago"
    const class_iso = "iso-timeago"
    const settings = getModSettings(ns);
    const times = document.querySelectorAll("." + class_timeago);

    if (toggle) {
        times.forEach((time) => {
            if (time.classList.contains(class_hidden)) {
                //update time variant in case user changed preference while mod is on
                updateSibling(time);
                return
            }
            const clone = time.cloneNode(false);
            clone.className = class_iso;
            time.insertAdjacentElement("afterend", clone);
            time.style.display = "none";
            time.classList.add(class_hidden);
            cleanedTime = cleanTime(time);
            setTime(clone, cleanedTime);
        });
    } else {
        teardown();
    }
}
