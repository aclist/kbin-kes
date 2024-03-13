/**
 * This mod aims to fix a current kbin issue.
 * On some views, like All Content, the pagination is broken. The arrows behave like they're on
 * the first page, regardless of which they're actually on. This mod is meant to fix the issue
 * by manually rewriting the arrows to work correctly.
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
 */
function fixPaginationArrows (isActive) { // eslint-disable-line no-unused-vars
    /** @type {HTMLElement} */
    const leftArrow = document.querySelector(`span.pagination__item--previous-page`);
    /** @type {HTMLElement} */
    const rightArrow = document.querySelector("a.pagination__item--next-page");
    /** @type {Number} */
    const currentPage = Number(window.location.search?.slice(3)) ?? 1;

    // everything is correct for the first page, so no need to change anything there
    if (currentPage > 1) {
        if (isActive) {
            setup();
        } else {
            teardown();
        }
    }

    function setup () {
        // The left arrow query specifically looks for an uninteractable one. If it is found
        // past page 1, that means it needs to be fixed. There's no other conditions needed.
        if (leftArrow && !isFixed(leftArrow)) {
            leftArrow.style.display = "none";
            leftArrow.before(createClickable(leftArrow, currentPage-1, "prev"));
            markAsFixed(leftArrow);
        }
        if (rightArrow && !isFixed(rightArrow) && isNextPageWrong()) {
            if (isThisLastPage()) {
                disable(rightArrow);
            } else {
                rightArrow.setAttribute("href", buildUrl(currentPage+1));
            }
            markAsFixed(rightArrow);
        }
    }

    function teardown () {
        if (leftArrow && isFixed(leftArrow)) {
            document.querySelector("a.pagination__item--previous-page").remove();
            leftArrow.style.removeProperty("display");
            markAsUnfixed(leftArrow);
        }
        if (rightArrow && isFixed(rightArrow)) {
            if (rightArrow.classList.contains("pagination__item--disabled")) {
                rightArrow.classList.remove("pagination__item--disabled");
                rightArrow.style.removeProperty("color");
                rightArrow.style.removeProperty("font-weight");
            }
            rightArrow.setAttribute("href", buildUrl(2));
            markAsUnfixed(rightArrow);
        }
    }

    /**
     * Disables an arrow, making it non-clickable.
     * @param {HTMLElement} elem
     */
    function disable (elem) {
        elem.style.color = "var(--kbin-meta-text-color)";
        elem.style.fontWeight = "400";
        elem.classList.add("pagination__item--disabled");
        elem.removeAttribute("href");
    }

    /**
     * The left arrow remains uninteractable when this bug happens, regardless of page. This
     * function creates a clickable element to replace it with.
     * @param {HTMLElement} original
     * @param {Number} page What page the new interactable arrow should point to
     * @param {String} role The value for the rel attribute
     * @returns {HTMLElement}
     */
    function createClickable (original, page, role) {
        const newElement = document.createElement("a");
        newElement.classList = original.classList;
        newElement.classList.remove("pagination__item--disabled");
        newElement.textContent = original.textContent;
        newElement.setAttribute("href", buildUrl(page));
        newElement.setAttribute("rel", role);
        return newElement;
    }

    /**
     * Checks whether the current page is the last one.
     * @returns {Boolean}
     */
    function isThisLastPage () {
        const lastPage = rightArrow.previousElementSibling.textContent;
        return lastPage == currentPage;
    }

    /**
     * Checks if the right arrow points to the correct page. Or rather, the wrong one.
     * @returns {Boolean}
     */
    function isNextPageWrong () {
        const actualUrl = rightArrow.getAttribute("href");
        const expectedUrl = buildUrl(currentPage+1);
        return actualUrl != expectedUrl;
    }

    /**
     * Constructs the correct full URL for one of the arrows.
     * @param {Number} page
     * @returns {String}
     */
    function buildUrl (page) {
        return `${window.location.pathname}?p=${page}`;
    }

    /** @param {HTMLElement} elem @returns {Boolean} */
    function isFixed (elem) {
        return elem.dataset.fixed;
    } 
    /** @param {HTMLElement} */
    function markAsFixed (elem) {
        elem.dataset.fixed = true;
    }
    /** @param {HTMLElement} */
    function markAsUnfixed (elem) {
        delete elem.dataset.fixed;
    }
}