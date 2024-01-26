/**
 * This mod aims to change how spoilers are displayed, from the current
 * collapsible behavior to obscured blocks that reveal their content on
 * hover or click.
 * Main inspiration here is the block spoilers on Old Reddit.
 * 
 * @todo implementation
 * @todo testing
*/
class BlockySpoilersMod {
    setup () {

    }

    teardown () {

    }
}

function blockifySpoilers (isActive) { // eslint-disable-line no-unused-vars
    if (isActive) {
        new BlockySpoilersMod().setup();
    } else {
        new BlockySpoilersMod().teardown();
    }
}