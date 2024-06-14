/**
 * The page shown when trying to access a user or magazine that hasn't been federated to the
 * instance yet can be quite unhelpful. It simply shows a 404 error.
 * This mod overhauls the page so it informs the user about what's going on and how they can
 * federate the user, as well as providing helpful links to quickly federate the user or
 * access their profile on the original instance.
 * 
 * @param {boolean} isActive Whether the mod has been turned on
 */
function missingActorInfo (isActive) { // eslint-disable-line no-unused-vars
    if (isActive) setup();
    else teardown();

    function setup () {

    }

    function teardown () {

    }
}