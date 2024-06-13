function mobileHideInit (toggle) { // eslint-disable-line no-unused-vars
    function mobileHideTeardown () {
        let filterBtn
        let viewBtn
        try {
            filterBtn = document.querySelector('button[aria-label="Filter by type"]');
            viewBtn = document.querySelector('button[aria-label="Change view"]');
        } finally {
            if (viewBtn) {
                viewBtn.style.display = 'block'
            }
            if (filterBtn) {
                filterBtn.style.display = 'block'
            }
        }
    }
    function mobileHideSetup () {
        let filterBtn
        let viewBtn
        const settings = getModSettings('mobilehide')
        try {
            filterBtn = document.querySelector('button[aria-label="Filter by type"]');
            viewBtn = document.querySelector('button[aria-label="Change view"]');
        } finally {
            if (filterBtn) {
                if (settings["filter"]) {
                    filterBtn.style.display = 'none'
                } else {
                    filterBtn.style.display = 'block'
                }
            }
            if (viewBtn) {
                if (settings["view"]) {
                    viewBtn.style.display = 'none'
                } else {
                    viewBtn.style.display = 'block'
                }
            }
        }
    }
    if (toggle) {
        mobileHideSetup();
    } else {
        mobileHideTeardown();
    }
}
