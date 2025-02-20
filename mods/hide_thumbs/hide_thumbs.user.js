function hideThumbs (toggle) { //eslint-disable-line no-unused-vars
    function show () {
        log("trying to show thumbnails", Log.Log)
        document.querySelectorAll(".figure-container").forEach((container) => {
            if (container.dataset.hidden === "true") {
                container.style.removeProperty("display");
                delete container.dataset.hidden
            }
        });
        document.querySelectorAll(".mes-thumbs-hide").forEach((icon) => {
            icon.remove();
        });
    }

    function hide () {
        document.querySelectorAll('.figure-container').forEach((container) => {
            if (container.dataset.hidden === "true") return
            container.dataset.hidden = "true"

            const prev = document.createElement('i')
            prev.classList.add("mes-thumbs-hide", "fas", "fa-photo-video");
            prev.ariaLabel = "Expand/collapse this image"
            prev.addEventListener("click", () => {
                if (container.style.display === "none") {
                    container.style.removeProperty("display");
                } else {
                    container.style.display = "none"
                }
            });

            container.insertAdjacentElement("beforebegin", prev);
            container.style.display = "none"
        })
    }

    if (toggle) hide();
    if (!toggle) show();
}
