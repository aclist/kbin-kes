/**
 * Allows users to customize the default sort option selected when the url doesn't 
 * specify one already. This can be configured separately for the different types of views
 * that have sort options.
 * 
 * @todo Implement
 * @todo Test on mbin
 * 
 * @param {Boolean} isActive Whether the mod has been turned on
*/
function defaultSort (isActive) {  // eslint-disable-line no-unused-vars
    if (isActive) {
        setup();
    } else {
        teardown();
    }

    function setup () {

    }

    function teardown () {
        
    }
}